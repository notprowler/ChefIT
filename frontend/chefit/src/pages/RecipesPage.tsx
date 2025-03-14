import { Link } from "react-router-dom";

function RecipesPage() {
  return (
    <div>
      <h1>Recipes</h1>
      <p className="italic">Here you'll find all your favorite recipes!</p>
      <h3>
        <Link to="/">home</Link>
      </h3>
    </div>
  );
}

export default RecipesPage;
