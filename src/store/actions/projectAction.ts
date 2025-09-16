"use client"

import { AppDispatch } from "../store"
import * as API from "../serverApiAction/clientApis";
import { productlisting, visitIdslist, examIdslist, groupIdslist,analysisTypelist, objectTypelist, anatomylist } from "../reducers/projectReducer";
import { forSuccess } from "@/utils/CommonService";
import { projectdetailing } from "../reducers/projectReducer";

export const productlist = (params: any) => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/project", params);
    dispatch(productlisting(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}

export const addProject = (formData: any) => async (dispatch: AppDispatch) => {
    try {
   
      const res = await API.post("/project", formData);
      
      if (res.success) {
        forSuccess("Project created successfully.");
      }
      return res;
    } catch (err) {
        console.log(err);
    }
};

export const visitIds = () => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/settings/visit-ids"); 
    dispatch(visitIdslist(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}

export const examIds = () => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/settings/exams");
    dispatch(examIdslist(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}

export const groupIds = () => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/settings/groups");
    dispatch(groupIdslist(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}

export const analysisType = () => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/settings/analysis-types");
    dispatch(analysisTypelist(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}

export const objectType = () => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/settings/object-types");
    dispatch(objectTypelist(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}

export const anatomy = () => async (dispatch: AppDispatch) => {
  try{
    const response = await API.get("/settings/anatomies");
    dispatch(anatomylist(response.data.data))
    console.log(response.data)
  }
  catch(error){

    console.log("error", error)
  }
}
export const editProject = (id: any, formData:any) => async (dispatch: AppDispatch) =>{
    try{
        const res = await API.put(`/project/${id}`, formData);

        if(res.success) {
            forSuccess("Project Updated successfully.");
        }
        return res;
    } catch(err){
        console.log(err);
    }
};

export const projectdetail = (id: any , params:any) => async (dispatch: AppDispatch) => { 
  try {
    const response = await API.get(`/project/${id}`, params);
    dispatch(projectdetailing(response.data.data));
    console.log("Fetched project:", response.data.data);
  } catch (error) {
    console.log("error", error);
  }
};

