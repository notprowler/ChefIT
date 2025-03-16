import { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';
import Navbar from '@/components/Navbar';
import { env } from '../utils/env';

interface RecipeType {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegan: boolean;
  vegetarian: boolean;
}

function RecipesPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${env.VITE_BACKEND_URL}/recipes`);
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setError(null);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Unable to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div className='pt-16'>
      <Navbar />
      {error ? (
        <div className='p-12 text-center' data-testid='error-message'>
          <p className='text-red-500 text-lg'>{error}</p>
          <button
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : (
        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12'
          data-testid='recipe-grid'
        >
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
