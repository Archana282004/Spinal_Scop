import { useParams } from "next/navigation";
import Dropdown from "../ui/Dropdown";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sitelist } from "@/store/actions/projectAction";
import { Site } from "@/types/authType";

interface SiteTableProps {
    handleOpenCreateSite: () => void;
    selectedSite: string | null;
    setSelectedSite: React.Dispatch<React.SetStateAction<string | null>>;
}

const SiteTable: React.FC<SiteTableProps> = ({
    handleOpenCreateSite,
    selectedSite,
    setSelectedSite,
}) => {
   const idd = useParams();
   const id = idd.slug;
    const params = {
        
        level:"Project",
        operation:"view",
        page:"1",
        limit:"10",
        sort:"DESC",
        active_status:"active"
    }
    const dispatch = useAppDispatch();
    useEffect(()=>{
       if(id){
         dispatch(sitelist(id, params));
       }
    },[id])

    const sites = useAppSelector((state) => state.product.sites)
    console.log("sites", sites)
    return ( 
        <div>
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-2xl md:text-3xl text-primary">Site(s)</h3>
                    <button
                        className="px-4 py-2 rounded-md bg-primary text-background hover:bg-primary/90 font-body text-sm"
                        onClick={handleOpenCreateSite}
                    >
                        + Create New Site
                    </button>
                </div>
                <div className="bg-background border border-foreground/10 rounded-lg overflow-x-auto">
                    <table className="min-w-full font-body text-base">
                        <thead>
                            <tr className="bg-primary/5 text-foreground/80">
                                <th className="px-4 py-2 text-left">Site ID</th>
                                <th className="px-4 py-2 text-left">Site Name</th>
                                <th className="px-4 py-2 text-left">Subject(s)</th>
                                <th className="px-4 py-2 text-left">Site PI</th>
                                <th className="px-4 py-2 text-left">Created Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {sites.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-sm text-foreground/50">
                      No Sites found.
                    </td>
                  </tr>
                ) : (
                  sites.map((sites) => (
                            <tr
                                key={sites.id}
                                className={`border-t border-foreground/10 cursor-pointer transition-colors ${selectedSite === "V 01" ? "bg-primary/10" : "hover:bg-primary/5"}`}
                                
                            >
                                <td className="px-4 py-2">{sites.siteID}</td>
                                <td className="px-4 py-2">{sites.name}</td>
                                <td className="px-4 py-2">{sites.totalSubjects}</td>
                                <td className="px-4 py-2">{sites.sitePI}</td>
                                <td className="px-4 py-2">{sites.created_at.split("T")[0]}</td>
                                <td className="px-4 py-2">
                                    <span className="inline-block px-3 py-1 rounded font-semibold text-xs bg-primary/10 text-primary">{sites.active_status}</span>
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
                  )))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default SiteTable;
