import type {
  GraphInputData,
  GraphData,
  GraphNode,
  GraphLink,
} from "./types/Graph";
import { urlFor } from "../lib/sanityImageUrl";
import { SECTION_IDS } from "../data/constants";

export function buildGraph(data: GraphInputData): GraphData {
  if (!data || !data.sections) {
    return { nodes: [], links: [] };
  }

  // NODES --------------------------------------------------------
  const uniqueIds = new Set<string>();

  const nodes: GraphNode[] = data.sections.reduce(
    (acc: GraphNode[], section) => {
      const id = section.reference?._id ?? section.url ?? undefined;

      if (!id) return acc;

      const newNode = {
        id,
        label: section.title?.es || "Untitled",
        route: section.reference?.slug || section.url,
        nodeType: "section",
        externalLink: Boolean(section.url),
        imageUrl: section.icon
          ? urlFor(section.icon).format("webp").width(200).url() + "&fit=max"
          : null,
      };

      if (
        newNode.id &&
        !uniqueIds.has(newNode.id) &&
        section.reference?._type !== "publication"
      ) {
        uniqueIds.add(newNode.id);
        acc.push(newNode);
      }
      return acc;
    },
    [],
  );

  nodes.push({
    id: "hogar",
    label: "ヾ(≧▽≦*)o:",
    route: "/",
    externalLink: false,
    nodeType: "home",
  });

  data.publications.forEach((publication) => {
    if (
      publication._id &&
      publication.slug?.current &&
      !uniqueIds.has(publication._id)
    ) {
      nodes.push({
        id: publication._id,
        label: publication.title?.es || "Untitled",
        route: publication.slug?.current,
        reference: publication.section?._ref,
        nodeType: "publication",
        additionalDocument: publication.additionalDocument?._ref,

        videos: publication.videos?.map((v) => v._ref) ?? [],
      });
      uniqueIds.add(publication._id);
    }
  });

  data.videos.forEach((video) => {
    if (video._id && video.slug?.current && !uniqueIds.has(video._id)) {
      nodes.push({
        id: video._id,
        label: video.title?.es || "Untitled",
        route: video.slug?.current,
        nodeType: "video",
        // TODO:add references from video to projects in sanity
        // reference: publication.section?._ref,
      });
      uniqueIds.add(video._id);
    }
  });

  data.workshops.forEach((workshop) => {
    if (
      workshop._id &&
      workshop.slug?.current &&
      !uniqueIds.has(workshop._id)
    ) {
      nodes.push({
        id: workshop._id,
        //TODO: add multi-language support
        label: workshop.title?.es || "Untitled",
        route: workshop.slug?.current,
        nodeType: "workshop",
      });
    }
  });

  // LINKS --------------------------------------------------------
  const links: GraphLink[] = [];

  nodes.forEach((node) => {
    const { id, reference, additionalDocument, videos } = node;

    if (!id) return;

    if (reference) {
      links.push({ source: id, target: reference });
    }

    if (additionalDocument) {
      links.push({ source: id, target: additionalDocument });
    }

    if (videos?.length) {
      videos.forEach((videoId) => {
        if (videoId) {
          links.push({ source: id, target: videoId });
        }
      });
    }

    if (!reference && node.nodeType === "section") {
      links.push({ source: id, target: "hogar" });
    } else if (node.nodeType === "video") {
      links.push({
        source: id,
        target: SECTION_IDS.VIDEOS,
      });
    } else if (!reference && node.nodeType === "workshop") {
      links.push({
        source: id,
        target: SECTION_IDS.WORKSHOPS,
      });
    }
  });

  return { nodes, links };
}
