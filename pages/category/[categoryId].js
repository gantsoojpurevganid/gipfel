import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSWR } from "@/fetcher";
import { Breadcrumb } from "@/components/breadcrumb";
import Image from "next/image";
import Top from "@/components/top";
import Nav from "@/components/nav";
import CartContext from "@/context/CartContext";
import ProductIdSkeleton from "@/components/carousel/productIdSkeleton";
import { useAuth } from "@/context/auth";
import Router from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import Card from "@/components/card";

export default function Product() {
  const { login, user } = useAuth();
  const { addItemToCart, cart } = useContext(CartContext);
  const router = useRouter();
  const { categoryId } = router.query;
  const [min, setMin] = useState(50000);
  const [max, setMax] = useState(150000);
  const { data: data, isLoading } = useSWR(
    `/api/filtered-products/?category_pk=${categoryId}`,
    {
      method: "GET",
      params: { category_pk: `3` },
    }
  );

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "200px",
  };

  const rangeChange = (e) => {
    setMin(e.target.value);
    setMax(150000 - e.target.value);
  };

  return (
    <div className="bg-white">
      <Top></Top>
      <Nav></Nav>
      <div className="lg:p-[64px] p-4 bg-content">
        <div className="">
          <div className="pb-6">
            {/* <Breadcrumb links={breadCrumbsData} /> */}
          </div>
          {isLoading ? (
            <ProductIdSkeleton />
          ) : (
            <>
              <div className="lg:grid lg:grid-cols-12 gap-6">
                <div className="col-span-2 bg-white p-4">
                  <p className="font-bold text-xl">Шүүлтүүр</p>
                  <div className="border-b-[1px] pt-4"></div>
                  <p className="pt-6">Үнэ</p>
                  <div className="grid grid-cols-2 gap-8 pt-6">
                    <div className="w-[100px] h-[40px] grid content-center justify-items-center bg-slate-50">
                      {min}
                    </div>
                    <div className="w-[100px] h-[40px] grid content-center justify-items-center bg-slate-50">
                      {max}
                    </div>
                  </div>
                  <div class="flex flex-col space-y-2 p-2 pt-6">
                    <input
                      type="range"
                      class="w-full"
                      min="50000"
                      max="150000"
                      step="1"
                      onChange={rangeChange}
                    />
                  </div>
                  <p className="pt-6">Өнгө</p>
                  <div class="flex items-center mb-4 pt-6">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Шар
                    </label>
                  </div>
                  <div class="flex items-center mb-4 pt-6">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Бор
                    </label>
                  </div>
                  <div class="flex items-center mb-4 pt-6">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Хар
                    </label>
                  </div>
                  <p className="pt-6">Хэмжээ</p>
                  <div class="flex items-center mb-4 pt-6">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      3
                    </label>
                  </div>
                  <div class="flex items-center mb-4 pt-6">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      6
                    </label>
                  </div>
                  <div class="flex items-center mb-4 pt-6">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      9
                    </label>
                  </div>
                </div>

                <div className="col-span-10">
                  <ul className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 lg:gap-9 md:gap-9 sm:gap-9 gap-3 text-[18px] font-normal leading-[28px] text-[#64748B] ">
                    {/* {data?.results?.length > 0 &&
                      data?.results?.map((el, index) => (
                        <li
                          key={`list-product-keys-#${index}`}
                          className="mb-9 "
                        >
                          <div className="bg-white relative p-6 h-5/6">
                            <div className="grid grid-cols-2">
                              <div className="bg-primary px-2 py-1 w-[136px] text-center mb-8">
                                <p className="text-xs font-medium text-newProductTextColor">
                                  Хит бүтээгдэхүүн
                                </p>
                              </div>
                              <div
                                className="grid justify-items-end cursor-pointer"
                                onClick={() => {
                                  if (el) {
                                    addItemToWhishlist({
                                      product: el.id,
                                      name: el.name,
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
                                <Image
                                  priority
                                  src="/assets/svg/card/wish.svg"
                                  alt="Add to Card"
                                  className="w-6"
                                  width={15}
                                  height={15}
                                />
                              </div>
                            </div>
                            <div className="w-64">
                              <Slide>
                                {el?.product_images.map((url, index) => (
                                  <div key={index}>
                                    <div
                                      style={{
                                        ...divStyle,
                                        backgroundImage: `url(${url.high_url})`,
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </Slide>

                            </div>
                            <a href={`/products/${el.id}`}>
                              <div className="flex items-start justify-between">
                                <div className="w-[85%]">
                                  <p className="text-paymentText text-[18px] font-bold text-xl">
                                    {el?.name ?? ""}
                                  </p>
                                  <p className="text-cartSubText text-[16px] font-normal text-base">
                                    {el?.short_description?.name ?? ""}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                          <p className="text-categoryTextColor text-2xl font-bold bg-white px-6 pb-6">
                            {el?.price ?? ""}₮
                          </p>
                          <div className="flex flex-row bg-white px-6 pb-6">
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
                          </div>
                          <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
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
                    {data?.results?.length > 0 &&
                      data?.results?.map((el, index) => {
                        return <Card key={el.id} el={el} />;
                      })}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="lg:block md:block sm:block">
        <Footer />
      </div>
    </div>
  );
}
