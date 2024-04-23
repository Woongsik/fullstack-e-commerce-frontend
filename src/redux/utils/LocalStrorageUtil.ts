import { LoggedUserInfo, UserToken } from "../../misc/types/User";

class LocalStorageUtil {
  readonly mainName = "awsomeShopping";
  readonly sectionName = "userTokens";
  localStorageName;

  constructor() {
    this.localStorageName = `${this.mainName}_${this.sectionName}`;
  }
  
  public getTokens(): UserToken | null {
    try {
      const rawTokens: string | null = localStorage.getItem(this.localStorageName);
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
      localStorage.setItem(this.localStorageName, rawTokens);
    } catch (e: any) {
      console.log('Set tokens to localstorage failed:', e);
    }
  }

  public removeTokens(): void {
    try {
      localStorage.removeItem(this.localStorageName);
    } catch(e: any) {
      console.log('Remove tokens from localstorage failed', e);
    }
  }
}

export const localStorageUtil: LocalStorageUtil = new LocalStorageUtil();