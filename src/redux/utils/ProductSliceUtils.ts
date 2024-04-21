import { Filter } from "../../misc/types/Filter";
import { MinMaxPrice, Product } from "../../misc/types/Product";
import { SortCreated } from "../../misc/types/Sort";

const getMinMaxFromProducts = (products: Product[]): MinMaxPrice => {
  const sortedProductByPrice = products.sort((a, b) => {
    return (a.price > b.price) ? 1 : -1 
  });

  return {
    min: sortedProductByPrice[0].price,
    max: sortedProductByPrice[sortedProductByPrice.length - 1].price
  }
}

const getPagedProducts = (products: Product[], page: number = 1, itemsPerPage: number): Product[] => {
  return products.slice((page - 1) * itemsPerPage, page + itemsPerPage);
}

const filterProductsByTitle = (products: Product[], title: string): Product[] => {
  return products.filter((p: Product) => p.title.toLowerCase().includes(title.toLowerCase()));
}

export default {
  getMinMaxFromProducts,
  getPagedProducts,
  filterProductsByTitle
}