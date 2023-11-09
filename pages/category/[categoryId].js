import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSWR } from "@/fetcher";
import {
  useSWRMutation,
  useSWRMutationSort,
  useSWRMutationSortNewAsc,
} from "@/fetcher";
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
import Link from "next/link";
export default function Product() {
  const { login, user } = useAuth();
  const { addItemToCart, cart } = useContext(CartContext);
  const router = useRouter();

  const { categoryId } = router.query;
  const [min, setMin] = useState(50000);
  const [max, setMax] = useState(150000);
  const { trigger: saleTrigger, isMutating: saleLoad } = useSWRMutationSort(
    `/api/filtered-products/?category_pk=${categoryId}&ordering=sale`
  );

  const { trigger: saleTriggerAsc, isMutating: saleLoadAsc } =
    useSWRMutationSort(
      `/api/filtered-products/?category_pk=${categoryId}&ordering=-sale`
    );

  const { trigger: newTrigger, isMutating: newLoad } = useSWRMutationSort(
    `/api/filtered-products/?category_pk=${categoryId}&ordering=is_new`
  );
  const { trigger: newTriggerAsc, isMutating: newLoadAsc } = useSWRMutationSort(
    `/api/filtered-products/?category_pk=${categoryId}&ordering=-is_new`
  );
  const { trigger: nameTrigger, isMutating: nameLoad } = useSWRMutationSort(
    `/api/filtered-products/?category_pk=${categoryId}&ordering=name`
  );
  const { trigger: nameTriggerAsc, isMutating: nameLoadAsc } =
    useSWRMutationSort(
      `/api/filtered-products/?category_pk=${categoryId}&ordering=-name`
    );
  const { trigger: priceTrigger, isMutating: priceLoad } = useSWRMutationSort(
    `/api/filtered-products/?category_pk=${categoryId}&ordering=price`
  );
  const { trigger: priceTriggerAsc, isMutating: priceLoadAsc } =
    useSWRMutationSort(
      `/api/filtered-products/?category_pk=${categoryId}&ordering=-price`
    );
  const { data: data, isLoading } = useSWR(
    `/api/filtered-products/?category_pk=${categoryId}`,
    {
      method: "GET",
      // params: { category_pk: `3` },
    }
  );
  useEffect(() => {
    setCategoryData(data);
  }, [data]);
  const [asc, setAsc] = useState(false);
  const [ascSale, setAscSale] = useState(false);
  const [ascName, setAscName] = useState(false);
  const [ascPrice, setAscPrice] = useState(false);
  const [categoryData, setCategoryData] = useState(data);

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

  const newSort = async (e) => {
    if (e.target.checked) {
      setAsc(true);
      try {
        const res = await newTrigger();
        console.log("res.status", res);
        if (res.status == 200) {
          setCategoryData(res.data);
          // data = res;
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setAsc(false);
      try {
        const res = await newTriggerAsc();
        console.log("res.status", res);
        if (res.status == 200) {
          setCategoryData(res.data);
          // data = res;
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const saleSort = async (e) => {
    if (e.target.checked) {
      setAscSale(true);
      try {
        const res = await saleTrigger();
        console.log("res.status", res);
        if (res.status == 200) {
          setCategoryData(res.data);
          // data = res;
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setAscSale(false);
      try {
        const res = await saleTriggerAsc();
        console.log("res.status", res);
        if (res.status == 200) {
          setCategoryData(res.data);
          // data = res;
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const nameSort = async (e) => {
    if (e.target.checked) {
      setAscName(true);
      try {
        const res = await nameTrigger();
        if (res.status == 200) {
          setCategoryData(res.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setAscName(false);
      try {
        const res = await nameTriggerAsc();
        if (res.status == 200) {
          setCategoryData(res.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const priceSort = async (e) => {
    if (e.target.checked) {
      setAscPrice(true);
      try {
        const res = await priceTrigger();
        if (res.status == 200) {
          setCategoryData(res.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setAscPrice(false);
      try {
        const res = await priceTriggerAsc();
        if (res.status == 200) {
          setCategoryData(res.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  console.log("gt", data);
  console.log("categoryData", categoryData);
  return (
    <div className="bg-white">
      <Top></Top>
      <Nav></Nav>
      <div className="lg:p-[64px] p-4 bg-content">
        <div className="">
          <div className="pb-6">
            <div className="bg-white py-4 px-4 w-full flex gap-6">
              <div
                className="flex flex-row gap-2 cursor-pointer"
                // onClick={newSort}
                value={true}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={newSort}
                  ></input>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Шинээр
                  </span>
                </label>
                {asc ? (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-down.svg"
                    height={20}
                    width={30}
                  />
                ) : (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-up.svg"
                    height={20}
                    width={30}
                  />
                )}
              </div>
              <div
                className="flex flex-row gap-2 cursor-pointer"
                // onClick={newSort}
                value={true}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={saleSort}
                  ></input>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Хямдралаар
                  </span>
                </label>
                {ascSale ? (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-down.svg"
                    height={20}
                    width={30}
                  />
                ) : (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-up.svg"
                    height={20}
                    width={30}
                  />
                )}
              </div>
              <div
                className="flex flex-row gap-2 cursor-pointer"
                // onClick={newSort}
                value={true}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={nameSort}
                  ></input>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Нэрээр
                  </span>
                </label>
                {ascName ? (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-down.svg"
                    height={20}
                    width={30}
                  />
                ) : (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-up.svg"
                    height={20}
                    width={30}
                  />
                )}
              </div>
              <div
                className="flex flex-row gap-2 cursor-pointer"
                // onClick={newSort}
                value={true}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={priceSort}
                  ></input>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Үнээр
                  </span>
                </label>
                {ascPrice ? (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-down.svg"
                    height={20}
                    width={30}
                  />
                ) : (
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/arrow-sm-up.svg"
                    height={20}
                    width={30}
                  />
                )}
              </div>
            </div>

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
                    {categoryData?.results?.length > 0 &&
                      categoryData?.results?.map((el, index) => {
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
