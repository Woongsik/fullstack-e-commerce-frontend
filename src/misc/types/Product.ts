import { Category } from "./Category";
import { Size } from "./Size";

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

export type ProductInfo = ProductBase & {
  categoryId: string; // For backend ref
}

export type ProductUpdate = {
  _id: string;
  item: Partial<ProductInfo>
}

export type MinMaxPrice = {
  min: number;
  max: number;
}

export type ProductsList = {
  total: number;
  products: Product[];
  minMaxPrice: MinMaxPrice;
};