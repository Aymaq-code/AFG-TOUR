// API Configuration
const API_BASE_URL =
  "https://raw.githubusercontent.com/Aymaq-code/tour-api/main/touristSpots.json";

// Error Messages
const ERROR_MESSAGES = {
  FETCH_TOURS:
    "Failed to load tours. Please check your connection and try again.",
  TOUR_NOT_FOUND: (id) =>
    `Tour package #${id} not found. It may have been removed or is temporarily unavailable.`,
  BOOKING_FAILED: "Unable to process booking. Please try again in a moment.",
  COUPON_VALIDATION: "Coupon validation service is temporarily unavailable.",
  BOOKING_HISTORY: "Unable to load booking history. Please try again later.",
};

/**
 * Fetches all available tour packages from the API
 * @returns {Promise<Array>} Array of tour objects
 * @throws {Error} When API request fails
 */
export async function getTours() {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw new Error(ERROR_MESSAGES.FETCH_TOURS);
  }
}

/**
 * Fetches a specific tour package by ID
 * @param {string|number} id - The tour ID to fetch
 * @returns {Promise<Object>} Tour object
 * @throws {Error} When tour is not found or API request fails
 */
export async function getTourById(id) {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const tour = data.find((item) => item.id === Number(id));

    if (!tour) {
      throw new Error(ERROR_MESSAGES.TOUR_NOT_FOUND(id));
    }

    return tour;
  } catch (error) {
    console.error(`Error fetching tour ${id}:`, error);
    throw error; // Re-throw the specific error
  }
}

/**
 * Available discount coupons with their configurations
 */
const COUPONS = {
  WELCOME10: {
    discount: 10,
    valid: true,
    message: "10% welcome discount applied!",
    minAmount: 0,
  },
  SUMMER25: {
    discount: 25,
    valid: true,
    message: "25% summer discount applied!",
    minAmount: 100,
  },
  AFGTOUR15: {
    discount: 15,
    valid: true,
    message: "15% Afghanistan tour discount applied!",
    minAmount: 50,
  },
  TRAVEL20: {
    discount: 20,
    valid: true,
    message: "20% travel discount applied!",
    minAmount: 75,
  },
};

/**
 * Validates a coupon code and returns discount information
 * @param {string} couponCode - The coupon code to validate
 * @param {number} totalAmount - The total amount for minimum amount validation
 * @returns {Promise<Object>} Validation result with discount details
 */
export async function validateCoupon(couponCode, totalAmount = 0) {
  try {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const normalizedCode = couponCode.toUpperCase().trim();
        const coupon = COUPONS[normalizedCode];

        if (!coupon) {
          resolve({
            valid: false,
            discount: 0,
            message: "Invalid coupon code. Please check and try again.",
          });
          return;
        }

        if (!coupon.valid) {
          resolve({
            valid: false,
            discount: 0,
            message: "This coupon has expired or is no longer valid.",
          });
          return;
        }

        if (totalAmount < coupon.minAmount) {
          resolve({
            valid: false,
            discount: 0,
            message: `This coupon requires a minimum purchase of $${coupon.minAmount}.`,
          });
          return;
        }

        resolve({
          valid: true,
          discount: coupon.discount,
          message: coupon.message,
          code: normalizedCode,
        });
      }, 800); // Realistic API delay
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    throw new Error(ERROR_MESSAGES.COUPON_VALIDATION);
  }
}

/**
 * Creates a new booking with payment simulation
 * @param {Object} bookingData - Booking information
 * @returns {Promise<Object>} Created booking with confirmation details
 * @throws {Error} When booking creation fails
 */
export async function createBooking(bookingData) {
  try {
    // Simulate API call and payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 95% success rate for payment processing
        const isSuccess = Math.random() > 0.05;

        if (isSuccess) {
          const booking = {
            id: `BK${Date.now()}`,
            ...bookingData,
            status: "confirmed",
            bookingDate: new Date().toISOString(),
            referenceNumber: `REF-${Math.random()
              .toString(36)
              .substr(2, 9)
              .toUpperCase()}`,
            paymentStatus: "completed",
            confirmationEmail: true,
          };
          resolve(booking);
        } else {
          reject(
            new Error(
              "Payment processing failed. Please check your payment details and try again."
            )
          );
        }
      }, 1500); // Realistic processing time
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error(ERROR_MESSAGES.BOOKING_FAILED);
  }
}

/**
 * Fetches booking history for a user (simulated)
 * @param {string} userId - User identifier
 * @returns {Promise<Array>} Array of booking objects
 */
export async function getBookingHistory(userId = "current") {
  try {
    // Simulate API call for booking history
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would fetch from user's booking history
        // For now, return empty array or mock data for development
        const mockBookings = [];
        resolve(mockBookings);
      }, 600);
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error(ERROR_MESSAGES.BOOKING_HISTORY);
  }
}

// Export all API functions
export default {
  getTours,
  getTourById,
  validateCoupon,
  createBooking,
  getBookingHistory,
};
