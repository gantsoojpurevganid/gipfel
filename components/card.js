import React, { useContext, useState } from "react";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import "react-slideshow-image/dist/styles.css";
import { toast, ToastContainer } from "react-toastify";
const Card = ({ el = [] }) => {
  const {
    addItemToWhishlist,
    wishlist,
    addItemToCart,
    cart,
    toastTag,
    deleteItemFromWishlist,
  } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [productQuantity, setProductQuantity] = useState(1);
  const increaseQty = () => {
    if (productQuantity >= el?.quantity) {
      toast("Барааны үлдэгдлээс хэтэрсэн захиалга байна!!!");
    } else {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decreaseQty = () => {
    if (productQuantity === 1) {
      toast("Захиалах тоо хэмжээ 1-с бага байна!!!");
    } else {
      setProductQuantity(productQuantity - 1);
    }
  };

  return (
    <>
      <div key={`list-product-keys-#${el.id}  `} className="accord ">
        <div className="bg-white px-6 pt-6 h-[500px] relative cursor-pointer">
          <div className="flex justify-between">
            <div className="grid w-[136px] text-center mb-8 gap-1">
              {el.is_new ? (
                <p className="text-xs font-medium bg-newProductPaddingColor px-[8px] py-[4px] w-[132px] text-newProductTextColor">
                  Шинэ бүтээгдэхүүн
                </p>
              ) : null}
              {el.is_hit ? (
                <p className="text-xs font-medium bg-brandPrimary px-[8px] py-[4px] w-[132px] text-newProductTextColor">
                  Хит бүтээгдэхүүн
                </p>
              ) : null}
              {(el?.sale != null) & (el.is_hit == false) ? (
                <p className="text-xs font-medium  bg-saleProductBgColor px-[8px] py-[4px] w-[132px] text-newProductTextColor">
                  Хямдрал
                </p>
              ) : null}
            </div>
            <div
              className="grid justify-items-end cursor-pointer"
              onClick={() => {
                let wish = wishlist?.cartItems?.find(
                  (element) => element.product == el.id
                );
                if (wish) {
                  deleteItemFromWishlist(el?.id);
                  toastTag({
                    color: "slate-100",
                    icon: "HiFire",
                    message: "Жагсаалтнаас хасагдлаа.",
                    type: "success",
                  });
                } else {
                  addItemToWhishlist({
                    product: el.id,
                    name: el.name,
                    product_images: el.product_images,
                    price: el.price,
                    short_description: el.short_description,
                  });
                  toastTag({
                    color: "slate-100",
                    icon: "HiFire",
                    message: "Амжилттай хадгалаалаа.",
                    type: "wishlist",
                  });
                }
              }}
            >
              {wishlist?.cartItems?.find(
                (element) => element.product == el.id
              ) ? (
                <Image
                  priority
                  src="/assets/svg/card/wishSolid.svg"
                  alt="Add to Card"
                  className="w-6"
                  width={15}
                  height={15}
                />
              ) : (
                <Image
                  priority
                  src="/assets/svg/card/wish.svg"
                  alt="Add to Card"
                  className="w-4"
                  width={15}
                  height={15}
                />
              )}
            </div>
          </div>
          <div className="max-w-[1400px] relative">
            <div className="px-10 pt-10">
              <div
                style={{
                  backgroundImage: `url(${el?.product_images[currentIndex]?.high_url})`,
                }}
                className="w-full h-[150px] rounded-2xl bg-center bg-cover"
              ></div>
              <div className={`grid grid-cols-${el?.product_images?.length} `}>
                {el?.product_images.map((url, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setCurrentIndex(index)}
                  >
                    <p className="h-72 top-6 absolute  text-white">{index}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-${el?.product_images?.length} px-[80px] py-3 bg-white`}
          >
            {el?.product_images.map((url, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                className=""
              >
                <div
                  className={`w-[8px] h-[8px] border-[1px] ${
                    index == currentIndex
                      ? "bg-primary bg-clip-padding "
                      : "bg-white"
                  }`}
                ></div>
              </div>
            ))}
            {el?.product_images.length < 1 ? (
              <div className={`w-[8px] h-[8px]`}></div>
            ) : null}
          </div>
          <div className=" bg-white pb-6 absolute bottom-24">
            <a href={`/products/${el.id}`}>
              <div className="flex items-start justify-between">
                <div className="">
                  <p className="text-paymentText text-[16px] font-bold">
                    {el?.name ?? ""}
                  </p>
                  <p className="text-cartSubText text-[14px] font-normal">
                    {el?.short_description ?? ""}
                  </p>
                </div>
              </div>
            </a>
          </div>
          <p className="text-categoryTextColor text-2xl font-bold bg-white pb-6 absolute bottom-10">
            {el?.price ?? ""}₮
          </p>
          <div className="lg:flex lg:flex-row bg-white pb-[16px] ">
            {el.quantity > 0 ? (
              <>
                <div className="absolute flex flex-row bottom-4">
                  <Image
                    priority
                    src="/assets/svg/card/ready.svg"
                    alt="Add to Card"
                    className="w-6 mr-1"
                    width={15}
                    height={15}
                  />
                  <p className="text-base font-normal">Бэлэн байгаа</p>
                </div>
              </>
            ) : (
              <p className="text-base text-red-500 font-normal absolute bottom-4">
                Дууссан
              </p>
            )}
          </div>
        </div>
        <div className="w-full h-[80px] bg-white relative accord-button cursor-pointer flex justify-start px-6 pb-6 gap-3 z-10">
          <div className="text-[#475569] bg-content h-[56px] text-xl font-medium px-6 border-r-[1px] border-r-[#eee] flex flex-row gap-4 lg:w-[125px] w-full py-3 content-center">
            <div onClick={() => decreaseQty()} className="grid content-center">
              <Image
                priority
                src="/assets/svg/solid/minus.svg"
                alt="Add to Card"
                className="w-4"
                width={15}
                height={15}
              />
            </div>
            <div className="grid content-center">{productQuantity}</div>
            <div className="grid content-center" onClick={() => increaseQty()}>
              <Image
                priority
                src="/assets/svg/solid/add-fill.svg"
                alt="Add to Card"
                className="w-4"
                width={15}
                height={15}
              />
            </div>
          </div>
          <button
            className="bg-primary text-white p-3 text-sm"
            onClick={() => {
              if (el) {
                addItemToCart({
                  product: el.id,
                  name: el.name,
                  quantity: el.quantity,
                  thumb: el.product_images?.[0]?.mid_url,
                  price: el.price,
                  count: productQuantity,
                });
                toastTag({
                  color: "slate-100",
                  icon: "HiFire",
                  message: "Амжилттай сагсанд хийлээ.",
                  type: "success",
                });
              }
            }}
          >
            Сагсанд нэмэх
          </button>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default Card;
