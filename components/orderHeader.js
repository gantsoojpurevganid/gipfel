import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Top from "@/components/top";
import Nav from "@/components/nav";
import Image from "next/image";
import { useRouter } from "next/router";

const OrderHeader = () => {
  const [page, setPage] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="bg-white">
        <Top></Top>
        <Nav></Nav>
        <div className="lg:px-[300px] border-[1px] lg:py-6 lg:grid lg:justify-items-center">
          <ul className="bread text-[#64748B] text-base font-medium lg:flex lg:flex-row gap-12">
            <li>
              <div className="lg:flex flex-row gap-3">
                <Image
                  priority
                  src="/assets/svg/icons/shopping-cart.svg"
                  alt="Follow us on Facebook"
                  className="mt-[2px]"
                  width={24}
                  height={24}
                />
                <span
                  className={
                    router?.route === "/order"
                      ? "text-base font-bold text-brandPrimary"
                      : "text-base font-normal text-brandPrimary"
                  }
                >
                  Сагс
                </span>
              </div>
            </li>
            <div className="lg:grid content-center w-[60px] ">
              <Image
                priority
                src="/assets/svg/card/line.svg"
                alt="Follow us on Facebook"
                width={58}
                height={50}
              />
            </div>
            <li className={page === "address" ? "active" : ""}>
              <div className="lg:flex flex-row gap-3">
                <Image
                  priority
                  src="/assets/svg/icons/shopping-bag.svg"
                  alt="Follow us on Facebook"
                  className="mt-[2px]"
                  width={24}
                  height={24}
                />
                <span
                  className={
                    router?.route === "/order/user"
                      ? "text-base font-bold text-brandPrimary"
                      : "text-base font-normal text-brandPrimary"
                  }
                >
                  Захиалга
                </span>
              </div>
            </li>

            <div className="lg:grid content-center w-[60px] ">
              <Image
                priority
                src="/assets/svg/card/line.svg"
                alt="Follow us on Facebook"
                width={58}
                height={50}
              />
            </div>
            <li className={page === "delivery" ? "active" : ""}>
              <div className="lg:flex flex-row gap-3">
                <Image
                  priority
                  src="/assets/svg/icons/shopping-bag.svg"
                  alt="Follow us on Facebook"
                  className="mt-[2px]"
                  width={24}
                  height={24}
                />
                <span
                  className={
                    router?.route === "/order/delivery"
                      ? "text-base font-bold text-brandPrimary"
                      : "text-base font-normal text-brandPrimary"
                  }
                >
                  Хүргэлт
                </span>
              </div>
            </li>

            <div className="lg:grid content-center w-[60px]">
              <Image
                priority
                src="/assets/svg/card/line.svg"
                alt="Follow us on Facebook"
                width={58}
                height={50}
              />
            </div>
            <li>
              <div className="lg:flex flex-row gap-3">
                <Image
                  priority
                  src="/assets/svg/icons/identification.svg"
                  alt="Follow us on Facebook"
                  className="mt-[2px]"
                  width={24}
                  height={24}
                />
                <span
                  className={
                    router?.route === "/order/payment"
                      ? "text-base font-bold text-brandPrimary"
                      : "text-base font-normal text-brandPrimary"
                  }
                >
                  Төлбөр
                </span>
              </div>
            </li>

            <div className="lg:grid content-center w-[60px]">
              <Image
                priority
                src="/assets/svg/card/line.svg"
                alt="Follow us on Facebook"
                width={58}
                height={50}
              />
            </div>
            <li className={page === "order" ? "active" : ""}>
              <div className="lg:flex flex-row gap-3">
                <Image
                  priority
                  src="/assets/svg/icons/credit-card.svg"
                  alt="Follow us on Facebook"
                  className="mt-[2px]"
                  width={24}
                  height={24}
                />
                <span
                  className={
                    router?.route === "/order/pay"
                      ? "text-base font-bold text-brandPrimary"
                      : "text-base font-normal text-brandPrimary"
                  }
                >
                  Төлбөр төлөх
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
