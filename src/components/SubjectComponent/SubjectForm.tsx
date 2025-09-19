import { addSubject } from "@/store/actions/projectAction";
import { useAppDispatch } from "@/store/hooks";
import { Sub } from "@/types/authType";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

interface SubjectFormProps {
    isCreateSubjectOpen: boolean;
    selectedSite: string | null;
    setIsCreateSubjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
    isCreateSubjectOpen,
    setIsCreateSubjectOpen,
    selectedSite,
}) => {
    const defaultForm = {
        subjectID: "",
        group_id: "",
        index_location_ids: "",
        level: "Project",
        operation: "create",
    };

    const [formData, setFormData] = useState<Sub>(defaultForm);
    const [error, setError] = useState<string>("");
    const dispatchh = useAppDispatch();
    const idd = useParams();
    const id = Number(idd.slug);
    const siteid = Number(selectedSite);
    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message: string) => <div style={{ color: "red" }}>{message}</div>,
        })
    );
    const [, forceUpdate] = useState({});

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCloseCreateSubject = () => {
        setIsCreateSubjectOpen(false);
    };
    const groupMapping: Record<string, number> = {
        Investigational: 1,
        Control: 2,
    };

    const indexMapping: Record<string, number> = {
        "L4-L5": 2,
        "L2-L3": 3,
        "L5-S1": 4,
    };

    const handleCreateSubject = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            try {
                const payload = {
                    subjectID: formData.subjectID,
                    group_id: groupMapping[formData.group_id] || null,
                    index_location_ids: formData.index_location_ids
                        ? [indexMapping[formData.index_location_ids]]
                        : [],
                    level: formData.level,
                    operation: formData.operation,
                };


                const res = await dispatchh(addSubject(id, siteid, payload));
            } catch (err: any) {
                setError(err);
            }
            handleCloseCreateSubject();
        } else {
            simpleValidator.current.showMessages();
            forceUpdate({});
        }
    };

    return (
        <div>
            {isCreateSubjectOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="absolute inset-0 bg-foreground/60"
                        onClick={handleCloseCreateSubject}
                    />
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
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-body text-sm text-foreground/80 mb-1">
                                        Subject ID*
                                    </label>
                                    <input
                                        type="text"
                                        name="subjectID"
                                        value={formData.subjectID}
                                        onChange={handleChange}
                                        placeholder="Subject ID"
                                        className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none"
                                    />
                                    {simpleValidator.current.message("subjectID", formData.subjectID, "required")}
                                </div>

                                <div>
                                    <label className="block font-body text-sm text-foreground/80 mb-1">
                                        Group(s)
                                    </label>
                                    <select
                                        name="group_id"
                                        value={formData.group_id}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none appearance-none"
                                    >
                                        <option value="">Select Group</option>
                                        <option value="Investigational">Investigational</option>
                                        <option value="Control">Control</option>
                                    </select>
                                    {simpleValidator.current.message("group_id", formData.group_id, "required")}
                                </div>

                                <div>
                                    <label className="block font-body text-sm text-foreground/80 mb-1">
                                        Index Location(s)
                                    </label>
                                    <select
                                        name="index_location_ids"
                                        value={formData.index_location_ids}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-background border border-foreground/20 focus:border-primary focus:ring-0 px-4 py-2 outline-none appearance-none"
                                    >
                                        <option value="">Select Index Location</option>
                                        <option value="L4-L5">L4-L5</option>
                                        <option value="L2-L3">L2-L3</option>
                                        <option value="L5-S1">L5-S1</option>
                                    </select>
                                    {simpleValidator.current.message("index_location_ids", formData.index_location_ids, "required")}
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
    );
};

export default SubjectForm;
