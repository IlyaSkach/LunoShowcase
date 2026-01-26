import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Конфигурация из .env
const SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const CREDENTIALS_PATH =
  process.env.GOOGLE_SHEETS_CREDENTIALS_PATH ||
  path.join(__dirname, "..", "credentials.json");

if (!SHEETS_ID) {
  console.warn("⚠️ GOOGLE_SHEETS_ID не указан в .env");
}

// Инициализация Google Sheets API
let sheets: ReturnType<typeof google.sheets> | null = null;

async function initSheets() {
  if (sheets) return sheets;

  try {
    console.log(`📝 Инициализация Google Sheets API...`);
    console.log(`   Credentials path: ${CREDENTIALS_PATH}`);
    console.log(`   Sheets ID: ${SHEETS_ID}`);

    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    sheets = google.sheets({ version: "v4", auth: authClient as any });

    console.log(`✅ Google Sheets API инициализирован`);
    return sheets;
  } catch (error: any) {
    console.error("❌ Ошибка инициализации Google Sheets:", error.message);
    if (error.code) console.error(`   Код ошибки: ${error.code}`);
    return null;
  }
}

// Получить имя листа по индексу (0 = первый лист)
async function getSheetName(sheetIndex: number): Promise<string | null> {
  if (!SHEETS_ID) return null;

  try {
    const sheetsClient = await initSheets();
    if (!sheetsClient) return null;

    const response = await sheetsClient.spreadsheets.get({
      spreadsheetId: SHEETS_ID,
    });

    const sheet = response.data.sheets?.[sheetIndex];
    return sheet?.properties?.title || null;
  } catch (error) {
    console.error("Ошибка получения имени листа:", error);
    return null;
  }
}

// Добавить строку в лист "Промокоды" (первый лист, индекс 0)
export async function addPromoToSheets(data: {
  code: string;
  discount: number;
  userId: number | null;
  username: string | null;
  firstName: string | null;
  productId: string | null;
  productName: string | null;
}): Promise<boolean> {
  if (!SHEETS_ID) {
    console.warn("⚠️ GOOGLE_SHEETS_ID не указан, пропускаем запись в Sheets");
    return false;
  }

  try {
    const sheetsClient = await initSheets();
    if (!sheetsClient) return false;

    const now = new Date();
    const date = now.toLocaleDateString("ru-RU");
    const time = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Получаем имя первого листа (Промокоды)
    const sheetName = await getSheetName(0);
    if (!sheetName) {
      console.error("❌ Не удалось получить имя листа 'Промокоды'");
      return false;
    }

    const values = [
      [
        date,
        time,
        data.code.toUpperCase(),
        data.discount.toString(),
        data.userId?.toString() || "",
        data.username || "",
        data.firstName || "",
        data.productId || "",
        data.productName || "",
      ],
    ];

    await sheetsClient.spreadsheets.values.append({
      spreadsheetId: SHEETS_ID,
      range: `${sheetName}!A:I`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log(`✅ Промокод ${data.code} записан в Google Sheets (лист: ${sheetName})`);
    return true;
  } catch (error: any) {
    console.error("❌ Ошибка записи промокода в Sheets:", error.message);
    if (error.code) console.error(`   Код ошибки: ${error.code}`);
    if (error.response?.data) {
      console.error(`   Детали:`, JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// Добавить строку в лист "QR Переходы" (второй лист, индекс 1)
export async function addQRVisitToSheets(data: {
  type: "promo" | "chat";
  userId: number | null;
  username: string | null;
  firstName: string | null;
  source?: string;
}): Promise<boolean> {
  if (!SHEETS_ID) {
    console.warn("⚠️ GOOGLE_SHEETS_ID не указан, пропускаем запись в Sheets");
    return false;
  }

  try {
    const sheetsClient = await initSheets();
    if (!sheetsClient) return false;

    const now = new Date();
    const date = now.toLocaleDateString("ru-RU");
    const time = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Получаем имя второго листа (QR Переходы)
    const sheetName = await getSheetName(1);
    if (!sheetName) {
      console.error("❌ Не удалось получить имя листа 'QR Переходы'");
      return false;
    }

    const typeLabel = data.type === "promo" ? "Акция" : "Чат";

    const values = [
      [
        date,
        time,
        typeLabel,
        data.userId?.toString() || "",
        data.username || "",
        data.firstName || "",
        data.source || "",
      ],
    ];

    await sheetsClient.spreadsheets.values.append({
      spreadsheetId: SHEETS_ID,
      range: `${sheetName}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log(`✅ QR переход (${typeLabel}) записан в Google Sheets`);
    return true;
  } catch (error) {
    console.error("❌ Ошибка записи QR перехода в Sheets:", error);
    return false;
  }
}
