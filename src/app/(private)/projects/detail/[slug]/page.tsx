"use client"
import { addSite, projectdetailss } from "@/store/actions/projectAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SiteForm from "@/components/SiteComponent/SiteForm";
import SubjectForm from "@/components/SubjectComponent/SubjectForm";
import SiteTable from "@/components/SiteComponent/SiteTable";
import SubjectTable from "@/components/SubjectComponent/SubjectTable";

const ProjectDetailPage = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [isCreateSiteOpen, setIsCreateSiteOpen] = useState<boolean>(false);
  const [siteId, setSiteId] = useState<string>("");
  const [siteName, setSiteName] = useState<string>("");
  const [sitePi, setSitePi] = useState<string>("");
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<string>("");
  const [subjectGroup, setSubjectGroup] = useState<string>("");
  const [indexLocation, setIndexLocation] = useState<string>("");

  const handleOpenCreateSite = () => setIsCreateSiteOpen(true);
  const handleCloseCreateSite = () => {
    setIsCreateSiteOpen(false);
    
  };
  const [error, setError] = useState("");
  const dispatchh = useAppDispatch();
  const router = useRouter();
 
  const idd = useParams();
  const id = idd.slug;
  const handleCreateSite = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      try {
        const payload = {
          name: siteName ,
          siteID: siteId,
          sitePI: sitePi,
          level: "Project",
          operation: "create"
        }

        let res = await dispatchh(addSite(id, payload));
        
      }
      catch (err: any) {
        setError(err)
      }
    handleCloseCreateSite();
  };

  const handleOpenCreateSubject = () => setIsCreateSubjectOpen(true);
  const handleCloseCreateSubject = () => {
    setIsCreateSubjectOpen(false);
    setSubjectId("");
    setSubjectGroup("");
    setIndexLocation("");
  };

  const handleCreateSubject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!subjectId.trim()) {
      return;
    }
    // Replace with actual create-subject action/integration
    // eslint-disable-next-line no-console
    console.log({ subjectId, subjectGroup, indexLocation, selectedSite });
    handleCloseCreateSubject();
  };
  const params = useParams();
  const selectedId = params.slug;
  const { projectdetails } = useAppSelector((state) => state.product)
  console.log("projectdetails", projectdetails)
  const dispatch = useAppDispatch();
  const param = {
    level: "Project",
    operation: "view"
  }
  useEffect(() => {
    if (selectedId) {
      dispatch(projectdetailss(selectedId, param))
    }
  }, [selectedId])

const handleEdit=()=>{
  router.push(`/projects/update-project/${id}`)
}

  return (
    <>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-2">{projectdetails?.name}</h2>
          <div className="flex flex-wrap gap-4 items-center mb-6">

            <span className="font-body text-base text-foreground/80">
              Project ID: <span className="text-foreground font-semibold">{projectdetails?.id}</span>
            </span>
            <span className="px-4 py-1 rounded-md bg-primary text-background font-body text-sm">
              {projectdetails?.regulated_project ? "Regulated Project" : "Not Regulated Project"}
            </span>
            <span className="font-body text-base text-foreground/80">
              Created Date: <span className="text-foreground font-semibold">{projectdetails?.created_at.split("T")[0]}</span>
            </span>
            <button className="ml-auto px-4 py-2 rounded-md bg-secondary text-background hover:bg-secondary/90 font-body text-base">
              Generate Report
            </button>
            <button className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 font-body text-base" onClick={handleEdit}>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-background border border-foreground/10 rounded-lg p-4">
              <div className="mb-2 font-body text-base text-foreground/80">
                <span className="font-semibold">Visit ID(s):</span> {projectdetails?.visitIds.map((item) => item.name).join(", ")}
              </div>
              <div className="mb-2 font-body text-base text-foreground/80">
                <span className="font-semibold">Exam(s):</span> {projectdetails?.projectExams.map((item) => item?.exam?.name).join(", ")}
              </div>
              <div className="mb-2 font-body text-base text-foreground/80">
                <span className="font-semibold">Analysis(-es):</span> {projectdetails?.projectExams[0]?.projectAnalysisTypes.map((item) => item?.analysisType?.name).join(", ")}
              </div>
            </div>
            <div className="bg-background border border-foreground/10 rounded-lg p-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded bg-primary text-background font-body text-sm">
                Group(s): {projectdetails?.groups.map((item) => item?.name).join(", ")}
              </span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">
                Anatomy:{projectdetails?.anatomy.map((item) => item?.anatomy?.name)}<span>

                </span>
              </span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">
                Index Location(s):{projectdetails?.anatomy[0]?.projectIndexLocations?.map((item) => item?.indexLocation?.name).join(", ")}
              </span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">
                Object Type(s): {projectdetails?.objectType?.name}
              </span>
            </div>
          </div>
          {/* Site(s) Table */}
          <SiteTable handleOpenCreateSite={handleOpenCreateSite}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite} />
          {/* Subject Table for Selected Site */}
          {selectedSite && <SubjectTable
            selectedSite={selectedSite}
            handleOpenCreateSubject={handleOpenCreateSubject}

          />}
          {/* Create New Site Modal */}
          {isCreateSiteOpen && <SiteForm
            isCreateSiteOpen={isCreateSiteOpen}
            handleCloseCreateSite={handleCloseCreateSite}
            handleCreateSite={handleCreateSite}
            siteId={siteId}
            setSiteId={setSiteId}
            siteName={siteName}
            setSiteName={setSiteName}
            sitePi={sitePi}
            setSitePi={setSitePi}
          />
          }

          {/* Create New Subject Modal */}
          {isCreateSubjectOpen && (<SubjectForm
            isCreateSubjectOpen={isCreateSubjectOpen}
            handleCloseCreateSubject={handleCloseCreateSubject}
            handleCreateSubject={handleCreateSubject}
            subjectId={subjectId}
            setSubjectId={setSubjectId}
            subjectGroup={subjectGroup}
            setSubjectGroup={setSubjectGroup}
            indexLocation={indexLocation}
            setIndexLocation={setIndexLocation}

          />)}
          </div>
          </div>
        </>
        );
};

        export default ProjectDetailPage;
