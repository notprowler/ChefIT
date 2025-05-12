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

function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // 1) Fetch the list of favorite recipe IDs for the current user
        // const raw = localStorage.getItem("sb-…-auth-token");
        // const { user } = JSON.parse(raw!);
        // const resFav = await fetch(
        //   `${import.meta.env.VITE_BACKEND_URL}/user/favorite`,
        //   { headers: { ID: user.id } }
        // );
        // const { favorites } = await resFav.json();
        // setFavoriteIds(favorites);

        // 2) Fetch full recipe details in bulk (once you have the IDs)
        // if (favorites.length) {
        //   const idsParam = favoriteIds.join(",");
        //   const resRecipes = await fetch(
        //     `${import.meta.env.VITE_BACKEND_URL}/recipes?ids=${idsParam}`
        //   );
        //   const data = await resRecipes.json();
        //   setRecipes(data.recipes);
        // }

      } catch (err) {
        console.error("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="pt-16 px-12">Loading favorites...</div>;

  return (
    <div className="pt-16">
      <Navbar />
      <div className="px-12 mt-8 mb-4">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        {favoriteIds.length === 0 && (
          <p className="mt-2 text-gray-600">
            You haven't favorited any recipes yet.
          </p>
        )}
      </div>

      {favoriteIds.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
