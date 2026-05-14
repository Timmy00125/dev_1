import type { Category, MenuItem } from "@/types/menu";

// Mirrors Firestore exactly. When you wire useMenu.ts to Firestore,
// just delete this file or use it as a seed script.

export const CATEGORIES: Category[] = [
  { id: "starters", name: "Starters", order: 1, icon: "starters" },
  { id: "mains", name: "Main Courses", order: 2, icon: "mains" },
  { id: "burgers", name: "Burgers", order: 3, icon: "burgers" },
  { id: "salads", name: "Salads", order: 4, icon: "salads" },
  { id: "drinks", name: "Drinks", order: 5, icon: "drinks" },
  { id: "desserts", name: "Desserts", order: 6, icon: "desserts" },
];

// Note on models: the Astronaut.glb URL is Google's canonical model-viewer
// sample asset. It loads everywhere and lets you verify AR end-to-end before
// you ship real food models. Replace with /models/<dish>.glb when ready.
const SAMPLE_GLB =
  "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
const SAMPLE_USDZ =
  "https://modelviewer.dev/shared-assets/models/Astronaut.usdz";

export const MENU: MenuItem[] = [
  {
    id: "burrata-prosciutto",
    categoryId: "starters",
    name: "Burrata with Prosciutto",
    price: 14.0,
    calories: 420,
    description:
      "Hand-pulled burrata over heirloom tomatoes, draped with 24-month aged prosciutto and basil oil.",
    imageUrl:
      "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Burrata", "Prosciutto", "Tomato", "Basil"],
    isRecommended: true,
    heat: 0,
  },
  {
    id: "truffle-dumplings",
    categoryId: "starters",
    name: "Gourmet Truffle Dumplings",
    price: 12.0,
    calories: 380,
    description:
      "Hand-folded dumplings filled with black truffle, ricotta and chive, finished with brown butter.",
    imageUrl:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Truffle", "Ricotta", "Chive", "Brown Butter"],
    heat: 1,
  },
  {
    id: "lobster-thermidor",
    categoryId: "starters",
    name: "Lobster Thermidor",
    price: 38.0,
    calories: 520,
    description:
      "Classic French preparation — Maine lobster baked in cream, mustard and Gruyère.",
    imageUrl:
      "https://images.unsplash.com/photo-1625944525533-473d09f0d3a5?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Lobster", "Cream", "Mustard", "Gruyère"],
    isRecommended: true,
    heat: 0,
  },
  {
    id: "grilled-chicken-salad",
    categoryId: "salads",
    name: "Grilled Chicken Salad",
    price: 25.0,
    calories: 380,
    description:
      "Charcoal-grilled chicken over field greens with cucumber, vine tomato and herb dressing.",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber", "Dressing"],
    isRecommended: true,
    heat: 0,
  },
  {
    id: "wagyu-burger",
    categoryId: "burgers",
    name: "Wagyu Black Truffle Burger",
    price: 32.0,
    calories: 780,
    description:
      "A5 Wagyu patty, black truffle aioli, aged Comté, butter brioche.",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Wagyu", "Truffle Aioli", "Comté", "Brioche"],
    heat: 1,
  },
  {
    id: "ribeye-au-poivre",
    categoryId: "mains",
    name: "Ribeye au Poivre",
    price: 54.0,
    calories: 920,
    description:
      "USDA Prime ribeye, cracked peppercorn crust, cognac cream, hand-cut frites.",
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Ribeye", "Peppercorn", "Cognac", "Frites"],
    isRecommended: true,
    heat: 2,
  },
  {
    id: "old-fashioned",
    categoryId: "drinks",
    name: "Smoked Old Fashioned",
    price: 18.0,
    calories: 180,
    description:
      "Bourbon, demerara, aromatic bitters, finished tableside under applewood smoke.",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&auto=format&fit=crop&q=80",
    ingredients: ["Bourbon", "Demerara", "Bitters", "Smoke"],
    heat: 0,
  },
  {
    id: "tiramisu",
    categoryId: "desserts",
    name: "Tiramisù Classico",
    price: 14.0,
    calories: 460,
    description:
      "Espresso-soaked savoiardi, mascarpone cream, dusted with single-origin cocoa.",
    imageUrl:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&auto=format&fit=crop&q=80",
    modelUrl: SAMPLE_GLB,
    usdzUrl: SAMPLE_USDZ,
    ingredients: ["Mascarpone", "Espresso", "Savoiardi", "Cocoa"],
    heat: 0,
  },
];
