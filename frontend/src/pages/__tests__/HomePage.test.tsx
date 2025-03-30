import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import { vi } from "vitest";

// Mock the Navbar component since we're only testing HomePage
vi.mock("@/components/Navbar", () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>,
}));

describe("HomePage", () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  it("renders the homepage title", () => {
    renderHomePage();
    expect(screen.getByText("Chef it home")).toBeInTheDocument();
  });

  it("renders the navbar component", () => {
    renderHomePage();
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
  });

  it("renders the recipes link", () => {
    renderHomePage();
    const recipesLink = screen.getByRole("link", { name: /recipes/i });
    expect(recipesLink).toBeInTheDocument();
    expect(recipesLink).toHaveAttribute("href", "/recipes");
  });
});
