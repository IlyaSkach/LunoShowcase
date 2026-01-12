import { Bot } from "grammy";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  addActivation,
  formatStatsMessage,
  formatDetailedStats,
  type PromoActivation,
} from "./stats.js";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;
const MINI_APP_URL = process.env.MINI_APP_URL || "https://your-mini-app-url.com";
const PORT = Number(process.env.PORT || 3001);

if (Number.isNaN(PORT)) {
  throw new Error("PORT в .env должен быть числом");
}

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN не указан в .env файле!");
}

// ==================== БОТ ====================
const bot = new Bot(BOT_TOKEN);

// Команда /start
bot.command("start", async (ctx) => {
  await ctx.reply(
    "👋 Добро пожаловать в LUNO Diamonds!\n\n" +
      "Нажмите кнопку ниже, чтобы открыть каталог украшений.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "💎 Открыть каталог",
              web_app: { url: MINI_APP_URL },
            },
          ],
        ],
      },
    }
  );
});

// Команда /stats — только для админа
bot.command("stats", async (ctx) => {
  if (ADMIN_ID && ctx.from?.id.toString() !== ADMIN_ID) {
    return; // Игнорируем для не-админов
  }

  const args = ctx.match?.trim();

  if (args) {
    // Детальная статистика по конкретному промокоду
    await ctx.reply(formatDetailedStats(args), { parse_mode: "HTML" });
  } else {
    // Общая статистика
    await ctx.reply(formatStatsMessage(), { parse_mode: "HTML" });
  }
});

// Команда /help
bot.command("help", async (ctx) => {
  if (ADMIN_ID && ctx.from?.id.toString() === ADMIN_ID) {
    await ctx.reply(
      "📖 <b>Команды администратора:</b>\n\n" +
        "/stats — общая статистика промокодов\n" +
        "/stats ПРОМОКОД — детальная статистика по промокоду",
      { parse_mode: "HTML" }
    );
  } else {
    await ctx.reply("Используйте кнопку ниже для открытия каталога.");
  }
});

// ==================== EXPRESS СЕРВЕР ====================
const app = express();

app.use(cors());
app.use(express.json());

// Эндпоинт для приёма активаций промокодов
app.post("/api/promo-activation", (req, res) => {
  try {
    const {
      code,
      userId,
      username,
      firstName,
      productId,
      productName,
      discount,
    } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Промокод не указан" });
    }

    const activation: PromoActivation = {
      code: code.toUpperCase(),
      userId: userId || null,
      username: username || null,
      firstName: firstName || null,
      productId: productId || null,
      productName: productName || null,
      discount: discount || 0,
      timestamp: new Date().toISOString(),
    };

    addActivation(activation);
    console.log(`✅ Промокод ${code} активирован`);

    return res.json({ success: true });
  } catch (error) {
    console.error("Ошибка при обработке активации:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== ЗАПУСК ====================
async function start() {
  // Запускаем Express сервер
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`🚀 API сервер запущен на порту ${PORT}`);
  });

  // Запускаем бота
  await bot.start({
    onStart: (botInfo) => {
      console.log(`🤖 Бот @${botInfo.username} запущен`);
    },
  });
}

start().catch(console.error);
