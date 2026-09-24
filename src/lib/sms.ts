import { SITE_CONFIG } from "@/data/site";

/**
 * Generates an SMS link for mobile devices
 */
export function getSmsUrl(message: string): string {
  const phone = SITE_CONFIG.contact.phone.replace(/\s+/g, "");
  return `sms:${phone}?body=${encodeURIComponent(message.trim())}`;
}

export function getProductSmsUrl(productName: string): string {
  const msg = `Hello AshraGardens, I would like to order ${productName} (SMS Order). Please confirm availability and delivery in Piduguralla area.`;
  return getSmsUrl(msg);
}

export function getServiceSmsUrl(serviceName: string): string {
  const msg = `Hello AshraGardens, I would like to request an appointment/quote for ${serviceName}. Please reply with details.`;
  return getSmsUrl(msg);
}
