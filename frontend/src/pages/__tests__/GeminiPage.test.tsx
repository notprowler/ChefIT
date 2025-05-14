import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GeminiPage from "../GeminiPage";
import { analyzeImage } from "@/services/geminiService";
import { toast } from "react-hot-toast";

// Mock the services and dependencies
vi.mock("@/services/geminiService", () => ({
  analyzeImage: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("GeminiPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderGeminiPage = () => {
    return render(
      <BrowserRouter>
        <GeminiPage />
      </BrowserRouter>
    );
  };

  it("renders the page with all elements", () => {
    renderGeminiPage();

    expect(screen.getByText("Food Image Analysis")).toBeInTheDocument();
    expect(screen.getByText("Click to upload an image")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Analyze Image" })
    ).toBeInTheDocument();
    expect(screen.getByText("Analysis Results")).toBeInTheDocument();
  });

  it("handles file selection and preview", async () => {
    renderGeminiPage();

    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const input = screen.getByLabelText("Click to upload an image");

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("test.jpg")).toBeInTheDocument();
    });
  });

  it("handles successful image analysis", async () => {
    const mockAnalysis = {
      ingredients: ["tomato", "onion", "garlic"],
      recipes: [
        {
          id: 1,
          title: "Test Recipe",
          image: "test.jpg",
          usedIngredientCount: 2,
          missedIngredientCount: 1,
        },
      ],
    };

    (analyzeImage as any).mockResolvedValueOnce(mockAnalysis);

    renderGeminiPage();

    // Upload file
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const input = screen.getByLabelText("Click to upload an image");
    fireEvent.change(input, { target: { files: [file] } });

    // Click analyze
    const analyzeButton = screen.getByRole("button", { name: "Analyze Image" });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(analyzeImage).toHaveBeenCalledWith(file);
      expect(toast.success).toHaveBeenCalledWith(
        "Image analyzed successfully!"
      );
    });

    // Check if results are displayed
    expect(screen.getByText("Detected Ingredients")).toBeInTheDocument();
    expect(screen.getByText("Suggested Recipes")).toBeInTheDocument();
    expect(screen.getByText("tomato")).toBeInTheDocument();
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
  });

  it("handles failed image analysis", async () => {
    (analyzeImage as any).mockRejectedValueOnce(new Error("Analysis failed"));

    renderGeminiPage();

    // Upload file
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const input = screen.getByLabelText("Click to upload an image");
    fireEvent.change(input, { target: { files: [file] } });

    // Click analyze
    const analyzeButton = screen.getByRole("button", { name: "Analyze Image" });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to analyze image");
    });
  });

  it("shows loading state during analysis", async () => {
    (analyzeImage as any).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderGeminiPage();

    // Upload file
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const input = screen.getByLabelText("Click to upload an image");
    fireEvent.change(input, { target: { files: [file] } });

    // Click analyze
    const analyzeButton = screen.getByRole("button", { name: "Analyze Image" });
    fireEvent.click(analyzeButton);

    expect(screen.getByText("Analyzing...")).toBeInTheDocument();
  });
});
