// src/redux/slices/applicationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosAPI";

// ─────────────────────────────────────────────────────────
// Thunks
// ─────────────────────────────────────────────────────────

// Fetch all applications for a specific job
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (jobId, thunkAPI) => {
    try {
      const res = await API.get(`/jobs/${jobId}/applications`);
      return res.data; // should be an array of applications
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }
);

// Update the status of a single application
export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async ({ applicationId, status }, thunkAPI) => {
    try {
      const res = await API.put(`/applications/${applicationId}/status`, { status });
      return res.data; // updated application
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update application status"
      );
    }
  }
);

// ─────────────────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────────────────

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearApplications: (state) => {
      state.applications = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update status
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const updatedApp = action.payload;
        const index = state.applications.findIndex((a) => a._id === updatedApp._id);
        if (index !== -1) {
          state.applications[index] = updatedApp;
        }
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearApplications } = applicationSlice.actions;
export default applicationSlice.reducer;
