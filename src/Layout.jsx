import { Outlet } from "react-router-dom";

export default function Layout({ boissons, produit, recette }) {
  return <Outlet context={{ boissons, produit, recette }} />;
}