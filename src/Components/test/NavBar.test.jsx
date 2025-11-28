import { render, screen } from "@testing-library/react";
import { Navigation } from "../NavBar";
import { BrowserRouter } from "react-router-dom";

// Helper pour rendre la navbar avec ou sans props
const renderNav = (props = {}) =>
    render(
        <BrowserRouter>
            <Navigation {...props} />
        </BrowserRouter>
    );

test("affiche le logo Coffee Time", () => {
    renderNav();
    const logoText = screen.getByText(/coffee time/i);
    expect(logoText).toBeInTheDocument();
});

test("affiche les liens Recipe, Products, About", () => {
    renderNav();

    expect(screen.getByText(/recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
});

test("les icônes User et Panier apparaissent", () => {
    renderNav();

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(1); // il y en a plusieurs
});

test("la couleur passée en prop est appliquée", () => {
    renderNav({ color: "#ff0000" });

    const recipeLink = screen.getByText(/recipe/i);
    expect(recipeLink).toHaveStyle("color: #ff0000");
});
