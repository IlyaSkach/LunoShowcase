import React, { useEffect, useMemo, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { AnimatePresence, motion } from "framer-motion";

type CategoryKey = "rings" | "earrings" | "necklaces" | "collections" | null;

const MENU: { key: Exclude<CategoryKey, null>; title: string }[] = [
  { key: "rings", title: "КОЛЬЦА" },
  { key: "earrings", title: "СЕРЬГИ" },
  { key: "necklaces", title: "КОЛЬЕ" },
  { key: "collections", title: "УКРАШЕНИЯ С ЦВЕТНЫМИБРИЛЛИАНТАМИ" },
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

export default function App(): React.JSX.Element {
  useTelegramInit();
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const categoryTitle = useMemo(
    () => MENU.find((m) => m.key === activeCategory)?.title,
    [activeCategory]
  );

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
          <div className="hero" />
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
                borderRadius: 12,
                padding: "14px 16px",
                width: "100%",
                maxWidth: 360,
              }}
            >
              Выбрать украшение
            </motion.button>
          </div>
        </section>

        {/* Вертикальный список категорий с картинками */}
        <section aria-label="Категории" style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory("rings")}
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
              onClick={() => setActiveCategory("earrings")}
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
              onClick={() => setActiveCategory("necklaces")}
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
              onClick={() => setActiveCategory("collections")}
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
              fontSize: 12,
              color: "#7a7a7a",
              marginTop: 6,
            }}
          >
            Ювелирная мастерская LUNO DIAMONDS
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
              fontSize: 12,
              color: "#7a7a7a",
              marginTop: 6,
            }}
          >
            VIP сервис LUNO DIAMONDS
          </div>
        </section>

        {/* Финальный тёмный CTA */}
        <section
          aria-label="Связаться с экспертом"
          style={{ marginBottom: 24 }}
        >
          <div
            style={{
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: 24,
              padding: "48px 24px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
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
                borderRadius: 60,
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
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 70,
              display: "grid",
              placeItems: "center",
            }}
            onClick={() => setMenuOpen(false)}
            aria-label="Меню"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="shadow-card"
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 16,
                width: "90%",
                maxWidth: 420,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 600 }}>Меню</div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  style={{ background: "none", border: 0, cursor: "pointer" }}
                  aria-label="Закрыть"
                >
                  ×
                </button>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {MENU.map((item) => (
                  <button
                    key={`overlay-${item.key}`}
                    type="button"
                    className="shadow-card"
                    style={{ textAlign: "left", padding: 12, borderRadius: 12 }}
                    onClick={() => {
                      setActiveCategory(item.key);
                      setMenuOpen(false);
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

      <AnimatePresence>
        {isSplashVisible && (
          <SplashScreen onHide={() => setSplashVisible(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SplashScreen({ onHide }: { onHide: () => void }): React.JSX.Element {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        display: "grid",
        placeItems: "center",
        zIndex: 100,
      }}
      role="alert"
      aria-label="Загрузка"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{ width: 140, height: 140 }}
      >
        <img
          src="/images/logo-pre.png"
          alt="LUNO"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </motion.div>
    </motion.div>
  );
}

function BottomConstructorButton(): React.JSX.Element {
  return (
    <div className="bottom-center">
      <motion.button
        type="button"
        className="shadow-card"
        style={{
          width: 64,
          height: 64,
          borderRadius: 999,
          background: "#fff",
          border: "1px solid #e6e6e6",
          display: "grid",
          placeItems: "center",
        }}
        whileTap={{ scale: 0.96 }}
        aria-label="Открыть конструктор кольца"
        onClick={() => alert("Конструктор кольца: скоро")}
      >
        <RingIcon />
      </motion.button>
    </div>
  );
}

function RingIcon(): React.JSX.Element {
  return (
    <img
      src="/images/ring-icon.webp"
      width={28}
      height={28}
      alt="Конструктор кольца"
    />
  );
}
