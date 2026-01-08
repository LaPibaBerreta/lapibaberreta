import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import { useSectionSlug } from "../hooks/useSectionSlug";
import Loading from "../components/Loading";
import { SECTION_IDS } from "../data/constants";
import useLanguage from "../hooks/useLanguage";

export default function NavMenu() {
  const { data } = useInitialData();
  const { data: sectionSlug, isLoading: sectionSlugLoading } = useSectionSlug();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { language } = useLanguage();

  if (sectionSlugLoading) return <Loading />;

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.PUBLICATIONS,
  );

  const sections = data?.sections ?? [];

  return (
    <nav className="relative mb-5 font-mono">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`${isOpen ? "bg-black" : ""} absolute right-0 -bottom-5 flex size-12 items-center justify-center border border-black`}
      >
        <div
          className={`${isOpen ? "bg-white" : "bg-black"} size-10 rounded-full`}
        />
      </button>
      {isOpen && (
        <ul className="mr-30 flex w-full flex-col items-center justify-center gap-3 text-lg sm:flex-row">
          {location.pathname !== "/" && (
            <NavLink
              key="home"
              to="/"
              className={`flex min-w-12 cursor-pointer items-center justify-center gap-1 rounded-4xl border bg-white/40 transition-colors hover:bg-black hover:text-white`}
            >
              X
            </NavLink>
          )}

          {sections.map((section, index) => {
            const mid = sections.length / 2;
            return (
              <li
                key={section.reference?._id || section.url}
                style={{
                  transform: `translateY(${index < mid ? ((index - mid) / 2) * -8 : index + 1 - mid}px)`,
                }}
              >
                {section.reference ? (
                  section.reference._type === "publication" &&
                  publicationsSlug ? (
                    <NavLink
                      to={
                        "/" +
                        publicationsSlug.slug?.current +
                        "/" +
                        section.reference.slug
                      }
                      className={({ isActive }) =>
                        `transition-colors ${isActive ? "underline" : ""}`
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
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
