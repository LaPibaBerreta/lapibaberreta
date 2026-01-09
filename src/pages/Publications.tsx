import { usePublications } from "../hooks/usePublications";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";
import { SECTION_IDS } from "../data/constants";
import useFilterByProject from "../hooks/useFilterByProject";
import useLanguage from "../hooks/useLanguage";
import { useProjects } from "../hooks/useProjects";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Publications({ section }: { section: Section }) {
  const { data, isLoading, error } = usePublications();
  const { data: initialData } = useInitialData();
  const { data: projectsData, isLoading: projectsDataLoading } = useProjects();
  const { selectedProject } = useFilterByProject();
  const { language } = useLanguage();

  const publicationsSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.PUBLICATIONS,
  );

  const filteredData = data?.filter((publication) => {
    if (!selectedProject) return true;
    return publication.project?._id === selectedProject;
  });

  if (isLoading || projectsDataLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col gap-2">
      {section.title?.es && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {filteredData?.length ? (
          filteredData.map((publication) => (
            <div key={publication._id} className="_border _p-4 rounded-2xl">
              <NavLink
                to={`/${publicationsSection?.reference?.slug}/${publication.slug?.current}`}
              >
                {publication.title?.es && (
                  <h2>{publication.title[language] || publication.title.es}</h2>
                )}
                {publication.date && <p>{publication.date}</p>}
                {publication.category?.name?.es && (
                  <div className="text-xs">
                    {publication.category.name[language] ||
                      publication.category.name.es}
                  </div>
                )}
                {publication.mainImage && (
                  <img
                    src={
                      urlFor(publication.mainImage)
                        .format("webp")
                        .width(400)
                        .url() + "&fit=max"
                    }
                  />
                )}
              </NavLink>
            </div>
          ))
        ) : language === "es" ? (
          <p>
            No se hay {section.title?.es} de{" "}
            {
              projectsData?.find((project) => project._id === selectedProject)
                ?.title?.es
            }
          </p>
        ) : (
          <p>
            There are no{" "}
            {
              projectsData?.find((project) => project._id === selectedProject)
                ?.title?.en
            }{" "}
            {section?.title?.en || section.title?.es}
          </p>
        )}
      </div>
    </section>
  );
}
