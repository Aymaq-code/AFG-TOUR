// utils/formatter.js

import store from "../store";

/**
 * Format currency with proper symbols and decimals
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (USD, EUR, etc.)
 * @param {string} locale - Locale code (en-US, etc.)
 * @returns {string} Formatted currency string
 */

/**
 * Get current currency and conversion rate from Redux store
 */
export const getCurrencyInfo = () => {
  const state = store.getState();
  return {
    currency: state.currency.selectedCurrency,
    rate: state.currency.conversionRate,
  };
};

/**
 * Convert price from USD to selected currency
 * @param {number} usdPrice - Price in USD
 * @returns {number} Price in selected currency
 */
export const convertPrice = (usdPrice) => {
  const { rate } = getCurrencyInfo();
  return usdPrice * rate;
};

/**
 * Format currency with proper symbols and decimals
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (USD, EUR, AED)
 * @param {string} locale - Locale code
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = null, locale = "en-US") => {
  const { currency: selectedCurrency } = getCurrencyInfo();
  const displayCurrency = currency || selectedCurrency;

  // Define currency symbols
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    AED: "AED ",
  };

  const symbol = currencySymbols[displayCurrency] || displayCurrency;

  // For demonstration, we'll use a simple format
  // In production, use Intl.NumberFormat
  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return displayCurrency === "AED"
    ? `AED ${formattedAmount}`
    : `${symbol}${formattedAmount}`;
};

/**
 * Format price with conversion
 * @param {number} usdPrice - Price in USD
 * @param {boolean} showCurrencyCode - Whether to show currency code
 * @returns {string} Formatted price in selected currency
 */
export const formatPrice = (usdPrice, showCurrencyCode = false) => {
  const convertedPrice = convertPrice(usdPrice);
  const { currency } = getCurrencyInfo();

  if (showCurrencyCode) {
    return `${formatCurrency(convertedPrice)} ${currency}`;
  }

  return formatCurrency(convertedPrice);
};

/**
 * Format card number with spaces (XXXX XXXX XXXX XXXX)
 * @param {string} cardNumber - Card number
 * @returns {string} Formatted card number
 */
export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return "";
  return cardNumber
    .replace(/\s/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};

/**
 * Format date in readable format
 */
export const formatDate = (date, locale = "en-US") => {
  if (!date) return "Not selected";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format date in short format (MM/DD/YYYY)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatShortDate = (date) => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US");
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
