import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Style from "./Navbar.module.css";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";
import { AuthContext } from "../../Contexts/AuthContext";
import { CartCountContext } from "../../Contexts/CartCounter";
import userPic from "./../../assets/images/vecteezy_3d-male-character-sitting-on-a-sofa-and-working-on-a-laptop_24658980.png";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const { userToken, setUserToken } = useContext(AuthContext);
  const { cartCount } = useContext(CartCountContext);

  const mobileMenu = (
    <>
      <div className="nav-links lg:hidden block mt-4 pb-3">
        <ul className="flex flex-col gap-4 *:font-light">
          {userToken && (
            <>
              <li>
                <NavLink
                  to="home"
                  onClick={() => {
                    setClick(false);
                  }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cart"
                  onClick={() => {
                    setClick(false);
                  }}>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="wishlist"
                  onClick={() => {
                    setClick(false);
                  }}>
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="products"
                  onClick={() => {
                    setClick(false);
                  }}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="categories"
                  onClick={() => {
                    setClick(false);
                  }}>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="brands"
                  onClick={() => {
                    setClick(false);
                  }}>
                  Brands
                </NavLink>
              </li>
            </>
          )}
          {!userToken && (
            <>
              <li>
                <NavLink to="">Login</NavLink>
              </li>
              <li>
                <NavLink to="register">Register</NavLink>
              </li>
            </>
          )}
          {!userToken || (
            <li>
              <Link onClick={logOut}>Logout</Link>
            </li>
          )}
        </ul>
        <div className="social-icons mt-4">
          <ul className="flex gap-2">
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaYoutube />
            </li>
            <li>
              <FaTiktok />
            </li>
          </ul>
        </div>
      </div>
    </>
  );

  function logOut() {
    setUserToken("");
    localStorage.removeItem("Token");
  }

  return (
    <>
      <nav className="w-full bg-gray-300 fixed z-40">
        <div className="container mx-auto flex justify-between items-center gap-5 px-4 py-3">
          <div className="nav-container flex justify-center items-center gap-4">
            <div className="logo">
              <Link to="/" className="text-xl lg:text-2xl font-bold flex gap-2">
                <span className="text-green-700">
                  <FaShoppingCart />
                </span>
                FreshCart
              </Link>
            </div>
            {userToken && (
              <div className="nav-links lg:block hidden">
                <ul className="flex gap-4 *:font-light">
                  <li>
                    <NavLink to="home">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="cart">Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="wishlist">Wish List</NavLink>
                  </li>
                  <li>
                    <NavLink to="products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="categories">Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to="brands">Brands</NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="login-links lg:flex justify-center items-center gap-6 hidden">
            <div className="social-icons">
              <ul className="flex gap-2 *:text-black">
                <li>
                  <FaFacebook />
                </li>
                <li>
                  <FaTwitter />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaYoutube />
                </li>
                <li>
                  <FaTiktok />
                </li>
              </ul>
            </div>
            <div className="login-btns">
              <ul className="flex items-center gap-4 *:font-light">
                {!userToken && (
                  <>
                    <li>
                      <NavLink to="">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="register">Register</NavLink>
                    </li>
                  </>
                )}

                {!userToken || (
                  <>
                    <li>
                      <Link to="cart">
                        <div className="relative">
                          <FaShoppingCart className="text-2xl" />
                          <span className="flex justify-center items-center bg-green-500 text-white w-5 h-5 rounded-full p-2 text-sm font-semibold absolute top-[-8px] right-[-8px]">
                            {cartCount}
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={logOut}>Logout</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <img
              className="w-10 h-10 p-1 border-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={userPic}
              alt="Bordered avatar"
            />
          </div>

          <button
            className="lg:hidden text-2xl outline outline-4 outline-offset-2 outline-slate-800 rounded-md p-1"
            onClick={handleClick}>
            {click ? <FaTimes /> : <RxHamburgerMenu />}
          </button>
        </div>

        <div className="mobile-menu container mx-auto px-4">
          {click && mobileMenu}
        </div>
      </nav>
    </>
  );
}
