import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";

// Mock the Navbar component since we're only testing HomePage
vi.mock("@/components/Navbar", () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>,
}));

// Define the type for the mocked fetch
type MockedFetch = typeof fetch & {
  mockClear: () => void;
  mockImplementation: (fn: (...args: any[]) => any) => void;
};

// Mock fetch globally
const mockFetch = vi.fn() as unknown as MockedFetch;
vi.stubGlobal("fetch", mockFetch);

describe("HomePage", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve([
            { id: 1, title: "Mock Recipe 1" },
            { id: 2, title: "Mock Recipe 2" },
            { id: 3, title: "Mock Recipe 3" },
          ]),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  it("renders the homepage title", async () => {
    await act(async () => {
      renderHomePage();
    });
    expect(screen.getByText(/Cook Amazing Meals/i)).toBeInTheDocument();
  });

  it("renders the navbar component", async () => {
    await act(async () => {
      renderHomePage();
    });
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
  });

  it("renders the recipes link", async () => {
    await act(async () => {
      renderHomePage();
    });
    const recipesLink = await screen.findByRole("link", { name: /Find Recipes/i });
    expect(recipesLink).toBeInTheDocument();
    expect(recipesLink).toHaveAttribute("href", "/recipes");
  });
});