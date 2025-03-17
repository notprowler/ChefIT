import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecipesPage from "../../pages/RecipesPage";

// Mock fetch to prevent actual API calls
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ recipes: [] }),
  })
) as any;

describe("RecipesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display "View Random Recipes" heading', async () => {
    render(
      <BrowserRouter>
        <RecipesPage />
      </BrowserRouter>
    );

    // Wait for the heading to appear (since we have loading state)
    const heading = await screen.findByText("View Random Recipes");

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });
});
