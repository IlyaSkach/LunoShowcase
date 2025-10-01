import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductsByCategory, Product } from "../data/products";

interface CategoryPageProps {
  category: "rings" | "earrings" | "necklaces" | "collections";
}

const CATEGORY_TITLES = {
  rings: "КОЛЬЦА",
  earrings: "СЕРЬГИ",
  necklaces: "КОЛЬЕ",
  collections: "УКРАШЕНИЯ С ЦВЕТНЫМИ БРИЛЛИАНТАМИ",
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const navigate = useNavigate();
  const products = getProductsByCategory(category);
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "rating-asc" | "rating-desc"
  >("price-asc");

  // Сортировка товаров
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "rating-asc") {
      return a.rating - b.rating;
    }
    if (sortBy === "rating-desc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="app">
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 16px",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              position: "absolute",
              left: 16,
              background: "none",
              border: 0,
              padding: 6,
              cursor: "pointer",
              fontSize: 24,
            }}
          >
            ☰
          </button>
          <img src="/images/logo.png" alt="LUNO" style={{ height: 40 }} />
        </div>
      </header>

      <main className="container">
        {/* Баннер */}
        <section style={{ marginBottom: 16, marginTop: 8 }}>
          <img
            src="/images/hero.png"
            alt={CATEGORY_TITLES[category]}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 16,
              display: "block",
            }}
          />
        </section>

        {/* Заголовок и количество */}
        <section style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
              margin: "0 0 4px 0",
              fontFamily: "'Noto Sans', sans-serif",
            }}
          >
            {CATEGORY_TITLES[category]}{" "}
            <span style={{ color: "#999", fontSize: 16 }}>
              ({products.length})
            </span>
          </h1>
        </section>

        {/* Фильтры по цене и рейтингу */}
        <section
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setSortBy(sortBy === "price-asc" ? "price-desc" : "price-asc")
            }
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: 8,
              background: sortBy.startsWith("price") ? "#f0f0f0" : "#fff",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Noto Sans', sans-serif",
            }}
          >
            ЦЕНА{" "}
            {sortBy === "price-asc" ? "↑" : sortBy === "price-desc" ? "↓" : "↕"}
          </button>
          <button
            type="button"
            onClick={() =>
              setSortBy(sortBy === "rating-desc" ? "rating-asc" : "rating-desc")
            }
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: 8,
              background: sortBy.startsWith("rating") ? "#f0f0f0" : "#fff",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Noto Sans', sans-serif",
            }}
          >
            РЕЙТИНГ{" "}
            {sortBy === "rating-desc"
              ? "↓"
              : sortBy === "rating-asc"
              ? "↑"
              : "↕"}
          </button>
        </section>

        {/* Сетка товаров */}
        <section style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/${category}/${product.id}`)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Изображение */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: 8,
                    background: "#f5f5f5",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>

                {/* Информация */}
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 4,
                      fontFamily: "'Noto Sans', sans-serif",
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#666",
                      fontFamily: "'Noto Sans', sans-serif",
                    }}
                  >
                    от {product.price.toLocaleString("ru-RU")} руб.
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Кнопка "Посмотреть еще" */}
        <section style={{ textAlign: "center", marginBottom: 24 }}>
          <button
            type="button"
            style={{
              padding: "12px 32px",
              border: "1px solid #000",
              borderRadius: 8,
              background: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Noto Sans', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            ПОСМОТРЕТЬ ЕЩЕ
          </button>
        </section>
      </main>
    </div>
  );
}
