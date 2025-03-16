import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="pt-16">
      <Navbar />
      <h1>Chef it home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/recipes" className="text-lg font-bold">
              Recipes
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
