import Filter from "../../misc/types/Filter";
import { FilteredProducts, Product } from "../../misc/types/Product";
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

const checkImagesForProducts = (products: Product[]): Product[] => {
  products.forEach((product: Product) => {
    checkImagesForProduct(product);
  });

  return products;
}

const checkImagesForProduct = (product: Product): Product => {
  if (product && product.images && product.images.length > 0) {
    product.images = product.images.map((image: string) => {
      return image.split('"')[1];
    });
  }
  return product;
}

const getTotalAndImageCheckedProducts = (products: Product[], filter?: Filter, previousTotal: number = 0, previousMinMaxPrice: number[] = []): FilteredProducts => {
  const itemsPerPage: number = (filter && filter.itemsPerPage) ? filter.itemsPerPage : 10;
  const imageCheckedProducts: Product[] = checkImagesForProducts(products.slice(0, itemsPerPage));

  let total: number = previousTotal;
  let minMaxPrice: number[] = previousMinMaxPrice;
  if (filter && filter.page === 1) {
    total = Math.ceil(products.length / itemsPerPage);
    
    if (minMaxPrice.length === 0) { // Only set one time
      const newProducts: Product[] = [...products];
      newProducts.sort((a, b) => a.price > b.price ? 1 : -1);
      console.log('price', newProducts[0].price, newProducts[newProducts.length -1].price)
      minMaxPrice = [newProducts[0].price, newProducts[newProducts.length -1].price];
    }
  }

  return { 
    products: imageCheckedProducts, 
    total: total,
    minMaxPrice: minMaxPrice
  };
}

export default {
  sortProducts,
  checkImagesForProduct,
  checkImagesForProducts,
  getTotalAndImageCheckedProducts
}