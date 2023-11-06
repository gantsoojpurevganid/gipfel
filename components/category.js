import { useEffect, useState } from "react";
import Link from "next/link";
import { useSWR } from "../fetcher";
import Image from "next/image";

export default function Category({ CATEGORY = [] }) {
  // const { data: categoryData, CategoryIsLoading } = useSWR("/api/categories/", {
  //   method: "GET",
  // });
  return (
    <>
      <div className="grid grid-cols-2 lg:px-[64px]">
        <p className=" text-[34px] font-bold text-primary">Онцлох категори</p>
        {/* <p className="text-md font-bold text-primary grid content-center justify-items-end">
          Бүгдийг үзэх
        </p> */}
      </div>
      <section
        aria-labelledby="collection-heading"
        className="lg:px-[64px] pt-[48px] pb-[64px] "
      >
        <div className="grid lg:grid-cols-3 gap-6 ">
          {CATEGORY?.special_categories?.map((cate) => (
            <div className="bg-white relative h-[400px]" key={cate.id}>
              <div className="pt-12 px-6 ">
                <p className="text-xl text-brandPrimary font-bold pb-4">
                  {cate.title}
                </p>
                <p className="text-base font-normal text-categoryTextColor w-4/5">
                  {cate.description}
                </p>
              </div>
              {/* <Image
                priority
                src={`/${cate.desktop_image_url}`}
                alt="Add to Card"
                className="p-[10px] mt-1"
                width={80}
                height={80}
              /> */}
              <div className="absolute bottom-0 right-0 w-[231px] h-[231px]">
                <div
                  style={{
                    backgroundImage: `url(${cate?.desktop_image_url})`,
                  }}
                  className="w-full h-full bg-center bg-cover "
                ></div>
                {/* <Image
                  priority
                  src={`/${cate.desktop_image_url}`}
                  alt="Add to Card"
                  className="p-[10px] mt-1"
                  width={80}
                  height={80}
                /> */}
              </div>
              <div className="absolute bottom-0">
                <div className="w-[250px] h-[80px] bg-white grid grid-cols-3 relative card-button cursor-pointer">
                  <div className="bg-primary"></div>
                  <div className="bg-white col-span-2"></div>
                  <div className="top-0 absolute card-button-pri">
                    <div className="flex flex-row ">
                      <p className="text-white grid content-center z-[-1]">
                        Дэлгэрэнгүй
                      </p>
                      <Image
                        priority
                        src="/assets/svg/card/arrow-down-s-line.svg"
                        alt="Add to Card"
                        className="p-[10px] mt-1"
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
