import { createContext, useEffect, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};


const CARRT_ACTION_TYPES = {
  SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT:'SET_CART_COUNT',
  SET_CART_TOTAL:'SET_CART_TOTAL',
}
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems:[],
  cartCount:0,
  cartTotal:0,
}


const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) 
{
  case CARRT_ACTION_TYPES.SET_CART_ITEMS:
    return{
      ...state,
      ...payload
    };
    default:
    throw new Error(`Unhandled type ${type} in cartReducer`)
}
}

const clearCartItem = ( cartItems, cartItemToClear) => 
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartTotal:0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [ cartTotal, setCartTotal ] = useState(0);



  

  useEffect( () => {
  
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    
    setCartItemCount(count)
  }, [cartItems])


  useEffect( () => {
  
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    
    setCartTotal(newCartTotal)
  }, [cartItems])


    const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

    const removeItemToCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };
    
    const clearItemFromCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

  const value = { 
    isCartOpen,
    setIsCartOpen,
    cartItems, 
    addItemToCart, 
    cartItemCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal

  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
