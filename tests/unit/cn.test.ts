import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe("base active");
  });

  it("deduplicates tailwind classes", () => {
    expect(cn("px-2 px-4")).toBe("px-4");
  });

  it("handles undefined and null", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("handles arrays", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c");
  });
});
