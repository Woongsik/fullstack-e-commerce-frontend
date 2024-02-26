import { UserToken } from "../../misc/types/User";

class UserSlicerUtil {
  readonly hostsName = "platziStore";
  readonly sessionName = "userSession";
  localStorageName;

  constructor() {
    this.localStorageName = `${this.hostsName}_${this.sessionName}`;
  }
  
  public getTokensToLocalStorage(): UserToken | null {
    try {
      const rawTokens: string | null = localStorage.getItem(this.localStorageName);
      if (rawTokens) {
        return JSON.parse(rawTokens);
      }

      console.log("No tokens saved!");
      return null;
    } catch (e: any) {
      console.log("Get tokens from localstorage failed:", e);
      return null;
    }
  }

  public setTokensToLocalStorage(tokens: UserToken): void {
    try {
      const rawTokens: string = JSON.stringify(tokens);
      localStorage.setItem(this.localStorageName, rawTokens);
    } catch (e: any) {
      console.log('Set tokens to localstorage failed:', e);
    }
  }
}

export const userSlicerUtil: UserSlicerUtil = new UserSlicerUtil();