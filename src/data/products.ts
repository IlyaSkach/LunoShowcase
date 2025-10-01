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
    name: "Lyra",
    price: 245800,
    image: "/images/products/necklaces/test.png",
    weight: "2.5 ct",
    color: "D",
    clarity: "VVS1",
    metal: "Белое золото 585 пробы",
    category: "necklaces",
    description: "Изысканное колье с бриллиантами высшего качества",
    rating: 5,
  },
  {
    id: "necklace-002",
    name: "Aurora",
    price: 298500,
    image: "/images/products/necklaces/test.png",
    weight: "3.2 ct",
    color: "E",
    clarity: "VVS2",
    metal: "Белое золото 750 пробы",
    category: "necklaces",
    description: "Элегантное колье с центральным бриллиантом",
    rating: 4,
  },
  {
    id: "necklace-003",
    name: "Celestia",
    price: 187300,
    image: "/images/products/necklaces/test.png",
    weight: "1.8 ct",
    color: "F",
    clarity: "VS1",
    metal: "Белое золото 585 пробы",
    category: "necklaces",
    description: "Нежное колье в классическом стиле",
    rating: 4,
  },
  {
    id: "necklace-004",
    name: "Stella",
    price: 342100,
    image: "/images/products/necklaces/test.png",
    weight: "4.1 ct",
    color: "D",
    clarity: "IF",
    metal: "Платина 950 пробы",
    category: "necklaces",
    description: "Роскошное колье с бриллиантами премиум класса",
    rating: 5,
  },
  {
    id: "necklace-005",
    name: "Diana",
    price: 156900,
    image: "/images/products/necklaces/test.png",
    weight: "1.5 ct",
    color: "G",
    clarity: "VS2",
    metal: "Белое золото 585 пробы",
    category: "necklaces",
    description: "Утонченное колье для особых случаев",
    rating: 3,
  },
  {
    id: "necklace-006",
    name: "Victoria",
    price: 412600,
    image: "/images/products/necklaces/test.png",
    weight: "5.3 ct",
    color: "D",
    clarity: "VVS1",
    metal: "Платина 950 пробы",
    category: "necklaces",
    description: "Эксклюзивное колье с россыпью бриллиантов",
    rating: 5,
  },
  {
    id: "necklace-007",
    name: "Sophia",
    price: 198400,
    image: "/images/products/necklaces/test.png",
    weight: "2.1 ct",
    color: "E",
    clarity: "VVS2",
    metal: "Белое золото 750 пробы",
    category: "necklaces",
    description: "Стильное колье с геометрическим дизайном",
    rating: 4,
  },
  {
    id: "necklace-008",
    name: "Luna",
    price: 267800,
    image: "/images/products/necklaces/test.png",
    weight: "2.9 ct",
    color: "F",
    clarity: "VS1",
    metal: "Белое золото 585 пробы",
    category: "necklaces",
    description: "Романтичное колье в современном исполнении",
    rating: 4,
  },
  {
    id: "necklace-009",
    name: "Isabella",
    price: 385200,
    image: "/images/products/necklaces/test.png",
    weight: "4.7 ct",
    color: "D",
    clarity: "IF",
    metal: "Платина 950 пробы",
    category: "necklaces",
    description: "Величественное колье с безупречными бриллиантами",
    rating: 5,
  },
  {
    id: "necklace-010",
    name: "Anastasia",
    price: 223700,
    image: "/images/products/necklaces/test.png",
    weight: "2.4 ct",
    color: "E",
    clarity: "VVS1",
    metal: "Белое золото 750 пробы",
    category: "necklaces",
    description: "Изящное колье с элегантным дизайном",
    rating: 5,
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
