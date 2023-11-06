"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import Toast from "@/components/carousel/toast/toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [toastState, setToastState] = useState(false);
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState();
  const [toastColor, setToastColor] = useState();
  const [toastIcon, setToastIcon] = useState();
  const [toastType, setToastType] = useState();
  const [wishlist, setWishlist] = useState([]);

  const toastTag = ({ message, color, icon, type }) => {
    setToastColor(color);
    setToastMessage(message);
    setToastIcon(icon);
    setToastType(type);
    setToastState(true);
    setTimeout(() => {
      setToastState(false);
    }, 4000);
  };

  const toastTagClose = () => {
    setToastState(false);
  };

  const router = useRouter;

  useEffect(() => {
    setCartToState();
    setWishlistToState();
  }, []);

  const setWishlistToState = () => {
    setWishlist(
      localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
        : []
    );
  };

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    thumb,
    quantity,
    count = 1,
  }) => {
    const item = {
      product,
      name,
      price,
      thumb,
      quantity,
      count,
    };
    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    // if (isItemExist != undefined) {
    //   const test = [...(cart?.cartItems || []), item];
    // }
    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const addItemToWhishlist = async ({
    product,
    name,
    price,
    thumb,
    quantity = 1,
    category,
    product_images,
    short_description,
  }) => {
    const item = {
      product,
      name,
      price,
      thumb,
      quantity,
      category,
      product_images,
      short_description,
    };

    const isItemExist = wishlist?.cartItems?.find(
      (i) => i.product === item.product
    );

    if (isItemExist != undefined) {
      return (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p class="font-bold">Our privacy policy has changed</p>
              <p class="text-sm">
                Make sure you know how these changes affect you.
              </p>
            </div>
          </div>
        </div>
      );
    }

    let newCartItems;

    if (isItemExist) {
      newCartItems = wishlist?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(wishlist?.cartItems || []), item];
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify({ cartItems: newCartItems })
    );
    setWishlistToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromWishlist = (id) => {
    const newCartItems = wishlist?.cartItems?.filter((i) => i.product !== id);
    localStorage.setItem(
      "wishlist",
      JSON.stringify({ cartItems: newCartItems })
    );
    setWishlistToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addItemToCart,
        deleteItemFromCart,
        addItemToWhishlist,
        deleteItemFromWishlist,
        toastState,
        toastTag,
        toastMessage,
        toastColor,
        toastIcon,
        toastType,
        toastTagClose,
        setWishlistToState,
        setCartToState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
