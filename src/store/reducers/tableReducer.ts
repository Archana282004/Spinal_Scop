import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface TableState {
  data: any[];          
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    fetchTableStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTableSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    fetchTableFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearTable(state) {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { fetchTableStart, fetchTableSuccess, fetchTableFailure, clearTable } = tableSlice.actions;

export default tableSlice.reducer;
