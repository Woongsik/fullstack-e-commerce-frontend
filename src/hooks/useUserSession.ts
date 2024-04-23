import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserWithSession } from "../redux/slices/UserSlice";
import { AppState, useAppDispatch } from "../redux/store";

export function useUserSession() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.userReducer);

  useEffect(() => { // For the user sessoion if no user 
    if (!user) {
      dispatch(getUserWithSession());
    }  
  }, [dispatch]);
}

  