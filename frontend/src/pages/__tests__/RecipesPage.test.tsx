import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import RecipesPage from "../RecipesPage";
import { BrowserRouter } from "react-router-dom";

// Mock the Navbar component
vi.mock("@/components/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar Mock</div>,
}));

// Mock Recipe component
vi.mock("../components/Recipe", () => ({
  default: ({ recipe }: { recipe: any }) => (
    <div data-testid={`recipe-${recipe.id}`}>{recipe.title}</div>
  ),
}));

// Mock sample recipes data
const mockRecipes = {
  recipes: [
    {
      id: 1,
      title: "Vegan Pasta",
      image: "pasta.jpg",
      readyInMinutes: 30,
      servings: 4,
      vegan: true,
      vegetarian: true,
      glutenFree: false,
      dairyFree: true,
    },
    {
      id: 2,
      title: "Chicken Curry",
      image: "curry.jpg",
      readyInMinutes: 45,
      servings: 6,
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      dairyFree: false,
    },
    {
      id: 3,
      title: "Gluten-free Pizza",
      image: "pizza.jpg",
      readyInMinutes: 60,
      servings: 2,
      vegan: false,
      vegetarian: true,
      glutenFree: true,
      dairyFree: false,
    },
  ],
};

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockRecipes),
  })
) as any;

const renderRecipesPage = () => {
  return render(
    <BrowserRouter>
      <RecipesPage />
    </BrowserRouter>
  );
};

describe("RecipesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    renderRecipesPage();
    expect(screen.getByText("Loading recipes...")).toBeInTheDocument();
  });

  it("renders recipes after loading", async () => {
    renderRecipesPage();
    await waitFor(() => {
      expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Vegan Pasta")).toBeInTheDocument();
    expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
    expect(screen.getByText("Gluten-free Pizza")).toBeInTheDocument();
  });

  it("toggles filter dropdown when clicking filter button", async () => {
    renderRecipesPage();
    await waitFor(() => {
      expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
    });

    const filterButton = screen.getByText("Show Filters");
    fireEvent.click(filterButton);
    expect(screen.getByText("Dietary Preferences")).toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.queryByText("Dietary Preferences")).not.toBeInTheDocument();
  });

  it("filters recipes based on dietary preferences", async () => {
    renderRecipesPage();
    await waitFor(() => {
      expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
    });

    // Open filters
    fireEvent.click(screen.getByText("Show Filters"));

    // Check vegan filter
    const veganCheckbox = screen.getByLabelText("Vegan");
    fireEvent.click(veganCheckbox);

    // Should only show vegan recipes
    expect(screen.getByText("Vegan Pasta")).toBeInTheDocument();
    expect(screen.queryByText("Chicken Curry")).not.toBeInTheDocument();
    expect(screen.queryByText("Gluten-free Pizza")).not.toBeInTheDocument();
  });

  it("filters recipes based on cooking time", async () => {
    renderRecipesPage();
    await waitFor(() => {
      expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
    });

    // Open filters
    fireEvent.click(screen.getByText("Show Filters"));

    // Set max cooking time to 40 minutes
    const timeSlider = screen.getByRole("slider");
    fireEvent.change(timeSlider, { target: { value: 40 } });

    // Should only show recipes with cooking time <= 40 minutes
    expect(screen.getByText("Vegan Pasta")).toBeInTheDocument();
    expect(screen.queryByText("Chicken Curry")).not.toBeInTheDocument();
    expect(screen.queryByText("Gluten-free Pizza")).not.toBeInTheDocument();
  });

  //   it("filters recipes based on minimum servings", async () => {
  //     renderRecipesPage();
  //     await waitFor(() => {
  //       expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
  //     });

  //     // Open filters
  //     fireEvent.click(screen.getByText("Show Filters"));

  //     // Set minimum servings to 5
  //     const servingsInput = screen.getByRole("spinbutton", {
  //       name: /minimum servings/i,
  //     });
  //     fireEvent.change(servingsInput, { target: { value: 5 } });

  //     // Should only show recipes with servings >= 5
  //     expect(screen.queryByText("Vegan Pasta")).not.toBeInTheDocument();
  //     expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
  //     expect(screen.queryByText("Gluten-free Pizza")).not.toBeInTheDocument();
  //   });

  it("resets filters when clicking clear filters button", async () => {
    renderRecipesPage();
    await waitFor(() => {
      expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
    });

    // Open filters and apply some filters
    fireEvent.click(screen.getByText("Show Filters"));
    fireEvent.click(screen.getByLabelText("Vegan"));

    // Clear filters
    const clearButton = screen.getByText("Clear Filters");
    fireEvent.click(clearButton);

    // Should show all recipes again
    expect(screen.getByText("Vegan Pasta")).toBeInTheDocument();
    expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
    expect(screen.getByText("Gluten-free Pizza")).toBeInTheDocument();
  });

  it("shows correct results count", async () => {
    renderRecipesPage();
    await waitFor(() => {
      expect(screen.queryByText("Loading recipes...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Showing 3 of 3 recipes")).toBeInTheDocument();

    // Apply filter
    fireEvent.click(screen.getByText("Show Filters"));
    fireEvent.click(screen.getByLabelText("Vegan"));

    expect(screen.getByText("Showing 1 of 3 recipes")).toBeInTheDocument();
  });
});
