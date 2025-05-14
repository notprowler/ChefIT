import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import IndividualRecipePage from "../IndividualRecipePage";

const mockRecipe = {
  id: 1,
  title: "Test Recipe",
  image: "test-image.jpg",
  readyInMinutes: 30,
  servings: 4,
  vegan: true,
  vegetarian: true,
  glutenFree: false,
  summary: "<p>Test summary</p>",
  instructions: "Step 1. Do this. Step 2. Do that.",
  extendedIngredients: [
    { name: "Ingredient 1", amount: 2, unit: "cups" },
    { name: "Ingredient 2", amount: 1, unit: "tbsp" },
  ],
  spoonacularScore: 80,
  aggregateLikes: 100,
};

describe("IndividualRecipePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderRecipePage = (recipe = mockRecipe) => {
    return render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/recipes/1",
            state: { recipe },
          },
        ]}
      >
        <Routes>
          <Route path="/recipes/:id" element={<IndividualRecipePage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders recipe details correctly", () => {
    renderRecipePage();

    expect(screen.getByTestId("recipe-title")).toHaveTextContent("Test Recipe");
    expect(screen.getByTestId("recipe-image")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
    expect(screen.getByText("vegetarian")).toBeInTheDocument();
    expect(screen.getByText("vegan")).toBeInTheDocument();
  });

  it("shows recipe summary", () => {
    renderRecipePage();

    expect(screen.getByText("Test summary")).toBeInTheDocument();
  });

  it("shows ingredients list", () => {
    renderRecipePage();

    expect(screen.getByText("Ingredients")).toBeInTheDocument();
    expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
    expect(screen.getByText("2 cups")).toBeInTheDocument();
    expect(screen.getByText("Ingredient 2")).toBeInTheDocument();
    expect(screen.getByText("1 tbsp")).toBeInTheDocument();
  });

  it("handles missing recipe data", () => {
    render(
      <MemoryRouter>
        <IndividualRecipePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Recipe not found.")).toBeInTheDocument();
  });

  it("handles missing image", () => {
    renderRecipePage({ ...mockRecipe, image: "" });

    expect(screen.getByText("No image available")).toBeInTheDocument();
  });

  it("shows nutrition information", () => {
    renderRecipePage();

    expect(screen.getByText("Nutrition Information")).toBeInTheDocument();
    expect(screen.getByText("Calories")).toBeInTheDocument();
    expect(screen.getByText("Protein")).toBeInTheDocument();
    expect(screen.getByText("Fat")).toBeInTheDocument();
    expect(screen.getByText("Carbs")).toBeInTheDocument();
    expect(screen.getByText("Fiber")).toBeInTheDocument();
  });

  it("has working navigation links", () => {
    renderRecipePage();

    const backLink = screen.getByText("← Back to Recipes");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/recipes");
  });

  it("handles print functionality", () => {
    const mockPrint = vi.spyOn(window, "print").mockImplementation(() => {});
    renderRecipePage();

    const printButton = screen.getByTitle("Print this page");
    fireEvent.click(printButton);

    expect(mockPrint).toHaveBeenCalled();
    mockPrint.mockRestore();
  });
});
