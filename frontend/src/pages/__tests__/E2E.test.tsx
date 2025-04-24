// tests/heroSection.e2e.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

// Fake fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("HeroSection E2E-like test", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            recipes: [
              {
                id: 1,
                title: "Test Dish",
                image: "https://example.com/test.jpg",
                readyInMinutes: 20,
                servings: 2,
                vegan: false,
                vegetarian: true,
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders hero section and loads dynamic image", async () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    // Static UI
    expect(screen.getByText(/Cook Amazing Meals/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Find Recipes/i })
    ).toBeInTheDocument();

    // Dynamic image (simulate fetch)
    await waitFor(() => {
      const image = screen.getByAltText("Random Recipe") as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toBe("https://example.com/test.jpg");
    });
  });
});
