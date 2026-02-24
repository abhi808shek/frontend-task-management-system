import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { KANBAN_COLS, PRIORITIES, TASK_TYPES, PROJECTS } from "../constant";
import type { Task, KanbanStatus, FiltersProps } from "../types";
import StatsBar from "../components/StatsBar";
import KanbanCol from "../components/KanbanCol";
import EditTaskModal from "../components/EditTaskModal";
import AddTaskModal from "../components/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import TaskDetailModal from "../components/TaskDetailModal";
import TaskServices from "../apis"; // Update this path to where your TaskServices is located

function Filters({
  search, filterPriority, filterType, filterProject,
  totalCount, filteredCount,
  onSearch, onPriority, onType, onProject, onClear,
}: FiltersProps) {
  const hasFilter = !!(search || filterPriority || filterType || filterProject);

  const dropdowns: [string, (v: string) => void, string[], string][] = [
    [filterPriority, onPriority, PRIORITIES,  "All Priorities"],
    [filterType,     onType,     TASK_TYPES,  "All Types"     ],
    [filterProject,  onProject,  PROJECTS,    "All Projects"  ],
  ];

  return (
    <div className="mb-5">
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search tasks, assignees..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm transition"
          />
        </div>

        {dropdowns.map(([val, fn, opts, placeholder]) => (
          <select
            key={placeholder}
            value={val}
            onChange={(e) => fn(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm text-slate-700 transition"
          >
            <option value="">{placeholder}</option>
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}

        {hasFilter && (
          <button
            onClick={onClear}
            className="px-3 py-2 text-xs font-bold text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded-xl transition whitespace-nowrap"
          >
            Clear ×
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 font-medium">
        Showing{" "}
        <span className="font-black text-slate-600">{filteredCount}</span>
        {" "}of {totalCount} tasks
      </p>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search,         setSearch]        = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterType,     setFilterType]    = useState("");
  const [filterProject,  setFilterProject] = useState("");

  // Modal state
  const [addOpen,    setAddOpen]    = useState(false);
  const [addStatus,  setAddStatus]  = useState<KanbanStatus>("To Do");
  const [viewTask,   setViewTask]   = useState<Task | null>(null);
  const [editTask,   setEditTask]   = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  // 1. Fetch Tasks on Mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await TaskServices.listTasksApi(); // Or getMyTasksApi() depending on your view
      setTasks(data);
    } catch (error: any) {
      toast.error("Failed to load tasks.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. CREATE Task
  const handleAdd = async (taskPayload: any) => {
    try {
      const newTask = await TaskServices.createTaskApi(taskPayload);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to create task");
      throw error; // Let the modal catch this to stop the loading spinner
    }
  };

  // 3. UPDATE Task
  const handleSave = async (updatedTaskPayload: any) => {
    try {
      const updatedTask = await TaskServices.updateTaskApi(updatedTaskPayload.id, updatedTaskPayload);
      setTasks((prev) => prev.map((t) => t.id === updatedTask.id ? updatedTask : t));
      toast.success("Task updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to update task");
      throw error;
    }
  };

  // 4. DELETE Task
  const handleDelete = async () => {
    if (!deleteTask) return;
    try {
      await TaskServices.deleteTaskApi(deleteTask.id);
      setTasks((prev) => prev.filter((t) => t.id !== deleteTask.id));
      toast.success("Task deleted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to delete task");
    } finally {
      setDeleteTask(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tasks.filter((t) =>
      (!q || t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q) || t.assignedTo?.toLowerCase().includes(q)) &&
      (!filterPriority || t.priority === filterPriority) &&
      (!filterType     || t.type     === filterType)     &&
      (!filterProject  || t.project  === filterProject)
    );
  }, [tasks, search, filterPriority, filterType, filterProject]);

  const col = (s: KanbanStatus) => filtered.filter((t) => t.status === s);
  const openAdd = (s: KanbanStatus = "To Do") => { setAddStatus(s); setAddOpen(true); };
  const clearFilters = () => { setSearch(""); setFilterPriority(""); setFilterType(""); setFilterProject(""); };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg,#fafaf9 0%,#fff7ed 50%,#fef9f0 100%)",
        fontFamily: "'Syne','Segoe UI',sans-serif",
      }}
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <StatsBar tasks={tasks} />

        <Filters
          search={search}
          filterPriority={filterPriority}
          filterType={filterType}
          filterProject={filterProject}
          totalCount={tasks.length}
          filteredCount={filtered.length}
          onSearch={setSearch}
          onPriority={setFilterPriority}
          onType={setFilterType}
          onProject={setFilterProject}
          onClear={clearFilters}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {KANBAN_COLS.map((s) => (
              <KanbanCol
                key={s}
                status={s}
                tasks={col(s)}
                onView={setViewTask}
                onEdit={setEditTask}
                onDelete={setDeleteTask}
                onAddTask={openAdd}
              />
            ))}
          </div>
        )}
      </main>

      <AddTaskModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        defaultStatus={addStatus}
        onAdd={handleAdd}
      />
      <EditTaskModal
        task={editTask}
        onClose={() => setEditTask(null)}
        onSave={handleSave}
      />
      <DeleteTaskModal
        task={deleteTask}
        onClose={() => setDeleteTask(null)}
        onConfirm={handleDelete}
      />
      <TaskDetailModal
        task={viewTask}
        onClose={() => setViewTask(null)}
        onEdit={(t) => { setViewTask(null); setEditTask(t); }}
        onDelete={(t) => { setViewTask(null); setDeleteTask(t); }}
      />
    </div>
  );
}

export default TaskPage;