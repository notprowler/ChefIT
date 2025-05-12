import { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import Navbar from "@/components/Navbar";

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

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
    maxTime: "",
    servings: "",
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1) grab Supabase token from localStorage
        const raw = localStorage.getItem(
          "sb-wnxtjmenkanydqmuvmjj-auth-token"
        );
        if (!raw) throw new Error("Please sign in to view favorites.");

        const { user } = JSON.parse(raw);
        const userId: string = user.id;

        // 2) call your new GET /user/favorite endpoint
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/favorite`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ID: userId,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch favorites");
        }

        const data = await res.json() as {
          user_id: string;
          recipes: RecipeType[];
        };

        setRecipes(data.recipes);
      } catch (e: any) {
        console.error("Error fetching favorites:", e);
        setError(e.message || "Unknown error");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

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

  if (loading) return <div className="pt-16 px-12">Loading favorites…</div>;
  if (error)
    return (
      <div className="pt-16 px-12 text-red-600">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="pt-16">
      <Navbar />

      <div className="px-12 mt-8 mb-4">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        {recipes.length === 0 && (
          <p className="mt-2 text-gray-600">
            You haven't favorited any recipes yet.
          </p>
        )}
      </div>

      {recipes.length > 0 && (
        <>
          {/* Filter bar */}
          <div className="relative px-12 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen((o) => !o)}
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
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
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
                  Clear Filters
                </button>
              )}
            </div>

            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 z-10 border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Filters
                </h2>
                <div className="space-y-6">
                  {/* Dietary */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Dietary Preferences
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        "vegan",
                        "vegetarian",
                        "glutenFree",
                        "dairyFree",
                      ].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name={opt}
                            checked={(filters as any)[opt]}
                            onChange={handleFilterChange}
                            className="w-4 h-4 text-blue-500 rounded border-gray-300"
                          />
                          <span className="text-gray-700 capitalize">
                            {opt.replace(/([A-Z])/g, " $1")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Max Time */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Maximum Cooking Time
                    </h3>
                    <input
                      type="range"
                      name="maxTime"
                      min={0}
                      max={180}
                      step={15}
                      value={filters.maxTime || 0}
                      onChange={handleFilterChange}
                      className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-orange-400"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0</span>
                      <span>{filters.maxTime || 0} mins</span>
                      <span>180</span>
                    </div>
                  </div>

                  {/* Servings */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Minimum Servings
                    </h3>
                    <input
                      type="number"
                      name="servings"
                      min={1}
                      value={filters.servings}
                      onChange={handleFilterChange}
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-24 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="px-12 mb-4">
            <p className="text-gray-600">
              Showing {filteredRecipes.length} of {recipes.length} favorites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
            {filteredRecipes.map((r) => (
              <Recipe key={r.id} recipe={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
