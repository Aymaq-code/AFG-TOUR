import { create } from "zustand";

export const useRegistrationStore = create((set, get) => ({
  // Wizard index
  index: 0,
  next: () => set((s) => ({ index: Math.min(3, s.index + 1) })),
  prev: () => set((s) => ({ index: Math.max(0, s.index - 1) })),
  setIndex: (i) => set({ index: i }),

  // Date
  startDate: null,
  setStartDate: (date) => set({ startDate: date }),

  // People
  adultQuantity: 1,
  childQuantity: 0,
  setAdultQuantity: (q) => set({ adultQuantity: q }),
  setChildQuantity: (q) => set({ childQuantity: q }),

  // Unit prices
  adultUnitPrice: 0,
  childUnitPrice: 0,
  setUnitPrices: ({ adult, child }) =>
    set({ adultUnitPrice: adult, childUnitPrice: child }),

  // Accommodation
  selectedHotel: null,
  selectHotel: (hotel) => set({ selectedHotel: hotel }),

  // Extra services
  selectedServices: [],
  toggleService: (service) =>
    set((state) => {
      const exists = state.selectedServices.find((s) => s.id === service.id);
      return {
        selectedServices: exists
          ? state.selectedServices.filter((s) => s.id !== service.id)
          : [...state.selectedServices, service],
      };
    }),

  // Payment & Discount
  discount: 0,
  couponCode: "",
  setOnClose: (onCloseFn) => set({ onClose: onCloseFn }),
  onClose: null,
  applyCoupon: (code, discountAmount) =>
    set({ couponCode: code, discount: discountAmount }),

  // Helpers / derived
  getPersonsTotal: () => {
    const s = get();
    return (
      s.adultUnitPrice * s.adultQuantity + s.childUnitPrice * s.childQuantity
    );
  },

  getServicesTotal: () => {
    const s = get();
    return s.selectedServices.reduce((sum, service) => sum + service.price, 0);
  },

  getHotelTotal: () => (get().selectedHotel ? get().selectedHotel.price : 0),

  getSubtotal: () =>
    get().getPersonsTotal() + get().getServicesTotal() + get().getHotelTotal(),

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().discount;
    return Math.max(0, subtotal - discount);
  },

  reset: () =>
    set({
      index: 0,
      startDate: null,
      adultQuantity: 1,
      childQuantity: 0,
      adultUnitPrice: 0,
      childUnitPrice: 0,
      selectedHotel: null,
      selectedServices: [],
      discount: 0,
      couponCode: "",
      onClose: null,
    }),
}));
