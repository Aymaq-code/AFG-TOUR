import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPackage } from "../services/apiTour";

// Async thunk for fetching tour details
export const fetchTourDetails = createAsyncThunk(
  "tour/fetchTourDetails",
  async (tourId, { rejectWithValue }) => {
    try {
      const tour = await getPackage(tourId);
      return tour;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tour: null,
  loading: false,
  error: null,
  // Itinerary toggles
  isExpandedAll: false,
  isExpandedDay1: false,
  isExpandedDay2: false,
  isExpandedDay3: false,
  isExpandedDay4: false,
  isExpandedDay5: false,
  // UI states
  showNavbar: false,
  openGallery: false,
  image: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setShowNavbar: (state, action) => {
      state.showNavbar = action.payload;
    },
    setOpenGallery: (state, action) => {
      state.openGallery = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    // Itinerary toggle actions
    toggleExpandAll: (state) => {
      const newState = !state.isExpandedAll;
      state.isExpandedAll = newState;
      state.isExpandedDay1 = newState;
      state.isExpandedDay2 = newState;
      state.isExpandedDay3 = newState;
      state.isExpandedDay4 = newState;
      state.isExpandedDay5 = newState;
    },
    toggleExpandDay1: (state) => {
      state.isExpandedDay1 = !state.isExpandedDay1;
    },
    toggleExpandDay2: (state) => {
      state.isExpandedDay2 = !state.isExpandedDay2;
    },
    toggleExpandDay3: (state) => {
      state.isExpandedDay3 = !state.isExpandedDay3;
    },
    toggleExpandDay4: (state) => {
      state.isExpandedDay4 = !state.isExpandedDay4;
    },
    toggleExpandDay5: (state) => {
      state.isExpandedDay5 = !state.isExpandedDay5;
    },
    clearTour: (state) => {
      state.tour = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTourDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })
      .addCase(fetchTourDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setShowNavbar,
  setOpenGallery,
  setImage,
  toggleExpandAll,
  toggleExpandDay1,
  toggleExpandDay2,
  toggleExpandDay3,
  toggleExpandDay4,
  toggleExpandDay5,
  clearTour,
} = tourSlice.actions;

export default tourSlice.reducer;
