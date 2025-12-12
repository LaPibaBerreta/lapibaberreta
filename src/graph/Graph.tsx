import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { GraphNode, GraphLink, SimLink, SimNode } from "./types/Graph";
import { useNavigate, useLocation } from "react-router";
import { useSectionSlug } from "../hooks/useSectionSlug";

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  width?: number;
  height?: number;
}

export const Graph: React.FC<Props> = ({
  nodes,
  links,
  width = 1200,
  height = 800,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: sectionSlug } = useSectionSlug();

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === "d0bb97dc-d6b7-40e6-90d8-e32b54eade96",
  );

  const path = location.pathname;
  const segments = path.split("/").filter(Boolean);
  const activeId = segments[segments.length - 1] ?? undefined;

  // ------------------------------------
  // MAIN GRAPH INITIALIZATION (ONCE)
  // ------------------------------------
  useEffect(() => {
    if (!svgRef.current) return;

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

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id ?? "")
          .distance(120),
      )
      .force("charge", d3.forceManyBody().strength(-450))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g
      .selectAll<SVGLineElement, SimLink>("line")
      .data(simLinks)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6);

    const node = g
      .selectAll<SVGCircleElement, SimNode>("circle")
      .data(simNodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#4f46e5")
      .on("click", (_, d) => {
        if (!d.externalLink && d.nodeType === "section") {
          navigate(`${d.route}`);
        } else if (!d.externalLink && d.nodeType === "publication") {
          navigate(`/${publicationsSlug?.slug?.current}/${d.route}`);
        }
      })
      .call(
        d3
          .drag<SVGCircleElement, SimNode>()
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

    const labels = g
      .selectAll<SVGTextElement, SimNode>("text")
      .data(simNodes)
      .enter()
      .append("text")
      .text((d) => d.label)
      .attr("font-size", 12)
      .attr("dy", -15)
      .attr("text-anchor", "middle");

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

      node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
      labels.attr("x", (d) => d.x ?? 0).attr("y", (d) => (d.y ?? 0) - 15);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // ---------------------------------------------------
  // ACTIVE + HOVER STATE (runs on activeId change)
  // ---------------------------------------------------
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const circles = svg.selectAll<SVGCircleElement, GraphNode>("circle");

    function style(
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      selection: d3.Selection<SVGCircleElement, GraphNode, any, any>,
    ) {
      selection
        .attr("fill", (d) => {
          if (d.route === activeId) return "#0f0";
          if (d.id === "hogar") return "#00000022";
          if (d.externalLink) return "#f0f";
          return "#4f46e5";
        })
        .attr("r", (d) => {
          if (d.route === activeId) return 13;
          if (d.id === "hogar") return 30;
          if (d.externalLink) return 6;
          return 10;
        });
    }

    style(circles);

    circles
      .on("mouseover", function (_, d) {
        if (d.route === activeId || d.id === "hogar") return;
        d3.select(this).attr("r", 13).attr("fill", "#6366f1");
      })
      .on("mouseout", function () {
        style(d3.select(this));
      });
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
