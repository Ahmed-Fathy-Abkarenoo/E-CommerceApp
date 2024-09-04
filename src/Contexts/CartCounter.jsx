import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartCountContext = createContext();

export default function CartCounterProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: localStorage.getItem("Token") },
      }
    );

    setCartCount(data.numOfCartItems);
  }

  return (
    <>
      <CartCountContext.Provider value={{ cartCount, setCartCount }}>
        {children}
      </CartCountContext.Provider>
    </>
  );
}
