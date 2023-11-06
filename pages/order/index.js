import React, { useContext, useState, useEffect } from "react";
import CartContext from "@/context/CartContext";
import Image from "next/image";
import OrderHeader from "@/components/orderHeader";
import Router from "next/router";
import Footer from "@/components/footer";
import { useAuth } from "@/context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const { login, user } = useAuth();
  const [isOrganization, setIsOrganization] = useState(false);
  const [isOrganizationCode, setIsOrganizationCode] = useState();
  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.count + 1;
    const item = { ...cartItem, count: newQty };
    if (cartItem?.count >= cartItem?.quantity) {
      toast.error("Барааны үлдэгдлээс хэтэрсэн захиалга байна!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      addItemToCart(item);
    }
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.count - 1;
    const item = { ...cartItem, count: newQty };
    if (newQty === 0) {
      toast.error("0 байж болохгүй!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      addItemToCart(item);
    }
  };

  // const increaseQty = () => {
  //   if (productQuantity >= product?.quantity) {
  //     toast("Барааны үлдэгдлээс хэтэрсэн захиалга байна!!!");
  //   } else {
  //     setProductQuantity(productQuantity + 1);
  //   }
  // };

  // const decreaseQty = () => {
  //   if (productQuantity === 1) {
  //     toast("Захиалах тоо хэмжээ 1-с бага байна!!!");
  //   } else {
  //     setProductQuantity(productQuantity - 1);
  //   }
  // };

  const nextStep = () => {
    if (user) {
      localStorage.setItem("organization", isOrganizationCode);
      localStorage.setItem("isOrganization", isOrganization);
      Router.push("/order/user");
    } else {
      toast.error("Та заавал нэвтэрнэ үү!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  function typeOnchange(e) {
    if (e.target.checked) {
      setIsOrganization(true);
    } else {
      setIsOrganization(false);
    }
  }

  function organizationOnchange(e) {
    if (e.target.value) {
      setIsOrganizationCode(e.target.value);
    }
  }

  return (
    <>
      <div className="bg-white">
        <div>
          <OrderHeader />
        </div>

        <div className="lg:pt-12 lg:pb-12 bg-content">
          <div className="lg:mx-16">
            <div className="lg:grid lg:grid-cols-8">
              <div className="lg:col-span-6">
                <div className="text-[#1E293B] font-bold text-[24px] lg:pb-12 ">
                  Миний сагс
                </div>
                <div className="bg-white p-3 lg:mr-[40px]">
                  <div>
                    {cart?.cartItems?.map((el, index) => (
                      <div
                        key={`item-promotion-index-#${index}`}
                        className={` ${
                          index !== cart.length - 1 ? "border-b-[1px]" : ""
                        }`}
                      >
                        <div className="lg:grid grid-cols-12 lg:p-6 cursor-pointer content-center relative">
                          <div
                            className="lg:w-[177px] lg:col-span-2 h-36 mr-6 bg-cover bg-no-repeat bg-center bg-[image:var(--image-url)]"
                            style={{
                              "--image-url": `url(${el?.thumb ?? ""})`,
                            }}
                          />
                          <div className="lg:col-span-5 lg:w-[567px] grid content-center">
                            <div className="text-[#1E293B] font-medium text-xl">
                              {el?.name ?? ""}
                            </div>
                          </div>
                          <div className="lg:col-span-4 lg:flex lg:justify-end gap-6 ">
                            <div className="font-bold text-primary text-xl grid content-center">
                              {`${el?.price}₮`}
                            </div>
                            <div className="grid content-center">
                              <div className="text-[#475569]  bg-content h-[48px] text-xl font-medium lg:px-6 border-r-[1px] border-r-[#eee] lg:flex lg:flex-row gap-4 w-[125px] lg:py-3 lg:content-center">
                                <div
                                  onClick={() => decreaseQty(el)}
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
                                  {el?.count ?? 0}
                                </div>
                                <div
                                  className="grid content-center"
                                  onClick={() => increaseQty(el)}
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
                            </div>
                            <div className="font-bold text-primary text-xl grid content-center">
                              {`${parseFloat(
                                el?.price * el?.count
                              ).toLocaleString()}₮`}
                            </div>
                          </div>

                          <div className="lg:grid content-center justify-items-end">
                            <a
                              className="px-4 py-2 text-red-600 bg-white border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer right-5"
                              onClick={() => deleteItemFromCart(el?.product)}
                            >
                              X
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                    {cart?.cartItems?.length === 0 ? (
                      <div className="p-6 text-[#64748B] font-medium text-lg">
                        Одоогоор захиалга хийх бараа байхгүй байна.
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="lg:pt-[84px] pt-6 col-span-2">
                <div className="bg-white p-6 ">
                  <div className="lg:grid grid-cols-2 pb-6">
                    <p className="text-lg font-normal text-paymentText">
                      Төлбөр:
                    </p>
                    {cart?.cartItems?.length === 0 ? (
                      0
                    ) : (
                      <p className="text-lg font-normal text-paymentText justify-items-end grid">
                        {parseFloat(
                          cart?.cartItems
                            ?.map((o) => o.price)
                            .reduce((a, c) => {
                              return parseFloat(parseFloat(a) + parseFloat(c));
                            })
                        ).toLocaleString()}
                        ₮
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 pb-6">
                    <p className="text-lg font-normal text-paymentText">
                      Тоо ширхэг:
                    </p>
                    {cart?.cartItems?.length === 0 ? (
                      0
                    ) : (
                      <p className="text-lg font-normal text-paymentText justify-items-end grid">
                        {cart?.cartItems
                          ?.map((o) => o.count)
                          .reduce((a, c) => {
                            return a + c;
                          })}
                        ш
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 pb-6">
                    <p className="text-lg font-normal text-paymentText">
                      Хүргэлт:
                    </p>
                    <p className="text-lg font-normal text-paymentText justify-items-end grid">
                      0₮
                    </p>
                  </div>
                  <div className="border-b-[1px] mb-6"></div>
                  <div className="grid grid-cols-2 pb-6">
                    <p className="text-lg font-normal text-paymentText">
                      Нийт дүн:
                    </p>
                    {cart?.cartItems?.length === 0 ? (
                      0
                    ) : (
                      <p className="text-lg font-normal text-paymentText justify-items-end grid">
                        {parseFloat(
                          cart?.cartItems
                            ?.map((o) => o.price * o.count)
                            .reduce((a, c) => {
                              return parseFloat(parseFloat(a) + parseFloat(c));
                            })
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center pb-6">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        onChange={typeOnchange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Албан байгууллага
                      </label>
                    </div>
                    {isOrganization ? (
                      <div className="pb-6">
                        <input
                          type="text"
                          id="first_name"
                          onChange={organizationOnchange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Байгууллагын регистр"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="lg:w-full h-[56px] bg-primary grid justify-items-center content-center cursor-pointer"
                    onClick={nextStep}
                  >
                    <button className="text-white ">Үргэлжлүүлэх</button>
                  </div>
                </div>
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
        </div>
        <div className="lg:block md:block sm:block">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Order;
