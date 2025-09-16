import { ReactElement } from "react";

export type BoxProps = {
  children: ReactElement;
};

// Reusable type for ID + Name objects
type IdName = {
  id: string | number;
  name: string;
};

// Main project type
export interface ProjectForm {
  project_id: string;
  name: string;
  account_name: string;
  regulated_project: string | boolean; // can also be boolean if API sends true/false
  anatomy: IdName[];
  index_locations_id: IdName[];
  object_type_id: IdName[];
  groups: IdName[];
  exam_ids: IdName[];
  analysis: IdName[];
  visit_ids: IdName[];
    // extra fields from backend (optional in form)
  is_locked?: boolean;
  active_status?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  created_by?: string;
  updated_by?: string;
}