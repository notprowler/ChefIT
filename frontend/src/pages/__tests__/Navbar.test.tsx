import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it("renders the logo and brand name", () => {
    renderNavbar();

    // Check if the brand name is present
    const brandName = screen.getByText("ChefIt");
    expect(brandName).toBeInTheDocument();

    // Check if the logo container is present
    const logoContainer = screen.getByTestId("logo-container");
    expect(logoContainer).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderNavbar();

    // Check desktop navigation links
    const homeLink = screen.getByText("Home");
    const recipesLink = screen.getByText("Recipes");

    expect(homeLink).toBeInTheDocument();
    expect(recipesLink).toBeInTheDocument();
  });

  it("renders the login button", () => {
    renderNavbar();

    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", () => {
    renderNavbar();

    // Initially, mobile menu should not be visible
    const mobileMenu = screen.queryByRole("navigation", {
      name: /mobile menu/i,
    });
    expect(mobileMenu).not.toBeInTheDocument();

    // Click the menu button
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // Mobile menu should now be visible
    const mobileMenuAfterClick = screen.getByRole("navigation", {
      name: /mobile menu/i,
    });
    expect(mobileMenuAfterClick).toBeInTheDocument();

    // Click the menu button again
    fireEvent.click(menuButton);

    // Mobile menu should be hidden again
    const mobileMenuAfterSecondClick = screen.queryByRole("navigation", {
      name: /mobile menu/i,
    });
    expect(mobileMenuAfterSecondClick).not.toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", () => {
    renderNavbar();

    // Open the mobile menu
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // Click a link in the mobile menu
    const mobileHomeLink = screen.getByRole("hidden-menu-home", {
      hidden: true,
    });
    fireEvent.click(mobileHomeLink);

    // Mobile menu should be closed
    const mobileMenu = screen.queryByRole("navigation", {
      name: /mobile menu/i,
    });
    expect(mobileMenu).not.toBeInTheDocument();
  });
});
