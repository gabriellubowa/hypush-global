import { NextApiRequest, NextApiResponse } from "next";
import { sendSubmissionAutoresponse, sendSubmissionNotify } from "../../lib/projectRequest/email";
import { createRateLimiter } from "../../lib/projectRequest/rateLimit";
import { createReference, saveProjectRequest } from "../../lib/projectRequest/store";
import { FieldErrors } from "../../lib/projectRequest/types";
import { buildSubmission, parseRequestBody, validateRequest } from "../../lib/projectRequest/validate";

export const config = { api: { bodyParser: { sizeLimit: "32kb" } } };

const SUBMISSIONS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;

const limiter = createRateLimiter({ limit: SUBMISSIONS_PER_WINDOW, windowMs: WINDOW_MS });

interface IApiResponse {
  success: boolean;
  data: { reference: string } | null;
  error: string | null;
  fieldErrors?: FieldErrors;
}

const fail = (res: NextApiResponse<IApiResponse>, status: number, error: string, fieldErrors?: FieldErrors) =>
  res.status(status).json({ success: false, data: null, error, fieldErrors });

// Same-origin check: browsers always send Origin on a fetch POST, so a
// missing or foreign Origin means the request didn't come from this site.
function isSameOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin;
  if (!origin || !req.headers.host) return false;
  try {
    return new URL(origin).host === req.headers.host;
  } catch (error) {
    return false;
  }
}

function clientKey(req: NextApiRequest): string {
  return req.socket.remoteAddress ?? "unknown";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IApiResponse>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "Use POST to submit a project request.");
  }
  if (!isSameOrigin(req)) return fail(res, 403, "This form can only be submitted from the HYPush site.");
  if (!String(req.headers["content-type"] ?? "").startsWith("application/json")) {
    return fail(res, 415, "Send the form as JSON.");
  }
  if (!limiter.isAllowed(clientKey(req))) {
    return fail(res, 429, "Too many submissions. Please wait a few minutes and try again.");
  }

  const parsed = parseRequestBody(req.body);
  if (!parsed) return fail(res, 400, "The form data could not be read.");

  // Bots fill the hidden honeypot. Answer as if it worked, but keep nothing.
  if (parsed.website) return res.status(201).json({ success: true, data: { reference: createReference() }, error: null });

  const fieldErrors = validateRequest(parsed);
  if (Object.keys(fieldErrors).length > 0) {
    return fail(res, 400, "Some answers need another look.", fieldErrors);
  }

  const reference = createReference();
  const submission = buildSubmission(parsed);
  try {
    await saveProjectRequest(submission, reference);
  } catch (error) {
    console.error("[project-requests] Failed to save submission", { reference, error });
    return fail(res, 500, "We couldn't save your request. Please try again in a moment.");
  }

  // Email is best-effort: the submission is already saved. Never fail the request
  // because Resend is down or the domain is still verifying.
  await Promise.all([
    sendSubmissionAutoresponse(submission, reference),
    sendSubmissionNotify(submission, reference),
  ]);

  return res.status(201).json({ success: true, data: { reference }, error: null });
}
