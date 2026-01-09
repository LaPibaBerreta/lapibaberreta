import { NavLink } from "react-router";
import { motion } from "motion/react";
import Loading from "../components/Loading";
import { SECTION_IDS } from "../data/constants";
import { useSectionSlug } from "../hooks/useSectionSlug";
import useLanguage from "../hooks/useLanguage";
import type { InitialDataQueryResult } from "../lib/types";

type InitialData = NonNullable<InitialDataQueryResult>;
type Section = NonNullable<InitialData["sections"]>[number];

type NavMenuListProps = {
  data: Section[];
  className: string;
};

export default function NavMenuList({ data, className }: NavMenuListProps) {
  const { data: sectionSlug, isLoading: sectionSlugLoading } = useSectionSlug();
  const { language } = useLanguage();

  if (sectionSlugLoading) return <Loading />;

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.PUBLICATIONS,
  );

  return (
    <div className={className}>
      {data.map((section, index) => {
        if (section.isHidden) return;

        const mid = data.length / 2;
        return (
          <motion.li
            drag
            key={section.reference?._id || section.url}
            style={{
              transform: `translateY(${index < mid ? ((index - mid) / 2) * -8 : index + 1 - mid}px)`,
            }}
          >
            {section.reference ? (
              section.reference._type === "publication" && publicationsSlug ? (
                <NavLink
                  to={
                    "/" +
                    publicationsSlug.slug?.current +
                    "/" +
                    section.reference.slug
                  }
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? "underline" : ""} bg-yellow rounded-xl border bg-yellow-200 px-2`
                  }
                >
                  {section.title?.es &&
                    (section.title[language] || section.title?.es)}
                </NavLink>
              ) : (
                <NavLink
                  to={"/" + section.reference.slug}
                  className={({ isActive }) =>
                    `cursor-pointer rounded-xl border px-2 transition-colors hover:bg-black hover:text-white ${isActive ? "bg-black text-white" : "bg-white"}`
                  }
                >
                  {section.title?.es &&
                    (section.title[language] || section.title?.es)}
                </NavLink>
              )
            ) : (
              section.url && (
                <a
                  href={section.url}
                  target="_blank"
                  className="bg-blue-200/30"
                >
                  {section.title?.es}
                </a>
              )
            )}
          </motion.li>
        );
      })}
    </div>
  );
}
