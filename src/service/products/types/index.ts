import { ProductCategories } from "../../categories/types";
import { ProductColors } from "../../colors/types";
import { ProductImages } from "../../images/types";
import { ProductSizes } from "../../sizes/types";

export type Product = {
  id: string;
  title?: string;
  rate?: number;
  price?: number;
  brand?: string;
  info?: string;
  description?: string;
  specifications?: string;
  inventory?: number;
  slug?: string;
  is_active?: boolean;
  categories?: ProductCategories[];
  colors?: ProductColors[];
  sizes?: ProductSizes[];
  images?: ProductImages[];
};

export type ProductCreate = Product;
