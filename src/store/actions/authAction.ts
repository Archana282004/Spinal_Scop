"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import { forSuccess } from "@/utils/CommonService";
import Cookies from "js-cookie";


export const refreshToken = async (dispatch: AppDispatch) => {
  const res: any = await API.get("/api/auth/refresh");

  if (res?.accessToken) {
    Cookies.set('token', res.accessToken)
    dispatch(authReducer.refreshToken(res.accessToken));
    return res.data;
  } else if (res === "token has expired") {
    dispatch({ type: "auth/logout" });
  } else {
    dispatch({ type: "auth/logout" });
  }
  return {
    access_token: "asdasdd",
  };
};


export const login = (formData: any) => async (dispatch: AppDispatch) => {
    try {
   
      const res = await API.post("/auth/signIn", formData);
      
      if (res.success) {
        dispatch(
          authReducer.login({ user: res.data.data.user, access_token: res.data.data.AuthenticationResult.IdToken, refresh_token:res.data.data.AuthenticationResult.RefreshToken })
        );
        forSuccess("Login successfully.");
      }
      return res;
    } catch (err) {
        console.log(err);
    }
};