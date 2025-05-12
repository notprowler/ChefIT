import { FaUtensils } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    vegan: boolean;
    vegetarian: boolean;
  };
  initialFavorited?: boolean;    // ← new
}

function Recipe({ recipe, initialFavorited = false }: RecipeProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const toggleFavorite = async () => {
    setFavorited((prev) => !prev);

    // 1) ensure user is signed in
    const raw = localStorage.getItem("sb-wnxtjmenkanydqmuvmjj-auth-token");
    if (!raw) {
      alert("Please sign in to use this feature.");
      setFavorited((prev) => !prev);
      return;
    }
    const { user } = JSON.parse(raw);
    const userId: string = user.id;

    // 2) send the full recipe object to backend
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ID: userId,
          },
          body: JSON.stringify(recipe),
        }
      );

      if (!res.ok) {
        // revert if error
        setFavorited((prev) => !prev);
        const err = await res.text();
        console.error("Favorite API error:", err);
      }
    } catch (e) {
      setFavorited((prev) => !prev);
      console.error("Failed to toggle favorite:", e);
    }
  };

  return (
    <div className="relative border rounded-lg shadow-md flex flex-col h-[500px]">
      {/* Favorite button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 p-1 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100"
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        {favorited ? (
          <FaHeart className="w-6 h-6 text-red-500" />
        ) : (
          <FaRegHeart className="w-6 h-6 text-gray-500" />
        )}
      </button>

      {/* Image */}
      <div className="h-[250px] overflow-hidden rounded-t-lg">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[250px]">
        <div className="space-y-4">
          <h3 className="text-xl font-bold line-clamp-2">{recipe.title}</h3>

          <div className="space-y-2 flex flex-col justify-between">
            <div className="flex flex-row justify-start gap-2">
              <div className="flex flex-row items-center">
                <IoTime className="w-6" />
                <p>{recipe.readyInMinutes} mins</p>
              </div>
              <div className="flex flex-row items-center">
                <FaUtensils className="w-6" />
                <p>Servings: {recipe.servings}</p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              {recipe.vegan && (
                <p className="border rounded-lg px-2">Vegan</p>
              )}
              {recipe.vegetarian && (
                <p className="border rounded-lg px-2">Vegetarian</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <Link to={`/recipes/${recipe.id}`} state={{ recipe }}>
            <button className="bg-orange-400 w-full p-2 rounded-lg hover:cursor-pointer text-white hover:bg-black">
              View Recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
