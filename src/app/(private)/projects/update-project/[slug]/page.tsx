"use client"
import ProjectForm from "@/components/CreateProjectComponent";
import { useParams } from "next/navigation";

const updateProject = () => {
 const params = useParams();
  const id = Number(params.slug)

return <ProjectForm mode="edit" id={id}/>
};

export default updateProject;