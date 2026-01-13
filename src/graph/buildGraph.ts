import type {
  GraphInputData,
  GraphData,
  GraphNode,
  GraphLink,
} from "./types/Graph";
import { urlFor } from "../lib/sanityImageUrl";
import { SECTION_IDS } from "../data/constants";

export function buildGraph(
  data: GraphInputData,
  language: "es" | "en",
): GraphData {
  if (!data || !data.sections) {
    return { nodes: [], links: [] };
  }

  const videoCategories = Array.from(
    new Map(
      data.videos
        .filter((v) => v.category?._id)
        .map((v) => [v.category!._id, v.category!]),
    ).values(),
  );

  const publicationCategories = Array.from(
    new Map(
      data.publications
        .filter((v) => v.category?._id)
        .map((v) => [v.category!._id, v.category!]),
    ).values(),
  );

  // NODES --------------------------------------------------------
  const uniqueIds = new Set<string>();

  const nodes: GraphNode[] = data.sections.reduce(
    (acc: GraphNode[], section) => {
      const id = section.reference?._id ?? section.url ?? undefined;

      if (!id) return acc;
      if (section.isHidden) return acc;

      const newNode: GraphNode = {
        id,
        label: section.title?.[language] || section.title?.es || "???",
        route: section.reference?.slug || section.url,
        nodeType: "section",
        referenceType: section.reference?._type,
        externalLink: Boolean(section.url),
        imageUrl: section.icon
          ? urlFor(section.icon).format("webp").width(600).url() + "&fit=max"
          : undefined,
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
    label: "",
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
        label: publication.title?.[language] || publication.title?.es || "???",
        route: publication.slug?.current,
        reference: publication.category?._id,
        nodeType: "publication",
        additionalDocument: publication.additionalDocument?._ref,
        videos: publication.videos?.map((v) => v._ref) ?? [],
        imageUrl: publication.mainImage
          ? urlFor(publication.mainImage).format("webp").width(600).url() +
            "&fit=max"
          : undefined,
      });
      uniqueIds.add(publication._id);
    }
  });

  data.videos.forEach((video) => {
    if (video._id && video.slug?.current && !uniqueIds.has(video._id)) {
      nodes.push({
        id: video._id,
        label: video.title?.[language] || video.title?.es || "???",
        route: video.slug?.current,
        nodeType: "video",
        category: video.category || undefined,
        imageUrl: video.image
          ? urlFor(video.image).format("webp").width(600).url() + "&fit=max"
          : undefined,
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
        label: workshop.title?.[language] || workshop.title?.es || "???",
        route: workshop.slug?.current,
        nodeType: "workshop",
        imageUrl: workshop.image
          ? urlFor(workshop.image).format("webp").width(600).url() + "&fit=max"
          : undefined,
      });
    }
  });

  videoCategories.forEach((category) => {
    if (category._id && !uniqueIds.has(category._id)) {
      nodes.push({
        id: category._id,
        label: category.name?.[language] || category.name?.es || "???",
        route: category._id,
        nodeType: "videoCategory",
      });
    }
  });

  publicationCategories.forEach((category) => {
    if (category._id && !uniqueIds.has(category._id)) {
      nodes.push({
        id: category._id,
        label: category.name?.[language] || category.name?.es || "???",
        route: category._id,
        nodeType: "publicationCategory",
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

    if (videoCategories.some((c) => c._id === id)) {
      links.push({
        source: id,
        target: SECTION_IDS.VIDEOS,
      });
    }

    if (publicationCategories.some((c) => c._id === id)) {
      links.push({
        source: id,
        target: SECTION_IDS.PUBLICATIONS,
      });
    }

    if (!reference && node.nodeType === "section") {
      links.push({ source: id, target: "hogar" });
    } else if (node.nodeType === "video") {
      if (node.category && node.category._id) {
        links.push({
          source: id,
          target: node.category?._id,
        });
      }
    } else if (!reference && node.nodeType === "workshop") {
      links.push({
        source: id,
        target: SECTION_IDS.WORKSHOPS,
      });
    }
  });

  return { nodes, links };
}
