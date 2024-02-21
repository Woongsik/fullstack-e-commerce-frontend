import Product from "../../misc/types/Product";
import Sort from "../../misc/types/Sort";
import DateUtil from "../../utils/DateUtil";

const sortProducts = (products: Product[], sortType?: Sort): Product[] => {
  const duplicatedProducts = [...products];

  if (sortType === Sort.HIGHEST_PRICES) {
    return duplicatedProducts.sort((a: Product, b: Product) => (b.price - a.price));
  } else if (sortType === Sort.LOWEST_PRICES) {
    return duplicatedProducts.sort((a: Product, b: Product) => (a.price - b.price));
  } else if (sortType === Sort.LATEST_CREATED) {
    return duplicatedProducts.sort((a: Product, b: Product) => 
      (DateUtil.compareDate(b.creationAt, a.creationAt) ? 1 : -1));
  } else if (sortType === Sort.OLDEST_CREATED) {
    return duplicatedProducts.sort((a: Product, b: Product) => 
      (DateUtil.compareDate(a.creationAt, b.creationAt) ? 1 : -1));
  } else if (sortType === Sort.LATEST_UPDATED) {
    return duplicatedProducts.sort((a: Product, b: Product) => 
      (DateUtil.compareDate(b.updatedAt, a.updatedAt) ? 1 : -1));
  } else if (sortType === Sort.OLDEST_UPDATED) {
    return duplicatedProducts.sort((a: Product, b: Product) => 
      (DateUtil.compareDate(a.updatedAt, b.updatedAt) ? 1 : -1));
  }

  return duplicatedProducts; 
}

export default {
  sortProducts
}