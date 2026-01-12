import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "../data/products";
import {
  validatePromocode,
  calculateDiscountedPrice,
} from "../data/promocodes";
import { sendPromoActivation } from "../data/api";
import FooterBlocks from "../components/FooterBlocks";

export default function ProductPage() {
  const navigate = useNavigate();
  const { category, id } = useParams<{ category: string; id: string }>();
  const product = getProductById(id || "");
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  // Состояние для промокода
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);

  // Применение промокода
  const handleApplyPromo = () => {
    const result = validatePromocode(promoCode);
    setPromoDiscount(result.discount);
    setPromoMessage(result.message);
    setIsPromoValid(result.valid);

    // Отправляем статистику при успешной активации
    if (result.valid && product) {
      sendPromoActivation({
        code: promoCode,
        discount: result.discount,
        productId: product.id,
        productName: product.name,
      });
    }
  };

  // Сброс промокода
  const handleResetPromo = () => {
    setPromoCode("");
    setPromoDiscount(0);
    setPromoMessage("");
    setIsPromoValid(false);
  };

  // Прокрутка к верху страницы при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        {/* Промокод */}
        <section style={{ marginBottom: 16 }}>
          <div
            style={{
              background: "#f9f9f9",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 12,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Есть промокод?
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Введите промокод"
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: isPromoValid
                    ? "2px solid #4CAF50"
                    : "1px solid #ddd",
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: "'Nunito', sans-serif",
                  outline: "none",
                  textTransform: "uppercase",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApplyPromo();
                }}
              />
              {isPromoValid ? (
                <motion.button
                  type="button"
                  onClick={handleResetPromo}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "12px 16px",
                    background: "#ff5252",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  ✕
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleApplyPromo}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "12px 16px",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  ОК
                </motion.button>
              )}
            </div>
            {promoMessage && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: isPromoValid ? "#4CAF50" : "#ff5252",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {promoMessage}
              </div>
            )}
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
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Цена
            </span>
            <div style={{ textAlign: "right" }}>
              {isPromoValid && promoDiscount > 0 ? (
                <>
                  <span
                    style={{
                      fontSize: 16,
                      color: "#999",
                      textDecoration: "line-through",
                      marginRight: 8,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {product.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: "#4CAF50",
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {calculateDiscountedPrice(
                      product.price,
                      promoDiscount
                    ).toLocaleString("ru-RU")}{" "}
                    ₽
                  </span>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#4CAF50",
                      fontFamily: "'Nunito', sans-serif",
                      marginTop: 4,
                    }}
                  >
                    Скидка: {promoDiscount.toLocaleString("ru-RU")} ₽
                  </div>
                </>
              ) : (
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {product.price.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Кнопки действий */}
        <section style={{ marginBottom: 24 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <motion.button
              type="button"
              onClick={() => window.open("https://t.me/lunodiamonds", "_blank")}
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
                fontFamily: "'Nunito', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              ЗАБРОНИРОВАТЬ
            </motion.button>
            <motion.button
              type="button"
              onClick={() => window.open("https://t.me/lunodiamonds", "_blank")}
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
                fontFamily: "'Nunito', sans-serif",
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
              <img
                src="/images/GTI.png"
                alt="GIA сертифицированные бриллианты"
                style={{ width: 20, height: 20 }}
              />
              <span style={{ fontSize: 13, color: "#666" }}>
                IGI сертифицированные бриллианты
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
              <img
                src="/images/delivery.png"
                alt="Оплата и доставка"
                style={{ width: 20, height: 20 }}
              />
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
              <img
                src="/images/size.png"
                alt="Узнать размер кольца онлайн"
                style={{ width: 20, height: 20 }}
              />
              <span style={{ fontSize: 13, color: "#666" }}>
                Узнать размер кольца онлайн
              </span>
            </div>
          </div>
        </section>

        {/* Footer блоки */}
        <FooterBlocks />
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
