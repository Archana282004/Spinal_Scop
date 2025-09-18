"use client"
import TopBar from "../hoc/LayoutComponent/TopBar"
import SimpleReactValidator from "simple-react-validator"
import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { addProject, visitIds, examIds, groupIds, analysisType, objectType, anatomy } from '@/store/actions/projectAction';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams, useRouter } from "next/navigation";
import { PRIVATE_PATH } from '@/utils/constant';
import MultiSelect from "../ui/MultiSelect";
import { editProject, projectdetailss } from "@/store/actions/projectAction";


export default function Form({ mode, id }: { mode: "create" | "edit"; id?: any }) {

    const defaultForm = {
        project_id: "",
        name: "",
        account_name: " ",
        regulated_project: "",
        anatomy: [{ id: '', name: '' }],
        index_locations_id: [{ id: '', name: '' }],
        object_type_id: [{ id: '', name: '' }],
        groups: [{ id: '', name: '' }],
        exam_ids: [{ id: '', name: '' }],
        analysis: [{ id: '', name: '' }],
        visit_ids: [{ id: '', name: '' }]
    };

    const [formData, setFormData] = useState(defaultForm);
    const { projectdetails } = useAppSelector((state) => state.product)


    useEffect(() => {
        if (mode === "edit" && projectdetails) {

            setFormData({
                project_id: projectdetails?.project_id,
                name: projectdetails?.name,
                account_name: projectdetails?.account_name,
                regulated_project: projectdetails.regulated_project ? "true" : "false",
                anatomy: projectdetails.anatomy?.map((item: any) => { return { id: item?.anatomy?.id, name: item?.anatomy?.name } }),
                index_locations_id: projectdetails?.anatomy[0]?.projectIndexLocations.map((item: any) => { return { id: item?.indexLocation?.id, name: item?.indexLocation?.name } }),
                exam_ids: projectdetails.projectExams.map((item: any) => { return { id: item?.exam?.id, name: item?.exam?.name } }),
                analysis: projectdetails.projectExams[0].projectAnalysisTypes.map((item: any) => { return { id: item?.analysisType?.id, name: item?.analysisType?.name } }),
                visit_ids: projectdetails.visitIds.map((item: any) => { return { id: item?.id, name: item?.name } }),
                groups: projectdetails.groups.map((item: any) => { return { id: item?.id, name: item?.name } }),
                object_type_id: [{ id: projectdetails.objectType.id, name: projectdetails.objectType.name }],


            });
        } else {
            setFormData({
                project_id: "",
                name: "",
                account_name: " ",
                regulated_project: "",
                anatomy: [],
                index_locations_id: [],
                object_type_id: [],
                groups: [],
                exam_ids: [],
                analysis: [],
                visit_ids: []
            })
        }
    }, [mode, projectdetails]);
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
                    operation: mode === "create" ? "create" : "rename"
                }
                let res;
                if (mode == "create") {
                    res = await dispatch(addProject(payload));
                } else {
                    res = await dispatch(editProject(id, payload));
                }
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
    const param = {
        level: "Project",
        operation: "view"
    }

    useEffect(() => {
        dispatch(visitIds());
        dispatch(examIds());
        dispatch(groupIds());
        dispatch(analysisType());
        dispatch(objectType());
        dispatch(anatomy())
        if (id) {
            dispatch(projectdetailss(id, param))
        }


    }, [id])

    useEffect(() => {

        if (anatomies.length && formData.anatomy.length) {
            const filteredLocations = anatomies.filter((opt) => formData.anatomy.some((item: any) => Number(item.id) === Number(opt.id))).flatMap((location) => location.indexLocations)
            setIndexLocation(filteredLocations)
        }
        setIndexLocation

    }, [anatomies, formData])


    return (
        <div>
            <TopBar title={mode == "create" ? "Create New Project" : "Update Project"} />
            <form className="bg-background border border-foreground/10 shadow-sm rounded-lg max-w-screen-md mx-auto p-8 flex flex-col gap-6 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-body text-base text-foreground/80 mb-1">Project ID<span className="text-primary">*</span></label>
                        <input type="text" value={formData.project_id} className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" name='project_id' onChange={handleChange} placeholder="Project ID" />
                        {simpleValidator.current.message('project_id', formData.project_id, 'required')}
                    </div>
                    <div>
                        <label className="block font-body text-base text-foreground/80 mb-1">Project Name<span className="text-primary">*</span></label>
                        <input type="text" value={formData.name} className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" name='name' onChange={handleChange} placeholder="Project Name" />
                        {simpleValidator.current.message('name', formData.name, "required")}
                    </div>
                    <div>
                        <label className="block font-body text-base text-foreground/80 mb-1">Account Name<span className="text-primary">*</span></label>
                        <input type="text" value={formData.account_name} className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base" name='account_name' onChange={handleChange} placeholder="Account Name" />
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
                    <MultiSelect label="Anatomy*" value={formData.anatomy} onChange={v => { const latest = v.length > 0 ? [v[v.length - 1]] : []; handleSelectChange('anatomy', latest); setFormData(prev => ({ ...prev, index_locations_id: prev.index_locations_id.slice(0, 0) })); }} name="anatomy" options={anatomies} />
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
                        {mode == "create" ? "Create New Project" : "Update Project"}
                    </button>
                </div>
            </form>
        </div>
    )
}