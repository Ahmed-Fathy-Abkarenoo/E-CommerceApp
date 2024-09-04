import React, { useState } from "react";
import "./App.css";
import AuthContextProvider from "./Contexts/AuthContext";
import AppRouter from "./components/AppRouter/AppRouter";
import { ToastContainer } from "react-toastify";
import CartCounterProvider from "./Contexts/CartCounter";
import { Offline } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishedItemsProvider from "./Contexts/WishedItems";

function App() {
  const [count, setCount] = useState(0);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <WishedItemsProvider>
            <CartCounterProvider>
              <AppRouter />
              <ToastContainer />
              <Offline>
                <div className="fixed bottom-4 start-4 border-2 border-green-500 bg-green-200 px-4 py-3 rounded-md">
                  Only shown offline (surprise!)
                </div>
              </Offline>
            </CartCounterProvider>
          </WishedItemsProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
