import { useInitialData } from "../hooks/useInitialData";
import { usePublications } from "../hooks/usePublications";
import { useVideos } from "../hooks/useVideos";
import { useWorkshops } from "../hooks/useWorkshops";
import { buildGraph } from "./buildGraph";
import { Graph } from "./Graph";
import type { GraphInputData } from "./types/Graph";
import { useSectionSlug } from "../hooks/useSectionSlug";
import { SECTION_IDS } from "../data/constants";
import type { VideosQueryResult } from "../lib/types";
import useFilterByProject from "../hooks/useFilterByProject";

export default function GraphSection() {
  const { data: initialData, isLoading, error } = useInitialData();
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
  const { selectedProject } = useFilterByProject();

  if (
    isLoading ||
    pubLoading ||
    vidLoading ||
    wsLoading ||
    isSectionSlugLoading ||
    !sectionSlug
  )
    return <div>...</div>;
  if (error || pubError || vidError || wsError || sectionSlugError)
    return (
      <div>
        {error?.message ||
          pubError?.message ||
          wsError?.message ||
          sectionSlugError?.message}
      </div>
    );

  const filteredPublications =
    publications?.filter((publication) => {
      return selectedProject
        ? publication.project?._id === selectedProject
        : true;
    }) ?? [];

  const filteredVideos =
    videos?.filter((video: VideosQueryResult[number]) => {
      return selectedProject ? video.project?._id === selectedProject : true;
    }) ?? [];

  const filteredWorkshops =
    workshops?.filter((workshop) => {
      return selectedProject ? workshop.project?._id === selectedProject : true;
    }) ?? [];

  const filteredSections =
    initialData?.sections?.filter((section) => {
      switch (section.reference?._id) {
        case SECTION_IDS.PUBLICATIONS:
          return filteredPublications.length > 0;

        case SECTION_IDS.VIDEOS:
          return filteredVideos.length > 0;

        case SECTION_IDS.WORKSHOPS:
          return filteredWorkshops.length > 0;
        default:
          return true;
      }
    }) ?? [];

  const graphInputData: GraphInputData = {
    publications: filteredPublications,
    videos: filteredVideos,
    workshops: filteredWorkshops,
    sections: filteredSections,
  };

  const { nodes, links } = buildGraph(graphInputData);

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Graph key={selectedProject ?? "all"} nodes={nodes} links={links} />
    </section>
  );
}
