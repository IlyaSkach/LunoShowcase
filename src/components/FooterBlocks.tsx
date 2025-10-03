import React from "react";
import { motion } from "framer-motion";

export default function FooterBlocks() {
  return (
    <>
      {/* Ювелирная мастерская */}
      <section aria-label="Мастерская" style={{ marginBottom: 12 }}>
        <div
          className="shadow-card"
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          <img
            src="/images/masterskaya.png"
            alt="Ювелирная мастерская L'UNO DIAMONDS"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#000",
            marginTop: 6,
            textTransform: "uppercase",
            textDecoration: "underline",
            fontWeight: 500,
          }}
        >
          ЮВЕЛИРНАЯ МАСТЕРСКАЯ <br /> L'UNO DIAMONDS
        </div>
      </section>

      {/* VIP сервис */}
      <section aria-label="VIP сервис" style={{ marginBottom: 16 }}>
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
        <div
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#000",
            marginTop: 6,
            textTransform: "uppercase",
            textDecoration: "underline",
            fontWeight: 500,
          }}
        >
          VIP СЕРВИС L'UNO DIAMONDS
        </div>
      </section>

      {/* Финальный тёмный CTA */}
      <section aria-label="Связаться с экспертом" style={{ marginBottom: 0 }}>
        <div
          style={{
            background: "#1a1a1a",
            color: "#fff",
            padding: "48px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 400,
              marginBottom: 24,
              letterSpacing: "0.02em",
              fontFamily: "'Nunito', sans-serif",
              lineHeight: 1.4,
            }}
          >
            ПОМОЖЕМ ОПРЕДЕЛИТЬСЯ
            <br />С ВЫБОРОМ
          </h2>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            style={{
              background: "transparent",
              color: "#fff",
              border: "2px solid #fff",
              borderRadius: 6,
              padding: "12px 32px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "'Nunito', sans-serif",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            СВЯЗАТЬСЯ С ЭКСПЕРТОМ
          </motion.button>
        </div>
      </section>
    </>
  );
}
