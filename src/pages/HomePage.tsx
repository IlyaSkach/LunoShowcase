import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import { AnimatePresence, motion } from "framer-motion";

type CategoryKey = "rings" | "earrings" | "necklaces" | "collections" | null;

const MENU: { key: Exclude<CategoryKey, null>; title: string }[] = [
  { key: "rings", title: "КОЛЬЦА" },
  { key: "earrings", title: "СЕРЬГИ" },
  { key: "necklaces", title: "КОЛЬЕ" },
  { key: "collections", title: "УКРАШЕНИЯ С ЦВЕТНЫМИ БРИЛЛИАНТАМИ" },
];

function useTelegramInit(): void {
  useEffect(() => {
    try {
      WebApp.ready();
      WebApp.expand();
    } catch {
      // non-Telegram environment, ignore
    }
  }, []);
}

export default function HomePage() {
  useTelegramInit();
  const navigate = useNavigate();
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {/* Общий хедер с бургер-меню */}
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
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            style={{
              position: "absolute",
              left: 16,
              background: "none",
              border: 0,
              padding: 6,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 2,
                  background: "#000",
                  marginBottom: 4,
                  width: "85%",
                }}
              />
              <div
                style={{
                  height: 2,
                  background: "#000",
                  marginBottom: 4,
                  width: "100%",
                }}
              />
              <div
                style={{
                  height: 2,
                  background: "#000",
                  marginBottom: 4,
                  width: "85%",
                }}
              />
              <div style={{ height: 2, background: "#000", width: "55%" }} />
            </div>
          </button>

          <img src="/images/logo.png" alt="LUNO" style={{ height: 40 }} />
        </div>
      </header>

      <main className="container">
        {/* отступ после фиксированного хедера */}
        <div style={{ height: 8 }} />

        {/* Большой hero */}
        <section aria-label="Фото" style={{ marginBottom: 12 }}>
          <img
            src="/images/hero.png"
            alt="LUNO DIAMONDS - Ювелирные украшения"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 16,
              display: "block",
            }}
          />
        </section>

        {/* CTA под hero */}
        <section aria-label="Выбрать украшение" style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", placeItems: "center" }}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              className="shadow-card"
              style={{
                background: "#000",
                color: "#fff",
                border: "1px solid #000",
                borderRadius: 6,
                padding: "14px 16px",
                width: "100%",
                maxWidth: 280,
              }}
            >
              ВЫБРАТЬ УКРАШЕНИЕ
            </motion.button>
          </div>
        </section>

        {/* Вертикальный список категорий с картинками */}
        <section aria-label="Категории" style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/rings")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                src="/images/kolca_btn.png"
                alt="Кольца"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/earrings")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                src="/images/sergi_btn.png"
                alt="Серьги"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/necklaces")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                src="/images/kolee_btn.png"
                alt="Колье"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/collections")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                src="/images/yello_btn.png"
                alt="Украшения с цветными бриллиантами"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </motion.button>
          </div>
        </section>

        {/* Широкие фото-блоки с подписями */}
        <section aria-label="Мастерская" style={{ marginBottom: 12 }}>
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
            ЮВЕЛИРНАЯ МАСТЕРСКАЯ <br /> LUNO DIAMONDS
          </div>
        </section>

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
            VIP СЕРВИС LUNO DIAMONDS
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
                fontFamily: "'Noto Sans', sans-serif",
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
                fontFamily: "'Noto Sans', sans-serif",
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
      </main>

      {/* Оверлей-меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "85%",
                maxWidth: 320,
                background: "#fff",
                padding: 24,
                overflowY: "auto",
              }}
            >
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "transparent",
                  border: 0,
                  fontSize: 28,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
              <div style={{ marginTop: 32 }}>
                {MENU.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      navigate(`/${item.key}`);
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "16px 0",
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid #eee",
                      fontSize: 16,
                      cursor: "pointer",
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Сплэш экран */}
      <AnimatePresence>
        {isSplashVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#fff",
              zIndex: 9999,
              display: "grid",
              placeItems: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/images/logo.png" alt="LUNO" style={{ height: 80 }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
