const EmptyState  =({ onNewProject }: { onNewProject: () => void }) => {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">📋</div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">No projects found</h3>
      <p className="text-sm text-slate-400 mb-6">
        Try adjusting your filters or create a new project
      </p>
      <button
        onClick={onNewProject}
        className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition"
      >
        Create Project
      </button>
    </div>
  );
}
export default EmptyState;