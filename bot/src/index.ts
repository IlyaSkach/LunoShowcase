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
  const startParam = ctx.match?.trim(); // Параметр после /start
  
  // Определяем URL в зависимости от параметра
  let url = MINI_APP_URL;
  let buttonText = "💎 Открыть каталог";
  let message = "👋 Добро пожаловать в LUNO Diamonds!\n\nНажмите кнопку ниже, чтобы открыть каталог украшений.";
  
  if (startParam === "promo_qr") {
    url = `${MINI_APP_URL}/promotion?source=qr_promo`;
    buttonText = "🎯 Открыть акцию";
    message = "🎯 Откройте страницу акций:\n\nНажмите кнопку ниже, чтобы перейти к акциям.";
  } else if (startParam === "chat_qr") {
    url = `${MINI_APP_URL}/chat?source=qr_chat`;
    buttonText = "💬 Связаться с менеджером";
    message = "💬 Свяжитесь с нашим менеджером:\n\nНажмите кнопку ниже, чтобы открыть чат.";
  }
  
  await ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: buttonText,
            web_app: { url },
          },
        ],
      ],
    },
  });
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

// Обработка ссылок на Mini App
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  
  // Проверяем, содержит ли сообщение ссылку на наш домен
  const urlPattern = /https?:\/\/(?:www\.)?lunosho\.netlify\.app\/([^\s]+)/gi;
  const matches = [...text.matchAll(urlPattern)];
  
  if (matches.length === 0) {
    return; // Не наша ссылка, игнорируем
  }
  
  // Обрабатываем первую найденную ссылку
  const match = matches[0];
  const path = match[1]; // Путь после домена
  
  // Определяем тип страницы и текст кнопки
  let buttonText = "💎 Открыть каталог";
  let url = `${MINI_APP_URL}/${path}`;
  
  if (path.includes("promotion") || path.includes("source=qr_promo")) {
    buttonText = "🎯 Открыть акцию";
    // Убеждаемся, что параметр source присутствует
    if (!path.includes("source=")) {
      url = `${MINI_APP_URL}/promotion?source=qr_promo`;
    }
  } else if (path.includes("chat") || path.includes("source=qr_chat")) {
    buttonText = "💬 Связаться с менеджером";
    // Убеждаемся, что параметр source присутствует
    if (!path.includes("source=")) {
      url = `${MINI_APP_URL}/chat?source=qr_chat`;
    }
  }
  
  // Отправляем сообщение с кнопкой Mini App
  await ctx.reply(
    "🔗 Откройте приложение через кнопку ниже:\n\n" +
    "💡 <i>Это откроет приложение в полноэкранном режиме без адресной строки</i>",
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: buttonText,
              web_app: { url },
            },
          ],
        ],
      },
    }
  );
});

// ==================== EXPRESS СЕРВЕР ====================
const app = express();

app.use(cors());
app.use(express.json());

// Эндпоинт для приёма активаций промокодов
app.post("/api/promo-activation", async (req, res) => {
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

    await addActivation(activation);
    console.log(`✅ Промокод ${code} активирован`);

    return res.json({ success: true });
  } catch (error) {
    console.error("Ошибка при обработке активации:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

// Эндпоинт для приёма QR-переходов
app.post("/api/qr-visit", async (req, res) => {
  try {
    const { type, userId, username, firstName, source } = req.body;

    // Логируем входящие данные для отладки
    console.log("📥 QR-переход получен:", {
      type,
      userId,
      username,
      firstName,
      source,
      fullBody: JSON.stringify(req.body),
    });

    if (!type || (type !== "promo" && type !== "chat")) {
      return res.status(400).json({ error: "Тип должен быть 'promo' или 'chat'" });
    }

    // Записываем в Google Sheets
    const { addQRVisitToSheets } = await import("./sheets.js");
    await addQRVisitToSheets({
      type,
      userId: userId || null,
      username: username || null,
      firstName: firstName || null,
      source: source || "",
    });

    console.log(`✅ QR переход (${type}) зарегистрирован`);

    return res.json({ success: true });
  } catch (error) {
    console.error("Ошибка при обработке QR перехода:", error);
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
