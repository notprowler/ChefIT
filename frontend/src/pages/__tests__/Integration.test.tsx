import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

// Mock the fetch function globally
type MockedFetch = typeof fetch & {
  mockClear: () => void;
  mockImplementation: (fn: (...args: any[]) => any) => void;
};

const mockFetch = vi.fn() as unknown as MockedFetch;
vi.stubGlobal("fetch", mockFetch);

describe("HeroSection Integration", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            recipes: [
              {
                id: 1,
                title: "Test Dish",
                image: "https://example.com/test.jpg",
                readyInMinutes: 15,
                servings: 2,
                vegan: true,
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

  const renderHero = () =>
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

  it("fetches and displays a random recipe image", async () => {
    await act(async () => {
      renderHero();
    });

    const image = screen.getByAltText("Random Recipe") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://example.com/test.jpg");
  });
});
