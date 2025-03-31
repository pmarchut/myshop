import { configureStore } from '@reduxjs/toolkit';
import shopReducer, { ShopState } from './reducer';

// Typ reprezentujący stan sklepu
export interface ShopStoreState {
  shop: ShopState;
}

const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

export default store;
