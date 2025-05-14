import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Recipe from "../Recipe";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Recipe", () => {
  const mockRecipe = {
    id: 1,
    title: "Test Recipe",
    image: "test-image.jpg",
    readyInMinutes: 30,
    servings: 4,
    vegan: true,
    vegetarian: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        user: { id: "test-user-id" },
      })
    );
  });

  const renderRecipe = (props = {}) => {
    return render(
      <BrowserRouter>
        <Recipe recipe={mockRecipe} {...props} />
      </BrowserRouter>
    );
  };

  it("renders recipe card with all elements", () => {
    renderRecipe();

    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText("30 mins")).toBeInTheDocument();
    expect(screen.getByText("Servings: 4")).toBeInTheDocument();
    expect(screen.getByText("Vegan")).toBeInTheDocument();
    expect(screen.getByText("Vegetarian")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Recipe" })
    ).toBeInTheDocument();
  });

  it("renders recipe image correctly", () => {
    renderRecipe();

    const image = screen.getByAltText("Test Recipe");
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("shows fallback when no image is provided", () => {
    renderRecipe({
      recipe: { ...mockRecipe, image: "" },
    });

    expect(screen.getByText("No image available")).toBeInTheDocument();
  });

  it("toggles favorite state when clicking favorite button", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    renderRecipe();

    const favoriteButton = screen.getByRole("button", {
      name: "Add to favorites",
    });
    fireEvent.click(favoriteButton);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/user/favorite"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          ID: "test-user-id",
        }),
        body: JSON.stringify(mockRecipe),
      })
    );
  });

  it("shows alert when trying to favorite without being logged in", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const mockAlert = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderRecipe();

    const favoriteButton = screen.getByRole("button", {
      name: "Add to favorites",
    });
    fireEvent.click(favoriteButton);

    expect(mockAlert).toHaveBeenCalledWith(
      "Please sign in to use this feature."
    );
    expect(mockFetch).not.toHaveBeenCalled();

    mockAlert.mockRestore();
  });

  it("handles favorite API error gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve("API Error"),
    });
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderRecipe();

    const favoriteButton = screen.getByRole("button", {
      name: "Add to favorites",
    });
    await fireEvent.click(favoriteButton);

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it("renders with initial favorite state", () => {
    renderRecipe({ initialFavorited: true });

    expect(
      screen.getByRole("button", { name: "Remove from favorites" })
    ).toBeInTheDocument();
  });
});
