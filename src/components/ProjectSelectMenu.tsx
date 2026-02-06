import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import useFilterByProject from "../hooks/useFilterByProject";
import useLanguage from "../hooks/useLanguage";
import Button from "./ui/Button";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

export default function ProjectSelectMenu() {
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const { selectedProject, setSelectedProject } = useFilterByProject();
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (projectsLoading) return <div>...</div>;
  if (projectsError) return <div>{projectsError?.message}</div>;

  const selected = selectedProject
    ? projectsData?.find((p) => p._id === selectedProject)
    : undefined;

  const backgroundStyle =
    selectedProject && selected
      ? `#${selected.color}`
      : `linear-gradient(
        90deg,
        ${projectsData
          ?.filter((p) => p.color)
          .map((p) => `#${p.color}`)
          .join(", ")}
      )`;

  return (
    <div className="relative flex flex-col gap-1 font-mono">
      <div className="pointer-events-auto mb-2 flex items-center gap-1 self-start lg:mt-3 2xl:text-xl">
        <Button
          motion="pop"
          onClick={() => setIsExpanded((v) => !v)}
          className="flex items-center gap-1 rounded-2xl border bg-white/90 px-3 shadow-md backdrop-blur-md"
          style={{ background: backgroundStyle }}
        >
          {selected
            ? selected.title?.[language] || selected.title?.es
            : language == "es"
              ? "Proyectos"
              : "Projects"}

          {isExpanded ? <ChevronsUp size={18} /> : <ChevronsDown size={18} />}
        </Button>

        {selectedProject && (
          <div className="pointer-events-auto flex items-center gap-1">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-4xl bg-black text-white transition-colors`}
              onClick={() => {
                setSelectedProject(null);
                setIsExpanded(false);
              }}
            >
              <X strokeWidth={1.5} size={24} />
            </motion.button>
          </div>
        )}
      </div>

      {projectsData && isExpanded && (
        <div className="absolute top-12 flex min-w-70 flex-col gap-1">
          {projectsData.map((project) => (
            <div
              key={project._id}
              className="pointer-events-auto flex items-center gap-1"
            >
              <Button
                onClick={() => {
                  setSelectedProject(project._id);
                  setIsExpanded(false);
                }}
                motion="pop"
                className="_backdrop-blur-md flex items-center gap-1 rounded-2xl border bg-white/50 px-3 shadow-md 2xl:text-xl"
                style={{ background: "#" + project.color }}
              >
                {project.title?.es &&
                  (project.title[language] || project.title?.es)}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
