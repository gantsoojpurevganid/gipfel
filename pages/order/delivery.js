import OrderHeader from "@/components/orderHeader";
import React, { useContext, useState, useEffect } from "react";
import CartContext from "@/context/CartContext";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Footer from "@/components/footer";
import { useSWR } from "@/fetcher";
import { useSWRMutation, useDeleteSWRMutation } from "@/fetcher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "../../components/carousel/spinner";

const Delivery = () => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState(0);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [districtIds, setDistrictIds] = useState([]);
  const [khorooIds, setKhorooIds] = useState([]);
  const [cityId, setCityId] = React.useState();
  const [addressIds, setAddressIds] = React.useState([]);
  const { trigger: createOrder, isMutating: orderLoad } =
    useSWRMutation("/create-order/");
  const { trigger, isMutating } = useSWRMutation("/api/user-address/");
  const { trigger: deleteTrigger, isMutating: load } = useDeleteSWRMutation(
    `/api/user-address/${deleteId}/`
  );
  const { data, isLoading } = useSWR("/api/user-address/", {
    method: "GET",
  });
  console.log("datadata", data);
  const { data: countryData, isLoading: isCountryLoading } = useSWR(
    "/api/address/city/",
    {
      method: "GET",
    }
  );
  const { data: districtData, isLoading: isDistrictLoading } = useSWR(
    "/api/address/district/",
    {
      method: "GET",
    }
  );
  const { data: khorooData, isLoading: isKhorooLoading } = useSWR(
    "/api/address/khoroo/",
    {
      method: "GET",
    }
  );

  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (addressIds.length > 1) {
      toast.error("1-с олон хаяг сонгож болохгүй!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  }, [addressIds.length]);

  const onSubmit = async (d) => {
    console.log("hhh");
    if (addressIds.length > 1) {
      toast.error("1-с олон хаяг сонгож болохгүй!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      if (addressIds.length == 0) {
        toast.error("Хүргүүлэх хаяг тодорхойгүй байна!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        console.log("addressIds[0]", addressIds[0]);
        try {
          // console.log("ddddddd", isOrganization, isOrganizationCode);
          var regexPattern = new RegExp("true");
          const res = await createOrder({
            username: localStorage.getItem("user_name"),
            last_name: localStorage.getItem("last_name"),
            email: localStorage.getItem("email"),
            phone_number: localStorage.getItem("phone_number"),
            // note: d.description,
            address: addressIds[0],
            is_company: regexPattern.test(
              localStorage.getItem("isOrganization")
            ),
            company_ttd: localStorage.getItem("organization"),
            products: cart.cartItems,
          });
          if (res.order_id) {
            localStorage.setItem("order_id", res.order_id);
            toast.success("Амжилттай захиалга үүслээ та төлбөрөө төлнө үү!!!", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              newestOnTop: false,
              closeOnClick: true,
              draggable: true,
            });

            setTimeout(() => {
              Router.push("/order/payment");
            }, 3000);
          } else {
            toast.error("Алдаа гарлаа.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              newestOnTop: false,
              closeOnClick: true,
              draggable: true,
            });
          }
        } catch (error) {
          console.log("error", error);
          toast.error(`${error?.response?.data?.detail}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            newestOnTop: false,
            closeOnClick: true,
            draggable: true,
          });
        }
      }
    }
  };

  const onRegisterSubmit = async (d) => {
    console.log("uuuuuuu", d);
    console.log("d", parseInt(d.city));
    try {
      const res = await trigger({
        city: parseInt(d.city),
        district: parseInt(d.district),
        khoroo: parseInt(d.khoroo),
        note: d.note,
        description: d.description,
      });
      console.log("res", res);
      if (res.id) {
        toast.success("Амжилттай хаяг үүслээ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          draggable: true,
        });
        setShowRegisterModal(false);
        // setTimeout(() => {
        //   Router.push("/order/payment");
        // }, 2000);
      } else {
        toast.error("Алдаа гарлаа.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const step = () => {
    Router.push("/order/user");
  };

  const cityOnchange = (e) => {
    setCityId(e.target.value);
    const found = districtData.filter(
      (element) => element.city == e.target.value
    );
    if (found.length > 0) {
      setDistrictIds(found);
    } else {
      setDistrictIds([]);
      setKhorooIds([]);
    }
  };

  const districtOnchange = (e) => {
    const found = khorooData.filter(
      (element) =>
        (element.district == e.target.value) & (element.city == cityId)
    );
    if (found.length > 0) {
      setKhorooIds(found);
    } else {
      setKhorooIds([]);
    }
  };

  const selectAddress = (e) => {
    // setAddressIds(e)
    const array = [];
    const { checked } = e.target;
    if (checked) {
      array.push(e.target.value);
      console.log("array", array);
      if (array.length > 1) {
        toast.error("1-с олон хаяг сонгож болохгүй!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
    console.log("sss", e.target.value);
    console.log("sss", checked);
  };
  console.log("addressIds", addressIds);
  return (
    <>
      <OrderHeader />
      <div className="pt-12 pb-12 bg-content">
        <div className="lg:mx-16">
          <div className="text-[#1E293B] font-bold text-[24px]">
            Хүргэлтийн мэдээлэл
          </div>
          <div className="grid lg:grid-cols-8">
            <div className="lg:col-span-6 pt-12">
              <div className="bg-white p-12 lg:mr-[40px]">
                <div>
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-bold pb-6 text-gray-900">
                      Хүргэлтийн хаяг
                    </h2>
                    <div
                      className="py-3 px-[16px] bg-buttonBgColor lg:flex lg:flex-row content-center gap-[5px] cursor-pointer"
                      onClick={() => {
                        setShowRegisterModal(true);
                      }}
                    >
                      <div className="grid content-center">
                        <Image
                          priority
                          src="/assets/svg/solid/add-fill.svg"
                          alt="Add to Card"
                          className="w-5"
                          width={15}
                          height={15}
                        />
                      </div>
                      <p className="grid content-center">Хаяг нэмэх</p>
                    </div>
                  </div>

                  <div className="border-b-[1px] pt-6"></div>

                  {data?.map((el, index) => (
                    <div
                      key={index}
                      className="flex gap-6 relative border-[1px] mt-6 px-6 py-4"
                    >
                      <div className="flex items-start pb-6">
                        <input
                          id={index}
                          type="checkbox"
                          // onChange={selectAddress}
                          onChange={(e) =>
                            setAddressIds((c) =>
                              e.target.checked
                                ? [...c, el.id]
                                : // & (c.length > 1) ? (
                                  //   toast.error(
                                  //     "1-с олон хаяг сонгож болохгүй!!!",
                                  //     {
                                  //       position: "top-center",
                                  //       autoClose: 2000,
                                  //       hideProgressBar: true,
                                  //       newestOnTop: false,
                                  //       closeOnClick: true,
                                  //       draggable: true,
                                  //     }
                                  //   )
                                  // ) : (
                                  //   <p>j</p>
                                  // )
                                  c.filter((em) => em != el.id)
                            )
                          }
                          value={el.id}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>

                      <div className="">
                        <p className="font-bold text-xl pb-3">
                          Бүртгэлтэй хаяг #{index + 1}
                        </p>
                        <div className="pb-3">
                          <p className="font-bold text-base">Хаяг</p>
                          <p className="font-normal text-base text-textLgColor">
                            {el.city_name},{el.district_name},{el.khoroo_name}
                          </p>
                        </div>
                        <div className="pb-3">
                          <p className="font-bold text-base">Хаягын нэр</p>
                          <p className="font-normal text-base text-textLgColor">
                            {el.description}
                          </p>
                        </div>
                        <div className="pb-3">
                          <p className="font-bold text-base">
                            Нэмэлт тэмдэглэл
                          </p>
                          <p className="font-normal text-base text-textLgColor">
                            {el.note}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row absolute right-4 bottom-4 gap-4">
                        <button className=" bg-buttonBgColor h-[36px] w-[55px] ">
                          Засах
                        </button>
                        <button
                          className=" bg-buttonBgColor h-[36px] w-[55px]"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteId(el.id);
                          }}
                        >
                          Хасах
                        </button>
                        {showDeleteModal && (
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-full max-w-2xl max-h-full">
                                <div className="w-[350px] relative bg-white rounded-lg shadow dark:bg-gray-700 px-6 py-12 flex flex-col">
                                  <div className="absolute top-4 right-4">
                                    <a
                                      href="#"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      onClick={() => {
                                        setShowDeleteModal(false);
                                      }}
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </a>
                                  </div>

                                  <div className="pb-6">
                                    <p>Та устгахдаа итгэлтэй байна уу?</p>
                                  </div>

                                  <div className="flex flex-row absolute right-4 bottom-4 gap-4">
                                    <button
                                      className=" bg-white h-[36px] w-[55px] border-[1px] rounded-md"
                                      onClick={() => {
                                        setShowDeleteModal(false);
                                      }}
                                    >
                                      Үгүй
                                    </button>
                                    <button
                                      className=" bg-blue-500 h-[36px] w-[55px] border-[1px] rounded-md"
                                      onClick={async () => {
                                        try {
                                          const res = await deleteTrigger();
                                          if (res.status == 204) {
                                            toast.success(
                                              "Амжилттай устгалаа !!!",
                                              {
                                                position: "top-center",
                                                autoClose: 3000,
                                                hideProgressBar: true,
                                                newestOnTop: false,
                                                closeOnClick: true,
                                                draggable: true,
                                              }
                                            );
                                            setShowDeleteModal(false);
                                            router.reload();
                                          }
                                        } catch (error) {
                                          console.log("error", error);
                                        }
                                      }}
                                    >
                                      Тийм
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:pt-[48px] lg:col-span-2">
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
                  className="w-full h-[56px] bg-primary grid justify-items-center content-center cursor-pointer"
                  onClick={onSubmit}
                >
                  <button className="text-white ">Үргэлжлүүлэх</button>
                </div>
                <div
                  className="lg:w-full w-[350px] h-[56px] bg-white grid justify-items-center content-center cursor-pointer"
                  onClick={step}
                >
                  <button className="text-black ">Буцах</button>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
        {showRegisterModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full max-w-2xl max-h-full">
                <div className="w-[500px] relative bg-white dark:bg-gray-700 p-12 flex flex-col">
                  <div className="absolute top-4 right-4">
                    <a
                      href="#"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setShowRegisterModal(false);
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </a>
                  </div>

                  <form onSubmit={handleSubmit(onRegisterSubmit)}>
                    <div className="flex flex-col gap-6 pb-6">
                      <div>
                        <p className="font-bold text-2xl text-categoryTextColor">
                          Хаяг оруулах
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-normal text-textLgColor"
                        >
                          Нэр / Аймаг
                        </label>
                        <select
                          {...register("city", {
                            required: true,
                          })}
                          className="border p-[10px] border-gray-300 text-categoryTextColor text-xl focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={cityOnchange}
                          placeholder="Байршил сонгоно уу"
                        >
                          <option hidden></option>
                          {countryData.map((el) => {
                            return (
                              <option key={el.id} value={el.id}>
                                {el.value}
                              </option>
                            );
                          })}
                        </select>
                        {errors.district && (
                          <p className="text-red-500">Хот хоосон байна.</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-normal text-textLgColor"
                        >
                          Сум / Дүүрэг
                        </label>
                        <select
                          {...register("district", {
                            required: true,
                          })}
                          className=" border p-[10px] border-gray-300 text-categoryTextColor text-xl focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={districtOnchange}
                          placeholder="Сонголтоо хийнэ үү"
                        >
                          <option hidden></option>
                          {districtIds?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.value}
                            </option>
                          ))}
                        </select>
                        {errors.district && (
                          <p className="text-red-500">Дүүрэг хоосон байна.</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-normal text-textLgColor"
                        >
                          Хороо / Баг
                        </label>
                        <select
                          {...register("khoroo", {
                            required: true,
                          })}
                          className="border p-[10px] border-gray-300 text-xl text-categoryTextColor font-normal focus:ring-blue-500 focus:border-blue-500 block w-full  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option hidden></option>
                          {khorooIds?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.value}
                            </option>
                          ))}
                        </select>
                        {errors.khoroo && (
                          <p className="text-red-500">Хороо хоосон байна.</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-normal text-textLgColor"
                        >
                          Дэлгэрэнгүй
                        </label>
                        <input
                          className="border p-[10px] border-gray-300 text-xl text-categoryTextColor font-normal focus:ring-blue-500 focus:border-blue-500 block w-full  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("description")}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-normal text-textLgColor"
                        >
                          Нэмэлт мэдээлэл
                        </label>
                        <input
                          className="border p-[10px] border-gray-300 text-xl text-categoryTextColor font-normal focus:ring-blue-500 focus:border-blue-500 block w-full  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("note")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <button
                        onClick={() => {
                          setShowRegisterModal(false);
                        }}
                        className="h-auto p-[10px] bg-white grid justify-items-center content-center cursor-pointer text-lg text-paymentText font-bold border-[1px]"
                      >
                        Буцах
                      </button>
                      {isMutating ? (
                        <Spinner />
                      ) : (
                        <button
                          type="submit"
                          className="h-auto p-[10px] bg-primary grid justify-items-center content-center cursor-pointer text-lg text-white font-bold border-[1px]"
                        >
                          Хадгалах
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
          </>
        )}
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

export default Delivery;
