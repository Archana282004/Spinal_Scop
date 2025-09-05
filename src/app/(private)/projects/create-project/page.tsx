"use client";

import TopBar from '@/components/hoc/LayoutComponent/TopBar';
import SimpleReactValidator from 'simple-react-validator';
import { useState, useRef } from 'react';

const options = {
  visitIds: [
    "PreOp",
    "PostOp",
    "1 Month",
    "3 Months",
    "6 Months",
    "12 Months",
    "24 Months",
    "Unscheduled 1",
    "Unscheduled 2",
  ],
  exams: ["XR"],
  groups: ["Investigational", "Control"],
  anatomy: [
    "Cervical Spine (Inter-Vertebral)",
    "Thoracic Spine (Inter-Vertebral)",
    "Lumbar Spine (Inter-Vertebral)",
    "Lumbar Spine (Intra-Vertebral)",
    "Thoracolumbar Spine (Inter-Vertebral)",
    "Thoracolumbar Spine (Intra-Vertebral)",
    "Full Spine (Inter-Vertebral)",
    "Full Spine (Intra-Vertebral)"
  ],
  indexLocations: ["C1–C2"],
  objectTypes: ["Spine Implant"],
  analyses: ["Flexion-Extension X-Ray Analysis"],
};

interface MultiSelectProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

function MultiSelect({ label, value, onChange, options }: MultiSelectProps) {

 

  const simpleValidator = useRef(new SimpleReactValidator);
  const [, forceUpdate] = useState({});
  const defaultForm={
            id: "",
            project_id: "",
            name: "",
            account_name: "",
            regulated_project: "",
            is_locked:"" ,
            active_status: "",
            created_at: "",
            updated_at: "",
            deletedAt: "",
            anatomy: [
                {
                    id: "",
                    created_at: "",
                    active_status: "",
                    updated_at: "",
                    anatomy: {
                        id: "",
                        name: "",
                        category: "",
                        active_status: "",
                        created_at: "",
                        updated_at: ""
                    }
                }
            ],
            totalProjectSites: "",
            totalProjectSubjects: ""
        }
      const handleSubmit = async (e: any) => {
      
          e.preventDefault();
          if (simpleValidator.current.allValid()) {
          
              try {
                 
              } catch (err: any) {
                 
                  console.log(err)
              }
          }
          else {
              simpleValidator.current.showMessages();
              forceUpdate({});
          }
      };
  return (
    <div>
      <label className="block font-body text-base text-foreground/80 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((v: string) => (
          <span key={v} className="px-3 py-1 rounded-full bg-primary text-background text-sm flex items-center gap-1">
            {v}
            <button type="button" className="ml-1 text-background/70 hover:text-background" onClick={() => onChange(value.filter((item: string) => item !== v))}>
              ×
            </button>
          </span>
        ))}
      </div>
      <select
        className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base"
        onChange={e => {
          const val = e.target.value;
          if (val && !value.includes(val)) onChange([...value, val]);
        }}
        value=""
      >
        <option value="">Select {label}</option>
        {options.filter((opt: string) => !value.includes(opt)).map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

const ProjectForm = () => {

  return (
    <>
      <TopBar title="Create New Project" />
      <form className="bg-background border border-foreground/10 shadow-sm rounded-lg max-w-screen-md mx-auto p-8 flex flex-col gap-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-body text-base text-foreground/80 mb-1">Project ID<span className="text-primary">*</span></label>
            <input type="text" className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" placeholder="Project ID" />
          </div>
          <div>
            <label className="block font-body text-base text-foreground/80 mb-1">Project Name<span className="text-primary">*</span></label>
            <input type="text" className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" placeholder="Project Name" />
          </div>
          <div>
            <label className="block font-body text-base text-foreground/80 mb-1">Account Name<span className="text-primary">*</span></label>
            <input type="text" className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" placeholder="Account Name" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-body text-base text-foreground/80">Regulated Project<span className="text-primary">*</span></span>
          <label className="inline-flex items-center gap-2 font-body text-base">
            <input type="radio" name="regulated" /> Yes
          </label>
          <label className="inline-flex items-center gap-2 font-body text-base">
            <input type="radio" name="regulated" /> No
          </label>
        </div>
        <MultiSelect label="Visit ID(s)*" value={[]} onChange={v => {}} options={options.visitIds} />
        <MultiSelect label="Exam(s)*" value={[]} onChange={v => {}} options={options.exams} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect label="Group(s)*" value={[]} onChange={v => {}} options={options.groups} />
          <MultiSelect label="Anatomy*" value={[]} onChange={v => {}} options={options.anatomy} />
        </div>
        <MultiSelect label="Index Location(s)*" value={[]} onChange={v => {}} options={options.indexLocations} />
        <MultiSelect label="Object Type(s)*" value={[]} onChange={v => {}} options={options.objectTypes} />
        <MultiSelect label="Analysis(-es)*" value={[]} onChange={v => {}} options={options.analyses} />
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-secondary text-background hover:bg-secondary/90 font-body text-base">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-background hover:bg-primary/90 font-body text-base">
            Create New Project
          </button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;