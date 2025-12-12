import type {
  InitialDataQueryResult,
  PublicationsQueryResult,
  VideosQueryResult,
} from "../../lib/types";

type NonNullableInitialData = NonNullable<InitialDataQueryResult>;

export interface GraphInputData {
  sections: NonNullableInitialData["sections"];
  publications: PublicationsQueryResult;
  videos: VideosQueryResult;
}

export type GraphNode = {
  id: string | null;
  label: string;
  route: string | null;
  externalLink?: boolean;
  nodeType: string;
  reference?: string;
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
}

export type SimLink = {
  source: string | SimNode;
  target: string | SimNode;
};
