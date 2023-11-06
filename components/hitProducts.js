import React from "react";
import "react-slideshow-image/dist/styles.css";
import Link from "next/link";
import Card from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HitProducts = ({ HIT_PRODUCT_ITEMS = [] }) => {
  return (
    <>
      <div className="flex justify-between lg:px-[64px]">
        <p className=" text-[34px] font-bold text-primary">Хит бүтээгдэхүүн</p>
        {/* <Link
          href="/products/hitProduct"
          className="text-md font-bold text-primary grid content-center lg:justify-items-end"
        >
          Бүгдийг үзэх
        </Link> */}
      </div>

      <div className="lg:px-[64px] pt-[48px] pb-[64px]">
        <ul className="text-[18px] font-normal leading-[28px] text-[#64748B] cursor-pointer">
          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            style={{ overflowY: "visible", minWidth: "1580px" }}
            // breakpoints={{
            //   // when window width is >= 640px
            //   640: {
            //     width: 640,
            //     slidesPerView: 2,
            //   },
            //   // when window width is >= 768px
            //   1280: {
            //     width: 1280,
            //     slidesPerView: 2,
            //   },
            // }}
          >
            {HIT_PRODUCT_ITEMS?.hit_products?.length > 0 &&
              HIT_PRODUCT_ITEMS?.hit_products?.map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Card el={el} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </ul>
      </div>
    </>
  );
};

export default HitProducts;
