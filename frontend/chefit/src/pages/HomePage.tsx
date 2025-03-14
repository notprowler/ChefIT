import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Chef it home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
