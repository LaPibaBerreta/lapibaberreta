import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { GraphNode, GraphLink, SimLink, SimNode } from "./types/Graph";
import { useNavigate, useLocation } from "react-router";
import { useSectionSlug } from "../hooks/useSectionSlug";
import { SECTION_IDS } from "../data/constants";

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  width?: number;
  height?: number;
}

export const Graph: React.FC<Props> = ({
  nodes,
  links,
  width = 1000,
  height = 800,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: sectionSlug } = useSectionSlug();

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.PUBLICATIONS,
  );

  const path = location.pathname;
  const segments = path.split("/").filter(Boolean);
  const activeId = segments[segments.length - 1] ?? undefined;

  const iconSize = 80;

  const nodeStyles = {
    active: { color: "#bce784", size: 20 },
    hover: { color: "#bce784", size: 14 },
    externalLink: { color: "#37BDE9", size: 10 },
    hogar: { color: "#00000022", size: 20 },
    section: { color: "#c5ebc3", size: 14 },
    publication: { color: "#FA7921", size: 12 },
    video: { color: "#b7a4b6", size: 10 },
    workshop: { color: "#adbfff", size: 12 },
  };

  const distance = 120;

  const line = {
    color: "#999",
    opacity: 0.6,
  };

  // ------------------------------------
  // MAIN GRAPH INITIALIZATION (ONCE)
  // ------------------------------------
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const g = svg.append("g");

    // Zoom
    svg.call(
      d3.zoom<SVGSVGElement, unknown>().on("zoom", (e) => {
        g.attr("transform", e.transform);
      }),
    );

    // Optional circular clipping mask for images
    const defs = svg.append("defs");
    defs
      .append("clipPath")
      .attr("id", "circle-clip")
      .append("circle")
      .attr("r", iconSize / 2)
      .attr("cx", 0)
      .attr("cy", 0);

    const simNodes: SimNode[] = nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = links.map((l) => ({ ...l }));

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id ?? "")
          .distance(distance),
      )
      .force("charge", d3.forceManyBody().strength(-450))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // -------- LINKS --------
    const link = g
      .selectAll<SVGLineElement, SimLink>("line")
      .data(simLinks)
      .enter()
      .append("line")
      .attr("stroke", line.color)
      .attr("stroke-opacity", line.opacity);

    // -------- NODES (IMAGES inside <g>) --------
    const node = g
      .selectAll<SVGGElement, SimNode>("g.node")
      .data(simNodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on("click", (_, d) => {
        if (!d.externalLink && d.nodeType === "section") {
          navigate(`${d.route}`);
        } else if (!d.externalLink && d.nodeType === "publication") {
          navigate(`/${publicationsSlug?.slug?.current}/${d.route}`);
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

    node
      .append("circle")
      .attr("r", (d) => {
        if (d.route === activeId) return nodeStyles.active.size;
        if (d.id === "hogar") return nodeStyles.hogar.size;
        if (d.externalLink) return nodeStyles.externalLink.size;
        if (d.nodeType === "section") return nodeStyles.section.size;
        if (d.nodeType === "publication") return nodeStyles.publication.size;
        if (d.nodeType === "video") return nodeStyles.video.size;
        if (d.nodeType === "workshop") return nodeStyles.workshop.size;
        else return nodeStyles.section.size;
      })
      .attr("fill", (d) => {
        if (d.nodeType === "section") return nodeStyles.section.color;
        if (d.nodeType === "publication") return nodeStyles.publication.color;
        if (d.nodeType === "video") return nodeStyles.video.color;
        if (d.nodeType === "workshop") return nodeStyles.workshop.color;
        return nodeStyles.hogar.color;
      });

    // --- IMAGE FOR EACH NODE ---
    node
      .filter((d) => !!d.imageUrl)
      .append("image")
      .attr("href", (d) => d.imageUrl!)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .attr("x", -iconSize / 2)
      .attr("y", -iconSize / 2)
      .attr("clip-path", "url(#circle-clip)");

    // -------- LABELS --------
    const labels = g
      .selectAll<SVGTextElement, SimNode>("text")
      .data(simNodes)
      .enter()
      .append("text")
      .text((d) => d.label)
      .attr("font-size", 12)
      .attr("dy", 35)
      .attr("text-anchor", "middle");

    // -------- SIM TICK --------
    simulation.on("tick", () => {
      link
        .attr("x1", (d) =>
          typeof d.source === "string" ? 0 : (d.source.x ?? 0),
        )
        .attr("y1", (d) =>
          typeof d.source === "string" ? 0 : (d.source.y ?? 0),
        )
        .attr("x2", (d) =>
          typeof d.target === "string" ? 0 : (d.target.x ?? 0),
        )
        .attr("y2", (d) =>
          typeof d.target === "string" ? 0 : (d.target.y ?? 0),
        );

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      labels.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // ------------------------------------
  // ACTIVE + HOVER STATE UPDATE
  // ------------------------------------
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const nodesSel = svg.selectAll<SVGGElement, GraphNode>("g.node");

    function applyStyle(
      // eslint-disable-next-line
      selection: d3.Selection<SVGGElement, GraphNode, any, any>,
    ) {
      // ICON OPACITY
      // selection.select("image").attr("opacity", (d) => {
      //   if (d.route === activeId) return 1;
      //   if (d.externalLink) return 0.6;
      //   return 0.5;
      // });
      selection.select("image").attr("r", (d) => {
        if (d.route === activeId) return 20;
        if (d.externalLink) return 20;
        return 10;
      });
      selection
        .select("circle")
        .attr("stroke", "#0007")
        .attr("fill", (d) => {
          if (d.route === activeId) return nodeStyles.active.color;
          if (d.id === "hogar") return nodeStyles.hogar.color;
          if (d.externalLink) return nodeStyles.externalLink.color;

          if (d.nodeType === "section") return nodeStyles.section.color;
          if (d.nodeType === "publication") return nodeStyles.publication.color;
          if (d.nodeType === "video") return nodeStyles.video.color;
          if (d.nodeType === "workshop") return nodeStyles.workshop.color;
          else return nodeStyles.hogar.color;
        })
        .attr("r", (d) => {
          if (d.route === activeId) return nodeStyles.active.size;
          if (d.id === "hogar") return nodeStyles.hogar.size;
          if (d.externalLink) return nodeStyles.externalLink.size;
          if (d.nodeType === "section") return nodeStyles.section.size;
          if (d.nodeType === "publication") return nodeStyles.publication.size;
          if (d.nodeType === "video") return nodeStyles.video.size;
          if (d.nodeType === "workshop") return nodeStyles.workshop.size;
          else return nodeStyles.section.size;
        });
    }

    applyStyle(nodesSel);

    nodesSel
      .on("mouseover", function (_, d) {
        if (d.route === activeId || d.id === "hogar") return;
        d3.select(this).select("image").attr("opacity", 1);
        d3.select(this).select("circle").attr("r", 20);
        // .attr("fill", nodeStyles.hover.color);
      })
      .on("mouseout", function () {
        applyStyle(d3.select(this));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="rounded-full shadow-2xl backdrop-blur-lg"
    />
  );
};
