export interface ServiceArea {
  name: string;
  pincode: string;
  distanceFromHubKm: number;
  deliveryAvailable: boolean;
  gardeningServiceAvailable: boolean;
  deliveryNote: string;
}

export const STATIC_SERVICE_AREAS: ServiceArea[] = [
  {
    name: "Piduguralla Town & Mayabazar",
    pincode: "522413",
    distanceFromHubKm: 2,
    deliveryAvailable: true,
    gardeningServiceAvailable: true,
    deliveryNote: "Primary Nursery Hub. Same-day delivery available.",
  },
  {
    name: "Dachepalle & Nadikudi",
    pincode: "522414",
    distanceFromHubKm: 14,
    deliveryAvailable: true,
    gardeningServiceAvailable: true,
    deliveryNote: "Regular scheduled delivery within 24-48 hours.",
  },
  {
    name: "Gurazala & Rentachintala",
    pincode: "522415",
    distanceFromHubKm: 22,
    deliveryAvailable: true,
    gardeningServiceAvailable: true,
    deliveryNote: "Scheduled deliveries and site assessments.",
  },
  {
    name: "Macherla Area",
    pincode: "522426",
    distanceFromHubKm: 28,
    deliveryAvailable: true,
    gardeningServiceAvailable: true,
    deliveryNote: "Delivery available for plant, pot, and soil orders.",
  },
  {
    name: "Narasaraopet Outer / Palnadu Border",
    pincode: "522601",
    distanceFromHubKm: 32,
    deliveryAvailable: true,
    gardeningServiceAvailable: true,
    deliveryNote: "Weekly delivery run and large project services.",
  },
];

export const SERVICE_AREAS_NOTICE =
  "Currently serving selected nearby areas within ~30 km radius of Piduguralla. Contact us directly to confirm availability for your specific location.";
