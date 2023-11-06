import OrderHeader from "@/components/orderHeader";
import React, { useContext, useState, useEffect } from "react";
import CartContext from "@/context/CartContext";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Footer from "@/components/footer";
import { useSWR } from "@/fetcher";
import { useSWRMutation } from "@/fetcher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [isOrganizationCode, setIsOrganizationCode] = useState("");
  const [isOrganization, setIsOrganization] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { trigger, isMutating } = useSWRMutation("/create-order/");
  const { data, isLoading } = useSWR("/api/user-profile/", {
    method: "GET",
  });

  const { cart } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (d) => {
    console.log("eee", data);
    setIsOrganizationCode(localStorage.getItem("organization"));
    localStorage.setItem("user_name", data[0].first_name);
    localStorage.setItem("last_name", data[0].last_name);
    localStorage.setItem("email", data[0].email);
    localStorage.setItem("phone_number", data[0].phone_number);
    localStorage.setItem("note", d.description);
    Router.push("/order/delivery");
  };

  const onRegisterSubmit = async (d) => {
    console.log("uuuuuuu");
  };

  const step = () => {
    Router.push("/order");
  };
  return (
    <>
      <OrderHeader />
      <div className="pt-12 pb-12 bg-content">
        <div className="lg:mx-16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-8">
              <div className="lg:col-span-6">
                <div className="text-[#1E293B] font-bold text-[24px] pb-12">
                  Захиалгын мэдээлэл
                </div>
                <div className="bg-white p-12 lg:mr-[40px]">
                  <div>
                    <h2 className="text-lg font-medium pb-6 text-gray-900">
                      Мэдээлэл оруулах
                    </h2>
                    <div className="lg:grid grid-cols-2 gap-4">
                      <div className="pb-6">
                        <span className="text-categoryTextColor block text-base font-normal">
                          Овог
                        </span>
                        <input
                          defaultValue={data?.[0]?.last_name}
                          disabled
                          className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                          {...register("lastName")}
                        />
                        {/* {errors.lastName && (
                          <p className="text-red-500">Овог хоосон байна.</p>
                        )} */}
                      </div>

                      <div className="">
                        <span className="text-categoryTextColor block text-base font-normal">
                          Нэр
                        </span>
                        <input
                          defaultValue={data?.[0]?.first_name}
                          disabled
                          className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                          {...register("firstname")}
                        />
                        {/* {errors.firstname && (
                          <p className="text-red-500">Нэр хоосон байна.</p>
                        )} */}
                      </div>
                      <div className="pb-6">
                        <span className="text-categoryTextColor block text-base font-normal">
                          Утасны дугаар
                        </span>
                        <input
                          defaultValue={data?.[0]?.phone_number}
                          disabled
                          className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                          {...register("phone")}
                        />
                        {/* {errors.phone && (
                          <p className="text-red-500">
                            Утасны дугаар хоосон байна.
                          </p>
                        )} */}
                      </div>
                      <div>
                        <span className="text-categoryTextColor block text-base font-normal">
                          Имэйл
                        </span>
                        <input
                          defaultValue={data?.[0]?.email}
                          disabled
                          className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                          {...register("email")}
                        />
                        {/* {errors.email && (
                          <p className="text-red-500">Имэйл хоосон байна.</p>
                        )} */}
                      </div>
                      <div className="col-span-2">
                        <span className="text-categoryTextColor block text-base font-normal">
                          Тэмдэглэл
                        </span>
                        <input
                          placeholder="Оройн цагаар хүргүүлмээр байна гэх мэт"
                          className="border-#FFF block w-full py-8 px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                          {...register("description", { required: true })}
                        />
                        {errors.description && (
                          <p className="text-red-500">
                            Тэмдэглэл хоосон байна.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:pt-[84px] pt-6 lg:col-span-2">
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
                  <button
                    type="submit"
                    className="text-white lg:w-full w-[350px] h-[56px] bg-primary grid justify-items-center content-center cursor-pointer"
                  >
                    Үргэлжлүүлэх
                  </button>
                  <div className="lg:w-full w-[350px] h-[56px] bg-white grid justify-items-center content-center cursor-pointer">
                    <button onClick={step} className="text-black ">
                      Буцах
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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

export default User;
