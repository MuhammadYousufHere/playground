export const addItemToCart = (cartItems, cartItemToAdd) => {
  let existingCartItem = cartItems.find((item) => item.id === cartItemToAdd.id);
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  let existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  } else if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }
};
