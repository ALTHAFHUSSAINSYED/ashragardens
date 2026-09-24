export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  iconName: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-plants",
    name: "Live Plants & Saplings",
    slug: "plants",
    description: "Kashmiri roses, jasmine, hibiscus, mango grafts, guava, pomegranate, and seasonal flowering varieties.",
    itemCount: 120,
    iconName: "Sprout",
  },
  {
    id: "cat-pots",
    name: "Pots, Planters & Stands",
    slug: "pots-planters",
    description: "Glazed ceramic pots, traditional terracotta clay, durable UV plastic planters, and heavy metal multi-tier plant stands.",
    itemCount: 85,
    iconName: "Package",
  },
  {
    id: "cat-soils",
    name: "Soils, Fertilizers & Compost",
    slug: "soil-fertilizers",
    description: "Nutrient-packed red soil bags, organic vermicompost, washed coco peat bricks, and plant growth tonics.",
    itemCount: 40,
    iconName: "Layers",
  },
  {
    id: "cat-seeds",
    name: "Seeds & Bulbs",
    slug: "seeds",
    description: "High-germination vegetable seeds (chilli, tomato, brinjal), exotic flower seeds, and seasonal bloom bulbs.",
    itemCount: 65,
    iconName: "Sun",
  },
  {
    id: "cat-tools",
    name: "Gardening Tools & Accessories",
    slug: "tools-accessories",
    description: "Stainless steel pruners, heavy-duty garden shears, compression water sprayers, watering cans, and drip kits.",
    itemCount: 35,
    iconName: "Wrench",
  },
  {
    id: "cat-services",
    name: "Gardening Services & Setup",
    slug: "services",
    description: "Complete home terrace garden setups, balcony greens, tree pruning, lawn maintenance, and irrigation consulting.",
    itemCount: 8,
    iconName: "Scissors",
  },
];
