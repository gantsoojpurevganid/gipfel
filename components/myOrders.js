import React, { useEffect, useState, useContext } from "react";
import { useSWR } from "@/fetcher";
import { useSWRMutation } from "@/fetcher";
import UserSkeleton from "./carousel/userSkeleton";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import CartContext from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ProductSkeleton from "./carousel/productSkeleton";

const MyOrders = () => {
  const { data, isLoading } = useSWR("/my-order/", {
    method: "GET",
  });
  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <p className="text-normal text-2xl font-semibold pb-4">
            Миний захиалга
          </p>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" class="px-6 py-4 border-[1px]">
                          Захиалгын дугаар
                        </th>
                        <th scope="col" class="px-6 py-4 border-[1px]">
                          Огноо
                        </th>
                        <th scope="col" class="px-6 py-4 border-[1px]">
                          Төлөв
                        </th>
                        <th scope="col" class="px-6 py-4 border-[1px]">
                          Утасны дугаар
                        </th>
                        <th scope="col" class="px-6 py-4 border-[1px]">
                          Үнэ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((i) => (
                        <tr
                          key={i.id}
                          class="border-b dark:border-neutral-500 hover:bg-neutral-100 border-[1px]"
                        >
                          <td class="whitespace-nowrap px-6 py-4 font-medium border-[1px]">
                            #{i.id}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 font-medium border-[1px]">
                            {i.datetime}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 border-[1px]">
                            {i.status == 0
                              ? "Захиалга өгсөн"
                              : i.status == 1
                              ? "Хүлээн авсан"
                              : i.status == 2
                              ? "Бэлтгэгдэж байгаа"
                              : i.status == 3
                              ? "Хүргэлтэнд гарсан"
                              : i.status == 4
                              ? "Хүргэгдсэн"
                              : "Хаагдсан"}
                          </td>

                          <td class="whitespace-nowrap px-6 py-4 border-[1px]">
                            {i.phone_number}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 border-[1px]">
                            {parseInt(i.grand_total).toLocaleString()}₮
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
