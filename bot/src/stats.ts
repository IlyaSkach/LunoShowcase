import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATS_FILE = path.join(__dirname, "..", "promo-stats.json");

// Структура записи об активации
export interface PromoActivation {
  code: string;
  userId: number | null;
  username: string | null;
  firstName: string | null;
  productId: string | null;
  productName: string | null;
  discount: number;
  timestamp: string;
}

// Статистика по промокоду
export interface PromoStats {
  code: string;
  totalActivations: number;
  totalDiscount: number;
  lastActivation: string;
  activations: PromoActivation[];
}

// Общая структура данных
interface StatsData {
  promocodes: Record<string, PromoStats>;
}

// Загрузка данных из файла
function loadStats(): StatsData {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Ошибка загрузки статистики:", error);
  }
  return { promocodes: {} };
}

// Сохранение данных в файл
function saveStats(data: StatsData): void {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Ошибка сохранения статистики:", error);
  }
}

// Добавление активации промокода
export function addActivation(activation: PromoActivation): void {
  const stats = loadStats();
  const code = activation.code.toUpperCase();

  if (!stats.promocodes[code]) {
    stats.promocodes[code] = {
      code,
      totalActivations: 0,
      totalDiscount: 0,
      lastActivation: "",
      activations: [],
    };
  }

  stats.promocodes[code].totalActivations += 1;
  stats.promocodes[code].totalDiscount += activation.discount;
  stats.promocodes[code].lastActivation = activation.timestamp;
  stats.promocodes[code].activations.push(activation);

  saveStats(stats);
}

// Получение статистики по всем промокодам
export function getAllStats(): PromoStats[] {
  const stats = loadStats();
  return Object.values(stats.promocodes).sort(
    (a, b) => b.totalActivations - a.totalActivations
  );
}

// Получение статистики по конкретному промокоду
export function getPromoStats(code: string): PromoStats | null {
  const stats = loadStats();
  return stats.promocodes[code.toUpperCase()] || null;
}

// Форматирование статистики для отправки в Telegram
export function formatStatsMessage(): string {
  const allStats = getAllStats();

  if (allStats.length === 0) {
    return "📊 Статистика промокодов\n\nПока нет данных об активациях.";
  }

  let message = "📊 <b>Статистика промокодов</b>\n\n";

  for (const promo of allStats) {
    const lastDate = new Date(promo.lastActivation).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    message += `<b>${promo.code}</b>\n`;
    message += `├ Активаций: ${promo.totalActivations}\n`;
    message += `├ Сумма скидок: ${promo.totalDiscount.toLocaleString("ru-RU")} ₽\n`;
    message += `└ Последняя: ${lastDate}\n\n`;
  }

  return message;
}

// Форматирование детальной статистики по промокоду
export function formatDetailedStats(code: string): string {
  const promo = getPromoStats(code);

  if (!promo) {
    return `❌ Промокод <b>${code.toUpperCase()}</b> не найден в статистике.`;
  }

  let message = `📊 <b>Статистика: ${promo.code}</b>\n\n`;
  message += `Всего активаций: <b>${promo.totalActivations}</b>\n`;
  message += `Сумма скидок: <b>${promo.totalDiscount.toLocaleString("ru-RU")} ₽</b>\n\n`;

  if (promo.activations.length > 0) {
    message += "<b>Последние 10 активаций:</b>\n";
    const lastActivations = promo.activations.slice(-10).reverse();

    for (const act of lastActivations) {
      const date = new Date(act.timestamp).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      const user = act.username ? `@${act.username}` : act.firstName || `ID: ${act.userId}`;
      message += `• ${date} — ${user}\n`;
    }
  }

  return message;
}
