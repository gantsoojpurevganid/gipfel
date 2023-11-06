import React from "react";
import Link from "next/link";
import Card from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function NewProducts({ NEW_PRODUCT_ITEMS = [] }) {
  return (
    <>
      <div className="flex justify-between lg:pt-[64px] lg:px-[64px]">
        <p className="text-[34px] font-bold text-primary">Шинэ бүтээгдэхүүн</p>
        {/* <Link
          href="/products/newProduct"
          className="text-md font-bold text-primary lg:grid content-center justify-items-end cursor-pointer"
        >
          Бүгдийг үзэх
        </Link> */}
      </div>
      <section
        aria-labelledby="collection-heading"
        className="lg:px-[64px] pt-[48px] pb-[64px]"
      >
        <div className="lg:p-12 bg-new_product ">
          {/* <div className="text-[18px] font-normal leading-[28px] text-[#64748B] cursor-pointer "> */}
          <div className="text-[18px] font-normal leading-[28px] text-[#64748B] cursor-pointer ">
            {/* {NEW_PRODUCT_ITEMS?.new_products?.map((el, index) => {
              return <Card el={el} key={el.id} />;
            })} */}
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              style={{ overflowY: "visible" }}
              breakpoints={{
                // when window width is >= 640px
                240: {
                  width: 240,
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                420: {
                  width: 420,
                  slidesPerView: 1,
                },
                620: {
                  width: 620,
                  slidesPerView: 2,
                },
              }}
            >
              {NEW_PRODUCT_ITEMS?.new_products?.map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Card el={el} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
