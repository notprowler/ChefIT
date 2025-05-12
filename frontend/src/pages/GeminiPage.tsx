import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, Upload } from "lucide-react";
import { analyzeImage, type GeminiResponse } from "@/services/geminiService";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

export default function GeminiPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsLoading(true);
    try {
      const data = await analyzeImage(selectedFile);
      setAnalysis(data);
      toast.success("Image analyzed successfully!");
    } catch (error) {
      toast.error("Failed to analyze image");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Food Image Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-gray-600">
                    {selectedFile
                      ? selectedFile.name
                      : "Click to upload an image"}
                  </span>
                </label>
              </div>

              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>
          </Card>

          {/* Analysis Results */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            {analysis ? (
              <div className="space-y-6">
                {/* Ingredients Section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Detected Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.ingredients.map(
                      (ingredient: string, index: number) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Recipes Section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Suggested Recipes
                  </h3>
                  <div className="space-y-4">
                    {analysis.recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <Link to={`/recipes/${recipe.id}`}>
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </Link>
                          <div>
                            <h4 className="font-medium">{recipe.title}</h4>
                            <p className="text-sm text-gray-600">
                              Uses {recipe.usedIngredientCount} of your
                              ingredients
                            </p>
                            {recipe.missedIngredientCount > 0 && (
                              <p className="text-sm text-gray-600">
                                Missing {recipe.missedIngredientCount}{" "}
                                ingredients
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">
                Upload an image to see the analysis results
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
