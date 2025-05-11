export interface GeminiResponse {
  ingredients: string[];
  recipes: Array<{
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Array<{
      id: number;
      amount: number;
      unit: string;
      unitLong: string;
      unitShort: string;
      aisle: string;
      name: string;
      original: string;
      originalName: string;
      meta: string[];
      image: string;
    }>;
    usedIngredients: Array<{
      id: number;
      amount: number;
      unit: string;
      unitLong: string;
      unitShort: string;
      aisle: string;
      name: string;
      original: string;
      originalName: string;
      meta: string[];
      image: string;
    }>;
    unusedIngredients: Array<{
      id: number;
      amount: number;
      unit: string;
      unitLong: string;
      unitShort: string;
      aisle: string;
      name: string;
      original: string;
      originalName: string;
      meta: string[];
      image: string;
    }>;
    likes: number;
  }>;
}

export async function analyzeImage(file: File): Promise<GeminiResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/gemini/analyze-image', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type header, let the browser set it with the boundary
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || 'Failed to analyze image');
  }

  return response.json();
}
