// URL API сервера бота
// В разработке: http://localhost:3001
// В продакшене: замените на реальный URL вашего сервера
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Получение данных пользователя из Telegram Web App
function getTelegramUser(): {
  userId: number | null;
  username: string | null;
  firstName: string | null;
} {
  try {
    const tg = (window as any).Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (user) {
      return {
        userId: user.id || null,
        username: user.username || null,
        firstName: user.first_name || null,
      };
    }
  } catch (error) {
    console.warn("Не удалось получить данные пользователя Telegram:", error);
  }

  return { userId: null, username: null, firstName: null };
}

// Отправка данных об активации промокода
export async function sendPromoActivation(data: {
  code: string;
  discount: number;
  productId?: string;
  productName?: string;
}): Promise<void> {
  try {
    const user = getTelegramUser();

    const response = await fetch(`${API_URL}/api/promo-activation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        discount: data.discount,
        productId: data.productId || null,
        productName: data.productName || null,
        ...user,
      }),
    });

    if (!response.ok) {
      console.warn("Ошибка отправки статистики промокода:", response.status);
    }
  } catch (error) {
    // Не блокируем UI при ошибке отправки статистики
    console.warn("Не удалось отправить статистику промокода:", error);
  }
}
