export function getCurrencySymbol(currency: string, locale = "en-US"): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "symbol",
    });

    const parts = formatter.formatToParts(0);
    const symbol = parts.find((p) => p.type === "currency")?.value;

    if (symbol && symbol !== currency) {
      return symbol;
    }
  } catch {
    // do nothing, fallback below
  }

  const fallbackMap: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
    CAD: "CA$",
    AUD: "A$",
    ZAR: "R",
    CNY: "¥",
  };

  return fallbackMap[currency?.toUpperCase()] || currency;
}

export const formatValue = (val: number): string => {
  const num = typeof val === "number" ? val : parseFloat(val);

  if (isNaN(num)) return String(val);

  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 10_000) return `${(num / 1_000).toFixed(0)}k`;

  return num.toString();
};
