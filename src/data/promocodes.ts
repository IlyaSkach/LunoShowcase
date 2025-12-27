// Типы данных для промокодов
export interface Promocode {
  code: string; // Код промокода (в верхнем регистре)
  discount: number; // Сумма скидки в рублях
  description?: string; // Описание промокода (опционально)
  isActive: boolean; // Активен ли промокод
}

// Список промокодов
// Добавляйте новые промокоды в этот массив
export const promocodes: Promocode[] = [
  {
    code: "SATELLUNO",
    discount: 15000,
    description: "Промокод от партнёра Satelluno",
    isActive: true,
  },
  // Примеры других промокодов:
  // {
  //   code: "ПРОМОКОД_1",
  //   discount: 10000,
  //   description: "Описание промокода",
  //   isActive: true,
  // },
  // {
  //   code: "ПРОМОКОД_2",
  //   discount: 10000,
  //   description: "Описание промокода",
  //   isActive: true,
  // },
];

// Функция для проверки промокода
export const validatePromocode = (
  code: string
): { valid: boolean; discount: number; message: string } => {
  if (!code.trim()) {
    return { valid: false, discount: 0, message: "" };
  }

  const normalizedCode = code.trim().toUpperCase();
  const promo = promocodes.find((p) => p.code === normalizedCode && p.isActive);

  if (promo) {
    return {
      valid: true,
      discount: promo.discount,
      message: `Промокод применён! Скидка: ${promo.discount.toLocaleString(
        "ru-RU"
      )} ₽`,
    };
  }

  return {
    valid: false,
    discount: 0,
    message: "Промокод не найден или недействителен",
  };
};

// Функция для расчёта цены со скидкой
export const calculateDiscountedPrice = (
  originalPrice: number,
  discount: number
): number => {
  const discountedPrice = originalPrice - discount;
  return discountedPrice > 0 ? discountedPrice : 0;
};
