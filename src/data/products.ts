// Типы данных для товаров
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  weight: string;
  color: string;
  clarity: string;
  metal: string;
  description?: string;
  category: "rings" | "earrings" | "necklaces" | "collections";
  rating: number; // от 1 до 5
}

// Колье (10 позиций)
export const necklaces: Product[] = [
  {
    id: "necklace-001",
    name: "Колье Eternità",
    price: 172800,
    image: "/images/products/necklaces/MP046649.png",
    weight: "1 ct",
    color: "E",
    clarity: "VVS2",
    metal: "Белое золото 750 пробы",
    category: "necklaces",
    rating: 1,
  },
  {
    id: "necklace-002",
    name: "Колье Cuore",
    price: 172800,
    image: "/images/products/necklaces/MP046650.png",
    weight: "1 ct",
    color: "E",
    clarity: "VVS2",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 2,
  },
  {
    id: "necklace-003",
    name: "Колье Grazia",
    price: 172800,
    image: "/images/products/necklaces/MP046648.png",
    weight: "1 ct",
    color: "F",
    clarity: "VVS2",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 3,
  },
  {
    id: "necklace-004",
    name: "Колье Eternità reale",
    price: 178200,
    image: "/images/products/necklaces/MP046651.png",
    weight: "1.10 ct",
    color: "E-F",
    clarity: "VVS-VS",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 4,
  },
  {
    id: "necklace-005",
    name: "Колье Fiore",
    price: 172800,
    image: "/images/products/necklaces/MP046652.png",
    weight: "1 ct",
    color: "E-F ",
    clarity: "VVS-VS",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 5,
  },
  {
    id: "necklace-006",
    name: "Колье Сroce",
    price: 178200,
    image: "/images/products/necklaces/MP046553.png",
    weight: "1.10 ct",
    color: "E-F",
    clarity: "VVS-VS",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 6,
  },
  {
    id: "necklace-007",
    name: "Колье Brano infinito",
    price: 529200,
    image: "/images/products/necklaces/MP046657.png",
    weight: "4.60 ct",
    color: "E-F",
    clarity: "VVS-VS",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 7,
  },
  {
    id: "necklace-008",
    name: "Колье Lira solare",
    price: 205200,
    image: "/images/products/necklaces/MP046654.png",
    weight: "1 ct",
    color: "Fancy Yellow",
    clarity: "VS2",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 8,
  },
  {
    id: "necklace-009",
    name: "Колье Radiant solare",
    price: 205200,
    image: "/images/products/necklaces/MP046655.png",
    weight: "1 ct",
    color: "Fancy Yellow",
    clarity: "VS2",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 9,
  },
  {
    id: "necklace-010",
    name: "Колье Cuore solare reale",
    price: 221400,
    image: "/images/products/necklaces/MP046656.png",
    weight: "1.85 ct",
    color: "Fancy Yellow/E-F",
    clarity: "VS2/VVS-VS",
    metal: "белое золото 750 пробы",
    category: "necklaces",
    rating: 10,
  },
];

// Кольца (пока пустой массив, добавим позже)
export const rings: Product[] = [];

// Серьги (пока пустой массив, добавим позже)
export const earrings: Product[] = [];

// Украшения с цветными бриллиантами (пока пустой массив, добавим позже)
export const collections: Product[] = [];

// Все товары
export const allProducts: Product[] = [
  ...necklaces,
  ...rings,
  ...earrings,
  ...collections,
];

// Получить товары по категории
export const getProductsByCategory = (category: string): Product[] => {
  switch (category) {
    case "rings":
      return rings;
    case "earrings":
      return earrings;
    case "necklaces":
      return necklaces;
    case "collections":
      return collections;
    default:
      return [];
  }
};

// Получить товар по ID
export const getProductById = (id: string): Product | undefined => {
  return allProducts.find((product) => product.id === id);
};
