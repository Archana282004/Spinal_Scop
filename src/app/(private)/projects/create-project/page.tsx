import ProjectForm from "@/components/CreateProjectComponent";

<<<<<<< HEAD
import TopBar from '@/components/hoc/LayoutComponent/TopBar';
import SimpleReactValidator from 'simple-react-validator';
import { useState, useRef, useEffect } from 'react';
import { addProject, visitIds, examIds, groupIds, analysisType, objectType, anatomy } from '@/store/actions/productAction';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from "next/navigation";
import { PRIVATE_PATH } from '@/utils/constant';
import Link from 'next/link';


interface valueObj {
  id: string;
  name: string
}

interface MultiSelectProps {
  label: string;
  name: string;
  value: valueObj[];
  onChange: (value: valueObj[]) => void;
  options: any[];
  disabled?: boolean
}


function MultiSelect({ label, value, onChange, options, name, disabled }: MultiSelectProps) {

  return (
    <div>
      <label className="block font-body text-base text-foreground/80 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((v: any) => (
          <span key={v.id} className="px-3 py-1 rounded-full bg-primary text-background text-sm flex items-center gap-1">
            {v.name}
            <button type="button" className="ml-1 text-background/70 hover:text-background" onClick={() => onChange(value.filter((item: any) => item.id !== v.id))}>
              ×
            </button>
          </span>
        ))}
      </div>
      <select
        name={name}
        disabled={disabled}
        className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base"
        onChange={e => {

          const val = e.target.value;
          const text = e.target.options[e.target.selectedIndex].text;

          if (!value.length) {
            onChange([...value, { id: val, name: text }]);
          } else {
            const isSelected = value.some((item: any) => item.id === val)
            if (!isSelected) onChange([...value, { id: val, name: text }]);
          }
        }}
        value=""
      >
        <option value="">Select {label}</option>
        {options
          .filter((opt) => {
            const exists = value.some((item) => {
              return Number(item.id) === opt.id;
            });
            return !exists;
          })
          .map((opt, index) => (
            <option key={`Index${index + 1}`} value={opt.id}>
              {opt.name}
            </option>
          ))}
      </select>
    </div>
  );
}

