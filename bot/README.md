# LUNO Bot — Статистика промокодов

## Установка

```bash
cd bot
npm install
```

## Настройка

Создай файл `.env` в папке `bot/`:

```env
# Токен бота от @BotFather
BOT_TOKEN=your_bot_token_here

# Твой Telegram ID (для команды /stats)
# Узнать можно у @userinfobot
ADMIN_ID=your_telegram_id

# URL Mini App
MINI_APP_URL=https://lunosho.netlify.app/

# Порт для API сервера
PORT=3001

# Google Sheets (опционально, но рекомендуется)
GOOGLE_SHEETS_ID=your_spreadsheet_id
GOOGLE_SHEETS_CREDENTIALS_PATH=./credentials.json
```

### Google Sheets Setup

1. Создай Google таблицу с двумя листами:
   - "Промокоды" (заголовки: Дата, Время, Промокод, Скидка, User ID, Username, Имя, Товар ID, Название товара)
   - "QR Переходы" (заголовки: Дата, Время, Тип, User ID, Username, Имя, Источник)

2. Настрой Service Account в Google Cloud Console

3. Скачай JSON credentials и сохрани как `bot/credentials.json`

4. Дай доступ Service Account email к таблице (Editor)

5. Укажи `GOOGLE_SHEETS_ID` в `.env` (ID из URL таблицы)

## Запуск

**Разработка:**

```bash
npm run dev
```

**Продакшен:**

```bash
npm run build
npm start
```

## API

### POST /api/promo-activation

Принимает данные об активации промокода.

```json
{
  "code": "SATELLUNO",
  "userId": 123456789,
  "username": "username",
  "firstName": "Имя",
  "productId": "ring-001",
  "productName": "Кольцо с бриллиантом",
  "discount": 15000
}
```

### POST /api/qr-visit

Принимает данные о QR-переходе.

```json
{
  "type": "promo",
  "userId": 123456789,
  "username": "username",
  "firstName": "Имя",
  "source": "qr_promo"
}
```

**Типы:**
- `promo` — переход на страницу акции
- `chat` — переход на чат с менеджером

### GET /api/health

Health check эндпоинт.

## Команды бота

- `/start` — Приветствие + кнопка Mini App
- `/stats` — Общая статистика промокодов (только для админа)
- `/stats ПРОМОКОД` — Детальная статистика по промокоду
- `/help` — Справка

## Статистика

Данные сохраняются:
- **В Google Sheets** (если настроено) — основное хранилище
- **В файл `promo-stats.json`** — backup для локальной статистики

Все данные автоматически синхронизируются с Google Sheets при каждой активации промокода или QR-переходе.
