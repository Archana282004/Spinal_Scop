import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, visit, exam, group, analysis, objectt, anatomies, ProjectDetail } from '@/types/authType';

interface ProductState {
  products: Product[];
  visit: visit[];
  exam: exam[];
  group: group[];
  analysis: analysis[];
  objectt: objectt[];
  anatomies: anatomies[];
  projectdetails: ProjectDetail | null;
}

const initialState: ProductState = {
  products: [],
  visit: [],
  exam: [],
  group: [],
  analysis: [],
  objectt: [],
  anatomies: [],
  projectdetails: null
}
export const projectSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productlisting: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    visitIdslist: (state, action: PayloadAction<visit[]>) => {
      state.visit = action.payload;
    },
    examIdslist: (state, action: PayloadAction<exam[]>) => {
      state.exam = action.payload;
    },
    groupIdslist: (state, action: PayloadAction<group[]>) => {
      state.group = action.payload;
    },
    analysisTypelist: (state, action: PayloadAction<analysis[]>) => {
      state.analysis = action.payload;
    },
    objectTypelist: (state, action: PayloadAction<objectt[]>) => {
      state.objectt = action.payload;
    },
    anatomylist: (state, action: PayloadAction<anatomies[]>) => {
      state.anatomies = action.payload;
    },
    projectdetailing: (state, action: PayloadAction<ProjectDetail>) => {
      state.projectdetails = action.payload;
    }
  }
})




export const { productlisting, visitIdslist, examIdslist, groupIdslist, analysisTypelist, objectTypelist, anatomylist, projectdetailing } = projectSlice.actions;
export default projectSlice.reducer;