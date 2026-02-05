import { NavLink } from "react-router";
import { motion } from "motion/react";
import Loading from "../components/Loading";
import { SECTION_IDS } from "../data/constants";
import { useSectionSlug } from "../hooks/useSectionSlug";
import useLanguage from "../hooks/useLanguage";
import type { InitialDataQueryResult, Slug } from "../lib/types";
import { Brush, Eye } from "lucide-react";
import type { JSX } from "react";
import Button from "./ui/Button";

type InitialData = NonNullable<InitialDataQueryResult>;
type Section = NonNullable<InitialData["sections"]>[number];

type NavMenuListProps = {
  data: Section[];
  className: string;
};

type PublicationsSlug = {
  _id: string | null;
  slug: Slug | null;
};

const MotionNavLink = motion.create(NavLink);

export default function NavMenuList({ data, className }: NavMenuListProps) {
  const { data: sectionSlug, isLoading: sectionSlugLoading } = useSectionSlug();
  const { language } = useLanguage();

  if (sectionSlugLoading) return <Loading />;

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.PUBLICATIONS,
  );

  return (
    <ul className={className}>
      {data.map((section) => {
        if (section.isHidden) return null;

        return (
          <li key={section.reference?._id || section.url}>
            {section.reference
              ? renderSectionLink(section, publicationsSlug, language)
              : section.url && (
                  <>
                    <Button
                      as={motion.a}
                      href={section.url}
                      target="_blank"
                      variant="linkMenu"
                      motion="pop"
                    >
                      {section.title?.es &&
                        (section.title[language] || section.title?.es)}
                    </Button>
                  </>
                )}
          </li>
        );
      })}
    </ul>
  );
}

function renderSectionLink(
  section: Section,
  publicationsSlug: PublicationsSlug | undefined,
  language: "es" | "en",
): JSX.Element | null {
  switch (section?.reference?._type) {
    case "publication": {
      if (!publicationsSlug?.slug?.current) return null;
      if (!section.reference.slug) return null;

      return (
        <>
          <Button
            as={MotionNavLink}
            to={`/${publicationsSlug.slug?.current}/${section.reference.slug}`}
            variant="pinnedPublication"
            motion="pop"
          >
            {section.title?.es && (section.title[language] || section.title.es)}
          </Button>
        </>
      );
    }

    case "board": {
      return (
        <>
          <Button
            as={MotionNavLink}
            to={`/${section.reference.slug}`}
            motion="pop"
            className={({ isActive }) =>
              ` ${isActive ? "bg-accent! text-white" : ""}`
            }
          >
            {section.title?.es && (section.title[language] || section.title.es)}

            <Brush strokeWidth={0.75} size={42} />
          </Button>
        </>
      );
    }

    case "oraculo": {
      return (
        <>
          <Button
            as={MotionNavLink}
            to={`/${section.reference.slug}`}
            motion="pop"
            className={({ isActive }) =>
              ` ${isActive ? "bg-accent! text-white" : ""}`
            }
          >
            <Eye strokeWidth={0.75} size={38} />
            {section.title?.es && (section.title[language] || section.title.es)}
          </Button>
        </>
      );
    }

    default: {
      return (
        <>
          <Button
            as={MotionNavLink}
            to={`/${section?.reference?.slug}`}
            motion="pop"
            className={({ isActive }) =>
              ` ${isActive ? "bg-accent! text-white" : ""}`
            }
          >
            {section.title?.es && (section.title[language] || section.title.es)}
          </Button>
        </>
      );
    }
  }
}
