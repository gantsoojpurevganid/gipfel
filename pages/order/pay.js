import OrderHeader from "@/components/orderHeader";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "@/context/CartContext";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Footer from "@/components/footer";
import Image from "next/image";

const Pay = () => {
  const [orderId, setOrderId] = useState(0);
  const { cart } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account: "5700 784 775",
      name: "Gipfel mongolia",
      amount: "150’000₮",
      description: "99456587-#128",
    },
  });

  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("10/19/2023 11:34:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("order_id");
    setOrderId(item);
  }, []);
  const check = () => {
    localStorage.setItem("cart", JSON.stringify([]));
  };
  const step = () => {
    Router.push("/order/payment");
  };
  return (
    <>
      <OrderHeader />
      <div className="pt-12 pb-12 bg-content">
        <div className="lg:mx-16">
          <div className="lg:grid grid-cols-8">
            <div className="lg:col-span-6">
              <div className="text-[#1E293B] font-bold text-[24px] pb-12">
                Төлбөр төлөх
              </div>
              <div className="bg-white p-12 lg:mr-[40px] mb-6">
                <div className="lg:flex gap-6">
                  <div>
                    <Image
                      priority
                      src="/assets/image/qr.png"
                      alt="Add to Card"
                      className="w-220"
                      width={220}
                      height={220}
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="font-bold text-xl">
                      Захиалга амжилттай үүссэн байна
                    </p>
                    <p className="font-normal text-xl text-textLgColor">
                      Захиалгын дугаар: {orderId}
                    </p>
                    <p className="font-medium text-xs text-cartSubText italic">
                      Төлбөр төлөх хугацаа
                    </p>
                    <div className="">
                      <div className="flex gap-4">
                        <div className="border-[1px] p-[10px] bg-buttonBgColor">
                          <span className="time font-bold text-2xl">
                            {hours}
                          </span>
                        </div>
                        <span className="divider grid content-center">:</span>
                        <div className="border-[1px] p-[10px] bg-buttonBgColor">
                          <span className="time font-bold text-2xl">
                            {minutes}
                          </span>
                        </div>
                        <span className="divider grid content-center">:</span>
                        <div className="border-[1px] p-[10px] bg-buttonBgColor">
                          <span className="time font-bold text-2xl">
                            {seconds}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-12 lg:mr-[40px]">
                <div className="mt-4 lg:grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-categoryTextColor block text-base font-normal">
                      Дансны дугаар
                    </span>
                    <input
                      disabled
                      className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                      {...register("account")}
                    />
                  </div>

                  <div>
                    <span className="text-categoryTextColor block text-base font-normal">
                      Хүлээн авагчийн овог нэр
                    </span>
                    <input
                      disabled
                      className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                      {...register("name")}
                    />
                  </div>
                  <div>
                    <span className="text-categoryTextColor block text-base font-normal">
                      Мөнгөн дүн
                    </span>
                    <input
                      disabled
                      className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                      {...register("amount")}
                    />
                  </div>
                  <div>
                    <span className="text-categoryTextColor block text-base font-normal">
                      Гүйлгээний утга
                    </span>
                    <input
                      disabled
                      className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                      {...register("description")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pt-[84px] pt-6 col-span-2">
              <div className="bg-white p-6 ">
                <div className="grid grid-cols-2 pb-6">
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

                <div className="lg:w-full h-[56px] bg-primary grid justify-items-center content-center cursor-pointer">
                  <button type="submit" className="text-white " onClick={check}>
                    Төлбөр шалгах
                  </button>
                </div>
                <div className="lg:w-full h-[56px] bg-white grid justify-items-center content-center cursor-pointer">
                  <button onClick={step} className="text-black ">
                    Буцах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:block md:block sm:block">
        <Footer />
      </div>
    </>
  );
};

export default Pay;
