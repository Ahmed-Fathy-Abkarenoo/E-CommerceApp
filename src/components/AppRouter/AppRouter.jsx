import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./../Layout/Layout";
import Login from "./../Login/Login";
import Register from "./../Register/Register";
import Home from "./../Home/Home";
import Categories from "./../Categories/Categories";
import Brands from "./../Brands/Brands";
import Products from "./../Products/Products";
import Cart from "./../Cart/Cart";
import NotFound from "./../NotFound/NotFound";
import WishList from "./../WishList/WishList";
import RouteGuard from "./../RouteGuard/RouteGuard";
import AuthGuard from "./../AuthGuard/AuthGuard";
import ProductDetails from "../ProductDetails/ProductDetails";
import SubCategories from "../SubCategories/SubCategories";
import CheckOut from "../CheckOut/CheckOut";
import Orders from "../Orders/Orders";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

export default function AppRouter() {
  const appRouter = createBrowserRouter([
    {
      path: "E-CommerceApp",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <AuthGuard>
              <Login />
            </AuthGuard>
          ),
        },
        {
          path: "register",
          element: (
            <AuthGuard>
              <Register />
            </AuthGuard>
          ),
        },
        {
          path: "home",
          element: (
            <RouteGuard>
              <Home />
            </RouteGuard>
          ),
        },
        {
          path: "categories",
          element: (
            <RouteGuard>
              <Categories />
            </RouteGuard>
          ),
          children: [{ path: "subcategories/:id", element: <SubCategories /> }],
        },
        {
          path: "brands",
          element: (
            <RouteGuard>
              <Brands />
            </RouteGuard>
          ),
        },
        {
          path: "products",
          element: (
            <RouteGuard>
              <Products />
            </RouteGuard>
          ),
        },
        {
          path: "cart",
          element: (
            <RouteGuard>
              <Cart />
            </RouteGuard>
          ),
        },
        {
          path: "checkout/:cartId",
          element: (
            <RouteGuard>
              <CheckOut />
            </RouteGuard>
          ),
        },
        {
          path: "allorders",
          element: (
            <RouteGuard>
              <Orders />
            </RouteGuard>
          ),
        },
        {
          path: "wishlist",
          element: (
            <RouteGuard>
              <WishList />
            </RouteGuard>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <RouteGuard>
              <ProductDetails />
            </RouteGuard>
          ),
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
