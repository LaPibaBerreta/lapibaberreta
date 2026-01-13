import type {
  InitialDataQueryResult,
  PublicationsQueryResult,
  VideosQueryResult,
  WorkshopsQueryResult,
} from "../../lib/types";

type NonNullableInitialData = NonNullable<InitialDataQueryResult>;

export interface GraphInputData {
  sections: NonNullableInitialData["sections"];
  publications: PublicationsQueryResult;
  videos: VideosQueryResult;
  workshops: WorkshopsQueryResult;
}

export type GraphCategory = {
  _id: string;
  name?: {
    es?: string;
    en?: string;
  } | null;
};

export type NodeStyle = {
  icon?: string;
  color?: string;
  size?: number;
};

export type NodeType =
  | "home"
  | "publication"
  | "video"
  | "workshop"
  | "section"
  | "category"
  | "externalLink"
  | "oracle"
  | "videoCategory"
  | "publicationCategory";

export type GraphNode = {
  id: string;
  label: string;
  route: string | null;
  externalLink?: boolean;
  nodeType: NodeType;
  reference?: string;
  additionalDocument?: string;
  videos?: string[];
  imageUrl?: string;
  referenceType?: string;
  category?: GraphCategory;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

/** Node type compatible with D3 force simulation */
export interface SimNode extends GraphNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  imageUrl?: string;
}

export type SimLink = {
  source: string | SimNode;
  target: string | SimNode;
};
