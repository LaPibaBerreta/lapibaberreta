import { useInitialData } from "../hooks/useInitialData";
import { usePublications } from "../hooks/usePublications";
import { useVideos } from "../hooks/useVideos";
import { useWorkshops } from "../hooks/useWorkshops";
import { buildGraph } from "./buildGraph";
import { Graph } from "./Graph";
import type { GraphInputData } from "./types/Graph";
import { useSectionSlug } from "../hooks/useSectionSlug";

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

  const graphInputData: GraphInputData = {
    sections: sections?.sections ?? [],
    publications: publications ?? [],
    videos: videos ?? [],
    workshops: workshops ?? [],
  };
  const { nodes, links } = buildGraph(graphInputData);

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Graph nodes={nodes} links={links} />
    </section>
  );
}
