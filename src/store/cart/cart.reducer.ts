import { AnyAction } from 'redux';

import { setIsCartOpen, setCartItems } from './cart.actions';
import { CartItem } from './cart.types'


export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};
export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as AnyAction
) => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};