import { Brand } from "../../brands/types";
import { Category } from "../../categories/types";
import { Color } from "../../colors/types";
import { Image } from "../../images/types";
import { Size } from "../../sizes/types";

export type Product = {
  id?: string;
  title?: string;
  rate?: number;
  price?: number;
  info?: string;
  description?: string;
  specifications?: string;
  inventory?: number;
  slug?: string;
  is_active?: boolean;
  categories?: Category[];
  brands?: Brand[];
  colors?: Color[];
  sizes?: Size[];
  images?: Image[];
};

export type ProductCreate = {
  title: Product["title"];
  rate: Product["rate"];
  price: Product["price"];
  info: Product["info"];
  description: Product["description"];
  specifications: Product["specifications"];
  inventory: Product["inventory"];
  is_active: Product["is_active"];
  categories: Product["categories"];
  brands: Product["brands"];
  colors: Product["colors"];
  sizes: Product["sizes"];
  images: Product["images"];
};

export type ProductResponse = Product;

export type ProductUpdate = Product;

export type ProductId = {
  id: Product["id"];
};
