import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  Clock4,
  Utensils,
  Star,
  ChefHat,
  Heart,
  Share2,
  Users2,
  Printer,
  ClipboardList,
} from "lucide-react";

/**
 * IndividualRecipePage – fixed syntax errors in Nutrition section
 * ------------------------------------------------
 * - Corrected variable names (`item` and `ietm` to `n`).
 * - Fixed template literal syntax in className attributes.
 * - Corrected JSX structure by fixing closing tags.
 */

const badgeCls =
  "inline-block rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs font-medium";

const btnPrimaryCls =
  "flex items-center justify-center gap-1 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm h-9 px-3 w-full";

const btnOutlineCls =
  "flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 text-gray-600 h-9 w-9";

function IndividualRecipePage() {
  const { state } = useLocation();
  const recipe = state?.recipe;
;

  if (!recipe) {
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        Recipe not found.
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="pt-20 px-4 lg:px-10 max-w-7xl mx-auto min-w-[52rem]">
        {/* ↖ Back link */}
        <Link
          to="/recipes"
          className="text-orange-500 hover:underline text-sm inline-block mb-4"
        >
          ← Back to Recipes
        </Link>

        {/* Title + meta */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {recipe.vegetarian && <span className={badgeCls}>vegetarian</span>}
            {recipe.vegan && <span className={badgeCls}>vegan</span>}
            {recipe.glutenFree && <span className={badgeCls}>gluten‑free</span>}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {recipe.title}
          </h1>

          <ul className="flex flex-wrap gap-8 text-sm text-gray-700">
            <li className="flex flex-col items-center text-center">
              <span className="text-xs text-gray-800 font-semibold mt-4">Prep Time</span>
              <span className="flex items-center gap-1">
                <Clock4 className="w-4 h-4 text-orange-500" /> {recipe.readyInMinutes || "N/A"} min
              </span>
            </li>
            <li className="flex flex-col items-center text-center mt-4">
              <span className="text-xs text-gray-800 font-semibold">Difficulty</span>
              <span className="flex items-center gap-1">
                <ChefHat className="w-4 h-4 text-orange-500" /> Easy
              </span>
            </li>
            <li className="flex flex-col items-center text-center mt-4">
              <span className="text-xs text-gray-800 font-semibold">Servings</span>
              <span className="flex items-center gap-1">
                <Users2 className="w-4 h-4 text-orange-500" /> {recipe.servings}
              </span>
            </li>
            <li className="flex flex-col items-center text-center mt-4">
              <span className="text-xs text-gray-800 font-semibold">Rating</span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-500" />
                {recipe.spoonacularScore
                  ? `${(recipe.spoonacularScore / 20).toFixed(1)} (${recipe.aggregateLikes || 0})`
                  : "N/A"}
              </span>
            </li>
          </ul>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-12">
          {/* MAIN COLUMN */}
          <article className="">
            {/* Hero image */}
            <div className="w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-md mb-8">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No image available
                </div>
              )}
            </div>

            {/* Summary */}
            {recipe.summary && (
              <div
                className="prose prose-sm max-w-none mb-10 text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            )}

            <hr className="mb-10 border-t border-gray-600" />

            {/* Instructions */}
            {recipe.instructions && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ClipboardList className="w-6 h-6 text-orange-500" /> Instructions
                </h2>
                <ol className="space-y-6">
                  {recipe.instructions
                    .split(/\.\s+/)
                    .filter(Boolean)
                    .map((step : string, i : number) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div className="text-gray-800">{step.trim()}</div>
                      </li>
                    ))}
                </ol>
              </section>
            )}

            <hr className="mb-10 border-t border-gray-600" />

            {/*Grid layout collapses if 5 columns are used*/}
            {/* Nutrition */}
            <section className="mb-20">
              <h2 className="text-2xl font-bold mb-6">Nutrition Information</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Calories", val: "220", color: "text-orange-600", bg: "bg-orange-100"},
                  { label: "Protein", val: "6g", color: "text-green-800", bg: "bg-green-100"},
                  { label: "Fat", val: "12g", color: "text-yellow-950", bg: "bg-yellow-100"},
                  { label: "Carbs", val: "24g", color: "text-blue-800", bg: "bg-blue-100"},
                  { label: "Fiber", val: "6g", color: "text-violet-800", bg: "bg-violet-100"},
                ].map((n, i) => (
                  <div key={i} className={`rounded-lg p-2 text-center shadow-sm ${n.bg}`}>
                    <p className={`text-2xl font-bold ${n.color}`}>{n.val}</p>
                    <p className={"text-gray-800"}>{n.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* Save / share / print */}
            <div className="flex gap-2">
              <button className={btnPrimaryCls}>
                <Heart className="w-4 h-4" /> Save
              </button>
              <button className={btnOutlineCls}>
                <Share2 className="w-5 h-5" />
              </button>
              <button
                className={btnOutlineCls}
                onClick={() => window.print()}
                title="Print this page"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>

            {/* Ingredients card */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-black-800 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  <span>Ingredients</span>
                </h3>
                <span className="text-sm bg-orange-500 text-white rounded-full px-3 py-1">
                  {recipe.servings} servings
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-800 max-h-[60vh] overflow-y-auto pr-1">
                {recipe.extendedIngredients?.map((ing, idx) => (
                  <li key={idx} className="flex justify-between gap-4">
                    <span className="truncate">{ing.name}</span>
                    <span className="whitespace-nowrap">
                      {ing.amount} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm">
                Add All to Shopping List
              </button>
            </div>

            {/* Suggestions */}
            <section>
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="space-y-6">
                {[
                  { title: "Thai Basil Tofu Stir-Fry", time: "25 min" },
                  { title: "Teriyaki Vegetable Noodles", time: "20 min" },
                  { title: "Spicy Szechuan Green Beans", time: "15 min" },
                ].map((card, i) => (
                  <div key={i} className="border rounded-lg p-4 shadow-sm bg-white">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-2" />
                    <p className="text-gray-800 font-semibold">{card.title}</p>
                    <p className="text-sm text-gray-500">{card.time}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default IndividualRecipePage;