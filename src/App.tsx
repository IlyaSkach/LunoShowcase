import React, { useEffect, useMemo, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { AnimatePresence, motion } from "framer-motion";

type CategoryKey = "rings" | "earrings" | "necklaces" | "collections" | null;

const MENU: { key: Exclude<CategoryKey, null>; title: string }[] = [
  { key: "rings", title: "Кольца" },
  { key: "earrings", title: "Серьги" },
  { key: "necklaces", title: "Колье" },
  { key: "collections", title: "Коллекции" },
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
      <main className="container">
        <header>
          <div className="logo shadow-card" aria-label="Логотип">
            <img
              src="/images/logo-pre.png"
              alt="LUNO"
              style={{ width: "72%", height: "72%", objectFit: "contain" }}
            />
          </div>
        </header>

        <nav aria-label="Главное меню" style={{ marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {MENU.map((item) => (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => setActiveCategory(item.key)}
                className="shadow-card"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  padding: "12px 10px",
                  border: "1px solid #000000",
                  background: "#fff",
                }}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
              >
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  {item.title}
                </span>
              </motion.button>
            ))}
          </div>
        </nav>

        <section aria-label="Фото" style={{ marginBottom: 16 }}>
          <div className="hero" />
        </section>

        <section className="about">
          <h2 style={{ fontSize: 24, margin: "0 0 8px" }}>О магазине</h2>
          <p style={{ margin: 0, fontSize: 16 }}>
            Ювелирный дом LUNO — современная мастерская украшений с
            бриллиантами. Мы создаём изящные минималистичные изделия из
            драгоценных металлов, подчёркивая природную красоту камней и чистоту
            линий. Индивидуальные заказы, бережная упаковка, доставка по всему
            миру.
          </p>
        </section>

        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.section
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="shadow-card"
              style={{
                padding: 16,
                borderRadius: 16,
                border: "1px solid #e6e6e6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 16 }}>{categoryTitle}</h3>
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  style={{
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                  }}
                  aria-label="Закрыть"
                >
                  ×
                </button>
              </div>
              <div style={{ height: 8 }} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="shadow-card"
                    style={{ padding: 12, borderRadius: 12 }}
                  >
                    <div
                      style={{
                        height: 80,
                        borderRadius: 10,
                        background: "#f1f1f1",
                        marginBottom: 8,
                      }}
                    />
                    <div
                      style={{
                        height: 10,
                        width: "70%",
                        background: "#eee",
                        borderRadius: 6,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, color: "#7a7a7a", fontSize: 12 }}>
                Макеты карточек и подменю появятся позже. Здесь заложена
                структура и анимация.
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <BottomConstructorButton />

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
