import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function VIPPage(): React.JSX.Element {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleContactClick = () => {
    // Здесь можно добавить логику для связи с менеджером
    console.log("Связь с менеджером");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        padding: "0 16px",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Header с логотипом и кнопкой назад */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "var(--bg)",
          borderBottom: "1px solid #eee",
        }}
        aria-label="Шапка"
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
          <motion.button
            type="button"
            onClick={handleBackClick}
            whileTap={{ scale: 0.95 }}
            aria-label="Назад"
            style={{
              position: "absolute",
              left: 16,
              background: "none",
              border: 0,
              padding: 6,
              cursor: "pointer",
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </motion.button>

          <img src="/images/logo.png" alt="LUNO" style={{ height: 40 }} />
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 32 }}>
        {/* отступ после фиксированного хедера */}
        <div style={{ height: 8 }} />

        {/* Картинка VIP сервиса */}
        <section style={{ marginBottom: 32 }}>
          <div
            className="shadow-card"
            style={{ borderRadius: 16, overflow: "hidden" }}
          >
            <img
              src="/images/konserg.png"
              alt="VIP сервис LUNO DIAMONDS"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* Основной контент */}
        <section
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "32px 24px",
            marginBottom: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: 16, lineHeight: 1.6, color: "#333" }}>
            <p style={{ marginBottom: 32, fontWeight: 500 }}>
              <strong>Консъерж сервис L'UNO</strong> всего одним сообщением в
              чат решает все вопросы клиента, связанные с украшениями:
            </p>

            <ul style={{ marginBottom: 32, paddingLeft: 20 }}>
              <li style={{ marginBottom: 12 }}>
                Полировка, родирование и сервисное обслуживание украшения
              </li>
              <li style={{ marginBottom: 12 }}>Проверка закрепки</li>
              <li style={{ marginBottom: 12 }}>Коррекция размера кольца</li>
              <li style={{ marginBottom: 12 }}>Персональная посадка серег</li>
              <li style={{ marginBottom: 12 }}>Поиск и подбор бриллиантов</li>
              <li style={{ marginBottom: 12 }}>
                Проверка идентичности сертификата на бриллиант
              </li>
              <li style={{ marginBottom: 12 }}>
                Поиск и подбор инвестиционных бриллиантов
              </li>
              <li style={{ marginBottom: 12 }}>Консультации геммолога</li>
              <li style={{ marginBottom: 12 }}>Консультации ювелира</li>
              <li style={{ marginBottom: 12 }}>
                Афиша мероприятий ювелирной тематики
              </li>
              <li style={{ marginBottom: 12 }}>
                Организация доставки украшения в другие регионы и страны
              </li>
              <li style={{ marginBottom: 12 }}>Сертификация GIA, IGI, МГУ</li>
            </ul>

            <p
              style={{
                fontSize: 18,
                fontWeight: 500,
                textAlign: "center",
                marginBottom: 32,
                color: "#1a1a1a",
              }}
            >
              Комфортный сервис в одно касание с заботой о вас 🗝️
            </p>

            <div style={{ textAlign: "center" }}>
              <motion.button
                type="button"
                onClick={handleContactClick}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "16px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                Связаться с менеджером
              </motion.button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
