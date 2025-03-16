import { render, screen, waitFor } from '@testing-library/react';
import RecipesPage from '../pages/RecipesPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import {
  jest,
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';

// Mock the fetch function
const mockFetch = (mockResponse) => {
  global.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockResponse));
};

// Mock the console.error to avoid polluting test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Helper function to render the component with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RecipesPage', () => {
  test('displays loading state initially', () => {
    // Mock a successful response
    mockFetch({
      ok: true,
      json: () => Promise.resolve({ recipes: [] }),
    });

    renderWithRouter(<RecipesPage />);
    expect(screen.getByText('Loading recipes...')).toBeInTheDocument();
  });

  test('handles API error gracefully when fetch fails', async () => {
    // Mock a network error
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('Network error')));

    renderWithRouter(<RecipesPage />);

    // Initially shows loading
    expect(screen.getByText('Loading recipes...')).toBeInTheDocument();

    // After API fails, loading should disappear and we should see an error message
    await waitFor(() => {
      expect(screen.queryByText('Loading recipes...')).not.toBeInTheDocument();
    });

    // Check that console.error was called with an error message
    expect(console.error).toHaveBeenCalled();

    // The component should show an error message
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(
      screen.getByText('Unable to load recipes. Please try again later.')
    ).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  test('handles server error responses (non-200 status codes)', async () => {
    // Mock a 500 server error
    mockFetch({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    renderWithRouter(<RecipesPage />);

    // Initially shows loading
    expect(screen.getByText('Loading recipes...')).toBeInTheDocument();

    // After API fails, loading should disappear and we should see an error message
    await waitFor(() => {
      expect(screen.queryByText('Loading recipes...')).not.toBeInTheDocument();
    });

    // Check that console.error was called with an error message
    expect(console.error).toHaveBeenCalled();

    // The component should show an error message
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(
      screen.getByText('Unable to load recipes. Please try again later.')
    ).toBeInTheDocument();
  });

  test('displays recipes when API call succeeds', async () => {
    // Mock a successful response with recipes
    mockFetch({
      ok: true,
      json: () =>
        Promise.resolve({
          recipes: [
            {
              id: 1,
              title: 'Test Recipe',
              image: 'test-image.jpg',
              readyInMinutes: 30,
              servings: 4,
              vegan: false,
              vegetarian: true,
            },
          ],
        }),
    });

    renderWithRouter(<RecipesPage />);

    // Initially shows loading
    expect(screen.getByText('Loading recipes...')).toBeInTheDocument();

    // After API succeeds, should show the recipe
    await waitFor(() => {
      expect(screen.queryByText('Loading recipes...')).not.toBeInTheDocument();
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });

    // Should show the recipe grid and not the error message
    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
