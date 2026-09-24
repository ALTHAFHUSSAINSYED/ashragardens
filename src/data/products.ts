export type ProductAvailability = "AVAILABLE" | "OUT_OF_STOCK" | "CONTACT_FOR_AVAILABILITY";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category:
    | "Plants"
    | "Indoor Plants"
    | "Outdoor Plants"
    | "Flowering Plants"
    | "Fruit Plants"
    | "Pots & Planters"
    | "Seeds"
    | "Soil & Fertilizers"
    | "Gardening Tools"
    | "Garden Accessories"
    | "Plant Care";
  description: string;
  shortDescription: string;
  price?: number;
  unit: string;
  image: string;
  availability: ProductAvailability;
  featured: boolean;
  tags: string[];
  careInfo?: {
    sunlight: string;
    watering: string;
    soil: string;
    maintenance: string;
  };
}

export const STATIC_PRODUCTS: Product[] = [
  {
    id: "prod-rose-001",
    name: "Kashmiri Royal Red Rose Plant",
    slug: "kashmiri-royal-red-rose-plant",
    category: "Flowering Plants",
    shortDescription: "Grafted perennial rose producing velvety crimson, intensely fragrant blooms.",
    description:
      "A prized variety acclimatized to the Palnadu climate. This grafted Kashmiri Red Rose is known for its resilient root system and continuous cluster blooms throughout the year. Perfect for balcony pots, sunny garden borders, or front-yard verandas.",
    price: 150,
    unit: "per potted plant",
    image: "/images/products/kashmiri-rose.jpg",
    availability: "AVAILABLE",
    featured: true,
    tags: ["rose", "flowering", "fragrant", "outdoor", "grafted", "bestseller"],
    careInfo: {
      sunlight: "Full morning sunlight (4-6 hours daily)",
      watering: "Water every morning when topsoil feels dry; avoid soggy roots",
      soil: "Well-draining red soil mixed with 30% organic vermicompost",
      maintenance: "Light pruning after every bloom cycle encourages fresh flowering shoots",
    },
  },
  {
    id: "prod-ceramic-002",
    name: "Glazed Emerald Ceramic Planter with Wrought Iron Stand",
    slug: "glazed-emerald-ceramic-planter-stand",
    category: "Pots & Planters",
    shortDescription: "10-inch hand-glazed ceramic pot with heavy-duty rust-resistant decorative metal stand.",
    description:
      "Crafted from high-temperature kiln-fired clay with a rich emerald green glaze that will not fade in sun or rain. Fitted with an essential bottom drainage hole and elevated by a sturdy, powder-coated wrought iron stand that keeps patio and balcony tiles clean.",
    price: 650,
    unit: "pot + metal stand set",
    image: "/images/products/ceramic-planter.jpg",
    availability: "AVAILABLE",
    featured: true,
    tags: ["pots", "ceramic", "planters", "stands", "decor", "balcony"],
  },
  {
    id: "prod-soil-003",
    name: "Enriched Organic Potting Soil & Vermicompost Sack",
    slug: "enriched-organic-potting-soil-vermicompost",
    category: "Soil & Fertilizers",
    shortDescription: "Screened high-mineral red soil enriched with earthworm compost, coco peat, and neem cake.",
    description:
      "Our signature nursery potting mix, prepared on-site in Piduguralla. Carefully balanced with aged red soil, pure earthworm vermicompost, moisture-retentive coco peat, and natural neem meal to protect roots from soil-borne pests. Ready to plant immediately with no extra additives needed.",
    price: 180,
    unit: "10 kg breathable sack",
    image: "/images/products/organic-soil.jpg",
    availability: "AVAILABLE",
    featured: true,
    tags: ["soil", "fertilizer", "vermicompost", "organic", "potting mix"],
  },
  {
    id: "prod-mango-004",
    name: "Banganapalli Sweet Mango Grafted Sapling",
    slug: "banganapalli-sweet-mango-sapling",
    category: "Fruit Plants",
    shortDescription: "Authentic Andhra Banganapalli grafted tree sapling, ready for farm or orchard planting.",
    description:
      "Grafted from disease-free, high-yielding mother trees in Andhra Pradesh. Known for large, fibreless golden-yellow mangoes with a rich aromatic pulp. Starts fruiting within 2 to 3 years with proper seasonal care.",
    price: 280,
    unit: "per 2.5 ft sapling",
    image: "/images/products/kashmiri-rose.jpg",
    availability: "AVAILABLE",
    featured: true,
    tags: ["mango", "fruit", "grafted", "farm", "sweet"],
    careInfo: {
      sunlight: "Abundant direct sunlight (6+ hours)",
      watering: "Regular watering in first year; taper down as root deepens",
      soil: "Deep loamy red soil with good drainage",
      maintenance: "Support stem with bamboo stake during monsoon winds",
    },
  },
  {
    id: "prod-jasmine-005",
    name: "Arabian Jasmine / Gundu Malli",
    slug: "arabian-jasmine-gundu-malli",
    category: "Flowering Plants",
    shortDescription: "Classic round fragrant white jasmine buds, essential for traditional Andhra households.",
    description:
      "A bushy, vigorous climbing shrub loaded with iconic fragrant white blossoms. Widely cultivated for personal adornment, garlands, and religious offerings. Thrives under warm Palnadu weather conditions.",
    price: 120,
    unit: "per plant",
    image: "/images/products/kashmiri-rose.jpg",
    availability: "AVAILABLE",
    featured: false,
    tags: ["jasmine", "malli", "fragrant", "pooja", "white flowers"],
  },
  {
    id: "prod-pruner-006",
    name: "Bypass Garden Pruning Shears (SK-5 Steel)",
    slug: "bypass-garden-pruning-shears-sk5",
    category: "Gardening Tools",
    shortDescription: "Precision Japanese SK-5 carbon steel hand shears with safety lock and comfortable rubber grip.",
    description:
      "A must-have tool for every plant enthusiast. Cleanly cuts stems, deadheads roses, and trims branches up to 20mm diameter without bruising plant tissues. Includes replacement tension spring.",
    price: 399,
    unit: "per piece",
    image: "/images/products/organic-soil.jpg",
    availability: "AVAILABLE",
    featured: false,
    tags: ["tools", "pruner", "cutter", "shears", "accessories"],
  },
  {
    id: "prod-stand-007",
    name: "Heavy-Duty 3-Tier Step Metal Plant Stand",
    slug: "heavy-duty-3-tier-step-plant-stand",
    category: "Garden Accessories",
    shortDescription: "Powder-coated rustproof tiered iron rack that neatly organizes 6 to 9 flower pots.",
    description:
      "Constructed from heavy-gauge hollow rectangular steel with electrostatic black powder coating. Saves floor space, maximizes sunlight for every tier, and elevates balcony gardens.",
    price: 999,
    unit: "per stand unit",
    image: "/images/products/ceramic-planter.jpg",
    availability: "CONTACT_FOR_AVAILABILITY",
    featured: true,
    tags: ["stands", "accessories", "metal", "space-saving", "balcony"],
  },
  {
    id: "prod-seeds-008",
    name: "Andhra Guntur Hot Chilli Seeds",
    slug: "andhra-guntur-hot-chilli-seeds",
    category: "Seeds",
    shortDescription: "High-germination hybrid seeds for spicy, deep green-to-red Guntur chillies.",
    description:
      "Carefully graded and germination-tested seeds selected for vigorous branching and heavy fruiting. Matures in 65 to 70 days after transplanting.",
    price: 75,
    unit: "pack of 100 seeds",
    image: "/images/products/organic-soil.jpg",
    availability: "AVAILABLE",
    featured: false,
    tags: ["seeds", "vegetables", "chilli", "kitchen garden"],
  },
];
