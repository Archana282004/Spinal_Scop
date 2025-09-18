import Dropdown from "../ui/Dropdown"

interface SubjectTableProps {
  selectedSite: string | null
  handleOpenCreateSubject: () => void
}
const SubjectTable: React.FC<SubjectTableProps> = ({ selectedSite,
  handleOpenCreateSubject
}) => {

  return (
    <div>
      {selectedSite && (
        <div className="mt-12">
          <div className="bg-background border border-foreground/10 rounded-lg p-4 mb-2">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-heading text-xl md:text-2xl text-primary">VSite</span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">MD</span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">V 01</span>
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
                  <tr className="border-t border-foreground/10">
                    <td className="px-4 py-2">Angular Motion - Anatomical Norm Case</td>
                    <td className="px-4 py-2">Investigational</td>
                    <td className="px-4 py-2">L2-L3, L5-S1</td>
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">10/Jul/2025</td>
                    <td className="px-4 py-2">09/Jul/2025</td>
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