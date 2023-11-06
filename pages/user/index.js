import React, { useContext, useState, useEffect } from "react";
import CartContext from "@/context/CartContext";
import Image from "next/image";
import Router from "next/router";
import Top from "@/components/top";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useAuth } from "@/context/auth";
import { useSWR } from "@/fetcher";
import UserSkeleton from "@/components/carousel/userSkeleton";
import Profile from "@/components/profile";
import Wishlist from "@/components/wishlist";
import MyOrders from "@/components/myOrders";
import MyDeliveries from "@/components/myDeliveries";

const User = () => {
  const [page, setPage] = useState("");
  const pageStatuses = ["my", "wishlist", "order", "delivery", "logout"];
  const { logout, user } = useAuth();

  const Logout = () => {
    logout();
  };

  const wishlist = () => {
    setPage("wishlist");
  };

  const profile = () => {
    setPage("my");
  };

  const order = () => {
    setPage("order");
  };

  const delivery = () => {
    setPage("delivery");
  };

  useEffect(() => {
    setPage(pageStatuses[0]);
  }, []);
  return (
    <>
      <div className="bg-white">
        <Top />
        <Nav />

        <div className="lg:p-16 bg-content">
          <div className="lg:grid lg:grid-cols-10 gap-12">
            <div className="lg:col-span-2 bg-white">
              <div className="p-12 grid gap-6 justify-start">
                <div className="grid content-center justify-items-center w-full p-6  h-12 cursor-pointer">
                  <div className="flex flex-row font-bold text-xl">{user}</div>
                </div>
                <div
                  className={
                    page == "my"
                      ? "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100 bg-slate-100"
                      : "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100"
                  }
                  onClick={profile}
                >
                  <div className="flex flex-row">
                    <Image
                      alt="Your"
                      className="lg:pr-2 content-center"
                      src="/assets/svg/header/user.svg"
                      height={20}
                      width={30}
                    />
                    Хувийн мэдээлэл
                  </div>
                </div>
                <div
                  className={
                    page == "wishlist"
                      ? "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100 bg-slate-100"
                      : "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100"
                  }
                  onClick={wishlist}
                >
                  <div className="flex flex-row">
                    <Image
                      alt="Your"
                      className="lg:pr-2 content-center"
                      src="/assets/svg/header/Group.svg"
                      height={20}
                      width={30}
                    />
                    Хадгалсан бараа
                  </div>
                </div>
                <div
                  className={
                    page == "order"
                      ? "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100 bg-slate-100"
                      : "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100"
                  }
                  onClick={order}
                >
                  <div className="flex flex-row">
                    <Image
                      alt="Your"
                      className="lg:pr-2 content-center"
                      src="/assets/svg/header/pri.svg"
                      height={20}
                      width={30}
                    />
                    Миний захиалга
                  </div>
                </div>
                <div
                  className={
                    page == "delivery"
                      ? "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100 bg-slate-100"
                      : "grid content-center justify-items-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100"
                  }
                  onClick={delivery}
                >
                  <div className="flex flex-row">
                    <Image
                      alt="Your"
                      className="lg:pr-2 content-center"
                      src="/assets/svg/header/map-pin-line.svg"
                      height={20}
                      width={30}
                    />
                    Хүргэлтийн хаяг
                  </div>
                </div>
                <div
                  className="grid content-center w-full p-6  h-12 cursor-pointer hover:bg-slate-100"
                  onClick={Logout}
                >
                  <div className="flex flex-row">
                    <Image
                      alt="Your"
                      className="lg:pr-2 content-center"
                      src="/assets/svg/header/logout-box-r-line.svg"
                      height={20}
                      width={30}
                    />
                    Гарах
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 bg-white p-12">
              {page == "my" ? (
                <Profile />
              ) : page == "wishlist" ? (
                <Wishlist />
              ) : page == "order" ? (
                <MyOrders />
              ) : (
                <MyDeliveries></MyDeliveries>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default User;
