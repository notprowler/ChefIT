import { useLocation, Link } from "react-router-dom";

function IndividualRecipePage() {
  const { state } = useLocation();
  const recipe = state?.recipe;

  if (!recipe) {
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        ❌ Recipe not found.
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 lg:px-16">
      <Link to="/recipes" className="text-orange-500 hover:underline text-sm mb-4 block">
        ← Back to Recipes
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Tags */}
          <div className="flex gap-2">
            {recipe.vegetarian && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">vegetarian</span>}
            {recipe.vegan && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">vegan</span>}
            {recipe.glutenFree && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">gluten-free</span>}
          </div>

          {/* Title + Meta Info */}
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <p>⏱ <strong>Prep Time:</strong> {recipe.readyInMinutes || "N/A"} min</p>
            <p>🍽 <strong>Servings:</strong> {recipe.servings}</p>
            <p>⭐ <strong>Rating:</strong> 4.8 (124 reviews)</p> {/* Static for now */}
            <p>🎯 <strong>Difficulty:</strong> Easy</p> {/* You can replace this if you have real difficulty data */}
          </div>

          {/* Image */}
          <div className="flex justify-left">
            {recipe.image ? (
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full max-w-[600px] h-[400px] md:h-[500px] object-cover aspect-[4/3] rounded-2xl shadow-2xl"
            />
            ) : (
            <div className="w-full max-w-[600px] h-[400px] md:h-[500px] object-cover aspect-[4/3] rounded-2xl shadow-2xl>
            <p className="text-gray-500">No image available</p>
            </div>
         )}
        </div>



          {/* Summary */}
          {recipe.summary && (
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div>
              <h2 className="text-2xl font-bold mt-6 mb-2">📋 Instructions</h2>
              <div className="space-y-4">
                {recipe.instructions
                  .split('. ')
                  .filter((step: string) => step.length > 0)
                  .map((step: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-white bg-orange-500 rounded-full h-6 w-6 text-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-gray-800">{step.trim()}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[300px] bg-gray-50 border rounded-xl p-4 space-y-4 h-fit shadow-sm">
          <h3 className="text-lg font-semibold">🍲 Ingredients</h3>
          <p className="text-sm text-gray-500">{recipe.servings} servings</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm">
            {recipe.extendedIngredients?.map((ing: any, idx: number) => (
              <li key={idx}>
                {ing.original || `${ing.amount} ${ing.unit} ${ing.name}`}
              </li>
            ))}
          </ul>

          <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm">
            Add All to Shopping List
          </button>
        </aside>
      </div>
    </div>
  );
}

export default IndividualRecipePage;
