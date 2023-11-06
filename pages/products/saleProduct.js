import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useSWR } from "@/fetcher";
import { Breadcrumb } from "@/components/breadcrumb";
import Image from "next/image";
import Top from "@/components/top";
import Nav from "@/components/nav";
import CartContext from "@/context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ProductSkeleton from "@/components/carousel/productSkeleton";
import Footer from "@/components/footer";

export default function AllSaleProducts() {
  const { addItemToWhishlist } = useContext(CartContext);
  const router = useRouter();

  const { data: indexData, isLoading: IndexisLoading } = useSWR("/api/index/", {
    method: "GET",
  });

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "200px",
  };

  return (
    <div className="bg-white">
      <Top />
      <Nav />

      <div className={`p-[64px] bg-content`}>
        <ul className="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 lg:gap-9 md:gap-9 sm:gap-9 gap-3 text-[18px] font-normal leading-[28px] text-[#64748B] ">
          {IndexisLoading ? (
            <ProductSkeleton />
          ) : (
            indexData?.products_with_sale.map((el, index) => (
              <li key={`list-product-keys-#${el.id}`} className="mb-9 ">
                <div className="bg-white relative p-6 h-5/6">
                  <div className="grid grid-cols-2">
                    <div className="bg-saleProductBgColor px-2 py-1 w-[136px] text-center mb-8">
                      <p className="text-xs font-medium text-newProductTextColor">
                        Хямдрал
                      </p>
                    </div>
                    <div
                      className="grid justify-items-end cursor-pointer"
                      onClick={() => {
                        if (el) {
                          addItemToWhishlist({
                            product: el.id,
                            name: el.name,
                            // quantity: productQuantity,
                            product_images: el.product_images,
                            price: el.price,
                            short_description: el.short_description,
                          });
                          // toast("Амжилттай сагсаллаа");
                          toast.success("Амжилттай хадгалаалаа", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            newestOnTop: false,
                            closeOnClick: true,
                            draggable: true,
                          });
                        }
                      }}
                    >
                      <Image
                        priority
                        src="/assets/svg/card/wish.svg"
                        alt="Add to Card"
                        className="w-6"
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  {/* <div
                      className={`w-full lg:h-[250px] md:h-[455px] sm:h-[280px] h-[200px] bg-contain bg-no-repeat bg-center hover:bg-[url("https://sgp1.digitaloceanspaces.com/gipfel/thumbnail-small/46912b9d2f9e51437dfd47f201235-2.jpeg")] bg-[image:var(--image-url)]`}
                      style={{
                        "--image-url": `url(${
                          el?.product_variants[0].variant_images[0]?.high_url ??
                          ""
                        })`,
                      }}
                    ></div> */}
                  <div>
                    <Slide>
                      {el?.product_images.map((url, index) => (
                        <div key={index}>
                          <div
                            style={{
                              ...divStyle,
                              backgroundImage: `url(${url.high_url})`,
                            }}
                          ></div>
                        </div>
                      ))}
                    </Slide>
                    {/* <ImageGallery
                        items={el?.product_variants[0].variant_images?.map(
                          ({ key, high_url }) => ({
                            original: high_url,
                          })
                        )}
                      /> */}
                  </div>
                  <a href={`/products/${el.id}`}>
                    <div className="flex items-start justify-between">
                      <div className="w-[85%]">
                        <p className="text-paymentText text-[18px] font-bold text-xl">
                          {el?.name ?? ""}
                        </p>
                        <p className="text-cartSubText text-[16px] font-normal text-base">
                          {el?.short_description?.name ?? ""}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <p className="text-categoryTextColor text-2xl font-bold bg-white px-6 pb-6">
                  {el?.price ?? ""}₮
                </p>
                <div className="flex flex-row bg-white px-6 pb-6">
                  <Image
                    priority
                    src="/assets/svg/card/ready.svg"
                    alt="Add to Card"
                    className="w-6 mr-1"
                    width={15}
                    height={15}
                  />
                  <p className="text-base font-normal">Бэлэн байгаа</p>
                </div>
                <ToastContainer
                  position="top-center"
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
                <ToastContainer />
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="lg:block md:block sm:block hidden pt-12">
        <Footer />
      </div>
    </div>
  );
}
