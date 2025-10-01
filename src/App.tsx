import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rings" element={<CategoryPage category="rings" />} />
      <Route path="/earrings" element={<CategoryPage category="earrings" />} />
      <Route
        path="/necklaces"
        element={<CategoryPage category="necklaces" />}
      />
      <Route
        path="/collections"
        element={<CategoryPage category="collections" />}
      />
      <Route path="/:category/:id" element={<ProductPage />} />
    </Routes>
  );
}
