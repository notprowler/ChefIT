import { FaUtensils } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

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
}

function Recipe({ recipe }: RecipeProps) {
  return (
    <div className="border rounded-lg shadow-md flex flex-col h-[500px]">
      <div className="h-[250px] overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between h-[250px]">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold line-clamp-2">{recipe.title}</h3>
          </div>
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
              <p>
                {recipe.vegan ? (
                  <span className="border rounded-lg px-2">Vegan</span>
                ) : (
                  ""
                )}
              </p>
              <p>
                {recipe.vegetarian ? (
                  <span className="border rounded-lg px-2">Vegetarian</span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className="px-4 py-2 bg-orange-400 rounded-lg w-full">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
