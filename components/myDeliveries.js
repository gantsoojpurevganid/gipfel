import React, { useContext, useState, useEffect } from "react";
import CartContext from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { useSWR } from "@/fetcher";
import { useSWRMutation, useDeleteSWRMutation } from "@/fetcher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "./carousel/spinner";

const MyDeliveries = () => {
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

  const onRegisterSubmit = async (d) => {
    try {
      const res = await trigger({
        city: parseInt(d.city),
        district: parseInt(d.district),
        khoroo: parseInt(d.khoroo),
        note: d.note,
        description: d.description,
      });
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
  return (
    <>
      <div className="">
        <div className="lg:col-span-6">
          <div className="bg-white">
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
                  {/* <div className="">
                    <p className="font-bold text-xl">
                      Бүртгэлтэй хаяг #{index + 1}
                    </p>
                    <p className="font-bold text-xl">Хаяг</p>
                    <p className="font-normal text-base">
                      {el.city_name},{el.district_name},{el.khoroo_name}
                    </p>
                    <p className="font-bold text-xl">Хаягын нэр</p>
                    <p className="font-normal text-base">{el.description}</p>
                    <p className="font-bold text-xl">Нэмэлт тэмдэглэл</p>
                    <p className="font-normal text-base">{el.note}</p>
                  </div> */}
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
                      <p className="font-bold text-base">Нэмэлт тэмдэглэл</p>
                      <p className="font-normal text-base text-textLgColor">
                        {el.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    </>
  );
};

export default MyDeliveries;
