import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartItem } from "../types";
import { products_list } from "../mocks/productsList";

// Funkcja pomocnicza do pobierania koszyka z localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Błąd odczytu koszyka z localStorage:", error);
    return [];
  }
};

// Funkcja pomocnicza do zapisywania koszyka do localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Błąd zapisu koszyka do localStorage:", error);
  }
};

// Typ reprezentujący stan sklepu
export interface ShopState {
  cart: CartItem[]; // Lista produktów w koszyku
  products: Product[]; // Lista dostępnych produktów
}

const initialState: ShopState = {
  cart: loadCartFromLocalStorage(), // Inicjalizacja koszyka z localStorage
  products: products_list,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingProduct = state.cart.find((item) => item.product.id === product.id);
    
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    
      saveCartToLocalStorage(state.cart);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.product.id !== action.payload);
      saveCartToLocalStorage(state.cart);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.cart.find((item) => item.product.id === productId);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
      saveCartToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = shopSlice.actions;

export default shopSlice.reducer;
