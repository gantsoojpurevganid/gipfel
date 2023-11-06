import { useState } from "react";
import { useSWR } from "@/fetcher";
import Item from "./item";
import Image from "next/image";
import Link from "next/link";
const Nav = () => {
  const { data: categoryData, CategoryIsLoading } = useSWR("/api/categories/", {
    method: "GET",
  });
  return (
    <div className="lg:flex content-center md:flex sm:flex hidden pl-6 justify-between lg:pb-9 lg:px-[64px]">
      <div className="lg:block md:block hidden">
        <ul className="flex gap-12 cursor-pointer text-[16px] font-medium  text-[#475569] items-center">
          {/* <li className="border-2 group text-white bg-primary px-12 pt-2 py-2 text-lg font-bold w-[279px] text-center">
            <div className="flex flex-row justify-center">
              <Image
                alt="Your"
                className="lg:pr-2 content-center"
                src="/assets/svg/header/category.svg"
                height={20}
                width={30}
              />
              Ангилал
            </div>

            <div className="invisible w-[278px] pt-6 absolute flex-col bg-white drop-shadow-lg z-1 left-16  px-4 shadow-xl2 group-hover:visible">
              <ul className="w-full flex flex-wrap lg:justify-between md:justify-start text-[#1E293B] font-medium lg:text-[16px] md:text-[12px]">
                <li className="lg:w-[100%] md:mb-6 lg:border-[#eee] ">
                  {CategoryIsLoading ? (
                    <div role="status" className="grid justify-center">
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
                    <div>
                      {categoryData?.map((item) => (
                        <Item key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </li> */}

          <div className="group inline-block z-10">
            <button className="border-2 group text-white bg-primary px-12 pt-2 py-2 text-lg font-bold w-[279px] text-center">
              <div className="flex flex-row justify-center">
                <span className="lg:pr-2 grid content-center">
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
                Ангилал
              </div>
            </button>
            <ul className="bg-white border rounded-sm w-[279px] h-[500px] transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top">
              {categoryData?.map((parent) => (
                <Link
                  href={`/category/${parent.id}`}
                  className=""
                  key={parent.id}
                >
                  <li key={parent.id} className="rounded-sm p-6 li_class">
                    <div className="grid grid-cols-2 gap-4 py-2">
                      {parent.name}
                      <span className="grid content-center justify-items-end">
                        <svg
                          className="fill-current h-4 w-4 group-hover:-rotate-100 transition duration-150 ease-in-out"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                    </div>
                    <ul className="bg-white px-6 py-4 w-[350px] h-[500px] border rounded-sm absolute top-0 right-0 ul_class transition duration-150 ease-in-out origin-top-left min-w-32">
                      {parent?.children?.map((parent, index) => (
                        <Link href={`/category/${parent.id}`} key={parent.id}>
                          <li className="p-6 li_class" key={index}>
                            <div className="flex justify-between">
                              {parent.name}
                              {parent?.children?.length > 0 ? (
                                <span class="grid content-center justify-items-end">
                                  <svg
                                    className="fill-current h-4 w-4 group-hover:-rotate-100 transition duration-150 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                  </svg>
                                </span>
                              ) : (
                                <p></p>
                              )}
                            </div>
                            {parent?.children?.length > 0 ? (
                              <ul className="bg-white px-6 py-4 w-full h-[500px] border rounded-sm absolute top-0 right-0 ul_class transition duration-150 ease-in-out origin-top-left min-w-32">
                                {parent?.children?.map((parent, index) => (
                                  <Link
                                    href={`/category/${parent.id}`}
                                    key={parent.id}
                                  >
                                    <li
                                      className="p-6 li_class top-6 "
                                      key={index}
                                    >
                                      <div className=" ">{parent.name}</div>
                                    </li>
                                  </Link>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <li className="group text-lg font-bold text-textLgColor">
            Шинэ бараа
          </li>
          <li className="group text-lg font-bold text-textLgColor">Блог</li>
          <li className="group text-lg font-bold text-textLgColor">Дэлгүүр</li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
