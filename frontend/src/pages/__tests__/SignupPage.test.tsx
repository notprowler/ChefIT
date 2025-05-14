import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupPage from "../SignupPage";
import { signUp } from "@/services/authService";

// Mock the auth service
vi.mock("@/services/authService", () => ({
  signUp: vi.fn(),
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

describe("SignupPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignupPage = () => {
    return render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>
    );
  };

  it("renders signup form with all elements", () => {
    renderSignupPage();

    expect(screen.getByText("ChefIT")).toBeInTheDocument();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  it("handles form submission with valid credentials", async () => {
    (signUp as any).mockResolvedValueOnce({ error: null });
    renderSignupPage();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    await fireEvent.click(
      screen.getByRole("button", { name: "Create Account" })
    );

    expect(signUp).toHaveBeenCalledWith("test@example.com", "password123");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("handles form submission with invalid credentials", async () => {
    const errorMessage = "Email already exists";
    (signUp as any).mockResolvedValueOnce({ error: { message: errorMessage } });
    renderSignupPage();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    expect(signUp).toHaveBeenCalledWith("existing@example.com", "password123");
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("has working navigation links", () => {
    renderSignupPage();

    const signInLink = screen.getByText("Sign in");
    const homeLink = screen.getByText("Home");

    expect(signInLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  it("shows disabled social login buttons", () => {
    renderSignupPage();

    const googleButton = screen.getByRole("button", { name: "Google" });
    const facebookButton = screen.getByRole("button", { name: "Facebook" });

    expect(googleButton).toBeDisabled();
    expect(facebookButton).toBeDisabled();
  });
});
