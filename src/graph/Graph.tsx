import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { GraphNode, GraphLink, SimLink, SimNode } from "./types/Graph";
import { useNavigate, useLocation } from "react-router";
import { useSectionSlug } from "../hooks/useSectionSlug";
import { SECTION_IDS } from "../data/constants";
import { nodeStyles, distance, line } from "./graphStyle";
import useIsMobile from "../hooks/useIsMobile";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
}

function getNodeIcon(d: SimNode): string | null {
  if (d.externalLink) return nodeStyles.externalLink?.icon ?? null;

  switch (d.id) {
    case SECTION_IDS.VIDEOS:
      return nodeStyles.videos?.icon ?? null;
    case SECTION_IDS.PHOTOS:
      return nodeStyles.photos?.icon ?? null;
    case SECTION_IDS.BLOG:
      return nodeStyles.blog?.icon ?? null;
    case SECTION_IDS.SHOWS:
      return nodeStyles.shows?.icon ?? null;
    case SECTION_IDS.INFO:
      return nodeStyles.info?.icon ?? null;
    case SECTION_IDS.WORKSHOPS:
      return nodeStyles.workshops?.icon ?? null;
    case SECTION_IDS.BOARD:
      return nodeStyles.board?.icon ?? null;
    case SECTION_IDS.ORACLE:
      return nodeStyles.oracle?.icon ?? null;
    case SECTION_IDS.CONTACT:
      return nodeStyles.contact?.icon ?? null;
  }

  return nodeStyles[d.nodeType]?.icon ?? nodeStyles.default?.icon ?? null;
}

