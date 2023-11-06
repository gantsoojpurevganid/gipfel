import React, { useState, useEffect } from "react";
import Link from "next/link";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import { Img } from "./Img";
import { classNames } from "../utilts";
import { useSWR } from "@/fetcher";

const translateX = [
  "",
  "-translate-x-full",
  "-translate-x-[200%]",
  "-translate-x-[300%]",
  "-translate-x-[400%]",
  "-translate-x-[500%]",
  "-translate-x-[600%]",
];

function Carousel({ CAROUSEL_ITEMS }) {
  // const { data, isLoading } = useSWR("/api/hero-carousel", {
  //   method: "GET",
  // });
  // const { data: data, IndexisLoading } = useSWR("/api/index/", {
  //   method: "GET",
  // });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const updateIndex = (newIndex) =>
    setActive(
      newIndex < 0
        ? CAROUSEL_ITEMS.length - 1
        : newIndex >= CAROUSEL_ITEMS?.length
        ? 0
        : newIndex
    );

  useEffect(() => {
    const interval = setInterval(
      () => !paused && updateIndex(active + 1),
      4000
    );

    return () => interval && clearInterval(interval);
  });

  return (
    <div className="relative bg-white z-[-1]">
      <div className="bg-primary absolute right-0 top-0 -bottom-10 w-2/3 md:w-1/2"></div>
      <div
        className="pt-10 overflow-hidden"
        onMouseOut={() => setPaused(false)}
        onMouseOver={() => setPaused(true)}
      >
        <div
          className={classNames(
            translateX[active],
            "whitespace-nowrap transition-transform relative z-10 duration-300"
          )}
        >
          {CAROUSEL_ITEMS?.map((i) => (
            <Link className="z-50 h-full" href={i.destination_url} key={i.id}>
              <Img
                alt="carousel image"
                className="w-full hidden md:inline-flex items-center justify-center"
                src={i.desktop_image_url}
              />
              <Img
                alt="carousel image"
                className="w-full inline-flex md:hidden items-center justify-center"
                src={i.mobile_image_url}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute p-2 md:p-4 flex gap-4 z-20 bg-primary -bottom-10 right-0 md:right-10">
        <button onClick={() => updateIndex(active - 1)}>
          <ChevronLeft className=" w-10 md:w-20 aspect-square text-white" />
        </button>
        <button onClick={() => updateIndex(active + 1)}>
          <ChevronRight className=" w-10 md:w-20 aspect-square text-white" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
