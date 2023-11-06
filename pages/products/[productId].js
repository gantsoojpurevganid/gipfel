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
import Card from "@/components/card";

export default function Product() {
  const { login, user } = useAuth();
  const { addItemToCart, cart, addItemToWhishlist, wishlist } =
    useContext(CartContext);
  const router = useRouter();
  const { productId } = router.query;

  const { data, isLoading } = useSWR(
    productId ? `/api/products/${productId}` : null,
    {
      method: "GET",
    }
  );
  console.log("data", data);
  const product = data?.product;
  const firstCategory = data?.product.product_category_threes?.[0];
  const selfCategory = firstCategory?.category_three;
  const parentCategory = firstCategory?.category_two;
  const parentParentCategory = firstCategory?.category_one;
  const images = product?.product_images?.map(({ key, high_url }) => ({
    name: high_url,
  }));

  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(1);
  const [trans, setTrans] = useState(false);
  const [transR, setTransR] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    if (transR) {
      setTimeout(() => {
        setTransR(false);
      }, 10);
    }

    if (trans) {
      setTimeout(() => {
        setTrans(false);
        setIndex((index + 1) % images.length);
        setIndex1((index1 + 1) % images.length);
      }, 1);
    }
  }, [trans, transR]);

  const handlePrev = () => {
    setTransR(true);
    setTrans(false);
    const nextIndex = index - 1;
    const nextIndex1 = index1 - 1;

    if (nextIndex1 < 0) {
      setIndex1(images.length - 1);
    } else {
      setIndex1(nextIndex1);
    }

    if (nextIndex < 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };
  const handleNext = () => {
    setTrans(true);
    setTransR(false);
  };

  const buy = () => {
    user != undefined
      ? Router.push("/order")
      : toast.error("Та заавал нэвтэрнэ үү!!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          draggable: true,
        });
  };

  const handleImgClick = (idx) => {
    setActiveIndex(idx);
    if (idx === index) {
      return;
    }
    if (idx < index) {
      setIndex(idx);
      setIndex1(idx + 1);
      setTransR(true);
      setTrans(false);
    } else {
      setIndex((idx - 1) % images.length);
      setIndex1(idx % images.length);
      handleNext();
    }
  };

  const breadCrumbsData = [
    { name: "Ангилал", link: "/c" },
    ...(product
      ? [
          {
            link: `/product?id=${
              parentParentCategory && parentParentCategory.pk
            }&level=one`,
            name: parentParentCategory && parentParentCategory.name,
          },
          {
            link: `/product?id=${
              parentCategory && parentCategory.pk
            }&level=two`,
            name: parentCategory && parentCategory.name,
          },
          {
            link: `/product?id=${selfCategory && selfCategory.pk}&level=three`,
            name: selfCategory && selfCategory.name,
          },
        ]
      : []),
    {
      link: null,
      name: product && product.name,
    },
  ];

  const increaseQty = () => {
    if (productQuantity >= product?.quantity) {
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
    <div className="bg-white">
      <Top></Top>
      <Nav></Nav>
      <div className="lg:p-[64px] p-4 bg-content">
        <div className="">
          <div className="pb-6">
            <Breadcrumb links={breadCrumbsData} />
          </div>
          {isLoading ? (
            <ProductIdSkeleton />
          ) : (
            <>
              <p className="text-[34px] font-bold text-categoryTextColor pb-6">
                {product?.name}
              </p>
              <div className="lg:grid border-t lg:auto-rows-min lg:grid-cols-12 p-12 gap-6 bg-white">
                <div className="lg:col-span-5">
                  <div>
                    {product?.is_new ? (
                      <p className="text-xs font-medium bg-newProductPaddingColor px-[8px] py-[4px] w-[132px] text-newProductTextColor">
                        Шинэ бүтээгдэхүүн
                      </p>
                    ) : null}
                    {product?.is_hit ? (
                      <p className="text-xs font-medium bg-brandPrimary px-[8px] py-[4px] w-[132px] text-newProductTextColor">
                        Хит бүтээгдэхүүн
                      </p>
                    ) : null}
                    {(product?.sale != null) & (product?.is_hit == false) ? (
                      <p className="text-xs font-medium  bg-saleProductBgColor px-[8px] py-[4px] w-[132px] text-newProductTextColor">
                        Хямдрал
                      </p>
                    ) : null}
                  </div>
                  <div className="lg:block md:block sm:block hidden">
                    {images?.length > 0 ? (
                      <>
                        <div className="flex justify-center  space-x-4">
                          <div className="relative  w-full h-[450px] overflow-hidden rounded-xl">
                            <img
                              className={`absolute object-contain z-20 w-full h-full p-4  ${
                                trans
                                  ? "transition duration-0 "
                                  : transR
                                  ? ""
                                  : ""
                              }`}
                              src={images[index].name}
                              alt=""
                            />
                            {/* <img
                          className={`absolute object-contain z-0 w-full h-full  p-4 ${
                            trans
                              ? "animate-slideR"
                              : transR
                              ? "transition duration-500 ease-linear transform translate-x-full"
                              : ""
                          }`}
                          src={images[index1]?.name}
                          alt=""
                        /> */}
                          </div>
                        </div>

                        <div className="flex justify-center space-x-4 p-4">
                          {images.map((el, idx) => {
                            console.log("idx", idx);
                            console.log("images[index]", images[index]);
                            return (
                              <div key={idx}>
                                <img
                                  onClick={() => handleImgClick(idx)}
                                  className={`w-20 h-20 cursor-pointer ${
                                    idx == activeIndex
                                      ? "border-[2px] border-brandPrimary border-solid"
                                      : ""
                                  } pb-4 
                                 `}
                                  src={`${el.name}`}
                                  alt=""
                                />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="grid justify-items-center pt-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (product) {
                        addItemToWhishlist({
                          product: product.id,
                          name: product.name,
                          product_images: product.product_images,
                          price: product.price,
                          short_description: product.short_description,
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
                      (element) => element.product == product?.id
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
                <div className="lg:col-span-6">
                  <p className="text-[34px] font-medium text-gray-900">
                    {`${
                      product?.price
                        ? parseFloat(product.price).toLocaleString()
                        : null
                    }₮`}
                  </p>
                  <p className=" text-sm">
                    Үлдэгдэл:{" "}
                    <span
                      className={
                        (product?.quantity === 0
                          ? "text-red-600"
                          : "text-gray-600",
                        "font-semibold")
                      }
                    >
                      {product?.quantity === 0 ? "Дууссан" : product?.quantity}
                    </span>
                  </p>

                  <div className="pb-6">
                    <div className="text-gray-500">
                      <p>{product?.short_description}</p>
                    </div>
                  </div>
                  <div className="border-b-[1px]"></div>
                  <div className="lg:block md:block sm:block">
                    <div className="font-bold text-[#475569] text-base bg-white py-6 lg:flex gap-3 cursor-pointer">
                      <div className="lg:flex lg:flex-row gap-4">
                        <div className="text-[#475569] bg-content h-[48px] text-xl font-medium px-6 border-r-[1px] border-r-[#eee] flex flex-row gap-4 lg:w-[125px] w-full py-3 content-center">
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
                        <div
                          onClick={() => {
                            if (product) {
                              addItemToCart({
                                product: product.id,
                                name: product.name,
                                quantity: product.quantity,
                                thumb: product.product_images?.[0].mid_url,
                                price: product.price,
                                count: productQuantity,
                              });
                              toast.success("Амжилттай сагсаллаа", {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                newestOnTop: false,
                                closeOnClick: true,
                                draggable: true,
                              });
                            }
                          }}
                          className="lg:w-[160px] border-2 h-12 bg-white text-base text-primary font-normal p-3 grid justify-center"
                        >
                          Сагсанд нэмэх
                        </div>
                      </div>
                      <div
                        onClick={buy}
                        className="grid lg:w-[27%] h-12 border-[#94A3B8] border-[1px] content-center bg-primary justify-center text-newProductTextColor font-base font-normal"
                      >
                        Худалдаж авах
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
                    </div>
                  </div>
                  <div className="border-b-[1px]"></div>
                  <div className="lg:flex flex-row gap-6 pt-6">
                    <div className="px-4 py-3 border-[#94A3B8] border-[1px] flex flex-row cursor-pointer mb-3 w-[301px]">
                      <div className="w-15 h-15 overflow-hidden">
                        <Image
                          src="/assets/image/logo/storepay.png"
                          alt="gt"
                          height={50}
                          width={50}
                        />
                      </div>
                      <div className="text-primary text-sm font-normal pl-3">
                        <p className="font-bold">Хуваан төлөх</p>
                        StorePay
                        <div className="mt-3 flex text-black gap-2 cursor-pointer text-[10px]">
                          <div className="bg-[#E2E8F0] py-1 px-4 rounded-lg">
                            Хүүгүй
                          </div>
                          <div className="bg-[#E2E8F0] py-1 px-4 rounded-lg text-[10px]">
                            Шимтгэлгүй
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-[#94A3B8] border-[1px] flex flex-row cursor-pointer mb-3 w-[301px]">
                      <div className="w-15 h-15 overflow-hidden">
                        <Image
                          src="/assets/image/logo/tdb.png"
                          alt="gt"
                          height={50}
                          width={50}
                        />
                      </div>
                      <div className="text-primary text-sm font-normal pl-3">
                        <p className="font-bold">Хэрэглээний лизинг</p>
                        Худалдаа хөгжлийн банк
                        <div className="mt-3 flex text-black gap-2 cursor-pointer text-[10px]">
                          <div className="bg-[#E2E8F0] py-1 px-1 rounded-lg">
                            Урьдчилгаагүй
                          </div>
                          <div className="bg-[#E2E8F0] py-1 px-1 rounded-lg">
                            30 сар
                          </div>
                          <div className="bg-[#E2E8F0] py-1 px-4 rounded-lg">
                            10 сая
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="lg:px-[64px] p-4 bg-content">
        <p className="text-[34px] font-bold text-primary">Төстэй бараанууд</p>
        <div className="pt-[48px] pb-[64px]">
          <ul className="grid  lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 lg:gap-9 md:gap-9 sm:gap-9 gap-3 text-[18px] font-normal leading-[28px] text-[#64748B] ">
            {data?.similar_products?.length > 0 &&
              data?.similar_products?.slice(0, 6).map((el, index) => {
                return <Card key={el.index} el={el} />;
              })}
          </ul>
        </div>
      </div>
      <div className="lg:px-[64px] pb-[64px] bg-content">
        <div className="bg-white lg:p-[64px]">
          <p className="font-bold text-2xl pb-6">Тодорхойлолт</p>
          <p>{product?.full_description}</p>

          <p>{product?.status_description}</p>
        </div>
      </div>
      <div className="lg:px-[64px] pb-[64px] bg-content">
        <div className="bg-white lg:p-[64px]">
          <p className="font-bold text-2xl pb-6">Онцлог шинж чанарууд</p>
          <div className="grid grid-cols-2">
            <p className="font-medium text-lg text-paymentText">Өнгө</p>
            <p>{product?.color}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium text-lg text-paymentText">Диамерт</p>
            <p>{product?.diameter}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium text-lg text-paymentText">Материал</p>
            <p>{product?.material}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium text-lg text-paymentText">Хэмжээ</p>
            <p>{product?.capacity}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium text-lg text-paymentText">Жин</p>
            <p>{product?.weight}</p>
          </div>
        </div>
      </div>
      <div className="lg:block md:block sm:block">
        <Footer />
      </div>
    </div>
  );
}
