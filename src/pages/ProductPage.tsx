import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "../data/products";

export default function ProductPage() {
  const navigate = useNavigate();
  const { category, id } = useParams<{ category: string; id: string }>();
  const product = getProductById(id || "");
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="app">
        <div
          className="container"
          style={{ textAlign: "center", padding: "48px 16px" }}
        >
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>Товар не найден</h1>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "12px 24px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate(`/${category}`)}
            style={{
              position: "absolute",
              left: 16,
              background: "none",
              border: 0,
              padding: 6,
              cursor: "pointer",
              fontSize: 20,
            }}
          >
            ←
          </button>
          <img src="/images/logo.png" alt="LUNO" style={{ height: 40 }} />
        </div>
      </header>

      <main className="container">
        {/* Изображение товара */}
        <section style={{ marginTop: 12, marginBottom: 24 }}>
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
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
            {/* Иконка зума */}
            <button
              type="button"
              onClick={() => setImageModalOpen(true)}
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: 8,
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              🔍
            </button>
          </div>
        </section>

        {/* Название */}
        <section style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Noto Sans', sans-serif",
              textTransform: "uppercase",
            }}
          >
            {product.name}
          </h1>
        </section>

        {/* Характеристики */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: 14, color: "#666" }}>
                Вес бриллианта
              </span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {product.weight}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: 14, color: "#666" }}>
                Цвет бриллианта
              </span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {product.color}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: 14, color: "#666" }}>
                Чистота бриллианта
              </span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {product.clarity}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: 14, color: "#666" }}>Металл</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {product.metal}
              </span>
            </div>
          </div>
        </section>

        {/* Цена */}
        <section style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'Noto Sans', sans-serif",
              }}
            >
              Цена
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "'Noto Sans', sans-serif",
              }}
            >
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </section>

        {/* Кнопки действий */}
        <section style={{ marginBottom: 24 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 16px",
                background: "#C9A55C",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Noto Sans', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              ЗАБРОНИРОВАТЬ
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 16px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Noto Sans', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              В КОРЗИНУ
            </motion.button>
          </div>
        </section>

        {/* Дополнительная информация */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: 20 }}>💎</span>
              <span style={{ fontSize: 13, color: "#666" }}>
                GIA сертифицированные бриллианты
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: 20 }}>📦</span>
              <span style={{ fontSize: 13, color: "#666" }}>
                Оплата и доставка
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
              }}
            >
              <span style={{ fontSize: 20 }}>💍</span>
              <span style={{ fontSize: 13, color: "#666" }}>
                Узнать размер кольца онлайн
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Модальное окно с увеличенным изображением */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setImageModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "95%",
                maxHeight: "95%",
              }}
            >
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                style={{
                  position: "absolute",
                  top: -40,
                  right: 0,
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                ×
              </button>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  borderRadius: 8,
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
