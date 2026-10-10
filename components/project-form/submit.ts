import { FieldErrors, IProjectRequest } from "../../lib/projectRequest/types";

export type SubmitResult =
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string; fieldErrors: FieldErrors };

const GENERIC_ERROR = "We couldn't send your request. Check your connection and try again.";

export async function submitProjectRequest(request: IProjectRequest): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/project-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const body = await response.json().catch(() => null);
    if (response.ok && body?.success && body.data?.reference) {
      return { kind: "success", reference: body.data.reference };
    }
    return {
      kind: "error",
      message: typeof body?.error === "string" ? body.error : GENERIC_ERROR,
      fieldErrors: body?.fieldErrors && typeof body.fieldErrors === "object" ? body.fieldErrors : {},
    };
  } catch (error) {
    return { kind: "error", message: GENERIC_ERROR, fieldErrors: {} };
  }
}
