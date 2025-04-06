import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css"
import RecipesPage from "./pages/RecipesPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path ="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
