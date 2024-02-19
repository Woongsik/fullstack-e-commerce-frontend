import Category from "./Category";

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category
}

export default Product;