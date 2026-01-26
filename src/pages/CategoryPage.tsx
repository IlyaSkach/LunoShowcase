import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductsByCategory, Product } from "../data/products";
import { sendQRVisit } from "../data/api";
import FooterBlocks from "../components/FooterBlocks";

interface CategoryPageProps {
  category: "rings" | "earrings" | "necklaces" | "collections" | "newlyweds" | "promotion";
}

const CATEGORY_TITLES = {
  rings: "КОЛЬЦА",
  earrings: "СЕРЬГИ",
  necklaces: "КОЛЬЕ",
  collections: "УКРАШЕНИЯ С ЦВЕТНЫМИ БРИЛЛИАНТАМИ",
  newlyweds: "МОЛОДОЖЕНАМ",
  promotion: "АКЦИЯ",
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const products = getProductsByCategory(category);
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "rating-asc" | "rating-desc"
  >("price-desc");
  const [visibleCount, setVisibleCount] = useState(6);

  // Прокрутка к верху страницы при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Отслеживание QR-переходов на страницу "Акция"
  useEffect(() => {
    const source = searchParams.get("source");
    if (category === "promotion" && source === "qr_promo") {
      sendQRVisit({
        type: "promo",
        source: "qr_promo",
      });
    }
  }, [category, searchParams]);

  // Список изображений, которые отсутствуют (скрываем эти товары)
  const hiddenImages = new Set<string>([
    // Товары без изображений (можно добавить вручную при необходимости)
    // Например: "/images/products/rings/K651300.png"
  ]);

  // Фильтруем товары с изображениями (показываем только товары с валидными изображениями)
  const productsWithImages = products.filter((product) => {
    // Проверяем, что изображение не в списке скрытых
    if (hiddenImages.has(product.image)) {
      return false;
    }

    // Дополнительная проверка: можно добавить логику для проверки существования файла
    // Пока оставляем все товары, которые не в списке скрытых
    return true;
  });

  // Сортировка товаров
  const sortedProducts = [...productsWithImages].sort((a, b) => {
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

  // Показываем только видимые товары
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < sortedProducts.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, sortedProducts.length));
  };

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
            ←
          </button>
          <img src="/images/logo.png" alt="LUNO" style={{ height: 40 }} />
        </div>
      </header>

      <main className="container">
        {/* Заголовок и количество */}
        <section style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
              margin: "0 0 4px 0",
              fontFamily: "'Nunito', sans-serif",
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
              setSortBy(sortBy === "price-desc" ? "price-asc" : "price-desc")
            }
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: 8,
              background: sortBy.startsWith("price") ? "#f0f0f0" : "#fff",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              color: "#000",
              WebkitAppearance: "none",
              appearance: "none",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ЦЕНА {sortBy === "price-asc" ? "↑" : "↓"}
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
              fontFamily: "'Nunito', sans-serif",
              color: "#000",
              WebkitAppearance: "none",
              appearance: "none",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            РЕЙТИНГ {sortBy === "rating-desc" ? "↓" : "↑"}
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
            {visibleProducts.map((product) => (
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
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#666",
                      fontFamily: "'Nunito', sans-serif",
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
        {hasMoreProducts && (
          <section style={{ textAlign: "center", marginBottom: 24 }}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={loadMore}
              style={{
                padding: "12px 32px",
                border: "1px solid #000",
                borderRadius: 8,
                background: "#fff",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                letterSpacing: "0.02em",
                color: "#000",
                WebkitAppearance: "none",
                appearance: "none",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              ПОСМОТРЕТЬ ЕЩЕ ({sortedProducts.length - visibleCount} осталось)
            </motion.button>
          </section>
        )}

        {/* Footer блоки */}
        <FooterBlocks />
      </main>
    </div>
  );
}
