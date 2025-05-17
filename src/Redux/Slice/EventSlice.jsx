import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventId: null,
  eventName: "",
  eventDate: "",
  imageUrls: [], // ✅ added for image tracking
  status: null,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    eventCreateStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    eventCreateSuccess: (state, action) => {
      state.status = "success";
      state.eventId = action.payload._id;
      state.eventName = action.payload.event_name;
      state.eventDate = action.payload.event_date;
      state.imageUrls = []; // reset images on new event
    },
    eventCreateFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    uploadImagesSuccess: (state, action) => {
      state.imageUrls = action.payload; // array of Firebase URLs
    },
    clearEvent: () => initialState,
  },
});

export const {
  eventCreateStart,
  eventCreateSuccess,
  eventCreateFailure,
  uploadImagesSuccess, // ✅ export image reducer
  clearEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
