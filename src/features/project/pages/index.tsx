import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify"; // NEW: Import toast
import type { Project, FormData } from "../types";
import StatsBar from "../components/StatsBar";
import ProjectFilters from "../components/ProjectFilters";
import EmptyState from "../../../components/common/EmptyState";
import ProjectCard from "../components/ProjectCard";
import { AddProjectModal, DeleteProjectModal, EditProjectModal } from "../modals";
import ProjectServices from "../apis";

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  
  const [addOpen, setAddOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);



  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await ProjectServices.getMyProjectsApi(); 
      setProjects(data);
    } catch (error: any) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to load projects. Please refresh the page."); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (formData: FormData) => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        start_date: formData.startDate,
        end_date: formData.dueDate,
        status: formData.status,
        priority: formData.priority,
        owner_id: formData.owner, 
        team_member_ids: formData.teamMembers, 
        organization_id: 1, 
      };

      const newProject = await ProjectServices.createProjectApi(payload);
      setProjects((prev) => [newProject, ...prev]);
      
      toast.success("Project created successfully!"); 
      
    } catch (error: any) {
      const msg = error.response?.data?.detail || "Failed to create project.";
      toast.error(msg); 
      throw error; 
    }
  };

  const handleSave = async (updatedData: Project) => {
    try {
      const payload = {
         name: updatedData.name,
         description: updatedData.description,
         status: updatedData.status,
         priority: updatedData.priority,
      };
      
      const updatedProject = await ProjectServices.updateProjectApi(updatedData.id, payload);
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
      
      toast.success("Project updated successfully!"); 
      
    } catch (error: any) {
      const msg = error.response?.data?.detail || "Failed to update project.";
      toast.error(msg); 
      throw error; 
    }
  };

  const handleDelete = async () => {
    if (!deleteProject) return;
    try {
      await ProjectServices.deleteProjectApi(deleteProject.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteProject.id));
      
      toast.success("Project deleted successfully!"); 
      
    } catch (error: any) {
      console.error("Failed to delete project:", error);
      const msg = error.response?.data?.detail || "Failed to delete project.";
      toast.error(msg); 
    } finally {
      setDeleteProject(null); 
    }
  };

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("");
    setFilterPriority("");
  };

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchSearch =
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !filterStatus || p.status === filterStatus;
        const matchPriority = !filterPriority || p.priority === filterPriority;
        return matchSearch && matchStatus && matchPriority;
      }),
    [projects, search, filterStatus, filterPriority]
  );

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <StatsBar projects={projects} />

        <ProjectFilters
          search={search}
          filterStatus={filterStatus}
          filterPriority={filterPriority}
          resultCount={filtered.length}
          onSearchChange={setSearch}
          onStatusChange={setFilterStatus}
          onPriorityChange={setFilterPriority}
          onClear={clearFilters}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState onNewProject={() => setAddOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onEdit={() => setEditProject(p)}
                onDelete={() => setDeleteProject(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddProjectModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditProjectModal
        project={editProject}
        onClose={() => setEditProject(null)}
        onSave={handleSave}
      />
      <DeleteProjectModal
        project={deleteProject}
        onClose={() => setDeleteProject(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ProjectPage;