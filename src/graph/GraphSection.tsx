import { useInitialData } from "../hooks/useInitialData";
import { usePublications } from "../hooks/usePublications";
import { useProjects } from "../hooks/useProjects";
import { useVideos } from "../hooks/useVideos";
import { useWorkshops } from "../hooks/useWorkshops";
import { buildGraph } from "./buildGraph";
import { Graph } from "./Graph";
import type { GraphInputData } from "./types/Graph";
import { useSectionSlug } from "../hooks/useSectionSlug";
import { useState } from "react";

export default function GraphSection() {
  const { data: sections, isLoading, error } = useInitialData();
  const {
    data: publications,
    isLoading: pubLoading,
    error: pubError,
  } = usePublications();
  const { data: videos, isLoading: vidLoading, error: vidError } = useVideos();
  const {
    data: workshops,
    isLoading: wsLoading,
    error: wsError,
  } = useWorkshops();
  const {
    data: sectionSlug,
    isLoading: isSectionSlugLoading,
    error: sectionSlugError,
  } = useSectionSlug();
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (
    isLoading ||
    pubLoading ||
    vidLoading ||
    wsLoading ||
    isSectionSlugLoading ||
    !sectionSlug ||
    projectsLoading
  )
    return <div>...</div>;
  if (
    error ||
    pubError ||
    vidError ||
    wsError ||
    sectionSlugError ||
    projectsError
  )
    return (
      <div>
        {error?.message ||
          pubError?.message ||
          wsError?.message ||
          sectionSlugError?.message ||
          projectsError?.message}
      </div>
    );

  const graphInputData: GraphInputData = {
    sections: sections?.sections ?? [],
    publications: publications ?? [],
    videos: videos ?? [],
    workshops: workshops ?? [],
  };
  const { nodes, links } = buildGraph(graphInputData);

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="pointer-events-none fixed top-1/2 left-5 z-100 font-mono text-xs font-thin">
        <div className="pointer-events-auto flex items-center gap-1">
          <button
            className={`size-3 border hover:bg-black ${!selectedProject ? "bg-black" : "bg-white"}`}
            onClick={() => {
              setSelectedProject(null);
            }}
          />
          <span>Todo</span>
        </div>
        {projectsData &&
          projectsData.map((project) => (
            <div
              key={project._id}
              className="pointer-events-auto flex items-center gap-1"
            >
              <button
                className={`size-3 border hover:bg-black ${selectedProject === project._id ? "bg-black" : "bg-white"}`}
                onClick={() => {
                  setSelectedProject(project._id);
                }}
              />
              <span>{project.title?.es}</span>
            </div>
          ))}
      </div>
      <Graph nodes={nodes} links={links} />
    </section>
  );
}
