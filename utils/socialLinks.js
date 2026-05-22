export function resolveWhatsAppUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  if (/^(https?:\/\/|whatsapp:\/\/)/i.test(raw)) {
    return raw;
  }

  const digits = raw.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function resolveTelegramUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  if (/^(https?:\/\/|tg:\/\/)/i.test(raw)) {
    return raw;
  }

  const handle = raw.replace(/^@/, "").replace(/\s+/g, "");
  return handle ? `https://t.me/${handle}` : "";
}

export function resolveSupportUrl(type, value = "") {
  if (type === "whatsapp") {
    return resolveWhatsAppUrl(value);
  }

  return resolveTelegramUrl(value);
}
