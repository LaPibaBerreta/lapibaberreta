import { NavLink } from "react-router";
import { motion } from "motion/react";
import Loading from "../components/Loading";
import { SECTION_IDS } from "../data/constants";
import { useSectionSlug } from "../hooks/useSectionSlug";
import useLanguage from "../hooks/useLanguage";
import type { InitialDataQueryResult, Slug } from "../lib/types";
import { Brush, Eye } from "lucide-react";
import type { JSX } from "react";

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
        <NavLink
          to={`/${publicationsSlug.slug?.current}/${section.reference.slug}`}
          className={({ isActive }) =>
            `bg-accent rounded-xl border px-2 text-white transition-colors ${
              isActive ? "" : ""
            }`
          }
        >
          {section.title?.es && (section.title[language] || section.title.es)}
        </NavLink>
      );
    }

    case "board": {
      return (
        <NavLink
          to={`/${section.reference.slug}`}
          className={({ isActive }) =>
            `_size-18 flex cursor-pointer items-center justify-center rounded-xl border px-2 transition-colors hover:bg-yellow-400 hover:text-black ${
              isActive ? "bg-yellow-400 text-black" : "bg-white"
            }`
          }
        >
          {section.title?.es && (section.title[language] || section.title.es)}
          <Brush strokeWidth={0.75} size={42} />
        </NavLink>
      );
    }

    case "oraculo": {
      return (
        <NavLink
          to={`/${section.reference.slug}`}
          className={({ isActive }) =>
            `flex cursor-pointer items-center justify-center rounded-xl border px-2 transition-colors hover:bg-pink-500 hover:text-white ${
              isActive ? "bg-pink-500 text-white" : "bg-white"
            }`
          }
        >
          <Eye strokeWidth={0.75} size={48} />
          {section.title?.es && (section.title[language] || section.title.es)}
        </NavLink>
      );
    }

    default: {
      return (
        <NavLink
          to={`/${section?.reference?.slug}`}
          className={({ isActive }) =>
            `cursor-pointer rounded-xl border px-2 transition-colors hover:bg-black hover:text-white ${
              isActive ? "bg-black text-white" : "bg-white"
            }`
          }
        >
          {section.title?.es && (section.title[language] || section.title.es)}
        </NavLink>
      );
    }
  }
}

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
          <motion.li drag key={section.reference?._id || section.url}>
            {section.reference
              ? renderSectionLink(section, publicationsSlug, language)
              : section.url && (
                  <a
                    href={section.url}
                    target="_blank"
                    className="bg-blue-200/30 underline"
                  >
                    {section.title?.es &&
                      (section.title[language] || section.title?.es)}
                  </a>
                )}
          </motion.li>
        );
      })}
    </ul>
  );
}
