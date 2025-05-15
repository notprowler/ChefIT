import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "../SignupPage";
import { BrowserRouter } from "react-router-dom";
import * as authService from "@/services/authService"; // adjust if needed

vi.mock("@/components/Navbar", () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>,
}));

const mockUser = {
  id: "123",
  email: "test@example.com",
  aud: "authenticated",
  role: "authenticated",
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
  identities: [],
  last_sign_in_at: new Date().toISOString(),
};

const setup = () =>
  render(
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>
  );

describe("SignupPage integration", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("successfully signs up a user", async () => {
    vi.spyOn(authService, "signUp").mockResolvedValue({
      data: {
        user: mockUser,
        session: null,
      },
      error: null,
    });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "securePass123" },
    });
    fireEvent.click(screen.getByText(/create account/i));

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith(
        "Signup successful! Please check your email to verify."
      )
    );

    alertMock.mockRestore();
})})