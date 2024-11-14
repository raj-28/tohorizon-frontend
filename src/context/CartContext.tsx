// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * Represents an item in the shopping cart
 * @interface CartItem
 * @property {string} id - Unique identifier for the item
 * @property {string} name - Name of the item
 * @property {string} description - Description of the item
 * @property {number} price - Total price of the item (basePrice * hours)
 * @property {number} quantity - Quantity of the item in cart
 * @property {number} hours - Number of hours booked
 * @property {number} basePrice - Price per hour
 */
export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  hours: number;
  basePrice: number;
};

/**
 * Represents the state of the shopping cart
 * @interface CartState
 * @property {CartItem[]} items - Array of items in the cart
 * @property {number} total - Total price of all items in cart
 */
type CartState = {
  items: CartItem[];
  total: number;
};

// Key used for storing cart data in localStorage
const CART_STORAGE_KEY = 'shopping-cart';

/**
 * Defines all possible actions that can be performed on the cart
 * @type CartAction
 */
type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SYNC_CART'; payload: CartState };

// Create context with type safety
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

/**
 * Loads the initial cart state from localStorage
 * Falls back to empty cart if no saved state exists
 * @returns {CartState} The initial cart state
 */
const loadInitialState = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  }
  return { items: [], total: 0 };
};

/**
 * Reducer function to handle all cart actions
 * Manages adding, removing, updating items and syncing cart state
 * @param {CartState} state - Current cart state
 * @param {CartAction} action - Action to perform on the cart
 * @returns {CartState} New cart state
 */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If exists, increment quantity
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      } else {
        // If new item, add to cart
        newState = {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + action.payload.price
        };
      }
      break;

    case 'REMOVE_FROM_CART':
      // Remove item and update total
      const itemToRemove = state.items.find(item => item.id === action.payload);
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      };
      break;

    case 'UPDATE_QUANTITY':
      // Update item quantity and recalculate total
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.items.reduce((acc, item) => {
          const quantity = item.id === action.payload.id ? action.payload.quantity : item.quantity;
          return acc + (item.price * quantity);
        }, 0)
      };
      break;

    case 'SYNC_CART':
      // Sync cart with provided state (used for cross-tab synchronization)
      newState = action.payload;
      break;

    default:
      return state;
  }

  // Persist cart state to localStorage after each change
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  }
  return newState;
};

/**
 * Cart Provider Component
 * Provides cart state and dispatch function to all child components
 * Handles cart persistence and cross-tab synchronization
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  // Listen for cart changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        const newState = JSON.parse(e.newValue);
        dispatch({ type: 'SYNC_CART', payload: newState });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist cart state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access cart context
 * @returns {Object} Cart context containing state and dispatch
 * @throws {Error} If used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/**
 * Utility function to clear the entire cart
 * Removes cart data from localStorage and resets cart state
 * @param {React.Dispatch<CartAction>} dispatch - Cart dispatch function
 */
export const clearCart = (dispatch: React.Dispatch<CartAction>) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY);
    dispatch({ type: 'SYNC_CART', payload: { items: [], total: 0 } });
  }
};
