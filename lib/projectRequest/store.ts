import { IProjectRequest } from "./types";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

// Submissions are appended to a local JSON Lines file so the form works with
// no network or external service. One line per request.
export const SUBMISSIONS_FILE = path.join(process.cwd(), ".data", "project-requests.jsonl");

export function createReference(): string {
  return `HP-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function saveProjectRequest(
  request: IProjectRequest,
  reference: string,
  receivedAt: Date = new Date()
): Promise<void> {
  const { website, ...fields } = request;
  const record = { reference, receivedAt: receivedAt.toISOString(), ...fields };
  await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  await fs.appendFile(SUBMISSIONS_FILE, `${JSON.stringify(record)}\n`, "utf8");
}
