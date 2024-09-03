import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CartItems from "../CartItems/CartItems";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CartCountContext } from "../../Contexts/CartCounter";
import OrderSummary from "../OrderSummary/OrderSummary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    getCart();
    window.scrollTo(0, 0);
  }, []);

  async function getCart() {
    setIsLoading(true);

    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: localStorage.getItem("Token") },
      }
    );

    setCartItems(data);
    setCartCount(data.numOfCartItems);

    setIsLoading(false);
  }

  async function clearCart() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("Token"),
        },
      })
      .finally(() => {
        setCartItems(null);
        setCartCount(0);
      });
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Cart</title>
        </Helmet>
      </HelmetProvider>

      <section className="bg-white dark:bg-gray-900 mt-10 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-green-500 dark:text-white sm:text-2xl mb-4">
            Shopping Cart
          </h2>
          <p>
            You have
            <span className="bg-green-500 text-white rounded-md px-2 py-1 mx-2">
              {cartCount}
            </span>
            Items in this List
          </p>
        </div>

        {cartItems && dataLoading && <LoadingScreen />}

        {isLoading ? (
          <LoadingScreen2 />
        ) : (
          <>
            <div className="container mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                  <div className="space-y-4">
                    {cartItems?.data.products.map((item, index) => {
                      return (
                        <CartItems
                          key={index}
                          item={item}
                          setCartItems={setCartItems}
                          cartItems={cartItems}
                          setDataLoading={setDataLoading}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                  <OrderSummary cartItems={cartItems} />
                </div>
              </div>
            </div>
          </>
        )}
        <button
          onClick={clearCart}
          className="text-lg font-medium border-2 border-red-500 px-4 py-1 rounded-md hover:bg-red-400 hover:text-white mt-8 ">
          Clear Cart
        </button>
      </section>
    </>
  );
}
