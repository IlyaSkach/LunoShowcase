import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutPage(): React.JSX.Element {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleOrderClick = () => {
    // Здесь можно добавить логику для заказа украшения
    console.log("Заказ украшения");
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

        {/* Картинка мастерской */}
        <section style={{ marginBottom: 32 }}>
          <div
            className="shadow-card"
            style={{ borderRadius: 16, overflow: "hidden" }}
          >
            <img
              src="/images/masterskaya.png"
              alt="Ювелирная мастерская LUNO DIAMONDS"
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
            <p style={{ marginBottom: 24, fontWeight: 500 }}>
              <strong>L'UNO (ит. «Один»)</strong>: символизирует уникальность,
              первооснову, единственную истинную форму, внутреннюю целостность.
            </p>

            <p style={{ marginBottom: 24 }}>
              Мы создаем не просто украшения, а ключи к вашей самоидентификации.
            </p>

            <p style={{ marginBottom: 24 }}>
              <strong>L'UNO Diamonds</strong> появился в 2023-м году в Дубаи как
              небольшая мастерская ювелирных украшений.
            </p>

            <p style={{ marginBottom: 32 }}>
              Сегодня L'UNO Diamonds объединяет мастерскую по производству
              ювелирных украшений и сервис подбора и покупки бриллиантов для
              клиентов по всему миру. Каждый заказ ведет персональный менеджер,
              которых хранит всю историю ваших заказов и готов ответить на
              вопросы 24/7.
            </p>

            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 20,
                color: "#1a1a1a",
              }}
            >
              Создайте свое уникальное украшение с L'UNO Diamonds:
            </h2>

            <ul style={{ marginBottom: 32, paddingLeft: 20 }}>
              <li style={{ marginBottom: 16 }}>
                <strong>Свяжитесь с нами</strong> — напишите менеджеру в чат и
                отправьте ссылку на украшение или фото желаемой модели.
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Определите детали</strong> — уточните ваши предпочтения
                по характеристикам бриллиантов и желаемый бюджет.
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Подбор и расчет за 24 часа</strong> — мы подберем камни
                и рассчитаем финальную стоимость совершенно бесплатно.
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Производство и согласование</strong> — менеджер будет
                держать вас в курсе всех этапов производства, согласовывая
                детали.
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Доставка</strong> - изготовление и доставка в течение 30
                дней.
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Гарантии</strong> — все бриллианты в украшениях L'UNO
                Diamonds сертифицированы в лабораториях IGI или GIA. При покупке
                менеджеры обязательно продемонстририруют номер вашего бриллианта
                и проведут при вас сверку с сертификатом.
              </li>
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
                onClick={handleOrderClick}
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
                Заказать украшение
              </motion.button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
