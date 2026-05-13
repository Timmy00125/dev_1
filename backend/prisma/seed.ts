import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { id: 'starters', name: 'Starters', order: 1, icon: 'starters' },
  { id: 'mains', name: 'Main Courses', order: 2, icon: 'mains' },
  { id: 'burgers', name: 'Burgers', order: 3, icon: 'burgers' },
  { id: 'salads', name: 'Salads', order: 4, icon: 'salads' },
  { id: 'drinks', name: 'Drinks', order: 5, icon: 'drinks' },
  { id: 'desserts', name: 'Desserts', order: 6, icon: 'desserts' },
];

const SAMPLE_GLB = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
const SAMPLE_USDZ = 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz';

async function main() {
  await prisma.restaurant.deleteMany().catch(() => {});
  await prisma.menuItem.deleteMany().catch(() => {});
  await prisma.processingJob.deleteMany().catch(() => {});

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'The Golden Oak',
      slug: 'golden-oak',
    },
  });

  const menuItems = [
    {
      restaurantId: restaurant.id,
      categoryId: 'starters',
      name: 'Burrata with Prosciutto',
      price: 14.0,
      calories: 420,
      description: 'Hand-pulled burrata over heirloom tomatoes, draped with 24-month aged prosciutto and basil oil.',
      imageUrl: 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=900&auto=format&fit=crop&q=80',
      modelUrl: SAMPLE_GLB,
      usdzUrl: SAMPLE_USDZ,
      ingredients: JSON.stringify(['Burrata', 'Prosciutto', 'Tomato', 'Basil']),
      isRecommended: true,
      heat: 0,
      status: 'COMPLETED' as const,
    },
    {
      restaurantId: restaurant.id,
      categoryId: 'starters',
      name: 'Gourmet Truffle Dumplings',
      price: 12.0,
      calories: 380,
      description: 'Hand-folded dumplings filled with black truffle, ricotta and chive, finished with brown butter.',
      imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=900&auto=format&fit=crop&q=80',
      modelUrl: SAMPLE_GLB,
      usdzUrl: SAMPLE_USDZ,
      ingredients: JSON.stringify(['Truffle', 'Ricotta', 'Chive', 'Brown Butter']),
      isRecommended: false,
      heat: 1,
      status: 'COMPLETED' as const,
    },
    {
      restaurantId: restaurant.id,
      categoryId: 'mains',
      name: 'Ribeye au Poivre',
      price: 54.0,
      calories: 920,
      description: 'USDA Prime ribeye, cracked peppercorn crust, cognac cream, hand-cut frites.',
      imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=900&auto=format&fit=crop&q=80',
      modelUrl: null,
      usdzUrl: null,
      ingredients: JSON.stringify(['Ribeye', 'Peppercorn', 'Cognac', 'Frites']),
      isRecommended: true,
      heat: 2,
      status: 'COMPLETED' as const,
    },
    {
      restaurantId: restaurant.id,
      categoryId: 'burgers',
      name: 'Wagyu Black Truffle Burger',
      price: 32.0,
      calories: 780,
      description: 'A5 Wagyu patty, black truffle aioli, aged Comté, butter brioche.',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80',
      modelUrl: null,
      usdzUrl: null,
      ingredients: JSON.stringify(['Wagyu', 'Truffle Aioli', 'Comté', 'Brioche']),
      isRecommended: false,
      heat: 1,
      status: 'COMPLETED' as const,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log('Seeded restaurant and menu items');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
