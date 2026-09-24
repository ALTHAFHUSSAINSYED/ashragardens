import { SITE_CONFIG } from "@/data/site";

/**
 * Generates a clean, URL-encoded WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(message: string): string {
  const phone = SITE_CONFIG.contact.whatsappNumber;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Creates dynamic product inquiry WhatsApp link
 */
export function getProductWhatsAppUrl(productName: string, productSlug?: string): string {
  const msg = `Hello AshraGardens, I am interested in ordering ${productName}. Please let me know about availability and delivery.`;
  return getWhatsAppUrl(msg);
}

/**
 * Creates dynamic service inquiry WhatsApp link
 */
export function getServiceWhatsAppUrl(serviceName: string): string {
  const msg = `Hello AshraGardens, I am interested in your ${serviceName} service. I would like to know about availability, service coverage and pricing.`;
  return getWhatsAppUrl(msg);
}

/**
 * Creates general consultation WhatsApp link
 */
export function getGeneralWhatsAppUrl(): string {
  const msg = `Hello AshraGardens, I need help choosing the right plants and gardening supplies for my space.`;
  return getWhatsAppUrl(msg);
}
