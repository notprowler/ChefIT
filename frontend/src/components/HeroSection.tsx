import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RecipeType {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegan: boolean;
  vegetarian: boolean;
}

const HeroSection = () => {
  const [randomRecipeImage, setRandomRecipeImage] = useState<string>("");

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/recipes`
        );
        const data = await response.json();
        const recipes: RecipeType[] = data.recipes;
        if (recipes.length > 0) {
          const randomIndex = Math.floor(Math.random() * recipes.length);
          const selectedRecipe = recipes[randomIndex];
          setRandomRecipeImage(selectedRecipe.image);
        }
      } catch (error) {
        console.error("Error fetching random recipe:", error);
      }
    };

    fetchRandomRecipe();
  }, []);

  return (
    <section
      id="hero"
      className="scroll-mt-20 bg-gradient-to-r from-orange-300 to-orange-200 py-24 px-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <span className="inline-block bg-orange-200 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
            Delicious Made Simple
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Cook Amazing Meals<br />
            with What You <span className="text-orange-500">Already Have</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-md">
            Enter your ingredients and discover personalized recipes tailored to what’s in your kitchen right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/recipes"
              className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 text-center w-full sm:w-auto"
            >
              Find Recipes
            </Link>
            <Link
              to="/signup"
              className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-100 text-center w-full sm:w-auto"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Right Side: Dynamic Image */}
        <div className="flex justify-center">
          {randomRecipeImage ? (
            <img
              src={randomRecipeImage}
              alt="Random Recipe"
              className="w-full max-w-[600px] h-[400px] md:h-[500px] lg:h-[500px] object-cover aspect-[4/3] rounded-2xl shadow-2xl"
            />
          ) : (
            <div className="w-full max-w-[600px] h-[400px] md:h-[500px] lg:h-[500px] bg-gray-200 flex items-center justify-center rounded-2xl shadow-2xl">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
