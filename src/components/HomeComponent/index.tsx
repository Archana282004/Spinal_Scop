"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData } from "@/store/actions/tableAction"; // adjust path as needed
import type { RootState } from "@/app/store";

type StatusType = "Active" | "Inactive" | "Archived" | "Deleted";

const StatusBadge = ({ status }: { status: StatusType }) => {
  let colorClasses = "";
  switch (status) {
    case "Active":
      colorClasses = "bg-emerald-500/15 text-emerald-400 border-emerald-400/30";
      break;
    case "Inactive":
      colorClasses = "bg-zinc-500/15 text-zinc-300 border-zinc-300/30";
      break;
    case "Archived":
      colorClasses = "bg-amber-500/15 text-amber-400 border-amber-400/30";
      break;
    case "Deleted":
      colorClasses = "bg-rose-500/15 text-rose-400 border-rose-400/30";
      break;
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${colorClasses}`}>{status}</span>
  );
};

const Dropdown = ({
  trigger,
  items,
}: {
  trigger: React.ReactNode;
  items: { type: "link" | "button"; href?: string; label: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer select-none">{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
          {items.map((item, idx) =>
            item.type === "link" ? (
              <a key={idx} href={item.href} className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ) : (
              <button key={idx} type="button" className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default function HomeComponent() {
  const pageSizeOptions = [10];
  const [pageSize, setPageSize] = useState<number>(10);

  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table.data);
  const loading = useSelector((state: RootState) => state.table.loading);
  const error = useSelector((state: RootState) => state.table.error);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  return (
    <section className="bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl text-foreground">Project(s)</h1>
            <p className="mt-1 text-sm text-foreground/80">Overview of all projects in your workspace</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="h-9 rounded-md border border-foreground/20 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" >
              <option value="">Show All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
              <option value="deleted">Deleted</option>
            </select>
            <Link href={""} className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm text-background hover:bg-primary/90">
              Create New Project
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-foreground/10 bg-background shadow-sm">

          <div className="flex items-center justify-between gap-3 border-b border-foreground/10 p-4">
            <div className="relative flex-1 max-w-md">
              <input type="text" placeholder="Search here" className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : (
              <>
                {error ? (
                  <p className="p-4 text-red-500">Error: {error}</p>
                ) : tableData.length === 0 ? (
                  <p className="p-4 text-foreground/60">No projects found.</p>
                ) : (
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-foreground/10 text-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Project ID</th>
                        <th className="px-4 py-3 font-medium">Project Name</th>
                        <th className="px-4 py-3 font-medium">Anatomy</th>
                        <th className="px-4 py-3 font-medium">Site(s)</th>
                        <th className="px-4 py-3 font-medium">Subject(s)</th>
                        <th className="px-4 py-3 font-medium">Created Date</th>
                        <th className="px-4 py-3 font-medium">Last Updated</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((proj) => (
                        <tr key={proj.id} className="border-t border-foreground/10 hover:bg-foreground/5">
                          <td className="px-4 py-3">{proj.project_id || proj.id}</td>
                          <td className="px-4 py-3">{proj.project_name || proj.name}</td>
                          <td className="px-4 py-3">{proj.anatomy}</td>
                          <td className="px-4 py-3">{proj.sites}</td>
                          <td className="px-4 py-3">{proj.subjects}</td>
                          <td className="px-4 py-3">{proj.created_date}</td>
                          <td className="px-4 py-3">{proj.updated_date}</td>
                          <td className="px-4 py-3"><StatusBadge status={proj.status as StatusType} /></td>
                          <td className="px-4 py-3 text-right">
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
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-foreground/10 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/80">Rows per page</span>
              <select
                className="h-9 rounded-md border border-foreground/20 bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-foreground/80">
              1–{tableData.length} of {tableData.length}
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5">
                Previous
              </button>
              <span className="text-sm">Page 1 of 1</span>
              <button className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
