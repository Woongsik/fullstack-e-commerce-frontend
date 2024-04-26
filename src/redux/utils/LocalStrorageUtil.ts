import { CartItem, CartItemBase } from "../../misc/types/CartItem";
import { LoggedUserInfo, UserToken } from "../../misc/types/User";

class LocalStorageUtil {
  readonly mainName = "awsomeShopping";
  readonly token = "userTokens";
  readonly cart = "cartItems";
  readonly favorite = "favorites";

  localStorageNameForToken;
  localStorageNameForCart;
  localStorageNameForFavorite;

  constructor() {
    this.localStorageNameForToken = `${this.mainName}_${this.token}`;
    this.localStorageNameForCart = `${this.mainName}_${this.cart}`;
    this.localStorageNameForFavorite = `${this.mainName}_${this.favorite}`;
  }
  
  public getTokens(): UserToken | null {
    try {
      const rawTokens: string | null = localStorage.getItem(this.localStorageNameForToken);
      if (rawTokens) {
        return JSON.parse(rawTokens);
      }

      return null;
    } catch (e: any) {
      console.log("Get tokens from localstorage failed:", e);
      return null;
    }
  }

  public setTokens(loggedUserInfo: LoggedUserInfo): void {
    try {
      const userTokens: UserToken = loggedUserInfo.tokens;
      const rawTokens: string = JSON.stringify(userTokens);
      localStorage.setItem(this.localStorageNameForToken, rawTokens);
    } catch (e: any) {
      console.log('Set tokens to localstorage failed:', e);
    }
  }

  public removeTokens(): void {
    try {
      localStorage.removeItem(this.localStorageNameForToken);
    } catch(e: any) {
      console.log('Remove tokens from localstorage failed', e);
    }
  }

  public getCartItemsFromLocalStorage(): CartItem[] {
    try {
      const rawCartItems: string | null = localStorage.getItem(this.localStorageNameForCart);
      if (rawCartItems) {
        return JSON.parse(rawCartItems);
      }

      return [];
    } catch(e: any) {
      console.log('Set cartItems to localstorage failed', e);
      return [];
    }
  }

  public setCartItemsToLocalStorage(cartItems: CartItem[]): void {
    try {
      localStorage.setItem(this.localStorageNameForCart, JSON.stringify(cartItems));
    } catch(e: any) {
      console.log('Set cartItems to localstorage failed', e);
    }
  }

  public removeCartItemsToLocalStorage(): void {
    try {
      localStorage.removeItem(this.localStorageNameForCart);
    } catch(e: any) {
      console.log('Remove cartItems from localstorage failed', e);
    }
  }

  public getFavoritesFromLocalStorage(): CartItemBase[] {
    try {
      const rawFavorites: string | null = localStorage.getItem(this.localStorageNameForFavorite);
      if (rawFavorites) {
        return JSON.parse(rawFavorites);
      }

      return [];
    } catch(e: any) {
      console.log('Set cartItems to localstorage failed', e);
      return [];
    }
  }

  public setFavoritesToLocalStorage(favorites: CartItemBase[]): void {
    try {
      localStorage.setItem(this.localStorageNameForFavorite, JSON.stringify(favorites));
    } catch(e: any) {
      console.log('Set cartItems to localstorage failed', e);
    }
  }

  public removeFavoritesToLocalStorage(): void {
    try {
      localStorage.removeItem(this.localStorageNameForFavorite);
    } catch(e: any) {
      console.log('Remove cartItems from localstorage failed', e);
    }
  }
}

export const localStorageUtil: LocalStorageUtil = new LocalStorageUtil();