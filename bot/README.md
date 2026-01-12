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

# Порт для API сервера
PORT=3001
```

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

### GET /api/health

Health check эндпоинт.

## Команды бота

- `/start` — Приветствие + кнопка Mini App
- `/stats` — Общая статистика промокодов (только для админа)
- `/stats ПРОМОКОД` — Детальная статистика по промокоду
- `/help` — Справка

## Статистика

Данные сохраняются в файл `promo-stats.json` в папке `bot/`.
