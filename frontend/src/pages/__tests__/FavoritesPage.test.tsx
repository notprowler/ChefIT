import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FavoritesPage from "../favoritePage";

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

describe("FavoritesPage", () => {
  const mockRecipes = [
    {
      id: 1,
      title: "Recipe 1",
      image: "image1.jpg",
      readyInMinutes: 30,
      servings: 4,
      vegan: true,
      vegetarian: true,
      glutenFree: false,
      dairyFree: true,
    },
    {
      id: 2,
      title: "Recipe 2",
      image: "image2.jpg",
      readyInMinutes: 45,
      servings: 6,
      vegan: false,
      vegetarian: true,
      glutenFree: true,
      dairyFree: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        user: { id: "test-user-id" },
      })
    );
  });

  const renderFavoritesPage = () => {
    return render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );
  };

  it("renders loading state initially", () => {
    renderFavoritesPage();
    expect(screen.getByText("Loading favorites…")).toBeInTheDocument();
  });

  it("shows error when user is not logged in", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderFavoritesPage();

    await waitFor(() => {
      expect(
        screen.getByText(/Please sign in to view favorites/i)
      ).toBeInTheDocument();
    });
  });

  it("displays favorite recipes when loaded successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ recipes: mockRecipes }),
    });

    renderFavoritesPage();

    await waitFor(() => {
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
      expect(screen.getByText("Recipe 2")).toBeInTheDocument();
    });
  });

  it("shows empty state when no favorites exist", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ recipes: [] }),
    });

    renderFavoritesPage();

    await waitFor(() => {
      expect(
        screen.getByText(/You haven't favorited any recipes yet/i)
      ).toBeInTheDocument();
    });
  });

  it("handles filter toggle", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ recipes: mockRecipes }),
    });

    renderFavoritesPage();

    await waitFor(() => {
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    });

    const filterButton = screen.getByText("Show Filters");
    fireEvent.click(filterButton);

    expect(screen.getByText("Hide Filters")).toBeInTheDocument();
    expect(screen.getByText("Dietary Preferences")).toBeInTheDocument();
  });

  it("filters recipes based on dietary preferences", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ recipes: mockRecipes }),
    });

    renderFavoritesPage();

    await waitFor(() => {
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    });

    // Open filters
    fireEvent.click(screen.getByText("Show Filters"));

    // Enable vegan filter
    const veganCheckbox = screen.getByLabelText("vegan");
    fireEvent.click(veganCheckbox);

    // Should only show Recipe 1 (vegan)
    expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    expect(screen.queryByText("Recipe 2")).not.toBeInTheDocument();
  });

  it("resets filters when clear filters is clicked", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ recipes: mockRecipes }),
    });

    renderFavoritesPage();

    await waitFor(() => {
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    });

    // Open filters
    fireEvent.click(screen.getByText("Show Filters"));

    // Enable vegan filter
    const veganCheckbox = screen.getByLabelText("vegan");
    fireEvent.click(veganCheckbox);

    // Clear filters
    fireEvent.click(screen.getByText("Clear Filters"));

    // Should show all recipes again
    expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    expect(screen.getByText("Recipe 2")).toBeInTheDocument();
  });

  it("handles API error gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API Error"));
    renderFavoritesPage();

    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/i)).toBeInTheDocument();
    });
  });
});
