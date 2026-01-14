import type { NodeType, NodeStyle } from "./types/Graph";

const imageSize = 80;

const nodeStyles: Partial<Record<NodeType | "default", NodeStyle>> = {
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

  // active: { icon: "/icons/home.svg", color: "#fb3640", size: 26 },
  // hover: { color: "#bce784", size: 14 },
  // oracle: { color: "#e086d3", size: 0 },
};

const distance = 120;

const line = {
  color: "#000",
  opacity: 1,
  width: 0.5,
};

export { imageSize, nodeStyles, distance, line };
