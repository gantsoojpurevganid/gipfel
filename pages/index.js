import Nav from "@/components/nav";
import Top from "@/components/top";
import Carousel from "@/components/carousel";
import React, { useContext, useState } from "react";
import { useSWR, useSWRMutation } from "../fetcher";
import Footer from "@/components/footer";
import dynamic from "next/dynamic";
import Banner from "@/components/banner";
import SaleProducts from "@/components/saleProducts";
import Category from "@/components/category";
import { GlobalProvider } from "./GlobalProvider";
import NewProducts from "@/components/newProducts";
import HitProducts from "@/components/hitProducts";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import Card from "@/components/card";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";

const CarouselSkeleton = dynamic(() =>
  import("@/components/carousel/carouselSkeleton")
);

const ProductSkeleton = dynamic(() =>
  import("components/carousel/productSkeleton")
);

const Index = () => {
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
  const { data: data, isLoading } = useSWR("api/index/", {
    method: "GET",
  });

  console.log("data", data);

  return (
    <div className="">
      <div className="font-roboto">
        <GlobalProvider>
          <div className="bg-white">
            <Top />
            <Nav />
          </div>
          <div className="mb-8">
            {isLoading ? (
              <CarouselSkeleton />
            ) : (
              <Carousel CAROUSEL_ITEMS={data?.hero_carousels} />
            )}
          </div>

          <div className="bg-content">
            {isLoading ? (
              <ProductSkeleton />
            ) : (
              <>
                {/* <section
                  aria-labelledby="collection-heading"
                  className="lg:px-[64px] pt-[48px] pb-[64px] h-[1000px]"
                >
                  <div className="lg:p-12 bg-red-300 overflow-visible">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={5}
                      autoHeight={true}
                      mousewheel={{ forceToAxis: true }}
                      speed={700}
                      touchReleaseOnEdges={true}
                      threshold={20}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination, Mousewheel]}
                      scrollbar={{ draggable: true }}
                      onSlideChange={() => console.log("slide change")}
                      onSwiper={(swiper) => console.log(swiper)}
                      style={{ overflow: "visible" }}
                    >
                      {data?.new_products?.map((el, index) => (
                        <SwiperSlide key={el.id}>
                          <div
                            key={`list-product-keys-#${el.id}  `}
                            className="accord"
                          >
                            <div className="bg-white px-6 pt-6 h-[600px]  cursor-pointer">
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
                                  
                                >
                                  
                                </div>
                              </div>
                              <div className="max-w-[1400px] relative">
                                <div className="px-10 pt-10">
                                  <div
                                    style={{
                                      backgroundImage: `url(${el?.product_images[currentIndex]?.high_url})`,
                                    }}
                                    className="w-full h-[200px] rounded-2xl bg-center bg-contain"
                                  ></div>
                                  <div
                                    className={`grid grid-cols-${el?.product_images?.length} `}
                                  >
                                    {el?.product_images.map((url, index) => (
                                      <button
                                        key={index}
                                        onMouseEnter={() =>
                                          setCurrentIndex(index)
                                        }
                                      >
                                        <p className="h-72 top-6 absolute  text-white">
                                          {index}
                                        </p>
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
                              <div className=" bg-white pb-6">
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
                              <p className="text-categoryTextColor text-2xl font-bold bg-white pb-6">
                                {el?.price ?? ""}₮
                              </p>
                              <div className="lg:flex lg:flex-row bg-white pb-[16px]">
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
                                    <p className="text-base font-normal">
                                      Бэлэн байгаа
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-base text-red-500 font-normal">
                                    Дууссан
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="w-full h-[80px] bg-white relative accord-button cursor-pointer flex justify-start px-6 pb-6 gap-3">
                              <div className="text-[#475569] bg-content h-[56px] text-xl font-medium px-6 border-r-[1px] border-r-[#eee] flex flex-row gap-4 lg:w-[125px] w-full py-3 content-center">
                                <div
                                  onClick={() => decreaseQty()}
                                  className="grid content-center"
                                >
                                  <Image
                                    priority
                                    src="/assets/svg/solid/minus.svg"
                                    alt="Add to Card"
                                    className="w-4"
                                    width={15}
                                    height={15}
                                  />
                                </div>
                                <div className="grid content-center">
                                  {productQuantity}
                                </div>
                                <div
                                  className="grid content-center"
                                  onClick={() => increaseQty()}
                                >
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
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </section> */}
                <NewProducts NEW_PRODUCT_ITEMS={data} />

                <HitProducts HIT_PRODUCT_ITEMS={data} />
                <div className="bg-content">
                  <Banner />
                </div>
                <SaleProducts SALE_PRODUCT_ITEMS={data} />
                <Category CATEGORY={data} />
              </>
            )}
          </div>
          <div className="lg:block md:block sm:block">
            <Footer />
          </div>
        </GlobalProvider>
      </div>
    </div>
  );
};

export default Index;
