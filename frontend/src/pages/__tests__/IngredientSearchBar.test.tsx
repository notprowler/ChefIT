import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import IngredientSearchBar from "@/components/IngredientSearchBar";

describe("IngredientSearchBar", () => {
  it("allows adding and removing ingredients and calls onSearch with the list", () => {
    const onSearch = vi.fn();
    render(<IngredientSearchBar onSearch={onSearch} />);

    // Initially, placeholder text shows no ingredients
    expect(
      screen.getByText(/no ingredients added yet/i)
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText(
      /add an ingredient/i
    );
    const addBtn = screen.getByRole("button", { name: /\+ add/i });

    // Add "tomato"
    fireEvent.change(input, { target: { value: "tomato" } });
    fireEvent.click(addBtn);
    expect(screen.getByText("tomato")).toBeInTheDocument();

    // Remove "tomato"
    const removeBtn = screen.getByLabelText("Remove tomato");
    fireEvent.click(removeBtn);
    expect(screen.queryByText("tomato")).toBeNull();

    // Add two more
    fireEvent.change(input, { target: { value: "chicken" } });
    fireEvent.click(addBtn);
    fireEvent.change(input, { target: { value: "rice" } });
    fireEvent.click(addBtn);

    // Click Find Recipes
    const findBtn = screen.getByRole("button", { name: /find recipes/i });
    fireEvent.click(findBtn);

    expect(onSearch).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledWith(["chicken", "rice"]);
  });
});
