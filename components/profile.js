import React, { useEffect, useState } from "react";
import { useSWR } from "@/fetcher";
import { useSWRMutation } from "@/fetcher";
import UserSkeleton from "./carousel/userSkeleton";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { trigger, isMutating } = useSWRMutation("/api/update-profile/");
  const { data, isLoading } = useSWR("/api/user-profile/", {
    method: "GET",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Router.push("/order/payment");
    try {
      const res = await trigger({
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email: data.email,
      });
      if (res) {
        toast.success("Амжилттай хадгалаалаа", {
          position: "top-center",
          autoClose: 3000,
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

  return (
    <div>
      {isLoading ? (
        <UserSkeleton />
      ) : (
        <>
          {data?.[0]?.first_name ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white">
                <div>
                  <h2 className="text-lg font-medium pb-6 text-gray-900">
                    Хувийн мэдээлэл
                  </h2>
                  <div className="lg:grid grid-cols-2 gap-4">
                    <div className="pb-6">
                      <span className="text-categoryTextColor block text-base font-normal">
                        Овог
                      </span>
                      {data != undefined ? (
                        <input
                          defaultValue={data?.[0]?.last_name}
                          className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                          {...register("lastName", { required: true })}
                        />
                      ) : null}

                      {errors.lastName && <p>Овог хоосон байна.</p>}
                    </div>

                    <div className="">
                      <span className="text-categoryTextColor block text-base font-normal">
                        Нэр
                      </span>
                      <input
                        defaultValue={data?.[0]?.first_name}
                        className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && <p>Нэр хоосон байна.</p>}
                    </div>
                    <div className="pb-6">
                      <span className="text-categoryTextColor block text-base font-normal">
                        Утасны дугаар
                      </span>
                      <input
                        defaultValue={data?.[0]?.phone_number}
                        className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && <p>Утасны дугаар хоосон байна.</p>}
                    </div>
                    <div>
                      <span className="text-categoryTextColor block text-base font-normal">
                        Имэйл
                      </span>
                      <input
                        defaultValue={data?.[0]?.email}
                        className="border-#FFF block w-full py-[10px] px-4 shadow-sm mt-1 border-[1px] text-lg font-normal text-paymentCartText"
                        {...register("email", { required: true })}
                      />
                      {errors.email && <p>Имэйл хоосон байна.</p>}
                    </div>
                  </div>
                </div>
                {isMutating ? (
                  <div role="status" className="grid justify-left pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="lg:w-[127px] h-[56px] bg-primary grid justify-items-center content-center cursor-pointer">
                    <button type="submit" className="text-white ">
                      Хадгалах
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Profile;
