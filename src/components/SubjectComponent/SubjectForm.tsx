
interface SubjectFormProps {
  isCreateSubjectOpen: boolean;
  handleCloseCreateSubject: () => void;
  handleCreateSubject: (e: React.FormEvent<HTMLFormElement>) => void;
  subjectId: string;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
  subjectGroup: string;
  setSubjectGroup: React.Dispatch<React.SetStateAction<string>>;
  indexLocation: string;
  setIndexLocation: React.Dispatch<React.SetStateAction<string>>;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  isCreateSubjectOpen,
  handleCloseCreateSubject,
  handleCreateSubject,
  subjectId,
  setSubjectId,
  subjectGroup,
  setSubjectGroup,
  indexLocation,
  setIndexLocation,
}) => {
  if (!isCreateSubjectOpen) return null;
    return (
        <div>
            {isCreateSubjectOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-foreground/60" onClick={handleCloseCreateSubject} />
                    <div className="relative z-10 w-full max-w-3xl mx-4 rounded-xl border border-foreground/10 bg-background shadow-xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
                            <h4 className="font-heading text-xl text-primary">Create New Subject</h4>
                            <button
                                aria-label="Close"
                                className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-foreground/10 text-foreground"
                                onClick={handleCloseCreateSubject}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleCreateSubject} className="px-6 py-5">
                            {/* Site context header */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                                <div className="flex items-center gap-2">
                                    <span className="font-body text-sm text-foreground/80">Site Name:</span>
                                    <span className="px-2 py-1 rounded-md bg-background border border-foreground/20 font-body text-sm">VSite</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-body text-sm text-foreground/80">Site PI:</span>
                                    <span className="px-2 py-1 rounded-md bg-background border border-foreground/20 font-body text-sm">MD</span>
                                    <span className="ml-auto md:ml-2 px-2 py-1 rounded-md bg-background border border-foreground/20 font-body text-sm">V 01</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block font-body text-sm text-foreground/80 mb-1">Subject ID*</label>
                                    <input
                                        type="text"
                                        value={subjectId}
                                        onChange={(e) => setSubjectId(e.target.value)}
                                        placeholder="Subject ID"
                                        className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-body text-sm text-foreground/80 mb-1">Group(s)</label>
                                    <select
                                        value={subjectGroup}
                                        onChange={(e) => setSubjectGroup(e.target.value)}
                                        className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none appearance-none"
                                    >
                                        <option value="">Group(s)</option>
                                        <option value="Investigational">Investigational</option>
                                        <option value="Control">Control</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-body text-sm text-foreground/80 mb-1">Index Location(s)</label>
                                    <select
                                        value={indexLocation}
                                        onChange={(e) => setIndexLocation(e.target.value)}
                                        className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none appearance-none"
                                    >
                                        <option value="">Index Location(s)</option>
                                        <option value="L4-L5">L4-L5</option>
                                        <option value="L2-L3">L2-L3</option>
                                        <option value="L5-S1">L5-S1</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-6 px-1 pb-1">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 font-body text-sm"
                                    onClick={handleCloseCreateSubject}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-primary text-background hover:bg-primary/90 font-body text-sm"
                                >
                                    Create New Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SubjectForm;