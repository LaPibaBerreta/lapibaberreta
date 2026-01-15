import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import useFilterByProject from "../hooks/useFilterByProject";
import useLanguage from "../hooks/useLanguage";

import { X } from "lucide-react";
import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";
import { ChevronsDown, ChevronsUp } from "lucide-react";

export default function ProjectSelectMenu() {
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const { selectedProject, setSelectedProject } = useFilterByProject();
  const { language } = useLanguage();
  const mobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (projectsLoading) return <div>...</div>;
  if (projectsError) return <div>{projectsError?.message}</div>;

  return (
    <>
      {mobile ? (
        <>
          <div className="pointer-events-none fixed top-5 left-5 z-100 flex flex-col gap-2 font-mono text-xs font-thin sm:flex-row">
            {projectsData && (
              <div className="pointer-events-auto flex items-center gap-2 text-2xl">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.985 }}
                  className={`${isExpanded ? "bg-white/40" : "bg-white"} flex min-w-12 cursor-pointer items-center gap-1 rounded-4xl border px-2 transition-colors hover:bg-black hover:text-white`}
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? (
                    language === "es" ? (
                      "proyectos"
                    ) : (
                      "projects"
                    )
                  ) : selectedProject ? (
                    projectsData.find(
                      (project) => project._id === selectedProject,
                    ).title?.[language] ||
                    projectsData.find(
                      (project) => project._id === selectedProject,
                    ).title?.es
                  ) : (
                    <div>
                      {projectsData?.[0].title[language] ||
                        projectsData?.[0].title?.es}
                    </div>
                  )}
                  {!isExpanded ? (
                    <ChevronsDown size={24} />
                  ) : (
                    <ChevronsUp size={24} />
                  )}
                </motion.button>

                {selectedProject && (
                  <div className="pointer-events-auto flex items-center gap-1 text-2xl">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer rounded-4xl border bg-white/40 transition-colors`}
                      onClick={() => {
                        setSelectedProject(null);
                        setIsExpanded(false);
                      }}
                    >
                      <X strokeWidth={1.5} size={32} />
                    </motion.button>
                  </div>
                )}
              </div>
            )}
            {projectsData &&
              isExpanded &&
              projectsData.map((project) => (
                <div
                  key={project._id}
                  className="pointer-events-auto flex items-center gap-1 text-2xl"
                >
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.985 }}
                    className={`min-w-12 cursor-pointer rounded-4xl border px-2 transition-colors hover:bg-black hover:text-white ${selectedProject === project._id ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => {
                      setSelectedProject(project._id);
                      setIsExpanded(false);
                    }}
                  >
                    {project.title?.es &&
                      (project.title[language] || project.title?.es)}
                  </motion.button>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="pointer-events-none fixed top-5 left-5 z-100 flex flex-col gap-2 font-mono text-xs font-thin sm:flex-row">
          {projectsData &&
            projectsData.map((project) => (
              <div
                key={project._id}
                className="pointer-events-auto flex items-center gap-1 text-2xl"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.985 }}
                  className={`min-w-12 cursor-pointer rounded-4xl border px-2 transition-colors hover:bg-black hover:text-white ${selectedProject === project._id ? "bg-black text-white" : "bg-white"}`}
                  onClick={() => {
                    setSelectedProject(project._id);
                  }}
                >
                  {project.title?.es &&
                    (project.title[language] || project.title?.es)}
                </motion.button>
              </div>
            ))}
          {selectedProject && (
            <div className="pointer-events-auto flex items-center gap-1 text-2xl">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`_min-w-12 _hover:bg-black _hover:text-white cursor-pointer rounded-4xl border bg-white/40 transition-colors`}
                onClick={() => {
                  setSelectedProject(null);
                }}
              >
                <X strokeWidth={1.5} size={32} />
              </motion.button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
