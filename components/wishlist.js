import React, { useContext } from "react";
import CartContext from "@/context/CartContext";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Card from "./card";

const Wishlist = () => {
  const { wishlist, deleteItemFromWishlist } = useContext(CartContext);
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "200px",
  };
  // <a
  //                   className="px-4 py-2 inline-block text-red-600 bg-white border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
  //                   onClick={() => deleteItemFromWishlist(el?.product)}
  //                 >
  //                   X
  //                 </a>
  return (
    <div>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 lg:gap-9 md:gap-9 sm:gap-9 gap-3 text-[18px] font-normal leading-[28px] text-[#64748B] ">
        {wishlist?.cartItems?.length > 0 &&
          wishlist?.cartItems?.map((el, index) => {
            return <Card key={el.index} el={el} />;
          })}
      </ul>
    </div>
  );
};

export default Wishlist;
