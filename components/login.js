import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import CartContext from "@/context/CartContext";
import { useSWRMutation, useLoginSWRMutation } from "@/fetcher";
import { client_id, client_secret, grant_type } from "@/consts";
import { useAuth } from "@/context/auth";
import Spinner from "./carousel/spinner";

const LoginPage = ({ modalState }) => {
  const { cart } = useContext(CartContext);
  // const { trigger, isMutating } = useSWRMutation("/o/token/");
  const { trigger, isMutating } = useLoginSWRMutation("/o/token/");
  const { login, user } = useAuth();

  const [showSubMenuIndex, setShowSubMenuIndex] = useState(-1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState("home");
  const [errMessage, setErrMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(59);

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
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const Login = async (d) => {
    try {
      const res = await trigger({
        username: username,
        password: password,
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type,
      });
      setShowLoginModal(false);
      login(res, username);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex lg:px-[64px] lg:pt-[36px] lg:pb-[36px]">
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
                      // className="w-[8px] ml-3"
                      width={200}
                      height={100}
                    />
                  </div>
                  {errMessage && (
                    <div className="mb-3 text-[#a51c30]">{errMessage}</div>
                  )}
                  {loginStatus === "verify" && (
                    <div className="w-full flex flex-col justify-center">
                      {/* <Image
                      priority
                      src="/assets/svg/icons/mobile.svg"
                      alt="Get Shopping Bag"
                      className="w-12 h-12 cursor-pointer self-center"
                    /> */}
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

                  <div className="pb-2">
                    <span className=" text-[#374151] text-base font-medium">
                      Утасны дугаар
                    </span>
                    <input
                      className="bg-white border border-[#94A3B8] text-gray-900 text-sm block w-full py-4 px-3 dark:bg-gray-700 dark:border-gray-600 placeholder-[#94A3B8] placeholder:font-normal placeholder:text-[16px] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      // placeholder="И мэйл хаяг эсвэл гар утасны дугаар"
                      value={username}
                      onChange={(e) => {
                        setErrMessage("");
                        setUsername(e.target.value);
                      }}
                    />
                  </div>

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
                    <div
                      className={`${
                        loginStatus === "verify"
                          ? "w-[320px] self-center"
                          : "w-full"
                      } ${
                        loginStatus === "verify" ? "bg-[#64748B]" : "bg-primary"
                      } text-center py-4 cursor-pointer rounded-[4px] my-4 text-white text-base font-medium`}
                      onClick={() => {
                        if (!username && !password) {
                          return setErrMessage(
                            "Утасны дугаар эсвэл нууц үгээ оруулна уу?"
                          );
                        } else {
                          isMutating ? <Spinner /> : <p></p>;
                        }
                        // if (!username)
                        //   return setErrMessage("Утасны дугаар оруулна уу?");
                        // if (loginStatus === "home") {
                        //   setLoginStatus("login");
                        // } else if (loginStatus === "login") {
                        //   if (!password)
                        //     return setErrMessage("Нууц үг оруулна уу?");
                        //   else {
                        //     Login();
                        //   }
                        // } else if (loginStatus === "register") {
                        //   if (!username)
                        //     return setErrMessage("Утасны дугаар оруулна уу?");
                        //   setCounter(59);
                        //   setLoginStatus("verify");
                        // }
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
                      <div className="w-full bg-white py-4 border-2 border-gray-200 cursor-pointer rounded-[4px] my-4 flex text-[#475569] text-base font-medium">
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
      </div>
    </div>
  );
};

export default LoginPage;
