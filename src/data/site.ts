// ==============================================================================
// ASHRAGARDENS: CENTRALIZED BUSINESS CONFIGURATION
// Single source of truth for business information, contacts, and payment profiles
// ==============================================================================

export const SITE_CONFIG = {
  name: "AshraGardens",
  shortName: "AshraGardens",
  tagline: "Bring Nature Closer to Home",
  description:
    "Local plant nursery and gardening center offering healthy flowering & fruit plants, pots, planters, organic soils, fertilizers, and professional gardening services across Piduguralla and surrounding areas.",
  url: "https://ashragardens.com",

  // Contact Information
  contact: {
    phone: "+91 9491366841",
    displayPhone: "+91 94913 66841",
    whatsappNumber: "919491366841",
    email: "ashragardens@gmail.com",
    address: {
      street: "Mayabazar",
      city: "Piduguralla",
      district: "Palnadu District",
      state: "Andhra Pradesh",
      pincode: "522413",
      formatted: "Mayabazar, Piduguralla, Palnadu District, Andhra Pradesh - 522413",
    },
    businessHours: "Monday – Sunday: 7:00 AM – 7:30 PM",
    serviceRadiusKm: 30,
    hubLocation: "Mayabazar, Piduguralla",
  },

  // Payment Profile
  payment: {
    beneficiaryName: "mahaboob khan pathan",
    displayBeneficiary: "Mahaboob Khan Pathan",
    upiId: "pathankhandme1@ybl",
    bank: "Canara Bank (A/C ending 7489)",
    provider: "PhonePe",
    qrImageUrl: "/images/payment/ashragardens_phonepe_qr.png",
    verificationNotice: "Please verify the name as the banker's name before you pay.",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Plants", href: "/plants" },
    { label: "Garden Accessories", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
