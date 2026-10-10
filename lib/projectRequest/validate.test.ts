import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { EMPTY_REQUEST, IProjectRequest } from "./types";
import {
  LIMITS,
  buildSubmission,
  isStepComplete,
  parseRequestBody,
  validateRequest,
  validateStep,
} from "./validate";

const VALID: IProjectRequest = {
  ...EMPTY_REQUEST,
  name: "Ada Okello",
  email: "ada@example.com",
  countryCode: "UG",
  phone: "700 123 456",
  brandName: "Ada O",
  about: "A debut single dropping in March. We need playlist pitching and press.",
  goal: "release",
  budget: "1k-5k",
};

describe("step 1: the basics", () => {
  test("requires name, email, phone and artist or company name", () => {
    const errors = validateStep("basics", EMPTY_REQUEST);
    assert.ok(errors.name);
    assert.ok(errors.email);
    assert.ok(errors.phone);
    assert.ok(errors.brandName);
    assert.equal(isStepComplete("basics", EMPTY_REQUEST), false);
  });

  test("rejects a malformed email", () => {
    assert.ok(validateStep("basics", { ...VALID, email: "ada@" }).email);
    assert.ok(validateStep("basics", { ...VALID, email: "ada example.com" }).email);
  });

  test("rejects a phone without enough digits", () => {
    assert.ok(validateStep("basics", { ...VALID, phone: "123" }).phone);
    assert.ok(validateStep("basics", { ...VALID, phone: "abc" }).phone);
  });

  test("rejects an unknown country code", () => {
    assert.ok(validateStep("basics", { ...VALID, countryCode: "XX" }).countryCode);
  });

  test("treats whitespace-only answers as empty", () => {
    assert.ok(validateStep("basics", { ...VALID, name: "   " }).name);
  });

  test("is complete once name, email, country, phone and brand are valid", () => {
    assert.deepEqual(validateStep("basics", VALID), {});
    assert.equal(isStepComplete("basics", VALID), true);
  });
});

describe("step 2: the project", () => {
  test("requires a description and a primary goal", () => {
    const errors = validateStep("project", { ...VALID, about: "", goal: "" });
    assert.ok(errors.about);
    assert.ok(errors.goal);
  });

  test("asks for a few words, not a single character", () => {
    assert.ok(validateStep("project", { ...VALID, about: "help" }).about);
    assert.equal(validateStep("project", { ...VALID, about: "x".repeat(LIMITS.aboutMin) }).about, undefined);
  });

  test("rejects goals that are not offered", () => {
    assert.ok(validateStep("project", { ...VALID, goal: "nft" }).goal);
  });
});

describe("step 3: budget", () => {
  test("requires one of the budget tiers", () => {
    assert.ok(validateStep("budget", { ...VALID, budget: "" }).budget);
    assert.ok(validateStep("budget", { ...VALID, budget: "a-lot" }).budget);
    assert.equal(isStepComplete("budget", VALID), true);
  });
});

describe("full request", () => {
  test("a complete request has no errors", () => {
    assert.deepEqual(validateRequest(VALID), {});
  });

  test("overlong answers are rejected", () => {
    assert.ok(validateRequest({ ...VALID, about: "x".repeat(LIMITS.about + 1) }).about);
    assert.ok(validateRequest({ ...VALID, name: "x".repeat(LIMITS.name + 1) }).name);
  });

  test("submission trims text and builds an international phone", () => {
    const submission = buildSubmission({
      ...VALID,
      name: "  Ada Okello ",
      about: `  ${VALID.about}  `,
      phone: " 700 123 456 ",
    });
    assert.equal(submission.name, "Ada Okello");
    assert.equal(submission.about, VALID.about);
    assert.equal(submission.phone, "+256700123456");
    assert.equal(submission.countryCode, "UG");
  });

  test("parseRequestBody rejects non-objects and coerces wrong types", () => {
    assert.equal(parseRequestBody(null), null);
    assert.equal(parseRequestBody([1, 2]), null);
    const parsed = parseRequestBody({ name: "  Ada ", email: 42, goal: ["release"], extra: "ignored" });
    assert.ok(parsed);
    assert.equal(parsed?.name, "Ada");
    assert.equal(parsed?.email, "");
    assert.equal(parsed?.goal, "");
    assert.equal((parsed as unknown as Record<string, unknown>).extra, undefined);
  });
});
