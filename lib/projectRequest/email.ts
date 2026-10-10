import { Resend } from "resend";
import { BRAND } from "../../constants/brand";
import { BUDGET_OPTIONS, GOAL_OPTIONS } from "./options";
import { IProjectRequest } from "./types";

// Prefer RESEND_FROM_EMAIL when set (e.g. a verified Resend domain). Defaults
// to the public contact address once hypush.co is verified in Resend.
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL?.trim() || BRAND.EMAIL;
const FROM = `${BRAND.NAME} <${FROM_ADDRESS}>`;
const REPLY_TO = BRAND.EMAIL;

function labelFor(options: ReadonlyArray<{ value: string; label: string }>, value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function autoresponseText(name: string, reference: string): string {
  const firstName = name.split(/\s+/)[0] || name;
  return [
    `Hi ${firstName},`,
    "",
    `Thanks for getting in touch with ${BRAND.NAME}. We've received your project request.`,
    "",
    `Your reference is ${reference}. Keep it handy if you contact us about this request.`,
    "",
    "What happens next:",
    "1. We review your answers.",
    "2. We reply with any questions, or a proposal and quote.",
    "3. Once you're happy with the plan, we get to work.",
    "",
    `If you need us sooner, reply to this email or write to ${BRAND.EMAIL}.`,
    "",
    `- ${BRAND.NAME}`,
  ].join("\n");
}

function autoresponseHtml(name: string, reference: string): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name);
  const safeReference = escapeHtml(reference);
  return `
    <p>Hi ${firstName},</p>
    <p>Thanks for getting in touch with ${escapeHtml(BRAND.NAME)}. We've received your project request.</p>
    <p>Your reference is <strong>${safeReference}</strong>. Keep it handy if you contact us about this request.</p>
    <p><strong>What happens next</strong></p>
    <ol>
      <li>We review your answers.</li>
      <li>We reply with any questions, or a proposal and quote.</li>
      <li>Once you're happy with the plan, we get to work.</li>
    </ol>
    <p>If you need us sooner, reply to this email or write to <a href="mailto:${escapeHtml(BRAND.EMAIL)}">${escapeHtml(BRAND.EMAIL)}</a>.</p>
    <p>- ${escapeHtml(BRAND.NAME)}</p>
  `.trim();
}

function notifyText(request: IProjectRequest, reference: string): string {
  return [
    `New project request ${reference}`,
    "",
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Phone: ${request.phone}`,
    `Artist / brand: ${request.brandName}`,
    `Goal: ${labelFor(GOAL_OPTIONS, request.goal)}`,
    `Budget: ${labelFor(BUDGET_OPTIONS, request.budget)}`,
    "",
    "About:",
    request.about,
  ].join("\n");
}

export interface IEmailSendResult {
  sent: boolean;
  skipped?: "missing_api_key";
  error?: string;
}

/** Confirmation to the submitter. Soft-fails so a Resend outage never blocks the form. */
export async function sendSubmissionAutoresponse(
  request: IProjectRequest,
  reference: string
): Promise<IEmailSendResult> {
  const resend = getResend();
  if (!resend) {
    console.warn("[project-requests] RESEND_API_KEY is not set; skipping autoresponse");
    return { sent: false, skipped: "missing_api_key" };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: [request.email],
    replyTo: REPLY_TO,
    subject: `We've received your request (${reference})`,
    text: autoresponseText(request.name, reference),
    html: autoresponseHtml(request.name, reference),
    tags: [
      { name: "type", value: "quote-autoresponse" },
      { name: "reference", value: reference },
    ],
  });

  if (error) {
    console.error("[project-requests] Autoresponse failed", { reference, error });
    return { sent: false, error: error.message };
  }
  return { sent: true };
}

/** Internal copy for the team inbox. Soft-fails independently of the autoresponse. */
export async function sendSubmissionNotify(
  request: IProjectRequest,
  reference: string
): Promise<IEmailSendResult> {
  const resend = getResend();
  if (!resend) return { sent: false, skipped: "missing_api_key" };

  const { error } = await resend.emails.send({
    from: FROM,
    to: [BRAND.EMAIL],
    replyTo: request.email,
    subject: `New quote request ${reference} - ${request.brandName}`,
    text: notifyText(request, reference),
    tags: [
      { name: "type", value: "quote-notify" },
      { name: "reference", value: reference },
    ],
  });

  if (error) {
    console.error("[project-requests] Internal notify failed", { reference, error });
    return { sent: false, error: error.message };
  }
  return { sent: true };
}
