import { Route, Routes } from "react-router-dom";
import "./App.css";
import RecipesPage from "./pages/RecipesPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IndividualRecipePage from "./pages/IndividualRecipePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recipes/:id" element={<IndividualRecipePage />} />
    </Routes>
  );
}

export default App;
