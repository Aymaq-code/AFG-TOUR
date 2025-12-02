// utils/helper.js

/**
 * Filter tours based on search criteria
 * @param {Array} tours - Array of tours
 * @param {string} searchTerm - Search term
 * @param {Array} priceRange - [minPrice, maxPrice]
 * @returns {Array} Filtered tours
 */
export const filterTours = (tours, searchTerm, priceRange) => {
  if (!Array.isArray(tours)) return [];

  const [minPrice, maxPrice] = priceRange || [0, 1000];
  const term = searchTerm?.toLowerCase().trim() || "";

  if (!term) {
    return tours.filter(
      (tour) => tour.adultPrice >= minPrice && tour.adultPrice <= maxPrice
    );
  }

  return tours.filter((tour) => {
    // Check price range
    const priceMatch =
      tour.adultPrice >= minPrice && tour.adultPrice <= maxPrice;
    if (!priceMatch) return false;

    // Check search term in various fields
    const nameMatch = tour.name?.toLowerCase().includes(term);
    const locationMatch = tour.location?.toLowerCase().includes(term);
    const descriptionMatch = tour.description?.toLowerCase().includes(term);

    // Check tourist spots
    const touristSpotMatch = tour.touristSpots?.some(
      (spot) =>
        spot.name?.toLowerCase().includes(term) ||
        spot.description?.toLowerCase().includes(term)
    );

    return nameMatch || locationMatch || descriptionMatch || touristSpotMatch;
  });
};

/**
 * Calculate total price for cart
 * @param {Object} cart - Cart state
 * @returns {number} Total price
 */
export const calculateTotalPrice = (cart) => {
  const { items = [], selectedHotel = null, selectedExtras = [] } = cart;

  // Calculate persons total
  const personsTotal = items.reduce((total, item) => {
    return total + (item.unitPrice || 0) * (item.quantity || 0);
  }, 0);

  // Add hotel price
  const hotelTotal = selectedHotel?.price || 0;

  // Add extra services total
  const extrasTotal = selectedExtras.reduce((total, extra) => {
    return total + (extra.price || 0);
  }, 0);

  const subtotal = personsTotal + hotelTotal + extrasTotal;
  const discount = cart.discount || 0;

  return Math.max(0, subtotal - discount);
};

/**
 * Generate Google Maps URL from coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {string} Google Maps URL
 */
export const generateMapsUrl = (latitude, longitude) => {
  if (!latitude || !longitude) return "";
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

/**
 * Generate WhatsApp contact URL
 * @param {string} phoneNumber - Phone number
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppUrl = (
  phoneNumber = "+93708760475",
  message = ""
) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate credit card number
 * @param {string} cardNumber - Card number
 * @returns {boolean} Whether card number is valid
 */
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return /^\d{16}$/.test(cleaned);
};

/**
 * Validate CVV
 * @param {string} cvv - CVV code
 * @returns {boolean} Whether CVV is valid
 */
export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

/**
 * Validate expiry date
 * @param {string} expiryDate - Expiry date in MM/YY format
 * @returns {boolean} Whether expiry date is valid
 */
export const validateExpiryDate = (expiryDate) => {
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;

  const [month, year] = expiryDate.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

/**
 * Get pluralized word based on count
 * @param {number} count - Count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (optional)
 * @returns {string} Correct form
 */
export const pluralize = (count, singular, plural = null) => {
  if (count === 1) return singular;
  return plural || `${singular}s`;
};

/**
 * Generate star rating display
 * @param {number} stars - Number of stars
 * @returns {string} Star emoji string
 */
export const generateStarRating = (stars) => {
  if (stars < 0 || stars > 5) return "";
  return "⭐".repeat(stars);
};
