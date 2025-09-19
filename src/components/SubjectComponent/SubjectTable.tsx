import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Dropdown from "../ui/Dropdown"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { subjectlist } from "@/store/actions/projectAction"

interface SubjectTableProps {
  selectedSite: string | null
  handleOpenCreateSubject: () => void
}
const SubjectTable: React.FC<SubjectTableProps> = ({ selectedSite,
  handleOpenCreateSubject
}) => {
  const idd = useParams();
  const id = Number(idd.slug);
  const siteid = Number(selectedSite);
  const params = {
    active_status: "active",
    page: "1",
    limit: "10",
    level: "Project",
    operation: "view",
    sort: "DESC",
    sortBy: "visit"
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id && siteid) {
      dispatch(subjectlist(id, siteid, params))
    }
  }, [id, siteid])
  const subjects = useAppSelector((state) => state.product.subjects)
    const sites = useAppSelector((state) => state.product.sites)
    const siteIndex = sites.findIndex((s) => s.id === Number(selectedSite));
  return (
    <div>
      {selectedSite && (
        <div className="mt-12">
          <div className="bg-background border border-foreground/10 rounded-lg p-4 mb-2">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-heading text-xl md:text-2xl text-primary">{sites[siteIndex].name}</span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">{sites[siteIndex].sitePI}</span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">{sites[siteIndex].siteID}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-heading text-lg text-foreground">Subject(s)</span>
              <button
                className="px-3 py-1 rounded bg-primary text-background font-body text-sm"
                onClick={handleOpenCreateSubject}
              >
                + Create New Subject
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full font-body text-base">
                <thead>
                  <tr className="bg-primary/5 text-foreground/80">
                    <th className="px-4 py-2 text-left">Subject ID</th>
                    <th className="px-4 py-2 text-left">Group</th>
                    <th className="px-4 py-2 text-left">Index Location(s)</th>
                    <th className="px-4 py-2 text-left">Visit(s)</th>
                    <th className="px-4 py-2 text-left">Last Updated Visit</th>
                    <th className="px-4 py-2 text-left">Created Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { subjects.length===0 ? (
                    <tr key="no-subject">
                      <td colSpan={9} className="px-4 py-6 text-center text-sm text-foreground/50">
                        No Sites found.
                      </td>
                    </tr>
                  ) : subjects.map((sub)=>(
                    (
                    <tr className="border-t border-foreground/10" key={sub.id}>
                      <td className="px-4 py-2">{sub.subjectID}</td>
                      <td className="px-4 py-2">{sub.group.name}</td>
                      <td className="px-4 py-2">{sub.index_locations.map((item)=> item.name)}</td>
                      <td className="px-4 py-2">{sub.totalVisitCount}</td>
                      <td className="px-4 py-2">{sub.updated_at.split("T")[0]}</td>
                      <td className="px-4 py-2">{sub.created_at.split("T")[0]}</td>
                      <td className="px-4 py-2">
                        <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-xs">Active</span>
                      </td>
                      <td className="px-4 py-2">
                        <Dropdown
                          trigger={<span className="inline-flex h-6 w-6 items-center justify-center">⋯</span>}
                          items={[
                            { type: "link", href: "#", label: "View Details" },
                            { type: "link", href: "#", label: "Edit" },
                            { type: "button", label: "Delete" },
                            { type: "button", label: "Inactive" },
                          ]}
                        />
                      </td>
                    </tr>
                  )
                  ))
                    
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default SubjectTable