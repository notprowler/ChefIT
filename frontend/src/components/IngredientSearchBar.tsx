import React, { useState } from "react";

interface IngredientSearchBarProps {
  onSearch: (ingredients: string[]) => void;
}

const IngredientSearchBar: React.FC<IngredientSearchBarProps> = ({
  onSearch,
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Add a new ingredient to the list
  const handleAddIngredient = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || ingredients.includes(trimmedValue.toLowerCase())) return;
    setIngredients((prev) => [...prev, trimmedValue.toLowerCase()]);
    setInputValue("");
  };

  // Remove an ingredient by its index
  const handleDeleteIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSearchRecipes = () => {
    onSearch(ingredients);
  };
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      {/* Header */}
      <h1 className="mb-2 text-2xl font-bold text-orange-400">
        What&apos;s in your fridge?
      </h1>
      <p className="mb-4 text-gray-700">
        Enter the ingredients you have and we&apos;ll find recipes you can make.
      </p>

      {/* Add Ingredient Section */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add an ingredient (e.g. chicken, tomatoes, rice)"
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleAddIngredient}
          className="rounded bg-orange-400 px-4 py-2 text-sm font-medium text-white
                     hover:bg-orange-500 focus:outline-none focus:ring-2
                     focus:ring-orange-400 focus:ring-offset-2"
        >
          + Add
        </button>
      </div>

      {/* Display Ingredient List */}
      {ingredients.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No ingredients added yet.</p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center rounded bg-orange-100 px-3 py-1 text-sm text-orange-800"
            >
              {ingredient}
              <button
                onClick={() => handleDeleteIngredient(index)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Remove ${ingredient}`}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Search Recipes Button */}
      <button
        onClick={handleSearchRecipes}
        className="mt-6 w-full rounded bg-orange-400 py-3 text-base font-semibold text-white
                   hover:bg-orange-500 focus:outline-none focus:ring-2
                   focus:ring-orange-400 focus:ring-offset-2"
      >
        Find Recipes
      </button>
    </div>
  );
};

export default IngredientSearchBar;
