import type {
  GraphInputData,
  GraphData,
  GraphNode,
  GraphLink,
} from "./types/Graph";

export function buildGraph(data: GraphInputData): GraphData {
  if (!data || !data.sections) {
    return { nodes: [], links: [] };
  }

  // NODES --------------------------------------------------------
  const uniqueIds = new Set<string>();

  const nodes: GraphNode[] = data.sections.reduce(
    (acc: GraphNode[], section) => {
      const newNode = {
        id: section.reference?._id || section.url,
        label: section.title?.es || "Untitled",
        route: section.reference?.slug || section.url,
        nodeType: "section",
        externalLink: section.url ? true : false,
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

  // LINKS --------------------------------------------------------
  const links: GraphLink[] = [];

  nodes.forEach((node) => {
    if (node.id && node.reference) {
      links.push({ source: node.id, target: node.reference });
    } else if (node.id && node.nodeType === "video") {
      links.push({
        source: node.id,
        target: "98ef0420-0b1d-43fe-954a-edc97e2e2a17",
      });
    } else if (node.id) {
      links.push({ source: node.id, target: "hogar" });
    }
  });


  return { nodes, links };
}
