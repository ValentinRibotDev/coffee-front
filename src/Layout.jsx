import { Outlet } from "react-router-dom";

export default function Layout({ boissons, produits, recettes, addFavoris, favoris }) {
  return <Outlet context={{ boissons, produits, recettes, addFavoris, favoris }} />;
}