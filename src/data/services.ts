export interface GardeningService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  benefits: string[];
  suitableFor: string[];
  featured: boolean;
  process: string[];
}

export const STATIC_SERVICES: GardeningService[] = [
  {
    id: "srv-garden-setup",
    name: "Garden Setup",
    slug: "garden-setup",
    shortDescription: "Complete end-to-end garden creation for residential compounds, verandas, and front yards.",
    description:
      "We design, soil-prep, and plant fresh residential gardens customized to your available sunlight, ground soil quality, and aesthetic preferences. Includes soil conditioning with organic vermicompost, stone pathway borders, and plant selection.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Custom layout tailored to local sunlight exposure",
      "Comprehensive soil enrichment with manure and vermicompost",
      "Balanced combination of flowering shrubs and evergreen foliage",
      "Initial 30-day plant establishment guidance",
    ],
    suitableFor: [
      "Individual houses and villas",
      "Front yard lawns and driveway borders",
      "Farmhouse perimeters",
    ],
    featured: true,
    process: [
      "Contact AshraGardens via WhatsApp or Call",
      "Discuss space dimensions and vision",
      "Site assessment in Piduguralla area",
      "Custom plant & soil quotation",
      "Execution and planting",
      "Post-planting care guidelines",
    ],
  },
  {
    id: "srv-balcony-garden",
    name: "Balcony Garden",
    slug: "balcony-garden",
    shortDescription: "Space-efficient green transformations using vertical wall planters, railing brackets, and tiered stands.",
    description:
      "Turn even the most compact apartment balcony into a peaceful private oasis. We utilize lightweight organic potting soils, anti-rust wrought iron stands, and low-maintenance flowering varieties that flourish in shaded or windy conditions.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Zero water leakage or tile staining with matching drain trays",
      "Vertical space optimization with tiered pot stands",
      "Carefully chosen air-purifying and aromatic flowering plants",
      "Lightweight, porous coco peat and vermicompost potting mix",
    ],
    suitableFor: [
      "Apartments and flats",
      "Compact verandas",
      "Railing planter boxes",
    ],
    featured: true,
    process: [
      "Share balcony photos and measurements",
      "Sunlight and wind assessment",
      "Planter and plant selection",
      "Delivery and installation",
      "Maintenance tips",
    ],
  },
  {
    id: "srv-terrace-garden",
    name: "Terrace Garden",
    slug: "terrace-garden",
    shortDescription: "Cooling rooftop garden setups with vegetable grow bags, fruit trees, and shade pergolas.",
    description:
      "Transform your open roof into a cooling botanical roof garden. We install UV-stabilized heavy-duty grow bags, lightweight aerated soil beds, and drip irrigation to lower your indoor summer temperatures while producing organic home-grown vegetables.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Significant reduction in building roof heat absorption",
      "Fresh organic chillies, tomatoes, mint, and lemons at home",
      "Durable UV-treated green grow bags that protect terrace waterproofing",
      "Organized layout with maintenance walkways",
    ],
    suitableFor: [
      "Individual house terraces",
      "Commercial office rooftops",
      "Urban rooftop organic kitchen gardens",
    ],
    featured: true,
    process: [
      "Initial rooftop review & structural weight check",
      "Sunlight and water supply planning",
      "Soil, pots, and sapling delivery",
      "Systematic layout installation",
      "Ongoing seasonal support",
    ],
  },
  {
    id: "srv-plant-maintenance",
    name: "Plant Maintenance",
    slug: "plant-maintenance",
    shortDescription: "Scheduled nursery technician visits for soil tilling, fertilizing, repotting, and pest control.",
    description:
      "Keep your green investments thriving without the stress. Our visiting garden technicians handle seasonal vermicompost application, deadheading, root aeration, repotting root-bound plants, and organic neem oil sprays.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Regular application of organic micronutrients",
      "Timely identification and eradication of mealybugs and aphids",
      "Professional root aeration and pot rejuvenation",
      "Healthier, longer-lasting plant lifespans",
    ],
    suitableFor: [
      "Busy homeowners",
      "Commercial offices and clinics",
      "Seasonal garden rejuvenation",
    ],
    featured: false,
    process: [
      "Schedule visit frequency (monthly or seasonal)",
      "Inspection of existing plants",
      "Pruning, fertilizing, and soil rejuvenation",
      "Follow-up advice",
    ],
  },
  {
    id: "srv-landscaping",
    name: "Landscaping",
    slug: "landscaping",
    shortDescription: "Full-scale landscape planning, natural lawn turf laying, and architectural planting for properties.",
    description:
      "Professional landscape execution for farmhouses, function grounds, and institutions. We source and install fresh lawn turf rolls (Mexican / Bermuda grass), boundary ornamental hedges, flowering focal trees, and garden boulder features.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Stunning property curb appeal and natural cooling",
      "Complete ground leveling, soil screening, and turf establishment",
      "Selection of drought-tolerant and evergreen trees",
      "Integrated drainage and lawn management guidance",
    ],
    suitableFor: [
      "Farmhouses and estates",
      "Function halls and banquet gardens",
      "Residential colonies and gated communities",
    ],
    featured: true,
    process: [
      "Site survey and ground soil analysis",
      "Landscape concept discussion",
      "Detailed quote & timeline",
      "Groundwork and turf laying",
      "Tree & hedge installation",
      "Maintenance handover",
    ],
  },
  {
    id: "srv-pruning",
    name: "Pruning & Plant Care",
    slug: "pruning-plant-care",
    shortDescription: "Horticultural cutting, branch shaping, canopy thinning, and organic pest treatments.",
    description:
      "Improper pruning can stunt or damage plants. Our skilled horticulturists use sterilized bypass tools to selectively prune rose bushes for maximum flowers, thin fruit trees for air circulation, and trim overgrown hedges into crisp clean lines.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Stimulates explosive new flowering shoots",
      "Removes diseased, crossed, or dying wood",
      "Preserves plant aesthetic structure and balance",
      "Reduces pest and fungal harborage",
    ],
    suitableFor: [
      "Mature rose gardens",
      "Fruit trees (mango, guava, lemon)",
      "Hedge borders and topiary shrubs",
    ],
    featured: false,
    process: [
      "Assessment of plant varieties",
      "Sanitized surgical pruning",
      "Foliar protective spray",
      "Post-cut nutrition feeding",
    ],
  },
  {
    id: "srv-irrigation",
    name: "Irrigation Setup",
    slug: "irrigation-setup",
    shortDescription: "Low-pressure micro drip watering systems for balcony pots, terraces, and garden borders.",
    description:
      "Never let your plants dry out during summer trips or busy work days. We design and install efficient drip systems with micro-tubing and adjustable drippers that connect to any outdoor garden tap.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Saves up to 70% water compared to manual hose pipes",
      "Every plant receives calibrated hydration at the root zone",
      "Operates cleanly without splashing mud on walls or floors",
      "Optional battery-operated automated watering timer",
    ],
    suitableFor: [
      "Balcony and terrace planter rows",
      "Home gardens",
      "Vegetable grow bags",
    ],
    featured: false,
    process: [
      "Water source and tap pressure check",
      "Layout and dripper point mapping",
      "Neat line piping and nozzle installation",
      "Flow testing and handover",
    ],
  },
  {
    id: "srv-consultation",
    name: "Garden Consultation",
    slug: "garden-consultation",
    shortDescription: "Expert advice on plant selection, sunlight, soil problems, pest diagnosis, and layout planning.",
    description:
      "Struggling with yellowing leaves, pests, or plants that won't flower? Speak with our experienced Piduguralla nursery specialists for direct diagnosis, corrective action, and plant recommendations tailored to your space.",
    image: "/images/services/balcony-terrace-garden.jpg",
    benefits: [
      "Accurate pest and nutrient deficiency diagnosis",
      "Realistic plant recommendations based on your sunlight hours",
      "Practical watering and organic feeding calendar",
      "Personalized WhatsApp guidance",
    ],
    suitableFor: [
      "New plant parents",
      "Homeowners planning a new green space",
      "Remedying declining plants",
    ],
    featured: false,
    process: [
      "Reach out with space or plant photos",
      "Detailed telephone or in-nursery consultation",
      "Tailored recommendations",
      "Product & care support",
    ],
  },
];
