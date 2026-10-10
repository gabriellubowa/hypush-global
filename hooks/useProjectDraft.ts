import { EMPTY_REQUEST, IProjectRequest } from "../lib/projectRequest/types";
import { useEffect, useRef, useState } from "react";
import { parseRequestBody } from "../lib/projectRequest/validate";

const DRAFT_KEY = "hypush:project-draft:v2";

function readDraft(): IProjectRequest | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? parseRequestBody(JSON.parse(raw)) : null;
  } catch (error) {
    return null;
  }
}

function hasAnswers(values: IProjectRequest): boolean {
  return Boolean(values.name || values.email || values.phone || values.brandName || values.about);
}

// Keeps an in-progress request in this browser only, so a refresh or an
// accidental close doesn't lose answers. Storage failures are ignored: the
// form still works, it just can't resume.
export function useProjectDraft() {
  const [values, setValues] = useState<IProjectRequest>(EMPTY_REQUEST);
  const [wasRestored, setWasRestored] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const draft = readDraft();
    if (draft && hasAnswers(draft)) {
      // The honeypot is never restored.
      setValues({ ...draft, website: "" });
      setWasRestored(true);
    }
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      if (hasAnswers(values)) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    } catch (error) {
      // Storage unavailable (private mode or full); keep going without it.
    }
  }, [values]);

  const clearDraft = () => {
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      // Nothing to clear if storage is unavailable.
    }
    setValues(EMPTY_REQUEST);
    setWasRestored(false);
  };

  return { values, setValues, wasRestored, clearDraft };
}
