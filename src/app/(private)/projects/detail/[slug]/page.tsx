"use client"
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import React, { useState } from "react";

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
    setSiteId("");
    setSiteName("");
    setSitePi("");
  };

  const handleCreateSite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!siteId.trim()) {
      return;
    }
    // Replace with actual create-site action/integration
    // eslint-disable-next-line no-console
    console.log({ siteId, siteName, sitePi });
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
  const projects = useAppSelector((state) => state.product.products);
  const selectedId = params.slug;
  const { projectdetails  } = useAppSelector((state) => state.product)
  console.log("projectdetails",projectdetails)


  return (
    <>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-2">Example Project Name</h2>
          <div className="flex flex-wrap gap-4 items-center mb-6">

            <span className="font-body text-base text-foreground/80">
              Project ID: <span className="text-foreground font-semibold"></span>
            </span>
            <span className="px-4 py-1 rounded-md bg-primary text-background font-body text-sm">
              Regulated Project
            </span>
            <span className="font-body text-base text-foreground/80">
              Created Date: <span className="text-foreground font-semibold">2024-06-01</span>
            </span>
            <button className="ml-auto px-4 py-2 rounded-md bg-secondary text-background hover:bg-secondary/90 font-body text-base">
              Generate Report
            </button>
            <button className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 font-body text-base">
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-background border border-foreground/10 rounded-lg p-4">
              <div className="mb-2 font-body text-base text-foreground/80">
                <span className="font-semibold">Visit ID(s):</span> VST-101, VST-102
              </div>
              <div className="mb-2 font-body text-base text-foreground/80">
                <span className="font-semibold">Exam(s):</span> Exam A, Exam B
              </div>
              <div className="mb-2 font-body text-base text-foreground/80">
                <span className="font-semibold">Analysis(-es):</span> Analysis 1, Analysis 2
              </div>
            </div>
            <div className="bg-background border border-foreground/10 rounded-lg p-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded bg-primary text-background font-body text-sm">
                Group(s): Group 1, Group 2
              </span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">
                Anatomy: Heart, Brain
              </span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">
                Index Location(s): Location 1, Location 2
              </span>
              <span className="px-3 py-1 rounded bg-background border border-primary text-primary font-body text-sm">
                Object Type(s): Type A, Type B
              </span>
            </div>
          </div>
          {/* Site(s) Table */}
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
                  </tr>
                </thead>
                <tbody>
                  <tr
                    key="V 01"
                    className={`border-t border-foreground/10 cursor-pointer transition-colors ${selectedSite === "V 01" ? "bg-primary/10" : "hover:bg-primary/5"}`}
                    onClick={() => setSelectedSite("V 01")}
                  >
                    <td className="px-4 py-2">V 01</td>
                    <td className="px-4 py-2">VSite</td>
                    <td className="px-4 py-2">8</td>
                    <td className="px-4 py-2">MD</td>
                    <td className="px-4 py-2">23/Jun/2025</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-3 py-1 rounded font-semibold text-xs bg-primary/10 text-primary">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Subject Table for Selected Site */}
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-foreground/10">
                        <td className="px-4 py-2">36-31</td>
                        <td className="px-4 py-2">Investigational</td>
                        <td className="px-4 py-2">L4-L5</td>
                        <td className="px-4 py-2">2</td>
                        <td className="px-4 py-2">21/Aug/2025</td>
                        <td className="px-4 py-2">21/Aug/2025</td>
                        <td className="px-4 py-2">
                          <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-xs">Active</span>
                        </td>
                      </tr>
                      <tr className="border-t border-foreground/10">
                        <td className="px-4 py-2">36-31-2</td>
                        <td className="px-4 py-2">Investigational</td>
                        <td className="px-4 py-2">L4-L5</td>
                        <td className="px-4 py-2">2</td>
                        <td className="px-4 py-2">21/Aug/2025</td>
                        <td className="px-4 py-2">21/Aug/2025</td>
                        <td className="px-4 py-2">
                          <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-xs">Active</span>
                        </td>
                      </tr>
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
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Create New Site Modal */}
      {isCreateSiteOpen && (
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
      )}

      {/* Create New Subject Modal */}
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
    </>
  );
};

export default ProjectDetailPage;
