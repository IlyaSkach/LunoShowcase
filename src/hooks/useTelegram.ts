import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            username?: string;
            first_name?: string;
            last_name?: string;
          };
        };
        initData?: string;
        expand: () => void;
        ready: () => void;
        close: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        BackButton?: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        MainButton?: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
      };
    };
  }
}

export function useTelegram() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.warn("Telegram WebApp не найден. Приложение работает в обычном браузере.");
      return;
    }

    // Расширяем на весь экран (скрывает адресную строку)
    tg.expand();

    // Уведомляем Telegram, что приложение готово
    tg.ready();

    // Настраиваем цвета
    tg.setHeaderColor("#ffffff"); // Белый цвет заголовка
    tg.setBackgroundColor("#ffffff"); // Белый фон

    // Включаем подтверждение закрытия (опционально)
    // tg.enableClosingConfirmation();

    console.log("✅ Telegram WebApp инициализирован в полноэкранном режиме");
  }, []);
}
