import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import { AnimatePresence, motion } from "framer-motion";
import FooterBlocks from "../components/FooterBlocks";

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
          <div
            style={{
              background: "#f1f0ec",
              borderRadius: 16,
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="/images/hero.png"
              alt="LUNO DIAMONDS - Ювелирные украшения"
              style={{
                width: "450px",
                height: "auto",
                display: "block",
                borderRadius: 8,
              }}
            />
            <div
              style={{
                width: "100%",
                display: "grid",
                placeItems: "center",
                marginTop: 50,
              }}
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "18px 24px",
                  width: "90%",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                ВЫБРАТЬ УКРАШЕНИЕ
              </motion.button>
            </div>
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
        <FooterBlocks />
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
                  color: "#000",
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
                      color: "#000",
                    }}
                  >
                    {item.title}
                  </button>
                ))}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "16px 24px",
                    marginTop: 24,
                    background: "#000",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "#fff",
                    fontFamily: "'Nunito', sans-serif",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  СВЯЗАТЬСЯ С ЭКСПЕРТОМ
                </motion.button>
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
