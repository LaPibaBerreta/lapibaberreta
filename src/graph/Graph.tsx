import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { GraphNode, GraphLink, SimLink, SimNode } from "./types/Graph";
import { useNavigate, useLocation } from "react-router";
import { useSectionSlug } from "../hooks/useSectionSlug";
import { SECTION_IDS } from "../data/constants";
import { imageSize, nodeStyles, ICONS, distance, line } from "./graphStyle";

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const Graph: React.FC<Props> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);

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

    // Optional circular clipping mask for images
    // const defs = svg.append("defs");
    // defs
    //   .append("clipPath")
    //   .attr("id", "circle-clip")
    //   .append("circle")
    //   .attr("r", imageSize / 2)
    //   .attr("cx", 0)
    //   .attr("cy", 0);

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
      .attr("stroke-opacity", line.opacity);

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

    // node
    //   .append("circle")
    //   .attr("r", ...)
    //   .attr("fill", ...);

    node
      .append("circle")
      .attr("class", "hit-area")
      .attr("r", 30)
      .attr("fill", "transparent")
      .attr("pointer-events", "all");

    nodeInner.selectAll("*").attr("pointer-events", "none");

    nodeInner
      .append("path")
      .attr("d", (d) => {
        if (d.nodeType === "hogar") return ICONS.home;
        if (d.nodeType === "section" && d.referenceType === "oraculo")
          return ICONS.oracle;
        if (d.nodeType === "section") return ICONS.section;
        if (d.nodeType === "publication") return ICONS.publication;
        if (d.nodeType === "video") return ICONS.video;
        if (d.nodeType === "workshop") return ICONS.workshop;
        return ICONS.home;
      })
      .attr("fill", (d) => {
        if (d.nodeType === "section" && d.referenceType === "oraculo")
          return nodeStyles.oracle.color;
        if (d.nodeType === "section") return nodeStyles.section.color;
        if (d.nodeType === "publication") return nodeStyles.publication.color;
        if (d.nodeType === "video") return nodeStyles.video.color;
        if (d.nodeType === "workshop") return nodeStyles.workshop.color;
        if (d.externalLink) return nodeStyles.externalLink.color;
        return nodeStyles.hogar.color;
      })
      .attr("stroke", "#000")
      .attr("stroke-width", "0.2")
      .attr("transform", "scale(1.5) translate(-8, -8)");

    // --- IMAGE ---
    nodeInner
      .filter((d) => !!d.imageUrl)
      .append("image")
      .attr("href", (d) => d.imageUrl!)
      .attr("width", imageSize)
      .attr("height", imageSize)
      .attr("x", -imageSize / 2)
      .attr("y", -imageSize / 2)
      .attr("clip-path", "url(#circle-clip)");

    // -------- LABELS --------
    const labels = g
      .selectAll<SVGTextElement, SimNode>("text")
      .data(simNodes)
      .enter()
      .append("text")
      .style("font", "14px serif")
      .text((d) => d.label)
      .attr("font-size", 12)
      .attr("dy", 55)
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
    const nodesSel = svg.selectAll<SVGGElement, GraphNode>("g.node");

    const dimOpacity = 0.1;
    const fullOpacity = 1;

    //eslint-disable-next-line
    const simulation = simulationRef.current as any;
    const connectedMap: Map<string, Set<string>> | undefined =
      simulation?.__connectedMap;

    function applyStyle(
      // eslint-disable-next-line
      selection: d3.Selection<SVGGElement, GraphNode, any, any>,
    ) {
      selection.select("path").attr("fill", (d) => {
        if (d.route === activeId) return nodeStyles.active.color;
        if (d.id === "hogar") return nodeStyles.hogar.color;
        if (d.externalLink) return nodeStyles.externalLink.color;
        if (d.nodeType === "section" && d.referenceType === "oraculo")
          return nodeStyles.oracle.color;
        if (d.nodeType === "section") return nodeStyles.section.color;
        if (d.nodeType === "publication") return nodeStyles.publication.color;
        if (d.nodeType === "video") return nodeStyles.video.color;
        if (d.nodeType === "workshop") return nodeStyles.workshop.color;
        return nodeStyles.hogar.color;
      });
    }

    applyStyle(nodesSel);

    nodesSel
      .on("mouseover", function (_, d) {
        if (!connectedMap) return;

        const connected = connectedMap.get(d.id!) ?? new Set();

        // ---- NODES ----
        nodeSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", (n) =>
            n.id === d.id || connected.has(n.id!) ? fullOpacity : dimOpacity,
          );

        // ---- LABELS ----
        labelSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", (n) =>
            n.id === d.id || connected.has(n.id!) ? fullOpacity : dimOpacity,
          );

        // ---- LINKS ----
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

        // ---- SCALE ACTIVE NODE ----
        d3.select(this)
          .select(".node-inner")
          .transition()
          .duration(150)
          .attr("transform", "scale(1.2)");
      })
      .on("mouseout", function () {
        // ---- RESET NODES ----
        nodeSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", fullOpacity);

        // ---- RESET LABELS ----
        labelSelRef.current
          ?.transition()
          .duration(150)
          .style("opacity", fullOpacity);
        // ---- RESET LINKS ----
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
      <svg ref={svgRef} className="h-full w-full select-none" />
    </div>
  );
};
