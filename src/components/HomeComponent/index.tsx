"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { productlist } from "@/store/actions/productAction";

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
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${colorClasses}`}>
      {status}
    </span>
  );
};

// Deprecated inline ActionMenu kept out to avoid inflating table height

export default function HomeComponent() {
  const dispatch = useAppDispatch();
  const defaultPagination = {
    status:"active",
    level:"Project",
    operation:"view"
  }
  const [pagination, setPagination] = useState(defaultPagination)
  useEffect(() => {
   dispatch(productlist(pagination));
  }, [])

  const products = useAppSelector((state) => state.product.products);
  console.log("Products  :", products);
  const pageSizeOptions = [10];
  const [pageSize, setPageSize] = useState<number>(10);
  // Static dataset view; pagination controls are non-interactive in this view

   const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const mapStatus = (status: string): StatusType => {
  switch (status.toLowerCase()) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "archived":
      return "Archived";
    case "deleted":
      return "Deleted";
    default:
      return "Inactive";
  }
};
  return (
    <section className="bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl text-foreground">
              Project(s)
            </h1>
            <p className="mt-1 text-sm text-foreground/80">
              Overview of all projects in your workspace
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select className="h-9 rounded-md border border-foreground/20 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Show All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
              <option value="deleted">Deleted</option>
            </select>
            <Link href={"/projects/create-project"} className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm text-background hover:bg-primary/90">
              Create New Project
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-foreground/10 bg-background shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-foreground/10 p-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search here"
                className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-sm text-foreground/50">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  products.slice(0, pageSize).map((product) => (
                    <tr key={product.id} className="border-t border-foreground/10 hover:bg-foreground/5">
                      <td className="px-4 py-3">{product.project_id}</td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.anatomy.map((a) => a.anatomy.name).join(", ")}</td>
                      <td className="px-4 py-3">{product.totalProjectSites}</td>
                      <td className="px-4 py-3">{product.totalProjectSubjects}</td>
                      <td className="px-4 py-3">{formatDate(product.created_at)}</td>
                      <td className="px-4 py-3">{formatDate(product.updated_at)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={mapStatus(product.active_status)} />
                      </td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-foreground/10 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/80">Rows per page</span>
              <select
                className="h-9 rounded-md border border-foreground/20 bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={pageSize}
                onChange={(e) => {
                  const size = Number(e.target.value);
                  setPageSize(size);
                }}
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-foreground/80">1–10 of 10</div>

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
