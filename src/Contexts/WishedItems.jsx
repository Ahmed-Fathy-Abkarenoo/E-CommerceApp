import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export let WishedItemsContext = createContext();

export default function WishedItemsProvider({ children }) {
  const [wishedItems, setwishedItems] = useState([]);

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    // console.log(data.data);

    setwishedItems(data.data);
  }

  return (
    <>
      <WishedItemsContext.Provider value={{ wishedItems, setwishedItems }}>
        {children}
      </WishedItemsContext.Provider>
    </>
  );
}
