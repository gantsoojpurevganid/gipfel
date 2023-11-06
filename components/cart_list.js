import React, { useContext, useState } from "react";
import CartContext from "@/context/CartContext";
import Link from "next/link";
import Top from "@/components/top";
import Nav from "@/components/nav";
import Image from "next/image";

const CartList = () => {
  const [isOrganization, setIsOrganization] = useState(false);
  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    addItemToCart(item);
  };

  function typeOnchange(e) {
    if (e.target.checked) {
      setIsOrganization(true);
    } else {
      setIsOrganization(false);
    }
  }

  function organizationOnchange(e) {}

  return (
    <>
      <div className="pt-12 pb-12 bg-content">
        <div className="mx-16">
          <div className="grid grid-cols-8">
            <div className="col-span-6">
              <div className="text-[#1E293B] font-bold text-[24px] pb-12">
                Миний сагс
              </div>
              <div className="bg-white p-3 mr-[40px]">
                <div>
                  {cart?.cartItems?.map((el, index) => (
                    <div
                      key={`item-promotion-index-#${index}`}
                      className={`flex p-6 cursor-pointer ${
                        index !== cart.length - 1 ? "border-b-[1px]" : ""
                      }`}
                    >
                      <div className="flex flex-row gap-6">
                        <div
                          className="w-[177px] h-36 mr-6 bg-cover bg-no-repeat bg-center bg-[image:var(--image-url)]"
                          style={{
                            "--image-url": `url(${el?.thumb ?? ""})`,
                          }}
                        />
                        <div className="col-span-3 w-[567px]">
                          <div className="text-[#1E293B] font-medium text-xl">
                            {el?.name ?? ""}
                          </div>
                        </div>
                        <div className="font-bold text-primary text-xl">
                          {`${el?.price}₮`}
                        </div>
                        <div className="col-span-2 grid justify-items-end">
                          <div className="text-[#475569] bg-content h-[48px] text-xl font-medium px-6 border-r-[1px] border-r-[#eee] flex flex-row gap-4 w-[125px] py-3 content-center">
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
                              {el?.quantity ?? 0}
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
                        <div className="font-bold text-primary text-xl grid justify-items-end">
                          {`${parseFloat(
                            el?.price * el?.quantity
                          ).toLocaleString()}₮`}
                        </div>
                        <div className="">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() => deleteItemFromCart(el?.product)}
                            >
                              X
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-[84px] col-span-2">
              <div className="bg-white p-6 ">
                <div className="">
                  {cart.cartItems?.length === 0 && (
                    <div className="mb-6 text-[#64748B] font-medium text-lg">
                      Одоогоор захиалга хийх бараа байхгүй байна.
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 pb-6">
                  <p className="text-lg font-normal text-paymentText">
                    Төлбөр:
                  </p>
                  <p className="text-lg font-normal text-paymentText justify-items-end grid">
                    600000
                  </p>
                </div>
                <div className="grid grid-cols-2 pb-6">
                  <p className="text-lg font-normal text-paymentText">
                    Тоо ширхэг:
                  </p>
                  <p className="text-lg font-normal text-paymentText justify-items-end grid">
                    4
                  </p>
                </div>
                <div className="grid grid-cols-2 pb-6">
                  <p className="text-lg font-normal text-paymentText">
                    Хүргэлт:
                  </p>
                  <p className="text-lg font-normal text-paymentText justify-items-end grid">
                    0
                  </p>
                </div>
                <div className="border-b-[1px] mb-6"></div>
                <div className="grid grid-cols-2 pb-6">
                  <p className="text-lg font-normal text-paymentText">
                    Нийт дүн:
                  </p>
                  <p className="text-lg font-normal text-paymentText justify-items-end grid">
                    960000
                  </p>
                </div>
                <div>
                  <div class="flex items-center pb-6">
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
                  className="w-[400px] h-[56px] bg-primary grid justify-items-center content-center cursor-pointer"
                  onClick={() => setPage("address")}
                >
                  <button className="text-white ">Үргэлжлүүлэх</button>
                </div>
              </div>
              {cart.length > 0 && (
                <>
                  <div
                    className="mt-6 bg-[#EF85B4] cursor-pointer h-14 flex items-center justify-center rounded-[8px] text-white font-bold text-base select-none active:shadow-sm active:bg-[#cc6b97]"
                    onClick={() =>
                      changePageStatus({ hasNext: true, currentPage: page })
                    }
                  >
                    Худалдан авах
                  </div>
                  <div
                    className="mt-3 bg-[#CBD5E1] cursor-pointer h-14 flex items-center justify-center rounded-[8px] text-white font-bold text-base select-none active:shadow-sm active:bg-[#9ea5ad]"
                    onClick={() => changePageStatus({ hasNext: false })}
                  >
                    Зээлээр авах
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
