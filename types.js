import { ORDER_STATUS_CHOICES } from "./consts";
// export type RealSpecialCategoryType = {
//   pk: number;
//   image_url: string;
//   destination_url: string;
//   title: string;
//   description: string;
// };

const RealBannerType = {
  desktop_image_url: "",
  destination_url: "",
  mobile_image_url: "",
  pk: 0,
};

// export type CommonCategoryType = {
//   name: string;
//   pk: number;
//   url: string;
// };

// export type RealCategoryType = CommonCategoryType & {
//   category_twos: RealSubCategoryType[];
// };

// export type RealSubCategoryType = CommonCategoryType & {
//   category_one: number;
//   category_threes: RealSubSubCategoryType[];
// };
// export type RealSubSubCategoryType = CommonCategoryType & {
//   category_two: number;
// };

// export type RealAttributeGroupType = CommonAttributeType & {
//   attributes: RealAttributeType[];
// };

// export type CommonAttributeType = {
//   name: string;
//   pk: number;
//   value: string;
// };

// export type RealAttributeType = CommonAttributeType & {
//   group: number;
// };

// export type CollectionType = {
//   pk: number;
//   name: string;
//   code: string;
//   products: { pk: number; short_name: string }[];
// };

// export type CategoryOneType = {
//   pk: number;
//   name: string;
//   url: string;
//   category_twos: CategoryTwoType[];
// };

// export type CategoryTwoType = {
//   pk: number;
//   name: string;
//   url: string;
//   category_one: number;
//   category_threes: CategoryThreeType[];
// };

// export type CategoryThreeType = {
//   pk: number;
//   name: string;
//   url: string;
//   category_two: number;
// };

// export type SingleCategoryType = {
//   pk: number;
//   name: string;
//   parent: {
//     pk: number;
//     name: string;
//     parent: {
//       pk: number;
//       name: string;
//     };
//   };
// };

// export type RealProductType = {
//   pk: number;
//   code: string;
//   collection: null | CollectionType;
//   short_name: string;
//   name: string;
//   is_special: boolean;
//   is_new: boolean;
//   quantity: number;
//   price: string;
//   short_description: string;
//   full_description: string;
//   categories: SingleCategoryType[];
//   product_attributes: {
//     attribute: AttributeType;
//     pk: number;
//     product: number;
//   }[];
//   product_images: RealProductImageType[];
//   active_sale: RealSaleType | null;
// };

// export type AttributeGroupType = {
//   pk: number;
//   name: string;
//   value: string;
//   attributes: AttributeType[];
// };

// export type AttributeType = {
//   group: Omit<AttributeGroupType, "attributes">;
//   pk: number;
//   name: string;
//   value: string;
// };

// export type RealSaleType = {
//   percentage: number;
//   price: number;
// };

// export type RealProductImageType = {
//   pk: number;
//   product: number;
//   high_url: string;
//   mid_url: string;
//   low_url: string;
//   is_primary: boolean;
// };

// export type ProductListType = {
//   min_price: number;
//   max_price: number;
//   max_page: number;
//   products: ProductType[];
// };

// export type OrderType = {
//   code: string;
//   address: string;
//   delivery_fee: string;
//   grand_total: string;
//   order_product_variants: {
//     price: string;
//     variant: {
//       name: string;
//       pk: number;
//       product_images: RealProductImageType[];
//     };
//     quantity: number;
//   }[];
//   name: string;
//   note: string;
//   phone: string;
//   phone2: string;
//   pk: number;
//   status: OrderStatusChoicesKey;
// };

// export type ProductType = {
//   full_description: string;
//   is_active: boolean;
//   is_new: boolean;
//   is_special: boolean;
//   name: string;
//   pk: number;
//   product_attributes: {
//     attribute: AttributeType;
//     pk: number;
//     product: number;
//   }[];
//   product_category_threes: {
//     category_one: CategoryThreeType;
//     category_two: CategoryThreeType;
//     category_three: CategoryThreeType;
//   }[];
//   product_variants: ProductVariantType[];
//   short_description: string;
//   thumb_url: string;
// };

// export type CartItemType = {
//   thumb: string;
//   name: string;
//   pk: number;
//   variant: {
//     pk: number;
//     name: string;
//     price: number;
//   };
//   quantity: number;
// };

// export type ProductVariantType = {
//   is_active: boolean;
//   limit?: number;
//   name: string;
//   pk: number;
//   price: string;
//   quantity: number;
//   sale: null;
//   sku: string;
//   variant_images: VariantImageType[];
// };

// export type VariantImageType = {
//   pk: number;
//   product: number;
//   high_url: string;
//   mid_url: string;
//   low_url: string;
//   is_primary: boolean;
// };

// export type OrderStatusChoicesKey = keyof typeof ORDER_STATUS_CHOICES;
