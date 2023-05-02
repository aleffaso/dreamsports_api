import { Brand } from "../../Brand/types";
import { Category } from "../../categories/types";
import { Colors } from "../../colors/types";
import { Images } from "../../images/types";
import { Sizes } from "../../sizes/types";

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
  brand?: Brand[];
  colors?: Colors[];
  sizes?: Sizes[];
  images?: Images[];
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
  brands: Product["brand"];
  colors: Product["colors"];
  sizes: Product["sizes"];
  images: Product["images"];
};
