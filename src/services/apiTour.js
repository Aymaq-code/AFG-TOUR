const API_URL =
  "https://raw.githubusercontent.com/Aymaq-code/tour-api/main/touristSpots.json";

export async function getTour() {
  const res = await fetch(API_URL);

  if (!res.ok) throw Error("Failed getting tours");

  const { data } = await res.json();
  return data;
}

export async function getPackage(id) {
  const res = await fetch(API_URL);
  if (!res.ok) throw Error(`Couldn't find package!`);

  const { data } = await res.json();

  const tour = data.find((item) => item.id === Number(id));
  if (!tour) throw Error(`The selected tour ${id} not found`);

  return tour;
}

// تابع جدید: ایجاد رزرو (شبیه‌سازی شده)
export async function createBooking(bookingData) {
  try {
    // شبیه‌سازی ارسال به API - در حالت واقعی اینجا به سرور شما متصل می‌شود
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // شبیه‌سازی موفقیت‌آمیز بودن پرداخت
        const isSuccess = Math.random() > 0.1; // 90% موفقیت

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
          };
          resolve(booking);
        } else {
          reject(new Error("Payment processing failed. Please try again."));
        }
      }, 2000);
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking. Please try again.");
  }
}

// تابع جدید: اعتبارسنجی کوپن تخفیف
export async function validateCoupon(couponCode) {
  try {
    // شبیه‌سازی اعتبارسنجی کوپن
    return new Promise((resolve) => {
      setTimeout(() => {
        const coupons = {
          WELCOME10: {
            discount: 10,
            valid: true,
            message: "10% discount applied!",
          },
          SUMMER25: {
            discount: 25,
            valid: true,
            message: "25% summer discount applied!",
          },
          AFGTOUR15: {
            discount: 15,
            valid: true,
            message: "15% discount applied!",
          },
          TRAVEL20: {
            discount: 20,
            valid: true,
            message: "20% travel discount applied!",
          },
        };

        const coupon = coupons[couponCode.toUpperCase()];
        if (coupon && coupon.valid) {
          resolve({
            valid: true,
            discount: coupon.discount,
            message: coupon.message,
          });
        } else {
          resolve({
            valid: false,
            discount: 0,
            message: "Invalid coupon code",
          });
        }
      }, 500);
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    throw new Error("Failed to validate coupon.");
  }
}

// تابع جدید: دریافت تاریخچه رزروها (شبیه‌سازی)
export async function getBookingHistory() {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        // در حالت واقعی اینجا از API کاربر رزروها رو می‌گیریم
        resolve([]);
      }, 500);
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to load booking history.");
  }
}
