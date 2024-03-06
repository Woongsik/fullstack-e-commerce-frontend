import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserWithSession } from "../redux/slices/UserSlice";
import { AppState, useAppDispatch } from "../redux/store";
import { userSlicerUtil } from "../redux/utils/UserSlicerUtil";
import { UserToken } from "../misc/types/User";

export function useUserSession() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.userReducer);

  useEffect(() => { // For the user sessoion if no user 
    const tokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    if (!user && tokens) {
      dispatch(getUserWithSession(tokens));
    }  
  }, [dispatch]);
}

  