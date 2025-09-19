import { addSite } from "@/store/actions/projectAction";
import { useAppDispatch } from "@/store/hooks";
import { SiteForm as SiteFormType } from "@/types/authType";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

interface SiteFormProps {
  selectedSite: string | null;
  setIsCreateSiteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const SiteForm: React.FC<SiteFormProps> = ({
  selectedSite,
  setIsCreateSiteOpen
}) => {
  const defaultform = {
    name: "",
    siteID: "",
    sitePI: "",
    level: "",
    operation: ""
  }
  const [formData, setFormData] = useState<SiteFormType>(defaultform);
  const [error, setError] = useState<string>("");
  const dispatchh = useAppDispatch();
  const idd = useParams();
  const id = Number(idd.slug)
  const siteid = Number(selectedSite);
  const handleCloseCreateSite = () => {
    setIsCreateSiteOpen(false);

  };
  const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message: string) => <div style={{ color: "red" }}>{message}</div>,
        })
    );
    const [, forceUpdate] = useState({});

  const handleCreateSite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (simpleValidator.current.allValid()){
    try {
      const payload = {
        name: formData.name,
        siteID: formData.siteID,
        sitePI: formData.sitePI,
        level: "Project",
        operation: "create"
      }

      let res = await dispatchh(addSite(id, payload));

    }
    catch (err: any) {
      setError(err)
    }
    handleCloseCreateSite();
  }else {
            simpleValidator.current.showMessages();
            forceUpdate({});
        }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-foreground/60" onClick={handleCloseCreateSite} />
        <div className="relative z-10 w-full max-w-2xl mx-4 rounded-xl border border-foreground/10 bg-background shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
            <h4 className="font-heading text-xl text-primary">Create New Site</h4>
            <button
              aria-label="Close"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-foreground/10 text-foreground"
              onClick={handleCloseCreateSite}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleCreateSite} className="px-6 py-5">
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm text-foreground/80 mb-1">Site ID*</label>
                <input
                  type="text"
                  value={formData.siteID}
                  onChange={handleChange}
                  name="siteID"
                  placeholder="Site ID"
                  className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                />
                {simpleValidator.current.message("siteID", formData.siteID, "required")}
              </div>
              <div>
                <label className="block font-body text-sm text-foreground/80 mb-1">Site Name (optional)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Site Name"
                  className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                />
                {simpleValidator.current.message("name", formData.name, "required")}
              </div>
              <div>
                <label className="block font-body text-sm text-foreground/80 mb-1">Site PI (optional)</label>
                <input
                  type="text"
                  value={formData.sitePI}
                  onChange={handleChange}
                  name="sitePI"
                  placeholder="Site PI"
                  className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                />
                {simpleValidator.current.message("sitePI", formData.sitePI, "required")}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 px-1 pb-1">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 font-body text-sm"
                onClick={handleCloseCreateSite}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-background hover:bg-primary/90 font-body text-sm"
              >
                Create New Site
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SiteForm;