
interface SiteFormProps {
  isCreateSiteOpen: boolean;
  handleCloseCreateSite: () => void;
  handleCreateSite: (e: React.FormEvent<HTMLFormElement>) => void;
  siteId: string;
  setSiteId: React.Dispatch<React.SetStateAction<string>>;
  siteName: string;
  setSiteName: React.Dispatch<React.SetStateAction<string>>;
  sitePi: string;
  setSitePi: React.Dispatch<React.SetStateAction<string>>;
}

interface SiteForm {
  name: string,
  siteID: string,
  sitePI: number | null,
  level: string,
  operation: string
}

const SiteForm: React.FC<SiteFormProps> = ({
  isCreateSiteOpen,
  handleCloseCreateSite,
  handleCreateSite,
  siteId,
  setSiteId,
  siteName,
  setSiteName,
  sitePi,
  setSitePi
}) => {
  if (!isCreateSiteOpen) return null; 
  
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
                  value={siteId}
                  onChange={(e) => setSiteId(e.target.value)}
                  name="siteID"
                  placeholder="Site ID"
                  className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-body text-sm text-foreground/80 mb-1">Site Name (optional)</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  name="siteName"
                  placeholder="Site Name"
                  className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-foreground/80 mb-1">Site PI (optional)</label>
                <input
                  type="text"
                  value={sitePi}
                  onChange={(e) => setSitePi(e.target.value)}
                  name="sitePI"
                  placeholder="Site PI"
                  className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                />
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