import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Item = ({ item }) => {
  console.log("ssss", item);
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <div>
      <div className="grid grid-cols-2">
        <ul>
          <Link href={`category/${item.id}`} className="">
            {item.name}
            {item.children.map((child) => (
              <li key={child.id} className="hover:visible">
                <Link href={`category/${child.id}`} className="">
                  {child.name}{" "}
                </Link>
              </li>
            ))}
          </Link>
        </ul>

        {/* <Image
          priority
          src="assets/svg/header/arrow-line.svg"
          alt="Left Arrow Default"
          className="w-7"
          width={15}
          height={15}
        /> */}
      </div>
      {/* 
      {item.children.length > 0 && (
        <ul>
          {item.children.map((child) => (
            <li key={child.id} className="hover:visible">
              <Link href={`category/${child.id}`} className="">
                {child.name}{" "}
              </Link>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Item;