export const Graph: React.FC<Props> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const { isMobile, isTablet } = useIsMobile();

  const isTouch = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  const [size, setSize] = useState({ width: 0, height: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const { data: sectionSlug } = useSectionSlug();

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.PUBLICATIONS,
  );

  const workshopsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.WORKSHOPS,
  );

  const videosSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.VIDEOS,
  );

  const path = location.pathname;
  const segments = path.split("/").filter(Boolean);
  const activeId = segments[segments.length - 1] ?? undefined;

  const nodeSelRef = useRef<d3.Selection<
    SVGGElement,
    SimNode,
    SVGGElement,
    unknown
  > | null>(null);

  const linkSelRef = useRef<d3.Selection<
    SVGLineElement,
    SimLink,
    SVGGElement,
    unknown
  > | null>(null);

  const labelSelRef = useRef<d3.Selection<
    SVGTextElement,
    SimNode,
    SVGGElement,
    unknown
  > | null>(null);

  // ------------------------------------
  // RESIZE OBSERVER (SIZE ONLY)
  // ------------------------------------
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ------------------------------------
  // INITIAL GRAPH SETUP (ONCE)
  // ------------------------------------
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    setSize({ width, height });

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    svg.call(
      d3.zoom<SVGSVGElement, unknown>().on("zoom", (e) => {
        g.attr("transform", e.transform);
      }),
    );

    const simNodes: SimNode[] = nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = links.map((l) => ({ ...l }));

    const connectedMap = new Map<string, Set<string>>();

    simLinks.forEach((l) => {
      const sourceId =
        typeof l.source === "string" ? l.source : (l.source as SimNode).id!;
      const targetId =
        typeof l.target === "string" ? l.target : (l.target as SimNode).id!;

      if (!connectedMap.has(sourceId)) connectedMap.set(sourceId, new Set());
      if (!connectedMap.has(targetId)) connectedMap.set(targetId, new Set());

      connectedMap.get(sourceId)?.add(targetId);
      connectedMap.get(targetId)?.add(sourceId);
    });

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id!)
          .distance(distance),
      )
      .force("charge", d3.forceManyBody().strength(-450))
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulationRef.current = simulation;

    //eslint-disable-next-line
    (simulation as any).__connectedMap = connectedMap;

    // -------- LINKS --------
    const link = g
      .selectAll<SVGLineElement, SimLink>("line")
      .data(simLinks)
      .enter()
      .append("line")
      .attr("stroke", line.color)
      .attr("stroke-opacity", line.opacity)
      .attr("stroke-width", line.width);

    linkSelRef.current = link;

    // -------- NODES --------
    const node = g
      .selectAll<SVGGElement, SimNode>("g.node")
      .data(simNodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on("click", (_, d) => {
        if (!d.externalLink && d.nodeType === "section") {
          navigate(`${d.route}`);
        } else if (!d.externalLink && d.nodeType === "home") {
          navigate("/");
        } else if (
          !d.externalLink &&
          d.nodeType === "publication" &&
          publicationsSlug?.slug?.current
        ) {
          navigate(`/${publicationsSlug.slug.current}/${d.route}`);
        } else if (
          !d.externalLink &&
          d.nodeType === "workshop" &&
          workshopsSlug?.slug?.current
        ) {
          navigate(`/${workshopsSlug.slug.current}/${d.route}`);
        } else if (
          !d.externalLink &&
          d.nodeType === "video" &&
          videosSlug?.slug?.current
        ) {
          navigate(`/${videosSlug.slug.current}/${d.route}`);
        } else if (d.externalLink) {
          window.open(d.id ?? "", "_blank", "noopener,noreferrer");
        }
      })
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x ?? 0;
            d.fy = d.y ?? 0;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    nodeSelRef.current = node;

    const nodeInner = node.append("g").attr("class", "node-inner");

    node
      .append("circle")
      .attr("class", "hit-area")
      .attr("r", 30)
      .attr("fill", "transparent")
      .attr("pointer-events", "all");

    nodeInner.selectAll("*").attr("pointer-events", "none");

    // -------- ICONS --------
    nodeInner
      .append("image")
      .attr("href", getNodeIcon)
      .attr("width", 32)
      .attr("height", 32)
      .attr("x", -16)
      .attr("y", -16)
      .attr(
        "transform",
        (d: SimNode) =>
          `scale(${nodeStyles[d.nodeType]?.size ?? nodeStyles.default?.size ?? 1})`,
      );

    // -------- LABELS --------
    const labels = g
      .selectAll<SVGTextElement, SimNode>("text")
      .data(simNodes)
      .enter()
      .append("text")
      .text((d) => d.label)
      .attr("font-family", "Syne-Regular")
      .attr("font-size", 12)
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none");

    labelSelRef.current = labels;

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as SimNode).x ?? 0)
        .attr("y1", (d) => (d.source as SimNode).y ?? 0)
        .attr("x2", (d) => (d.target as SimNode).x ?? 0)
        .attr("y2", (d) => (d.target as SimNode).y ?? 0);

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      labels.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });
    // eslint-disable-next-line
  }, []);

  // ------------------------------------
  // RESIZE → UPDATE FORCES ONLY
  // ------------------------------------
  useEffect(() => {
    if (!simulationRef.current || !svgRef.current) return;
    if (!size.width || !size.height) return;

    d3.select(svgRef.current)
      .attr("width", size.width)
      .attr("height", size.height);

    simulationRef.current
      .force("center", d3.forceCenter(size.width / 2, size.height / 2))
      .alpha(0.4)
      .restart();
  }, [size]);

  // ------------------------------------
  // ACTIVE + HOVER
  // ------------------------------------
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const nodesSel = svg.selectAll<SVGGElement, SimNode>("g.node");

    const dimOpacity = 0.1;
    const fullOpacity = 1;

    // eslint-disable-next-line
    const simulation = simulationRef.current as any;
    const connectedMap: Map<string, Set<string>> | undefined =
      simulation?.__connectedMap;

    nodesSel
      .on("mouseover", function (_, d) {
        setHoveredNode(d);
        if (!connectedMap) return;

        const connected = connectedMap.get(d.id!) ?? new Set();

        // ---- DIM / HIGHLIGHT ----
        nodeSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", (n) =>
            n.id === d.id || connected.has(n.id!) ? fullOpacity : dimOpacity,
          );

        labelSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", (n) =>
            n.id === d.id || connected.has(n.id!) ? fullOpacity : dimOpacity,
          );

        linkSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", (l) => {
            const sourceId =
              typeof l.source === "string"
                ? l.source
                : (l.source as SimNode).id!;
            const targetId =
              typeof l.target === "string"
                ? l.target
                : (l.target as SimNode).id!;

            return sourceId === d.id || targetId === d.id
              ? fullOpacity
              : dimOpacity;
          });

        // ---- SCALE NODE ----
        d3.select(this)
          .select(".node-inner")
          .transition()
          .duration(150)
          .attr("transform", "scale(1.5)");
      })

      .on("mouseout", function () {
        setHoveredNode(null);
        // ---- RESET OPACITY ----
        nodeSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", fullOpacity);

        labelSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", fullOpacity);

        linkSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", line.opacity);

        // ---- RESET SCALE ----
        d3.select(this)
          .select(".node-inner")
          .transition()
          .duration(150)
          .attr("transform", "scale(1)");
      });
  }, [activeId]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <AnimatePresence mode="wait">
        {!isMobile &&
          !isTouch &&
          hoveredNode?.imageUrl &&
          hoveredNode.x != null &&
          hoveredNode.y != null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              className={`pointer-events-none fixed ${window.innerWidth / 2 > hoveredNode.x ? "right-20" : "left-20"} ${window.innerHeight / 2 > hoveredNode.y ? "top-1/3" : "top-1/5"} `}
            >
              <img
                src={hoveredNode.imageUrl}
                className={`max-h-[50vh] ${isTablet ? "max-w-sm" : "max-w-lg"} rounded-2xl shadow-lg`}
              />
            </motion.div>
          )}
      </AnimatePresence>

      <svg ref={svgRef} className="h-full w-full select-none" />
    </div>
  );
};
