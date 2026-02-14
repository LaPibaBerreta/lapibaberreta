import { NavLink } from "react-router";
import { motion } from "motion/react";
import { SECTION_IDS } from "../data/constants";
import { useSectionSlug } from "../hooks/useSectionSlug";
import useLanguage from "../hooks/useLanguage";
import type { InitialDataQueryResult, Slug } from "../lib/types";
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

  if (sectionSlugLoading) return null;

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

    case "oraculo": {
      return (
        <div className="fixed top-12 left-0 mx-6 my-8 rotate-5 lg:static">
          <Button
            as={MotionNavLink}
            to={`/${section.reference.slug}`}
            motion="pop"
            variant="special"
            className={({ isActive }) =>
              ` ${isActive ? "text-white" : ""} relative w-40 text-2xl`
            }
          >
            <svg
              className="absolute -z-10 transition-colors"
              viewBox="0 0 418 206"
              fill={
                location.pathname.split("/")[1] === section?.reference?.slug
                  ? "#000"
                  : "#caf"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 93.328V56.7805L94.6928 52.7824V13.0812L182.549 0.54126L214.786 52.7824L272.172 20.8202L371.519 58.8208L316.769 93.328L416.5 129.835L334.963 181.296L237.5 160.541L214.786 204.541L104.083 176.791L85.0674 122.775L0.5 93.328Z"
                stroke="black"
              />
            </svg>
            {section.title?.es && (section.title[language] || section.title.es)}
          </Button>
        </div>
      );
    }

    case "board": {
      return (
        <div className="pointer-envents-none fixed top-24 left-0 mt-16 mb-16 ml-8 lg:static lg:mt-8">
          <Button
            as={MotionNavLink}
            to={`/${section.reference.slug}`}
            motion="pop"
            variant="special"
            className={({ isActive }) =>
              ` ${isActive ? "text-white" : ""} relative w-55 text-xl`
            }
          >
            <svg
              className="absolute -top-13 -z-10 transition-colors"
              viewBox="0 0 457 304"
              fill={
                location.pathname.split("/")[1] === section?.reference?.slug
                  ? "#000"
                  : "#fefd01"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M124.561 107.202L75.289 41.6866L174.041 87.7125L183.877 1.39725L248.416 96.4933L384.328 79.1964L321.588 124.016L456.047 146.052L355.265 161.534L434.625 204.374L321.588 184.707L434.196 303.369L265.844 197.707L215 258.024L183.877 168.707L75.289 197.707L139.844 140.707L0.135843 101.278L124.561 107.202Z"
                stroke="black"
              />
            </svg>
            <div className="rotate-12">
              {section.title?.es &&
                (section.title[language] || section.title.es)}
            </div>
          </Button>
        </div>
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
