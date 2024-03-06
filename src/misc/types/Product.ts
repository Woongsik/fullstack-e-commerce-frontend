import Category from "./Category";

export type ProductBase = {
  title: string;
  price: number;
  description: string;
  images: string[];
}

export type Product = ProductBase & {
  id: string;
  creationAt: string;
  updatedAt: string;
  category: Category
}

export type ProductRegister = ProductBase & {
  categoryId: number;
}

export type ProductUpdateItem = {
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
  categoryId?: number;
}

export type ProductUpdate = {
  id: string;
  item: ProductUpdateItem
}

export type FilteredProducts = {
  products: Product[],
  total: number,
  minMaxPrice: number[]
}