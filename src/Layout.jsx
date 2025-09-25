import { Outlet } from "react-router-dom";

export default function Layout({ boissons, produits, recettes }) {
  return <Outlet context={{ boissons, produits, recettes }} />;
}