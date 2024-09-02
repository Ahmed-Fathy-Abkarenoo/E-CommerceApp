import React, { useState } from "react";
import "./App.css";
import AuthContextProvider from "./Contexts/AuthContext";
import AppRouter from "./components/AppRouter/AppRouter";
import { ToastContainer } from "react-toastify";
import CartCounterProvider from "./Contexts/CartCounter";
import { Online, Offline } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  const [count, setCount] = useState(0);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartCounterProvider>
            <AppRouter />
            <ToastContainer />
            <Offline>
              <div className="fixed bottom-4 start-4 border-2 border-green-500 bg-green-200 px-4 py-3 rounded-md">
                Only shown offline (surprise!)
              </div>
            </Offline>
          </CartCounterProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
