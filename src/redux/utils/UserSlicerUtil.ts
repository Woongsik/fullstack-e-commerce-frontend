import { LoggedUserInfo, UserToken } from "../../misc/types/User";

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

      return null;
    } catch (e: any) {
      console.log("Get tokens from localstorage failed:", e);
      return null;
    }
  }

  public setTokensToLocalStorage(loggedUserInfo: LoggedUserInfo): void {
    try {
      const userTokens: UserToken = loggedUserInfo.tokens;
      const rawTokens: string = JSON.stringify(userTokens);
      localStorage.setItem(this.localStorageName, rawTokens);
    } catch (e: any) {
      console.log('Set tokens to localstorage failed:', e);
    }
  }

  public removeTokensFromLocalStorage(): void {
    try {
      localStorage.removeItem(this.localStorageName);
    } catch(e: any) {
      console.log('Remove tokens from localstorage failed', e);
    }
  }
}

export const userSlicerUtil: UserSlicerUtil = new UserSlicerUtil();