const ProjectForm = () => {
  const defaultForm = {
    project_id: "",
    name: "",
    account_name: " ",
    regulated_project: "",
    anatomy: [],
    index_locations_id: [

    ],
    object_type_id: [],
    groups: [

    ],
    exam_ids: [

    ],
    analysis: [

    ],
    visit_ids: []
  }

  const [formData, setFormData] = useState(defaultForm);
  console.log('formData', formData);

  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { visit, exam, group, analysis, objectt, anatomies } = useAppSelector((state) => state.product)
  const [indexLocation, setIndexLocation] = useState<any>([]);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: any) => <div style={{ color: "red" }}>{message}</div>,
    })
  );
  const [, forceUpdate] = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        debugger
        const payload = {
          project_id: formData?.project_id,
          name: formData?.name,
          account_name: formData?.account_name,
          regulated_project: JSON.parse(formData?.regulated_project),
          anatomy: formData?.anatomy?.length ? parseInt((formData.anatomy[0] as any).id) : null,
          index_locations_id: formData?.index_locations_id?.map((item: any) => item?.id && parseInt(item.id)),
          object_type_id: formData?.object_type_id?.length ? parseInt((formData.object_type_id[0] as any).id) : null,
          groups: formData?.groups?.map((item: any) => item?.id && parseInt(item.id)),
          exam_ids: formData.exam_ids?.map((item: any) => item?.id && parseInt(item.id)),
          analysis: formData.analysis?.map((item: any) => item?.id && parseInt(item.id)),
          visit_ids: formData.visit_ids?.map((item: any) => item?.id && parseInt(item.id)),
          level: "Project",
          operation: "create"
        }
        const res = await dispatch(addProject(payload))

        if (res.success) {
          setFormData(defaultForm);
          router.push(PRIVATE_PATH.HOME)
        }
      }
      catch (err: any) {
        setError(err)
      }
    }
    else {
      simpleValidator.current.showMessages();
      forceUpdate({});
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    forceUpdate({});
  }

  const handleSelectChange = (name: string, v: any) => {
    setFormData({ ...formData, [name]: v });
    forceUpdate({});
  }
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    forceUpdate({});
  };

  useEffect(() => {
    dispatch(visitIds());
    dispatch(examIds());
    dispatch(groupIds());
    dispatch(analysisType());
    dispatch(objectType());
    dispatch(anatomy())
  }, [])

  useEffect(() => {

    if (anatomies.length && formData.anatomy.length) {
      const filteredLocations = anatomies.filter((opt) => formData.anatomy.some((item: any) => Number(item.id) === Number(opt.id))).flatMap((location) => location.indexLocations)
      setIndexLocation(filteredLocations)
    }

    setIndexLocation

  }, [anatomies, formData])


  return (
    <>
      <TopBar title="Create New Project" />
      <form className="bg-background border border-foreground/10 shadow-sm rounded-lg max-w-screen-md mx-auto p-8 flex flex-col gap-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-body text-base text-foreground/80 mb-1">Project ID<span className="text-primary">*</span></label>
            <input type="text" className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" name='project_id' onChange={handleChange} placeholder="Project ID" />
            {simpleValidator.current.message('project_id', formData.project_id, 'required')}
          </div>
          <div>
            <label className="block font-body text-base text-foreground/80 mb-1">Project Name<span className="text-primary">*</span></label>
            <input type="text" className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" name='name' onChange={handleChange} placeholder="Project Name" />
            {simpleValidator.current.message('name', formData.name, "required")}
          </div>
          <div>
            <label className="block font-body text-base text-foreground/80 mb-1">Account Name<span className="text-primary">*</span></label>
            <input type="text" className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" name='account_name' onChange={handleChange} placeholder="Account Name" />
            {simpleValidator.current.message('account_name', formData.account_name, "required")}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-body text-base text-foreground/80">Regulated Project<span className="text-primary" >*</span></span>
          <label className="inline-flex items-center gap-2 font-body text-base">
            <input type="radio" name="regulated_project" value="true" checked={formData.regulated_project === "true"} onChange={(e) => handleRadioChange("regulated_project", e.target.value)} /> Yes
          </label>
          <label className="inline-flex items-center gap-2 font-body text-base">
            <input type="radio" name="regulated_project" value="false" checked={formData.regulated_project === "false"} onChange={(e) => handleRadioChange("regulated_project", e.target.value)} /> No
          </label>

          {simpleValidator.current.message('regulated_project', formData.regulated_project, "required")}
        </div>
        <MultiSelect label="Visit ID(s)*" value={formData.visit_ids} name='visit_ids' onChange={v => { handleSelectChange('visit_ids', v) }} options={visit} />
        {simpleValidator.current.message('visit_ids', formData.visit_ids, "required")}
        <MultiSelect label="Exam(s)*" value={formData.exam_ids} onChange={v => { handleSelectChange('exam_ids', v) }} name='exam' options={exam} />
        {simpleValidator.current.message('exam', formData.exam_ids, "required")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect label="Group(s)*" value={formData.groups} onChange={v => { handleSelectChange('groups', v) }} name='groups' options={group} />
          {simpleValidator.current.message('groups', formData.groups, "required")}
          <MultiSelect label="Anatomy*" value={formData.anatomy} onChange={v => { const latest = v.length > 0 ? [v[v.length - 1]] : []; handleSelectChange('anatomy', latest); setFormData(prev => ({...prev,index_locations_id: prev.index_locations_id.slice(0, 0)}));  }} name="anatomy" options={anatomies} />
          {simpleValidator.current.message('anatomy', formData?.anatomy, "required")}
        </div>
        <MultiSelect label="Index Location(s)*" value={formData.index_locations_id} name='index_locations' onChange={v => { handleSelectChange('index_locations_id', v) }} options={indexLocation} disabled={!formData.anatomy.length} />
        {simpleValidator.current.message('index_locations', formData?.index_locations_id, "required")}
        <MultiSelect label="Object Type(s)*" value={formData.object_type_id} name='Object Type' onChange={v => { handleSelectChange('object_type_id', v) }} options={objectt} />
        {simpleValidator.current.message("Object Type", formData?.object_type_id, "required")}
        <MultiSelect label="Analysis(-es)*" value={formData.analysis} name='Analysis' onChange={v => { handleSelectChange('analysis', v) }} options={analysis} />
        {simpleValidator.current.message('Analysis', formData?.analysis, "required")}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/projects" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-secondary text-background hover:bg-secondary/90 font-body text-base">
            Cancel
          </Link>
          <button type="submit" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-background hover:bg-primary/90 font-body text-base" onClick={handleSubmit}>
            Create New Project
          </button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
=======
const CreateProject = () => <ProjectForm mode="create"  />;

export default CreateProject;
>>>>>>> ad06fa6 (Project Form - Edit)
