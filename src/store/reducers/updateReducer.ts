import { ProjectDetail } from '@/types/authType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface updateState {
  projectdetails: ProjectDetail | null; // single object, or null before fetch
}

const initialState: updateState = {
  projectdetails: null,
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    projectdetailing: (state, action: PayloadAction<ProjectDetail>) => {
      state.projectdetails = action.payload;
    }
  }
});

export const { projectdetailing } = updateSlice.actions;
export default updateSlice.reducer;
