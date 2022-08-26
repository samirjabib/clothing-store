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




export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
  removeItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  

  useEffect( () => {
  
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    
    setCartItemCount(count)
  }, [cartItems])

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

    const removeItemToCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

  const value = { 
    isCartOpen,
    setIsCartOpen,
    cartItems, 
    addItemToCart, 
    cartItemCount,
    removeItemToCart,

  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
