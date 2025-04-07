import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe";

interface RecipeType {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegan: boolean;
  vegetarian: boolean;
}

const FeaturedRecipesSection = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/recipes`
        );
        const data = await response.json();
        setRecipes(data.recipes.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  if (loading) return <div>Loading featured recipes...</div>;

  return (
    <section className="px-8 py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
              Inspiration
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              Featured Recipes
            </h2>
            <p className="text-gray-600 text-md">
              Discover our most popular recipes loved by our community
            </p>
          </div>
          <div>
            <Link
              to="/recipes"
              className="text-orange-500 font-semibold flex items-center gap-1 hover:underline"
            >
              View all recipes →
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipesSection;
