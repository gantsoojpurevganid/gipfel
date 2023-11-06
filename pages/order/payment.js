import OrderHeader from "@/components/orderHeader";
import React, { useContext } from "react";
import CartContext from "@/context/CartContext";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Footer from "@/components/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const { cart } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Router.push("/order/pay");
  };

  const step = () => {
    if (localStorage.getItem("order_id")) {
      toast.error("Захиалга үүссэн тул буцах боломжгүй!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      Router.push("/order/delivery");
    }
    // Router.push("/order/delivery");
  };
  return (
    <>
      <OrderHeader />
      <div className="pt-12 pb-12 bg-content">
        <div className="lg:mx-16">
          <div className="lg:grid lg:grid-cols-8">
            <div className="lg:col-span-6">
              <div className="text-[#1E293B] font-bold text-[24px] pb-12">
                Төлбөрийн хэлбэр сонгох
              </div>
              <div className="bg-white p-12 lg:mr-[40px]">
                <div className="lg:grid grid-cols-2 gap-6">
                  <div className="p-12 border-[1px] cursor-pointer hover:border-green-500">
                    <p className="font-bold text-2xl pb-[10px] text-categoryTextColor">
                      Qpay
                    </p>
                    <p className="text-xl text-paymentCartText">
                      Та төлбөрөө төлөхөөс өмнө мэдээллээ дахин нягтлана уу
                    </p>
                  </div>
                  <div
                    className="p-12 border-[1px] cursor-pointer hover:border-green-500"
                    onClick={onSubmit}
                  >
                    <p className="font-bold text-2xl pb-[10px] text-categoryTextColor">
                      Дансаар шилжүүлэх
                    </p>
                    <p className="text-xl text-paymentCartText">
                      Та төлбөрөө төлөхөөс өмнө мэдээллээ дахин нягтлана уу
                    </p>
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

                <div
                  className="lg:w-full h-[56px] bg-primary grid justify-items-center content-center cursor-pointer"
                  onClick={onSubmit}
                >
                  <button className="text-white ">Үргэлжлүүлэх</button>
                </div>
                <div
                  className="lg:w-full h-[56px] bg-white grid justify-items-center content-center cursor-pointer"
                  onClick={step}
                >
                  <button className="text-black ">Буцах</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="lg:block md:block sm:block">
        <Footer />
      </div>
    </>
  );
};

export default Payment;
