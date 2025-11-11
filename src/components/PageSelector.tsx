import Blog from "../pages/Blog";
import Videos from "../pages/Videos";
import Publications from "../pages/Publications";
import Shows from "../pages/Shows";
import ProjectPage from "../pages/ProjectPage";
import Oracle from "../pages/Oracle";
import InfoPage from "../pages/InfoPage";
import Board from "../pages/Board";
import DefaultSection from "../pages/DefaultSection";
import type { InitialDataQueryResult } from "@/lib/types";
import { useParams } from "react-router";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

const SECTION_ID_MAP = {
  "2f542794-bb47-4c2d-98ed-6a84c7c16780": Blog,
  "98ef0420-0b1d-43fe-954a-edc97e2e2a17": Videos,
  "d0bb97dc-d6b7-40e6-90d8-e32b54eade96": Publications,
  "bafc4cbf-29e4-4946-94e3-36366231795c": Shows,
} as const;

const TYPE_MAP = {
  project: ProjectPage,
  oraculo: Oracle,
  info: InfoPage,
  board: Board,
} as const;

export default function PageSelector({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const ref = section?.reference;

  if (!ref) return null;

  if (slug) {
    return <ProjectPage section={section} />;
  }

  if (ref._type === "section") {
    const SectionComponent =
      SECTION_ID_MAP[ref._id as keyof typeof SECTION_ID_MAP];
    if (SectionComponent) return <SectionComponent section={section} />;
    return <DefaultSection section={section} />;
  }

  const TypeComponent = TYPE_MAP[ref._type as keyof typeof TYPE_MAP];
  if (TypeComponent) return <TypeComponent section={section} />;

  return <DefaultSection section={section} />;
}
