import { useProjects } from "../hooks/useProjects";
import useFilterByProject from "../hooks/useFilterByProject";

export default function ProjectSelectMenu() {
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const { selectedProject, setSelectedProject } = useFilterByProject();

  if (projectsLoading) return <div>...</div>;
  if (projectsError) return <div>{projectsError?.message}</div>;

  return (
    <div className="pointer-events-none fixed top-5 left-5 z-100 flex flex-col gap-2 font-mono text-xs font-thin sm:flex-row">
      {projectsData &&
        projectsData.map((project) => (
          <div
            key={project._id}
            className="pointer-events-auto flex items-center gap-1 text-2xl"
          >
            <button
              className={`min-w-12 cursor-pointer rounded-4xl border px-2 transition-colors hover:bg-black hover:text-white ${selectedProject === project._id ? "bg-black text-white" : "bg-white"}`}
              onClick={() => {
                setSelectedProject(project._id);
              }}
            >
              {project.title?.es}
            </button>
          </div>
        ))}
      {selectedProject && (
        <div className="pointer-events-auto flex items-center gap-1 text-2xl">
          <button
            className={`min-w-12 cursor-pointer rounded-4xl border bg-white/40 transition-colors hover:bg-black hover:text-white`}
            onClick={() => {
              setSelectedProject(null);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
