import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sendQRVisit } from "../data/api";

export default function ChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);

  // Отслеживание QR-переходов и показ приветствия
  useEffect(() => {
    const source = searchParams.get("source");
    if (source === "qr_chat") {
      // Отправляем статистику
      sendQRVisit({
        type: "chat",
        source: "qr_chat",
      });

      // Показываем приветствие
      setShowWelcome(true);
    }
  }, [searchParams]);

  // Переход в чат с менеджером
  const handleOpenChat = () => {
    window.open("https://t.me/lunodiamonds", "_blank");
  };

  // Закрытие приветствия
  const handleCloseWelcome = () => {
    setShowWelcome(false);
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
        {/* Приветственный блок */}
        <section style={{ marginTop: 24, marginBottom: 24 }}>
          <div
            style={{
              background: "#f9f9f9",
              borderRadius: 16,
              padding: "32px 24px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: 24,
                fontWeight: 600,
                margin: "0 0 16px 0",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Добро пожаловать!
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#666",
                margin: "0 0 24px 0",
                lineHeight: 1.5,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Наш менеджер готов помочь вам выбрать идеальное украшение.
              <br />
              Свяжитесь с нами, и мы ответим на все ваши вопросы.
            </p>
            <motion.button
              type="button"
              onClick={handleOpenChat}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 32px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ
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
      </main>

      {/* Модальное окно с приветствием (если переход по QR) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseWelcome}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "32px 24px",
                maxWidth: 400,
                width: "100%",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  margin: "0 0 16px 0",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Добро пожаловать!
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#666",
                  margin: "0 0 24px 0",
                  lineHeight: 1.5,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Наш менеджер готов помочь вам выбрать идеальное украшение.
              </p>
              <motion.button
                type="button"
                onClick={handleOpenChat}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "12px 24px",
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                  marginBottom: 12,
                  width: "100%",
                }}
              >
                СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ
              </motion.button>
              <button
                type="button"
                onClick={handleCloseWelcome}
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  color: "#666",
                  border: "none",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
