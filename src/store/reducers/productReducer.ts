import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Product } from '@/types/authType';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productlisting: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    }
  }
})
 export const {productlisting} = productSlice.actions;
 export default productSlice.reducer;