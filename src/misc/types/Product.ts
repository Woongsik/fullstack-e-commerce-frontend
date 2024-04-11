import Category from "./Category";
import { Size } from "./Size";
import { SortCreated, SortTitle, SortPrice } from "./Sort";

export type ProductBase = {
  title: string;
  sizes: Size[];
  price: number;
  description: string;
  images: string[];
}

export type Product = ProductBase & {
  _id: string;
  category: Category;
  createdAt: Date;
}

export type ProductRegister = ProductBase & {
  categoryId: number;
}

export type ProductUpdate = {
  id: string;
  item: Partial<Product>
}

export type FilteredProducts = {
  products: Product[],
  total: number,
  minMaxPrice: number[]
}

type FilterProduct = {
  title: string;
  size: Size;
  categoryId: number;
  min_price: number;
  max_price: number;
  sort_created: SortCreated;
  sort_title: SortTitle;
  sort_price: SortPrice;
  page: number;
  itemsPerPage: number;
}

// From backend
export type MinMaxPrice = {
  min: number;
  max: number;
}

export type ProductsList = {
  total: number;
  products: Product[];
  maxMinPrice: MinMaxPrice;
};