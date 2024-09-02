import { AiOutlineShoppingCart } from "react-icons/ai";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SategorySearchCompo from './categorySearchCompo';

const Navbar = () => {

  const dispatch = useDispatch();
  const cartCount = useSelector(
    (state) => state.cartReducer.cartItems.reduce((total, item) => ((item.quantity || 0) + total), 0)
  );
  const username = useSelector((state) => state.authReducer.username);
  const { requireAuth } = useAuth();

  const showCart = () => {
    requireAuth(() => dispatch(setCartState(true)));
  };

  return (
    <div className="py-4 bg-white top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold" data-test="main-logo">
            Ecommerce Site
          </Link>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <SategorySearchCompo></SategorySearchCompo>
          </div>
          <div className="flex gap-4 md:gap-8 items-center">

            <div className="flex items-center gap-2">
              {username !== "" ? (
                <FaUser className="text-gray-500 text-2xl" />
              ) : (
                ''
              )}
              <div className="text-gray-500 text-2xl">
                {username !== "" ? (
                  <CustomPopup />
                ) : (
                  <span
                    className="cursor-pointer hover:opacity-85"
                    onClick={() => {
                      dispatch(updateModal(true))
                    }}
                    data-test="login-btn"
                  >
                    Login
                  </span>
                )}
              </div>
            </div>
            <div
              className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
              onClick={showCart}
              data-test="cart-btn"
            >
              <AiOutlineShoppingCart />
              <div
                className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
                data-test="cart-item-count"
              >
                {cartCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
