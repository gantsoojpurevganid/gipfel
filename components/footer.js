import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bottom-0 lg:left-0 left-4 w-full pb-[40px] lg:pt-[40px] bg-white lg:p-1 p-6">
      <div className="px-[62px] py-[120px]">
        <div className="grid md:grid-cols-5 sm:grid-cols-2 lg:gap-48 text-[18px] font-normal leading-[28px] cursor-pointer">
          <ul>
            <li className="text-[18px] text-footerTextColor font-bold mb-6">
              ХЭРЭГЛЭГЧИЙН ҮЙЛЧИЛГЭЭ
            </li>
            <li className="mb-6 text-paymentCartText text-base">Харилцагчид</li>
            <li className="mb-6 text-paymentCartText text-base">
              Түгээмэл асуулт
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Нууцлалын бодлого
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Gipfel бэлгийн карт
            </li>
            <li className=" text-paymentCartText text-base">Барааны буцаалт</li>
          </ul>
          <ul>
            <li className="text-[18px] text-footerTextColor font-bold mb-6">
              ХУДАЛДАН АВАХ ГАРЫН АВЛАГА
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Төлбөр төлөх заавар
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Хүргэлтийн нөхцөл
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Үйлчилгээний нөхцөл
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Хэмжээний заавар
            </li>
          </ul>
          <ul>
            <li className="text-[18px] text-footerTextColor font-bold mb-6">
              ХАЯГ
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Улаанбаатар Их Дэлгүүр 4 давхарт
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              MaxMall 1 давхарт
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Zaisan Star 3 давхарт
            </li>
            <li className="mb-6 text-paymentCartText text-base">
              Эрдэнэт хот, Орхон Молл 3 давхарт
            </li>
            <li className="text-paymentCartText text-base">
              Дархан хот, Аму Молл 2 давхарт
            </li>
          </ul>
          <ul>
            <li className="text-[18px] text-footerTextColor font-bold mb-6">
              ХАЯГ
            </li>
            <li className="mb-6 text-paymentCartText text-base">7200-4444</li>
            <li className="mb-6 text-paymentCartText text-base">Info@bgb.mn</li>
          </ul>
          <ul>
            <li className="text-[18px] text-footerTextColor font-bold mb-6">
              БИДНИЙГ ДАГААРАЙ
            </li>
            <li className="mb-3 flex gap-3">
              <Image
                priority
                src="/assets/svg/icons/facebook.svg"
                alt="Follow us on Facebook"
                className="w-6"
                width={15}
                height={15}
              />
            </li>
            <li className="mb-3 flex gap-3">
              <Image
                priority
                src="/assets/svg/icons/instagram.svg"
                alt="Follow us on Instagram"
                className="w-6"
                width={15}
                height={15}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
