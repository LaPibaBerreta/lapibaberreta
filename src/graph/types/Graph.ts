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

export type GraphNode = {
  id: string;
  label: string;
  route: string | null;
  externalLink?: boolean;
  nodeType: string;
  reference?: string;
  additionalDocument?: string;
  videos?: string[];
  image?: string;
  referenceType?: string;
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
