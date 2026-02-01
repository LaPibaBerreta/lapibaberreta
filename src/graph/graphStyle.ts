import type { NodeType, NodeStyle, SectionType } from "./types/Graph";

const imageSize = 80;

type NodeStyleKey = NodeType | SectionType | "default";

const nodeStyles: Partial<Record<NodeStyleKey, NodeStyle>> = {
  home: { icon: "/icons/home.svg", color: "#fb3640", size: 2 },
  publication: {
    icon: "/icons/publication.svg",
    color: "#FD5200",
    size: 1.2,
  },
  video: { icon: "/icons/video.svg", color: "#391463", size: 1 },
  workshop: { icon: "/icons/workshop.svg", color: "#adbfff", size: 1 },
  section: { icon: "/icons/section.svg", color: "#5fad41", size: 1.2 },
  videoCategory: {
    icon: "/icons/category.svg",
    color: "#5fad41",
    size: 0.5,
  },
  publicationCategory: {
    icon: "/icons/category.svg",
    color: "#000",
    size: 0.5,
  },
  externalLink: {
    icon: "/icons/external-link.svg",
    color: "#37BDE9aa",
    size: 1,
  },
  default: { icon: "/icons/default.svg", size: 1 },

  photos: { icon: "/icons/photos.svg", size: 1 },
  videos: { icon: "/icons/videos.svg", size: 1 },
  blog: { icon: "/icons/blog.svg", size: 1 },
  shows: { icon: "/icons/shows.svg", size: 1 },
  info: { icon: "/icons/info.svg", size: 1 },
  workshops: { icon: "/icons/workshops.svg", size: 1 },
  board: { icon: "/icons/board.svg", size: 1 },
  oracle: { icon: "/icons/oracle.svg", color: "#e086d3", size: 1 },

  // active: { icon: "/icons/home.svg", color: "#fb3640", size: 26 },
  // hover: { color: "#bce784", size: 14 },
};

const distance = 80;

const line = {
  // color: "#ff1e12",
  color: "#000",
  opacity: 1,
  width: 0.75,
  // width: 1,
};

export { imageSize, nodeStyles, distance, line };
