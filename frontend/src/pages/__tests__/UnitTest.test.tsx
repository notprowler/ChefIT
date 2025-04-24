import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("renders Find Recipes and Create Account buttons", () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("link", { name: /Find Recipes/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Create Account/i })
    ).toBeInTheDocument();
  });
});
