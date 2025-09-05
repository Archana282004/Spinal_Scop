"use client"

import { AppDispatch } from "../store"
import * as API from "../serverApiAction/clientApis";
import { productlisting } from "../reducers/productReducer";

export const productlist = (params: any) => async (dispatch: AppDispatch) => {debugger
  try{
    const response = await API.get("/project", params);
    dispatch(productlisting(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}