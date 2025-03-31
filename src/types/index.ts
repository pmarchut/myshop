import type { NavigateFunction } from "react-router-dom";

export type Product = {
    id: number;
    name: string;
    description: string;
    descriptionPoints: { point: string }[];
    price: string;
    picture: string;
    availableQuantity: number;
};

// Typ reprezentujący elementy w koszyku
export type CartItem = {
    product: Product;
    quantity: number;
};
  
// Typ dla propsów przekazywanych do komponentu przez HOC
export type WithCartProps = {
    cart: CartItem[]; // Lista produktów w koszyku
    addToCart: (payload: { product: Product; quantity?: number }) => void; // Funkcja dodająca produkt do koszyka
    removeFromCart: (productId: number) => void; // Funkcja usuwająca produkt z koszyka
    updateQuantity: (payload: { productId: number; quantity: number }) => void; // Funkcja zmieniająca ilość produktu w koszyku
    clearCart: () => void; // Funkcja czyszcząca koszyk
};

// Typ dla propsów przekazywanych do komponentu przez HOC
export type WithProductsProps = {
    products: Product[]; // Lista produktów
};

// Typ dla propsów przekazywanych do komponentu przez HOC
export type WithRouterProps = {
    navigate: NavigateFunction; // Funkcja do nawigacji
};
