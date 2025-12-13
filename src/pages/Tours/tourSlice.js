import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTourById } from "../../services/apiTour";

/**
 * Async thunk for fetching tour details by ID
 */
export const fetchTourDetails = createAsyncThunk(
  "tour/fetchTourDetails",
  async (tourId, { rejectWithValue }) => {
    try {
      const tour = await getTourById(tourId);
      return tour;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  // Tour data
  tour: null,
  loading: false,
  error: null,

  // Itinerary expansion states
  expandedDays: {
    all: false,
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
  },

  // UI states
  showNavbar: false,
  isGalleryOpen: false,
  selectedImage: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    // Navigation
    setShowNavbar: (state, action) => {
      state.showNavbar = action.payload;
    },

    // Gallery management - keeping both old and new names for compatibility
    setOpenGallery: (state, action) => {
      state.isGalleryOpen = action.payload;
    },
    setImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    setGalleryOpen: (state, action) => {
      state.isGalleryOpen = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },

    // Itinerary expansion management
    toggleExpandAll: (state) => {
      const newState = !state.expandedDays.all;
      state.expandedDays.all = newState;
      state.expandedDays.day1 = newState;
      state.expandedDays.day2 = newState;
      state.expandedDays.day3 = newState;
      state.expandedDays.day4 = newState;
      state.expandedDays.day5 = newState;
    },

    // Individual day toggles - new dynamic approach
    toggleExpandDay: (state, action) => {
      const dayKey = `day${action.payload}`;
      if (state.expandedDays[dayKey] !== undefined) {
        state.expandedDays[dayKey] = !state.expandedDays[dayKey];
      }
    },

    // Individual day toggles - keeping old names for backward compatibility
    toggleExpandDay1: (state) => {
      state.expandedDays.day1 = !state.expandedDays.day1;
    },
    toggleExpandDay2: (state) => {
      state.expandedDays.day2 = !state.expandedDays.day2;
    },
    toggleExpandDay3: (state) => {
      state.expandedDays.day3 = !state.expandedDays.day3;
    },
    toggleExpandDay4: (state) => {
      state.expandedDays.day4 = !state.expandedDays.day4;
    },
    toggleExpandDay5: (state) => {
      state.expandedDays.day5 = !state.expandedDays.day5;
    },
  },
});

export const {
  setShowNavbar,
  setOpenGallery,
  setImage,
  setGalleryOpen,
  setSelectedImage,
  toggleExpandAll,
  toggleExpandDay,
  toggleExpandDay1,
  toggleExpandDay2,
  toggleExpandDay3,
  toggleExpandDay4,
  toggleExpandDay5,
  clearTour,
} = tourSlice.actions;

export default tourSlice.reducer;
