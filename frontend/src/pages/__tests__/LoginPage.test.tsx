import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import { signIn } from "@/services/authService";

// Mock the auth service
vi.mock("@/services/authService", () => ({
  signIn: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  it("renders login form with all elements", () => {
    renderLoginPage();

    expect(screen.getByText("ChefIT")).toBeInTheDocument();
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("handles form submission with valid credentials", async () => {
    (signIn as any).mockResolvedValueOnce({ error: null });
    renderLoginPage();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    await fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(signIn).toHaveBeenCalledWith("test@example.com", "password123");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles form submission with invalid credentials", async () => {
    const errorMessage = "Invalid credentials";
    (signIn as any).mockResolvedValueOnce({ error: { message: errorMessage } });
    renderLoginPage();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(signIn).toHaveBeenCalledWith("test@example.com", "wrongpassword");
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("has working navigation links", () => {
    renderLoginPage();

    const signUpLink = screen.getByText("Sign up");
    const homeLink = screen.getByText("Home");

    expect(signUpLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });
});
