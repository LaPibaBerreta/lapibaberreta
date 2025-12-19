import { useState } from "react";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import { useSectionSlug } from "../hooks/useSectionSlug";
import Loading from "../components/Loading";
import { SECTION_IDS } from "../data/constants";

export default function NavMenu() {
  const { data } = useInitialData();
  const { data: sectionSlug, isLoading: sectionSlugLoading } = useSectionSlug();
  const [isOpen, setIsOpen] = useState(false);
  if (sectionSlugLoading) return <Loading />;

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === SECTION_IDS.PUBLICATIONS,
  );

  const sections = data?.sections ?? [];

  return (
    <nav className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`${isOpen ? "bg-black" : ""} absolute top-0 right-0 flex size-12 items-center justify-center border border-black text-6xl`}
      >
        <div
          className={`${isOpen ? "bg-white" : "bg-black"} size-10 rounded-full`}
        />
      </button>
      {isOpen && (
        <ul className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          {/* <li key="hogar" className="text-2xl"> */}
          {/*   <NavLink key="home" to="/" className=""> */}
          {/*     {data?.title} */}
          {/*   </NavLink> */}
          {/* </li> */}
          {sections.map((section, index) => {
            const mid = sections.length / 2;
            return (
              <li
                key={section.reference?._id || section.url}
                style={{
                  transform: `translateY(${index < mid ? ((index - mid) / 2) * -1 : index + 1 - mid}rem)`,
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
                      <span className="bg-black text-white">
                        {section.title?.es}
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={"/" + section.reference.slug}
                      className={({ isActive }) =>
                        `transition-colors ${isActive ? "font-bold" : ""}`
                      }
                    >
                      <span className="bg-black text-white">
                        {section.title?.es}
                      </span>
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
