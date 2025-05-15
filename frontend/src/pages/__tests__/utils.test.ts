import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("merges Tailwind classes correctly", () => {
    const result = cn("bg-red-500", "text-white", "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");
  });

  it("removes conflicting classes (last one wins)", () => {
    const result = cn("text-sm", "text-lg");
    expect(result).toBe("text-lg");
  });

  it("handles false and undefined values", () => {
    const result = cn("p-4", false && "text-red-500", undefined, "mb-2");
    expect(result).toBe("p-4 mb-2");
  });

  it("returns empty string when no inputs are given", () => {
    const result = cn();
    expect(result).toBe("");
  });
});