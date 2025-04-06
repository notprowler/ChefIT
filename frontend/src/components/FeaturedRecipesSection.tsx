import { FaClock, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const recipes = [
  {
    id: 1,
    title: "Vegetable Stir Fry",
    time: 30,
    servings: 4,
    tags: ["vegetarian", "vegan"],
  },
  {
    id: 2,
    title: "Chicken Avocado Wrap",
    time: 15,
    servings: 2,
    tags: ["high-protein"],
  },
  {
    id: 3,
    title: "Mediterranean Pasta Salad",
    time: 25,
    servings: 6,
    tags: ["vegetarian"],
  },
];

const FeaturedRecipesSection = () => {
  return (
    <section className="bg-green-50 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <span className="inline-block text-xs text-white bg-red-500 px-2 py-1 rounded-full font-semibold uppercase">
              Ingredients
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Featured Recipes</h2>
            <p className="text-sm text-gray-600">
              Discover our most popular recipes loved by our community
            </p>
          </div>
          <Link
            to="/recipes"
            className="text-sm text-orange-500 font-semibold hover:underline flex items-center gap-1"
          >
            View all recipes →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">[Image Placeholder]</p>
              </div>
              <div className="p-4 flex flex-col justify-between h-full space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    {recipe.title}
                  </h3>
                  <div className="flex text-sm text-gray-600 gap-4 mb-2">
                    <span className="flex items-center gap-1">
                      <FaClock className="w-4 h-4" /> {recipe.time} min
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUtensils className="w-4 h-4" /> {recipe.servings} servings
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs border rounded-full px-2 py-0.5 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                  View Recipe
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipesSection;
