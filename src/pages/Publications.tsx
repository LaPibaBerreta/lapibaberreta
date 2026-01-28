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
import { motion } from "motion/react";
import ProjectIndicator from "../components/ProjectIndicator";

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

  const selectedProjectData = projectsData?.find(
    (project) => project._id === selectedProject,
  );

  const sectionTitle = section.title?.[language] || section.title?.es;

  const projectTitle =
    selectedProjectData?.title?.[language] || selectedProjectData?.title?.es;

  let fullTitle: string | null = null;

  if (sectionTitle) {
    if (!projectTitle) {
      fullTitle = (language === "es" ? "Todas las " : "All ") + sectionTitle;
    } else {
      fullTitle =
        language === "en"
          ? `${projectTitle} ${sectionTitle}`
          : `${sectionTitle} de ${projectTitle}`;
    }
  }

  return (
    <section className="flex flex-col gap-2">
      {fullTitle && (
        <h1 className="font-mono text-xl font-thin uppercase">{fullTitle}</h1>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredData?.length ? (
          filteredData.map((publication) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={publication._id}
              className="_border _p-4 rounded-2xl"
            >
              <NavLink
                to={`/${publicationsSection?.reference?.slug}/${publication.slug?.current}`}
              >
                {publication.mainImage && (
                  <img
                    className="rounded-2xl"
                    src={
                      urlFor(publication.mainImage)
                        .format("webp")
                        .width(400)
                        .height(400)
                        .url() + "&fit=max"
                    }
                  />
                )}
                {publication.title?.es && (
                  <h2 className="font-bold">
                    {publication.title[language] || publication.title.es}
                  </h2>
                )}
                {/* {publication.date && <p>{publication.date}</p>} */}
                {publication.category?.name?.es && (
                  <div className="flex items-baseline gap-2">
                    <ProjectIndicator
                      color={publication?.project?.color || "000"}
                    />

                    <div className="text-xs">
                      {publication.category.name[language] ||
                        publication.category.name.es}
                    </div>
                  </div>
                )}
              </NavLink>
            </motion.div>
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
