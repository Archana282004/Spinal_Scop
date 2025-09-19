"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import { forSuccess } from "@/utils/CommonService";
import Cookies from "js-cookie";
import { Login } from "@/types/authType";


export const refreshToken = async (dispatch: AppDispatch) => {
  const res = await API.get("/api/auth/refresh");

  if (res?.token) {
    Cookies.set('token', res.token)
    dispatch(authReducer.refreshToken(res.token));
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


export const login = (formData: Login) => async (dispatch: AppDispatch) => {
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