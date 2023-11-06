import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import "flowbite";
import OtpInput from "react-otp-input";
import CartContext from "@/context/CartContext";
import { useSWRMutation } from "@/fetcher";
import { client_id, client_secret, grant_type } from "@/consts";
import { useAuth } from "@/context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { useSWR } from "@/fetcher";
import axios from "axios";
import Spinner from "./carousel/spinner";
import Toast from "./carousel/toast/toast";

const Top = () => {
  const { data: categoryData, isLoading: CategoryIsLoading } = useSWR(
    "/api/categories/",
    {
      method: "GET",
    }
  );
  const {
    cart,
    wishlist,
    toastState,
    toastMessage,
    toastColor,
    toastIcon,
    toastType,
    toastTag,
    setWishlistToState,
    setCartToState,
  } = useContext(CartContext);
  const { trigger, isMutating } = useSWRMutation("/o/token/");
  const { login, user } = useAuth();
  const cartItems = cart?.cartItems;
  const [showSubMenuIndex, setShowSubMenuIndex] = useState(-1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState("home");
  const [errMessage, setErrMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const handleMenuClick = (index) => {
    setShowSubMenuIndex(index === showSubMenuIndex ? -1 : index);
  };
  useEffect(() => {
    setMenuExpanded(false);
    setShowLoginModal(false);
    setLoginStatus("home");
    setErrMessage("");
    setUsername("");
    setPassword("");
    setOtp("");
    setCounter(0);
    setWishlistToState();
    setCartToState();
  }, []);

  const [menuExpanded, setMenuExpanded] = useState(false);
  const menus = [
    "Louis Vuitton",
    "Gillette",
    "Gillette",
    "fafafafa",
    "Johnson & Johnson",
    "eBay",
    "Pizza Hut",
  ];

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // const WishlistMenuClick = (index) => {
  //   if (user == undefined) {
  //     toast.error("Та заавал нэвтэрнэ үү!!!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       newestOnTop: false,
  //       closeOnClick: true,
  //       draggable: true,
  //     });
  //   } else {
  //     Router.push("/user");
  //   }
  // };

  const facebookLogin = (index) => {};

  const Login = async (d) => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://api2.bgb.mn/o/token/",
        {
          username: username,
          password: password,
          client_id: client_id,
          client_secret: client_secret,
          grant_type: grant_type,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res) {
        toastTag({
          color: "slate-100",
          icon: "HiFire",
          message: "Амжилттай нэвтэрлээ.",
          type: "login",
        });

        setShowLoginModal(false);
        setIsLoading(false);
        login(res, username);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsLoading(false);

        toastTag({
          color: "red-500",
          icon: "HiFire",
          message: "Нууц үг буруу байна!!!.",
          type: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className="lg:flex lg:px-[64px] lg:pt-[36px] lg:pb-[36px]">
        <div className="lg:hidden md:hidden sm:hidden block ">
          <div className="p-4 grid grid-cols-3">
            <Image
              onClick={() => setMenuExpanded(!menuExpanded)}
              priority
              src={
                menuExpanded
                  ? "assets/svg/header/close.svg"
                  : "assets/svg/header/menu.svg"
              }
              alt="Get Shopping Bag"
              className="w-6 h-6 mr-2 cursor-pointer"
              width={15}
              height={15}
            />
            <Link href="/" className="grid justify-items-center content-center">
              <Image
                priority
                src="/assets/svg/logo/gipfel.svg"
                alt="logo"
                width={50}
                height={50}
              />
            </Link>
            <div className="flex flex-row justify-end">
              <Link href="/order" className="">
                <div className="">
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/pri.svg"
                    height={13}
                    width={23}
                  />
                </div>
              </Link>
              {user != undefined ? (
                <div className="grid content-center">
                  <div className="grid content-center justify-items-center cursor-pointer">
                    <Link href="/user" className="">
                      <div
                        // onClick={() => setShowLoginModal(true)}
                        className="flex flex-row"
                      >
                        <Image
                          alt="Your"
                          className="lg:pr-2 content-center"
                          src="/assets/svg/header/user.svg"
                          height={13}
                          width={23}
                        />
                        {user}
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid content-center">
                  <div className="grid content-center justify-items-center  cursor-pointer">
                    <div
                      onClick={() => setShowLoginModal(true)}
                      className="flex flex-row"
                    >
                      <Image
                        alt="Your"
                        className="lg:pr-2 content-center"
                        src="/assets/svg/header/user.svg"
                        height={13}
                        width={23}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="content-center lg:grid lg:w-[600px] lg:mr-12 p-4">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-primary bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Хайх утга оруулна уу..."
                  width={200}
                />

                <div className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div className="px-4 pb-4">
            <ul className="flex flex-row gap-6 content-center">
              <li className="group text-sm font-medium text-paymentText">
                Шинэ бараа
              </li>
              <li className="group text-sm font-medium text-paymentText">
                Блог
              </li>
              <li className="group text-sm font-medium text-paymentText">
                Дэлгүүр
              </li>
            </ul>
          </div>
        </div>
        {toastState ? (
          <Toast
            message={toastMessage}
            color={toastColor}
            icon={toastIcon}
            type={toastType}
          />
        ) : null}
        <div className="lg:mr-3 lg:w-[91px] lg:grid content-center md:block sm:block hidden">
          <Link href="/">
            <Image
              priority
              src="/assets/svg/logo/gipfel.svg"
              alt="logo"
              width={200}
              height={100}
            />
          </Link>
        </div>
        <div className="lg:grid content-center w-[170px] lg:mr-12 md:block sm:block hidden">
          <p className="text-lg text-primary font-normal">ГЕРМАН ЧАНАРЫГ</p>
          <p className="text-lg text-primary font-normal">ГЭРТЭЭ</p>
        </div>
        <div className="content-center lg:grid lg:w-[600px]  lg:mr-12 md:block sm:block hidden">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium  sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full h-12 p-4 pl-10 text-sm border border-#6B7280 bg-gray-50  dark:text-white"
                placeholder="Хайх утга оруулна уу..."
                width={200}
              />

              <div className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:grid content-center grow  lg:mr-12  md:block sm:block hidden ">
          <div className="flex flex-row justify-items-start">
            <Image
              alt="Your Company"
              className="lg:pr-2"
              src="/assets/svg/header/phone-line.svg"
              height={20}
              width={30}
            />
            <p className="text-lg text-primary font-semibold">7200-4444</p>
          </div>
        </div>
        <div className=" flex flex-row gap-6">
          <div
            className="lg:grid content-center  md:block sm:block hidden"
            // onClick={WishlistMenuClick}
          >
            <div className="grid content-center justify-items-center lg:w-[166px] px-2 border-[1px] h-12 cursor-pointer">
              <Link href="/user" className="">
                <div className="flex flex-row">
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/Group.svg"
                    height={20}
                    width={30}
                  />
                  Хадгалсан ({wishlist.cartItems?.length || 0})
                </div>
              </Link>
            </div>
          </div>

          <div className="lg:grid content-center  md:block sm:block hidden">
            <div className="grid content-center justify-items-center w-[166px] px-2 border-[1px] h-12">
              <Link href="/order" className="">
                <div className="flex flex-row ">
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/pri.svg"
                    height={20}
                    width={30}
                  />
                  Сагс ({cartItems?.length || 0})
                </div>
              </Link>
            </div>
          </div>
          {user != undefined ? (
            <div className="lg:grid content-center md:block  sm:block hidden">
              <div className="grid content-center justify-items-center w-[166px] px-2 border-[1px] h-12 cursor-pointer">
                <Link href="/user" className="">
                  <div
                    // onClick={() => setShowLoginModal(true)}
                    className="flex flex-row"
                  >
                    <Image
                      alt="Your"
                      className="lg:pr-2 content-center"
                      src="/assets/svg/header/user.svg"
                      height={20}
                      width={30}
                    />
                    {user}
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="lg:grid content-center md:block sm:block hidden "
              onClick={() => setShowLoginModal(true)}
            >
              <div className="grid content-center justify-items-center w-[166px] p-6 border-[1px] h-12 cursor-pointer">
                <div className="flex flex-row">
                  <Image
                    alt="Your"
                    className="lg:pr-2 content-center"
                    src="/assets/svg/header/user.svg"
                    height={20}
                    width={30}
                  />
                  Нэвтрэх
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer /> */}
        {CategoryIsLoading ? null : (
          <>
            {menuExpanded && (
              <div className="lg:hidden md:hidden sm:hidden block absolute w-full left-0 top-14 bg-white p-4 text-[#1E293B] font-medium text-base cursor-pointer">
                <div className="relative">
                  <ul className={`pt-2 ${menuExpanded ? "block" : "hidden"}`}>
                    {/* {categoryData?.map((el, index) => (
                      <li key={el.id}>
                        <a href="/web/category?id=1">{el.name ?? ""}</a>
                      </li>
                    ))} */}
                    {categoryData?.length > 0 &&
                      categoryData?.map((el, index) => (
                        <li
                          key={`mobile-nav-item-#${index}`}
                          className={`${
                            index + 1 === (el.name ?? []).length
                              ? "mb-0"
                              : "mb-6"
                          }`}
                        >
                          <div
                            className="flex justify-between items-center"
                            onClick={() => handleMenuClick(index)}
                          >
                            {el.name ?? ""}
                            {index === showSubMenuIndex ? (
                              <Image
                                priority
                                src="assets/svg/header/arrow-line.svg"
                                alt="Left Arrow Default"
                                className="w-7"
                                width={15}
                                height={15}
                              />
                            ) : (
                              <Image
                                priority
                                src="assets/svg/header/arrow-line.svg"
                                alt="Left Arrow Default"
                                className="w-7"
                                width={30}
                                height={30}
                              />
                            )}
                          </div>
                          <ul
                            className={`pl-8 mt-3 ${
                              showSubMenuIndex === index ? "block" : "hidden"
                            }`}
                          >
                            {categoryData?.length > 0 &&
                              categoryData?.map((item, key) => (
                                <li
                                  key={`list-mobile-menu-item-#${item.id}`}
                                  className="mt-4"
                                >
                                  <a href="/web/category?id=1">
                                    {item.name ?? ""}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        {showLoginModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full max-w-2xl max-h-full">
                <div className="min-w-[650] relative bg-white rounded-lg shadow dark:bg-gray-700 p-24 flex flex-col">
                  <div className="absolute top-4 right-4">
                    <a
                      href="#"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setLoginStatus("home");
                        setErrMessage("");
                        setShowLoginModal(false);
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
                  <div className="grid justify-items-center pb-12">
                    <Image
                      priority
                      src="/assets/svg/logo/gipfel.svg"
                      alt="logo"
                      width={200}
                      height={100}
                    />
                  </div>
                  {errMessage && (
                    <div className="mb-3 text-[#a51c30]">{errMessage}</div>
                  )}
                  {loginStatus === "verify" && (
                    <div className="w-full flex flex-col justify-center">
                      <div className="w-[300px] text-center mt-5 text-[#475569] text-2xl font-bold self-center">
                        00:{counter > 0 ? counter : "00"}
                      </div>
                      <div className="w-[300px] text-left mb-5 mt-3 text-[#64748B] text-lg font-normal self-center">
                        Таны “{username ?? ""}” дугаарт илгээсэн кодыг оруулна
                        уу
                      </div>
                      <OtpInput
                        value={otp}
                        numInputs={4}
                        inputType="number"
                        onChange={(value) => {
                          setOtp(value);
                        }}
                        inputStyle={{
                          width: "70px",
                          height: "60px",
                          fontSize: "1rem",
                          borderRadius: 8,
                          border: "1px solid #94A3B8",
                          focusedBorderColor: "1px solid #a51c30",
                          fontSize: 20,
                          color: "#94A3B8",
                        }}
                        renderSeparator={<span className="w-3"></span>}
                        containerStyle={`justify-center`}
                        className="otpContainer"
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                  )}

                  {isMutating ? (
                    <div role="status" className="grid justify-center pb-6">
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
                    <>
                      {loginStatus !== "verify" && (
                        <div className="pb-2">
                          <span className=" text-[#374151] text-base font-medium">
                            Утасны дугаар
                          </span>
                          <input
                            className="bg-white border border-[#94A3B8] text-gray-900 text-sm block w-full py-4 px-3 dark:bg-gray-700 dark:border-gray-600 placeholder-[#94A3B8] placeholder:font-normal placeholder:text-[16px] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Гар утасны дугаар"
                            // placeholder="И мэйл хаяг эсвэл гар утасны дугаар"
                            value={username}
                            onChange={(e) => {
                              setErrMessage("");
                              setUsername(e.target.value);
                            }}
                          />
                        </div>
                      )}

                      <div className="my-5">
                        <span className="mb-1 text-[#475569] text-sm font-bold">
                          Нууц үг
                        </span>
                        <input
                          className="bg-white border border-[#94A3B8] text-gray-900 text-sm rounded-[4px] block w-full py-4 px-3 dark:bg-gray-700 dark:border-gray-600 placeholder-[#94A3B8] placeholder:font-normal placeholder:text-[16px] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="password"
                          placeholder="********"
                          value={password}
                          onChange={(e) => {
                            setErrMessage("");
                            setPassword(e.target.value);
                          }}
                        />
                      </div>

                      {(loginStatus === "home" ||
                        loginStatus === "register" ||
                        loginStatus === "login" ||
                        loginStatus === "verify") && (
                        <>
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <div
                              className={`${
                                loginStatus === "verify"
                                  ? "w-[320px] self-center"
                                  : "w-full"
                              } ${
                                loginStatus === "verify"
                                  ? "bg-[#64748B]"
                                  : "bg-primary"
                              } text-center py-4 cursor-pointer rounded-[4px] my-4 text-white text-base font-medium`}
                              onClick={() => {
                                if (!username && !password) {
                                  return setErrMessage(
                                    "Утасны дугаар эсвэл нууц үгээ оруулна уу?"
                                  );
                                } else {
                                  Login();
                                }
                              }}
                            >
                              <p
                                className={
                                  loginStatus === "verify"
                                    ? "flex justify-center"
                                    : ""
                                }
                              >
                                {loginStatus === "home" ||
                                loginStatus === "register" ||
                                loginStatus === "verify"
                                  ? "Нэвтрэх"
                                  : "Нэвтрэх"}
                                {loginStatus === "verify" && (
                                  <Image
                                    priority
                                    src="/assets/svg/icons/left_arrow_default_white.svg"
                                    alt="logo"
                                    className="w-[8px] ml-3"
                                    width={15}
                                    height={15}
                                  />
                                )}
                              </p>
                            </div>
                          )}

                          {/* {isMutating ? <p>ddddd</p> : <p>jjj</p>} */}
                        </>
                      )}
                    </>
                  )}

                  {loginStatus === "verify" && (
                    <div
                      className="px-4 self-center bg-[#F1F5F9] text-center py-[4px] cursor-pointer rounded-[8px] my-2 text-[#94A3B8] text-base font-medium"
                      onClick={() => {
                        setCounter(59);
                      }}
                    >
                      Код дахин илгээх
                    </div>
                  )}
                  {(loginStatus === "login" || loginStatus === "register") && (
                    <div
                      className="w-full bg-[#F1F5F9] text-center py-4 cursor-pointer rounded-[4px] my-4 text-[#64748B] text-base font-medium"
                      onClick={() => {
                        setErrMessage("");
                        setLoginStatus("home");
                      }}
                    >
                      Буцах
                    </div>
                  )}
                  {loginStatus === "home" && (
                    <>
                      <div className="w-full text-center font-medium text-categoryTextColor text-base mb-9">
                        Шинэ хэрэглэгч бол{" "}
                        <span
                          className="text-primary text-base font-bold ml-2 underline cursor-pointer"
                          onClick={() => {
                            setShowLoginModal(false);
                            setShowRegisterModal(true);
                          }}
                        >
                          Бүртгүүлэх
                        </span>
                      </div>
                      <div className="inline-flex items-center justify-center w-full bg-[#ccc] mb-9">
                        <hr className="bg--200 bordgrayer-0 dark:bg-gray-700" />
                        <span className="absolute px-4 font-normal text-[#111827] bg-white dark:text-white text-base">
                          Бусад
                        </span>
                      </div>
                      <div className="w-full bg-white py-4 border-2 border-gray-200 cursor-pointer rounded-[4px] my-4 flex text-[#475569] text-base font-medium">
                        <div className="w-[40%] relative">
                          <Image
                            priority
                            src="/assets/svg/logo/facebook.svg"
                            alt="logo"
                            className="w-6 cursor-pointer absolute right-2"
                            width={20}
                            height={20}
                          />
                        </div>
                        <p className="w-[50%]">Facebook ээр нэвтрэх</p>
                      </div>
                      <div
                        onClick={facebookLogin}
                        className="w-full bg-white py-4 border-2 border-gray-200 cursor-pointer rounded-[4px] my-4 flex text-[#475569] text-base font-medium"
                      >
                        <div className="w-[40%] relative">
                          <Image
                            priority
                            src="/assets/svg/logo/gmail.svg"
                            alt="logo"
                            className="w-6 cursor-pointer absolute right-2"
                            width={20}
                            height={20}
                          />
                        </div>
                        <p className="w-[50%]">Gmail ээр нэвтрэх</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
          </>
        )}

        {showRegisterModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full max-w-2xl max-h-full">
                <div className="min-w-[650] relative bg-white rounded-lg shadow dark:bg-gray-700 p-24 flex flex-col">
                  <div className="absolute top-4 right-4">
                    <a
                      href="#"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setLoginStatus("home");
                        setErrMessage("");
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
                  <div className="grid justify-items-center pb-12">
                    <Image
                      priority
                      src="/assets/svg/logo/gipfel.svg"
                      alt="logo"
                      width={200}
                      height={100}
                    />
                  </div>
                  {errMessage && (
                    <div className="mb-3 text-[#a51c30]">{errMessage}</div>
                  )}

                  <div className="pb-2">
                    <span className=" text-[#374151] text-base font-medium">
                      Утасны дугаар
                    </span>
                    <input
                      className="bg-white border border-[#94A3B8] text-gray-900 text-sm block w-full py-4 px-3 dark:bg-gray-700 dark:border-gray-600 placeholder-[#94A3B8] placeholder:font-normal placeholder:text-[16px] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Гар утасны дугаар"
                      value={username}
                      onChange={(e) => {
                        setErrMessage("");
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="text-center py-4 cursor-pointer rounded-[4px] my-4 text-white text-base font-medium bg-primary">
                    orgild
                  </div>

                  {loginStatus === "verify" && (
                    <div
                      className="px-4 self-center bg-[#F1F5F9] text-center py-[4px] cursor-pointer rounded-[8px] my-2 text-[#94A3B8] text-base font-medium"
                      onClick={() => {
                        setCounter(59);
                      }}
                    >
                      Код дахин илгээх
                    </div>
                  )}
                  {(loginStatus === "login" || loginStatus === "register") && (
                    <div
                      className="w-full bg-[#F1F5F9] text-center py-4 cursor-pointer rounded-[4px] my-4 text-[#64748B] text-base font-medium"
                      onClick={() => {
                        setErrMessage("");
                        setLoginStatus("home");
                      }}
                    >
                      Буцах
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
          </>
        )}

        {/* {showLoginModal && (
          <div
            className={`fixed top-0 left-0 right-0 lg:pl-[30%] md:pl-[18%] pt-24 bg-[rgba(0,0,0,0.6)] ${
              showLoginModal ? "block" : "hidden"
            } w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full`}
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="min-w-[650] relative bg-white rounded-lg shadow dark:bg-gray-700 px-[40px] pb-16 flex flex-col">
                <div className="flex items-start justify-between rounded-t pt-10">
                  <h3 className="text-[#334155] font-bold dark:text-white text-2xl mb-4">
                    {loginStatus === "home" ? "Нэвтрэх" : ""}
                  </h3>
                  <a
                    href="#"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setLoginStatus("home");
                      setErrMessage("");
                      setShowLoginModal(false);
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
                {errMessage && (
                  <div className="mb-3 text-[#a51c30]">{errMessage}</div>
                )}
                {loginStatus === "verify" && (
                  <div className="w-full flex flex-col justify-center">
                    <div className="w-[300px] text-center mt-5 text-[#475569] text-2xl font-bold self-center">
                      00:{counter > 0 ? counter : "00"}
                    </div>
                    <div className="w-[300px] text-left mb-5 mt-3 text-[#64748B] text-lg font-normal self-center">
                      Таны “{username ?? ""}” дугаарт илгээсэн кодыг оруулна уу
                    </div>
                    <OtpInput
                      value={otp}
                      numInputs={4}
                      inputType="number"
                      onChange={(value) => {
                        setOtp(value);
                      }}
                      inputStyle={{
                        width: "70px",
                        height: "60px",
                        fontSize: "1rem",
                        borderRadius: 8,
                        border: "1px solid #94A3B8",
                        focusedBorderColor: "1px solid #a51c30",
                        fontSize: 20,
                        color: "#94A3B8",
                      }}
                      renderSeparator={<span className="w-3"></span>}
                      containerStyle={`justify-center`}
                      className="otpContainer"
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                )}
                {loginStatus !== "verify" && (
                  <div>
                    <span className="mb-1 text-[#475569] text-sm font-bold">
                      Нэвтрэх
                    </span>
                    <input
                      className="bg-white border border-[#94A3B8] text-gray-900 text-sm rounded-[4px] block w-full py-4 px-3 dark:bg-gray-700 dark:border-gray-600 placeholder-[#94A3B8] placeholder:font-normal placeholder:text-[16px] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Гар утасны дугаар"
                      value={username}
                      onChange={(e) => {
                        setErrMessage("");
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                )}
                {loginStatus !== "register" && (
                  <div className="my-5">
                    <span className="mb-1 text-[#475569] text-sm font-bold">
                      Нууц үг
                    </span>
                    <input
                      className="bg-white border border-[#94A3B8] text-gray-900 text-sm rounded-[4px] block w-full py-4 px-3 dark:bg-gray-700 dark:border-gray-600 placeholder-[#94A3B8] placeholder:font-normal placeholder:text-[16px] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => {
                        setErrMessage("");
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                )}
                {(loginStatus === "home" ||
                  loginStatus === "register" ||
                  loginStatus === "login" ||
                  loginStatus === "verify") && (
                  <div
                    className={`${
                      loginStatus === "verify"
                        ? "w-[320px] self-center"
                        : "w-full"
                    } ${
                      loginStatus === "verify" ? "bg-[#64748B]" : "bg-primary"
                    } text-center py-4 cursor-pointer rounded-[4px] my-4 text-white text-base font-medium`}
                    onClick={() => {
                      if (!username) {
                        if (!username) {
                          setErrMessage("Утасны дугаар || имэйл оруулна уу?");
                        }
                      }
                      if (loginStatus === "home") {
                        Login();
                        // setLoginStatus("login");
                      } else if (loginStatus === "login") {
                        if (!password)
                          return setErrMessage("Нууц үг оруулна уу?");
                      } else if (loginStatus === "register") {
                        if (!username)
                          return setErrMessage(
                            "Утасны дугаар || имэйл оруулна уу?"
                          );
                        setCounter(59);
                        setLoginStatus("verify");
                      }
                    }}
                  >
                    <p
                      className={
                        loginStatus === "verify" ? "flex justify-center" : ""
                      }
                    >
                      {loginStatus === "home" ||
                      loginStatus === "register" ||
                      loginStatus === "verify"
                        ? "Үргэлжлүүлэхssss"
                        : "Нэвтрэх"}
                    </p>
                  </div>
                )}
                {loginStatus === "verify" && (
                  <div
                    className="px-4 self-center bg-[#F1F5F9] text-center py-[4px] cursor-pointer rounded-[8px] my-2 text-[#94A3B8] text-base font-medium"
                    onClick={() => {
                      setCounter(59);
                    }}
                  >
                    Код дахин илгээх
                  </div>
                )}
                {(loginStatus === "login" || loginStatus === "register") && (
                  <div
                    className="w-full bg-[#F1F5F9] text-center py-4 cursor-pointer rounded-[4px] my-4 text-[#64748B] text-base font-medium"
                    onClick={() => {
                      setErrMessage("");
                      setLoginStatus("home");
                    }}
                  >
                    Буцах
                  </div>
                )}
                {loginStatus === "home" && (
                  <>
                    <div className="w-full text-center font-medium text-categoryTextColor text-base mb-9">
                      Шинэ хэрэглэгч бол{" "}
                      <span
                        className="text-primary text-base font-bold ml-2 underline cursor-pointer"
                        onClick={() => setLoginStatus("register")}
                      >
                        Бүртгүүлэх
                      </span>
                    </div>
                    <div className="inline-flex items-center justify-center w-full bg-[#ccc] mb-9">
                      <hr className="bg--200 bordgrayer-0 dark:bg-gray-700" />
                      <span className="absolute px-4 font-normal text-[#111827] bg-white dark:text-white text-base">
                        Бусад
                      </span>
                    </div>
                    <div className="w-full bg-white py-4 border-2 border-gray-200 cursor-pointer rounded-[4px] my-4 flex text-[#475569] text-base font-medium">
                      <div className="w-[40%] relative">
                        <Image
                          priority
                          src="/assets/svg/logo/facebook.svg"
                          alt="logo"
                          className="w-6 cursor-pointer absolute right-2"
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className="w-[50%]">Facebook ээр нэвтрэх</p>
                    </div>
                    <div
                      onClick={facebookLogin}
                      className="w-full bg-white py-4 border-2 border-gray-200 cursor-pointer rounded-[4px] my-4 flex text-[#475569] text-base font-medium"
                    >
                      <div className="w-[40%] relative">
                        <Image
                          priority
                          src="/assets/svg/logo/gmail.svg"
                          alt="logo"
                          className="w-6 cursor-pointer absolute right-2"
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className="w-[50%]">Gmail ээр нэвтрэх</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Top;
