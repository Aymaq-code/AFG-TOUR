// utils/constants.js

// utils/constants.js (updated)
// Currency Options
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "AED", symbol: "AED ", name: "UAE Dirham", rate: 3.67 },
];

// Currency Symbols for display
export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  AED: "AED ",
};

export const PAYMENT_METHODS = [
  {
    id: "credit",
    label: "Credit/Debit Card",
    icon: "💳",
    description: "Pay securely with your card",
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: "💸",
    description: "Fast and secure PayPal payment",
  },
  {
    id: "crypto",
    label: "Cryptocurrency",
    icon: "₿",
    description: "Pay with Bitcoin, Ethereum, etc.",
  },
];

// Tour Categories
export const TOUR_CATEGORIES = [
  { id: "all", label: "All Tours" },
  { id: "adventure", label: "Adventure" },
  { id: "cultural", label: "Cultural" },
  { id: "beach", label: "Beach & Relaxation" },
  { id: "mountain", label: "Mountain" },
  { id: "city", label: "City Tours" },
  { id: "wildlife", label: "Wildlife & Nature" },
];

// Price Ranges
export const PRICE_RANGES = [
  { label: "Budget ($0-200)", min: 0, max: 200 },
  { label: "Economy ($200-500)", min: 200, max: 500 },
  { label: "Premium ($500-800)", min: 500, max: 800 },
  { label: "Luxury ($800+)", min: 800, max: 10000 },
];

// Extra Service Types
export const EXTRA_SERVICE_TYPES = [
  { id: "transport", label: "Transport", icon: "🚗" },
  { id: "guide", label: "Tour Guide", icon: "👨‍🏫" },
  { id: "meal", label: "Meal Package", icon: "🍽️" },
  { id: "insurance", label: "Travel Insurance", icon: "🛡️" },
  { id: "photography", label: "Photography", icon: "📸" },
];

// Hotel Star Ratings
export const HOTEL_STAR_RATINGS = [
  { value: 1, label: "1 Star - Budget" },
  { value: 2, label: "2 Stars - Economy" },
  { value: 3, label: "3 Stars - Comfort" },
  { value: 4, label: "4 Stars - Premium" },
  { value: 5, label: "5 Stars - Luxury" },
];

// Country Codes for Phone Numbers
export const COUNTRY_CODES = [
  { code: "+93", country: "Afghanistan" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+971", country: "UAE" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
];

// Booking Status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// API Endpoints
export const API_ENDPOINTS = {
  TOURS: "/api/tours",
  BOOKINGS: "/api/bookings",
  COUPONS: "/api/coupons",
  USERS: "/api/users",
  PAYMENTS: "/api/payments",
};

// Default values
export const DEFAULTS = {
  MIN_ADULTS: 1,
  MAX_ADULTS: 10,
  MIN_CHILDREN: 0,
  MAX_CHILDREN: 10,
  PRICE_RANGE: [0, 1000],
  CURRENCY: "USD",
  LOCALE: "en-US",
};
