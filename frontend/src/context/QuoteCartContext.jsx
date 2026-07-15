import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const QuoteCartContext = createContext();

export function QuoteCartProvider({
  children,
}) {
  const [cartItems, setCartItems] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "quoteCart"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "quoteCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (stone) => {
    const exists =
      cartItems.find(
        (item) =>
          item._id === stone._id
      );

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === stone._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    setCartItems([
      ...cartItems,
      {
        ...stone,
        quantity: 1,
      },
    ]);
  };

  const increaseQuantity = (
    id
  ) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (
    id
  ) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const removeFromCart = (
    id
  ) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          item._id !== id
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  };

  return (
    <QuoteCartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export const useQuoteCart = () =>
  useContext(
    QuoteCartContext
  );