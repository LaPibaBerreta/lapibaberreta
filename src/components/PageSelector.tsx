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
import Photos from "../pages/Photos";
import Contact from "../pages/Contact";
import type { InitialDataQueryResult } from "@/lib/types";
import { useParams } from "react-router";
import { SECTION_IDS } from "../data/constants";
import Section from "./Section";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

const SECTION_ID_MAP = {
  [SECTION_IDS.BLOG]: Blog,
  [SECTION_IDS.VIDEOS]: Videos,
  [SECTION_IDS.PUBLICATIONS]: Publications,
  [SECTION_IDS.SHOWS]: Shows,
  [SECTION_IDS.WORKSHOPS]: Workshops,
} as const;

const TYPE_MAP = {
  publication: PublicationPage,
  oraculo: Oracle,
  info: InfoPage,
  board: Board,
  photos: Photos,
  contact: Contact,
} as const;

export default function PageSelector({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const ref = section?.reference;

  if (!ref) return null;

  // Subcategorias
  if (slug && section.reference?._id === SECTION_IDS.PUBLICATIONS) {
    return (
      <Section>
        <PublicationPage section={section} />
      </Section>
    );
  } else if (slug && section.reference?._id === SECTION_IDS.WORKSHOPS) {
    return (
      <Section>
        <WorkshopPage section={section} />
      </Section>
    );
  } else if (slug && section.reference?._id === SECTION_IDS.VIDEOS) {
    return (
      <Section>
        <VideoPage section={section} />
      </Section>
    );
  }

  if (ref._id === SECTION_IDS.PHOTOS) {
    return (
      <Section>
        <Photos />
      </Section>
    );
  }

  if (ref._id === SECTION_IDS.SHOWS) {
    return <Shows />;
  }

  if (ref._id === SECTION_IDS.BOARD) {
    return <Board />;
  }

  if (ref._type === "section") {
    const SectionComponent =
      SECTION_ID_MAP[ref._id as keyof typeof SECTION_ID_MAP];
    if (SectionComponent)
      return (
        <Section>
          <SectionComponent section={section} />
        </Section>
      );
    return (
      <Section>
        <DefaultSection section={section} />
      </Section>
    );
  }

  const TypeComponent = TYPE_MAP[ref._type as keyof typeof TYPE_MAP];
  if (TypeComponent)
    return (
      <Section>
        <TypeComponent section={section} />
      </Section>
    );

  return (
    <Section>
      <DefaultSection section={section} />
    </Section>
  );
}
