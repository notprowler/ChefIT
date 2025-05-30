import { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import Navbar from "@/components/Navbar";
import IngredientSearchDropdown from "@/components/IngredientSearchDropdown";
import { useNavigate } from "react-router-dom";

interface RecipeType {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}

interface Filters {
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  maxTime: number | "";
  servings: number | "";
}

function RecipesPage() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
    maxTime: "",
    servings: "",
  });

  const isValidImageUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === "" || !url.startsWith("http")) return false;

    // Check if URL ends with a proper image extension
    const validExtensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
    const urlLower = url.toLowerCase();
    const lastDotIndex = urlLower.lastIndexOf(".");
    if (lastDotIndex === -1) return false;

    const extension = urlLower.slice(lastDotIndex);
    const hasValidExtension = validExtensions.has(extension);

    // Check if URL is complete (not truncated)
    const isCompleteUrl = !url.endsWith(".") && url.includes(".");

    return hasValidExtension && isCompleteUrl;
  };

  const searchRecipes = async (ingredients: string[]) => {
    if (!ingredients.length) return;
    setLoading(true);
    try {
      const query = ingredients.join(",");
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recipes/search-by-ingredients?ingredients=${query}`
      );
      const data: RecipeType[] = await response.json();
      // Filter out recipes with invalid images
      const validRecipes = Array.isArray(data)
        ? data.filter((recipe) => isValidImageUrl(recipe.image))
        : [];
      setRecipes(validRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/recipes`
        );
        const data = await response.json();
        // Filter out recipes with invalid images
        const validRecipes = data.recipes.filter((recipe: RecipeType) =>
          isValidImageUrl(recipe.image)
        );
        setRecipes(validRecipes);
        console.log(validRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    if (filters.vegan && !recipe.vegan) return false;
    if (filters.vegetarian && !recipe.vegetarian) return false;
    if (filters.glutenFree && !recipe.glutenFree) return false;
    if (filters.dairyFree && !recipe.dairyFree) return false;
    if (filters.maxTime && recipe.readyInMinutes > filters.maxTime)
      return false;
    if (filters.servings && recipe.servings < filters.servings) return false;
    return true;
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFilters((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value === ""
          ? ""
          : Number(value),
    }));
  };

  const resetFilters = () => {
    setFilters({
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      dairyFree: false,
      maxTime: "",
      servings: "",
    });
  };

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div className="pt-16">
      <Navbar />

      {/* Filter Button and Dropdown */}
      <div className="relative z-20 px-12 mb-4 mt-8 ">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              font-medium transition-all duration-200
              shadow-sm hover:shadow-md hover:cursor-pointer
              ${
                isFilterOpen
                  ? "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                  : "bg-orange-400 text-white hover:bg-black"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 transition-transform duration-200 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
          <div className="relative z-20">
          <IngredientSearchDropdown onSearch={searchRecipes} />
          </div>
          <button
            onClick={() => navigate("/favorite")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              font-medium transition-all duration-200
              shadow-sm hover:shadow-md hover:cursor-pointer
              bg-orange-400 text-white hover:bg-black
            `}
          >
            Favorites
          </button>
          {(filters.vegan ||
            filters.vegetarian ||
            filters.glutenFree ||
            filters.dairyFree ||
            filters.maxTime ||
            filters.servings) && (
            <button
              onClick={resetFilters}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-gray-600 hover:text-gray-900
                hover:bg-gray-100
                transition-all duration-200
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div
            className="
            absolute top-full left-0 mt-2 w-full max-w-2xl
            bg-white rounded-lg shadow-lg p-6 z-10
            border border-gray-100
            transform transition-all duration-200 ease-out
          "
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
            <div className="space-y-6">
              {/* Dietary Preferences Section */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 mb-2">
                  Dietary Preferences
                </h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="vegan"
                      name="vegan"
                      checked={filters.vegan}
                      onChange={handleFilterChange}
                      className="
                        w-4 h-4 text-blue-500 
                        rounded border-gray-300
                        focus:ring-blue-500
                        transition-colors duration-200
                      "
                    />
                    <label htmlFor="vegan" className="ml-2 text-gray-700">
                      Vegan
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="vegetarian"
                      name="vegetarian"
                      checked={filters.vegetarian}
                      onChange={handleFilterChange}
                      className="
                        w-4 h-4 text-blue-500 
                        rounded border-gray-300
                        focus:ring-blue-500
                        transition-colors duration-200
                      "
                    />
                    <label htmlFor="vegetarian" className="ml-2 text-gray-700">
                      Vegetarian
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="glutenFree"
                      name="glutenFree"
                      checked={filters.glutenFree}
                      onChange={handleFilterChange}
                      className="
                        w-4 h-4 text-blue-500 
                        rounded border-gray-300
                        focus:ring-blue-500
                        transition-colors duration-200
                      "
                    />
                    <label htmlFor="glutenFree" className="ml-2 text-gray-700">
                      Gluten Free
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dairyFree"
                      name="dairyFree"
                      checked={filters.dairyFree}
                      onChange={handleFilterChange}
                      className="
                        w-4 h-4 text-blue-500 
                        rounded border-gray-300
                        focus:ring-blue-500
                        transition-colors duration-200
                      "
                    />
                    <label htmlFor="dairyFree" className="ml-2 text-gray-700">
                      Dairy Free
                    </label>
                  </div>
                </div>
              </div>

              {/* Cooking Time Section */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 mb-2">
                  Maximum Cooking Time
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    id="maxTime"
                    name="maxTime"
                    value={filters.maxTime || 0}
                    onChange={handleFilterChange}
                    className="
                      w-full h-2 bg-gray-200 rounded-lg appearance-none 
                      cursor-pointer accent-orange-400
                    "
                    min="0"
                    max="180"
                    step="15"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 min</span>
                    <span>{filters.maxTime || 0} min</span>
                    <span>180 min</span>
                  </div>
                </div>
              </div>

              {/* Servings Section */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 mb-2">
                  Minimum Servings
                </h3>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={filters.servings}
                  onChange={handleFilterChange}
                  className="
                    border border-gray-300 rounded-md
                    px-3 py-1.5 w-24
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all duration-200
                    text-gray-700
                  "
                  min="1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="px-12 mb-4">
        <p className="text-gray-600">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
        {filteredRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;
