"use client"

import { AppDispatch } from "../store"
import * as API from "../serverApiAction/clientApis";
import { productlisting, visitIdslist, examIdslist, groupIdslist, analysisTypelist, objectTypelist, anatomylist, sitelisting, subjectlisting } from "../reducers/projectReducer";
import { forSuccess } from "@/utils/CommonService";
import { projectdetail} from "../reducers/projectReducer";
import { HomeParam, Project, ProjectDetailParam, SiteForm, SiteTable, SubForm, SubTable } from "@/types/authType";

export const productlist = (params: HomeParam) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get("/project", params);
    dispatch(productlisting(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}

export const addProject = (formData: Project) => async () => {
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
  try {
    const response = await API.get("/settings/visit-ids");
    dispatch(visitIdslist(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}

export const examIds = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get("/settings/exams");
    dispatch(examIdslist(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}

export const groupIds = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get("/settings/groups");
    dispatch(groupIdslist(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}

export const analysisType = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get("/settings/analysis-types");
    dispatch(analysisTypelist(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}

export const objectType = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get("/settings/object-types");
    dispatch(objectTypelist(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}

export const anatomy = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get("/settings/anatomies");
    dispatch(anatomylist(response.data.data))
  }
  catch (error) {
    console.log("error", error)
  }
}
export const editProject = (id: number, formData: Project) => async () => {
  try {
    const res = await API.put(`/project/${id}`, formData);
    if (res.success) {
      forSuccess("Project Updated successfully.");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const projectdetailss = (id: number, params: ProjectDetailParam) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get(`/project/${id}`, params);
    dispatch(projectdetail(response.data.data));
  } catch (error) {
    console.log("error", error);
  }
};

export const sitelist = (id:number, params: SiteTable) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get(`/project/${id}/sites`, params);
    dispatch(sitelisting(response.data.data.sites))
    
  }
  catch (error) {

    console.log("error", error)
  }
}

export const addSite = (id: number, formData:SiteForm) => async () => {
  try {

    const res = await API.post(`/project/${id}/sites`, formData);
    

    if (res.success) {
      forSuccess("Site created successfully.");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const subjectlist = (id:number, siteid: number ,params: SubTable) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.get(`/project/${id}/sites/${siteid}/subjects`, params);
    dispatch(subjectlisting(response.data.data.subjects))
    
  }
  catch (error) {

    console.log("error", error)
  }
}
export const addSubject = (id: number, siteid:number, formData: SubForm) => async () => {
  try {

    const res = await API.post(`/project/${id}/sites/${siteid}/subjects`, formData);
    

    if (res.success) {
      forSuccess("Subject created successfully.");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const editSite = (id: number, siteid:number , formData: SubForm) => async () => {
  try {
    const res = await API.put(`/project/${id}/sites/${siteid}`, formData);
    if (res.success) {
      forSuccess("Site Updated successfully.");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

