import React, { useState, useContext } from "react";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import "react-slideshow-image/dist/styles.css";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Card from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SaleProducts = ({ top = 20, SALE_PRODUCT_ITEMS = [], title }) => {
  const { addItemToWhishlist, wishlist } = useContext(CartContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:px-[64px]">
        <p className=" text-[34px] font-bold text-primary">Хямдрал </p>
        {/* <Link
          href="/products/saleProduct"
          className="text-md font-bold text-primary grid content-center justify-items-end"
        >
          Бүгдийг үзэх
        </Link> */}
      </div>

      <div className="lg:px-[64px] pt-[48px] pb-[64px]">
        <ul className="text-[18px] font-normal leading-[28px] text-[#64748B] cursor-pointer ">
          {/* {SALE_PRODUCT_ITEMS?.products_with_sale?.length > 0 &&
            SALE_PRODUCT_ITEMS?.products_with_sale
              ?.slice(0, 6)
              .map((el, index) => {
                return <Card key={el.id} el={el} />;
              })} */}

          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            style={{ overflowY: "visible", minWidth: "1580px" }}
          >
            {SALE_PRODUCT_ITEMS?.products_with_sale?.length > 0 &&
              SALE_PRODUCT_ITEMS?.products_with_sale?.map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Card el={el} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          {/* {SALE_PRODUCT_ITEMS?.products_with_sale?.length > 0 &&
            SALE_PRODUCT_ITEMS?.products_with_sale?.slice(0, 6).map((el) => (
              <li key={`list-product-keys-#${el.id}`} className="mb-9 ">
                <div className="bg-white relative p-6 h-5/6">
                  <div className="grid grid-cols-2">
                    <div className="bg-saleProductBgColor  w-[136px] text-center mb-8">
                      <p className="text-xs font-medium text-newProductTextColor px-[8px] py-[4px]">
                        Хямдрал
                      </p>
                    </div>

                    <div
                      className="grid justify-items-end cursor-pointer"
                      onClick={() => {
                        if (el) {
                          addItemToWhishlist({
                            product: el.id,
                            name: el.name,
                            // quantity: productQuantity,
                            product_images: el.product_images,
                            price: el.price,
                            short_description: el.short_description,
                          });
                          toast.success("Амжилттай хадгалаалаа", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            newestOnTop: false,
                            closeOnClick: true,
                            draggable: true,
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
                          className="w-10"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Image
                          priority
                          src="/assets/svg/card/wish.svg"
                          alt="Add to Card"
                          className="w-6"
                          width={15}
                          height={15}
                        />
                      )}
                    </div>
                  </div>

                  <div className="max-w-[1400px] ">
                    <div className="p-10">
                      <div
                        style={{
                          backgroundImage: `url(${el?.product_images[currentIndex]?.high_url})`,
                        }}
                        className="w-full h-[250px] rounded-2xl bg-center bg-contain"
                      ></div>
                    </div>

                    <div className="grid grid-cols-3 px-32 py-4">
                      {el?.product_images.map((url, index) => (
                        <div
                          key={index}
                          onClick={() => goToSlide(index)}
                          className="grid gap-4"
                        >
                          <div
                            className={`grid gap-4 w-[8px] h-[8px] border-[1px] ${
                              index == currentIndex
                                ? "bg-primary bg-clip-padding "
                                : "bg-white"
                            }`}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className=" bg-white">
                      <a href={`/products/${el.id}`}>
                        <div className="flex items-start justify-between">
                          <div className="">
                            <p className="text-paymentText text-[18px] font-bold text-xl">
                              {el?.name ?? ""}
                            </p>
                            <p className="text-cartSubText text-[16px] font-normal text-base">
                              {el?.short_description ?? ""}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-categoryTextColor text-2xl font-bold bg-white px-6 pb-6">
                  {el?.price ?? ""}₮
                </p>
                <div className="flex flex-row bg-white px-6 pb-6">
                  {el.quantity > 0 ? (
                    <>
                      <Image
                        priority
                        src="/assets/svg/card/ready.svg"
                        alt="Add to Card"
                        className="w-6 mr-1"
                        width={15}
                        height={15}
                      />
                      <p className="text-base font-normal">Бэлэн байгаа</p>
                    </>
                  ) : (
                    <p className="text-base text-red-500 font-normal">
                      Дууссан
                    </p>
                  )}
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
              </li>
            ))} */}
        </ul>
      </div>
    </>
  );
};

export default SaleProducts;
