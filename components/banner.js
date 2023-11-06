import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <div className="lg:px-[64px] lg:pb-[64px] grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 lg:gap-6">
        <Image
          alt="Your"
          className="lg:pr-2 content-center"
          src="/assets/image/banner/Frame 60.png"
          height={700}
          width={700}
        ></Image>
        <Image
          alt="Your"
          className="lg:pr-2 content-center"
          src="/assets/image/banner/Frame 61.png"
          height={700}
          width={700}
        ></Image>
        <Image
          alt="Your"
          className="lg:pr-2 content-center"
          src="/assets/image/banner/Frame 62.png"
          height={700}
          width={700}
        ></Image>
      </div>
    </>
  );
};

export default Banner;
