import { setDefaultLanguage } from "../src";

// Mocking node-fetch
jest.mock("node-fetch", () => jest.fn());

describe("setDefaultLanguage", () => {
  it("should not throw an error for valid languages", () => {
    expect(() => setDefaultLanguage("en")).not.toThrow();
    expect(() => setDefaultLanguage("ka")).not.toThrow();
  });

  it("should throw an error for invalid languages", () => {
    expect(() => setDefaultLanguage("invalid" as any)).toThrow(
      "Unsupported language"
    );
  });
});
