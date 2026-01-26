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
    // Пробуем разные способы получения данных
    const tg = (window as any).Telegram?.WebApp;
    
    // Способ 1: initDataUnsafe (быстрый, но может быть небезопасен)
    let user = tg?.initDataUnsafe?.user;
    
    // Способ 2: если initDataUnsafe пуст, пробуем через initData (требует парсинга)
    if (!user && tg?.initData) {
      try {
        // Парсим initData (формат: key1=value1&key2=value2&user={...})
        const params = new URLSearchParams(tg.initData);
        const userParam = params.get("user");
        if (userParam) {
          user = JSON.parse(decodeURIComponent(userParam));
        }
      } catch (e) {
        console.warn("Не удалось распарсить initData:", e);
      }
    }

    if (user) {
      const result = {
        userId: user.id || null,
        username: user.username || null,
        firstName: user.first_name || null,
      };
      
      // Логируем для отладки (только в dev режиме)
      if (import.meta.env.DEV) {
        console.log("👤 Данные пользователя Telegram:", result);
      }
      
      return result;
    } else {
      // Логируем, если данные не найдены
      if (import.meta.env.DEV) {
        console.warn("⚠️ Telegram WebApp данные не найдены:", {
          hasTelegram: !!window.Telegram,
          hasWebApp: !!(window as any).Telegram?.WebApp,
          hasInitDataUnsafe: !!(window as any).Telegram?.WebApp?.initDataUnsafe,
          hasInitData: !!(window as any).Telegram?.WebApp?.initData,
        });
      }
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

// Отправка данных о QR-переходе
export async function sendQRVisit(data: {
  type: "promo" | "chat";
  source?: string;
}): Promise<void> {
  try {
    const user = getTelegramUser();

    const response = await fetch(`${API_URL}/api/qr-visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: data.type,
        source: data.source || "",
        ...user,
      }),
    });

    if (!response.ok) {
      console.warn("Ошибка отправки статистики QR-перехода:", response.status);
    }
  } catch (error) {
    // Не блокируем UI при ошибке отправки статистики
    console.warn("Не удалось отправить статистику QR-перехода:", error);
  }
}
