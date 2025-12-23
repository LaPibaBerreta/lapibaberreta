import Blog from "../pages/Blog";
import Videos from "../pages/Videos";
import VideoPage from "../pages/VideoPage";
import Publications from "../pages/Publications";
import Shows from "../pages/Shows";
import PublicationPage from "../pages/PublicationPage";
import Oracle from "../pages/Oracle";
import InfoPage from "../pages/InfoPage";
import Board from "../pages/Board";
import Workshops from "../pages/Workshops";
import WorkshopPage from "../pages/WorkshopPage";
import DefaultSection from "../pages/DefaultSection";
import type { InitialDataQueryResult } from "@/lib/types";
import { useParams } from "react-router";
import { SECTION_IDS } from "../data/constants";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

const SECTION_ID_MAP = {
  [SECTION_IDS.BLOG]: Blog,
  [SECTION_IDS.VIDEOS]: Videos,
  [SECTION_IDS.PUBLICATIONS]: Publications,
  [SECTION_IDS.SHOWS]: Shows,
  [SECTION_IDS.WORKSHOPS]: Workshops,
  // TODO: terminar dearmar paginas para esta
  // [SECTION_IDS.PROJECTS]: Projects,
} as const;

const TYPE_MAP = {
  publication: PublicationPage,
  oraculo: Oracle,
  info: InfoPage,
  board: Board,
} as const;

export default function PageSelector({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const ref = section?.reference;

  if (!ref) return null;

  if (slug && section.reference?._id === SECTION_IDS.PUBLICATIONS) {
    return <PublicationPage section={section} />;
  } else if (slug && section.reference?._id === SECTION_IDS.WORKSHOPS) {
    return <WorkshopPage section={section} />;
  } else if (slug && section.reference?._id === SECTION_IDS.VIDEOS) {
    return <VideoPage section={section} />;
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
