// import { useState } from "react";
import Loading from "../components/Loading";
import { useVideos } from "../hooks/useVideos";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import type { InitialDataQueryResult } from "@/lib/types";
import useFilterByProject from "../hooks/useFilterByProject";
import useLanguage from "../hooks/useLanguage";
import { useProjects } from "../hooks/useProjects";
import { motion } from "motion/react";
import { SECTION_IDS } from "../data/constants";
import ProjectIndicator from "../components/ProjectIndicator";
import SectionTitle from "../components/SectionTitle";
import Image from "../components/Image";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Videos({ section }: { section: Section }) {
  const { data, isLoading, error } = useVideos();
  const { data: projectsData, isLoading: projectsDataLoading } = useProjects();
  const { data: initialData } = useInitialData();
  const { selectedProject } = useFilterByProject();
  const { language } = useLanguage();

  const videosSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.VIDEOS,
  );

  const filteredData = data?.filter((video) => {
    if (!selectedProject) return true;
    return video.project?._id === selectedProject;
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
      fullTitle = sectionTitle;
    } else {
      fullTitle =
        language === "en"
          ? `${projectTitle} ${sectionTitle}`
          : `${sectionTitle} de ${projectTitle}`;
    }
  }

  return (
    <section className="flex flex-col items-center gap-2">
      {fullTitle && <SectionTitle>{fullTitle}</SectionTitle>}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {filteredData?.length ? (
          filteredData.map((video) =>
            video.embed ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={video._id}
              >
                <NavLink
                  to={`/${videosSection?.reference?.slug}/${video.slug?.current}`}
                >
                  {video.image && (
                    <Image
                      imageData={video.image}
                      aspectRatio="1.77"
                      width={600}
                      // height={450}
                    />
                  )}
                  <div className="mt-1 flex items-start gap-1">
                    <ProjectIndicator color={video?.project?.color || "000"} />
                    <div className="leading-tight">
                      {video.title?.es && (
                        <h2>{video.title[language] || video.title.es}</h2>
                      )}
                      <div className="flex flex-wrap items-center gap-1">
                        {video.category?.name?.es && (
                          <div className="text-xs">
                            {video.category.name[language] ||
                              video.category.name.es}
                          </div>
                        )}
                        {!video.detail?.es && (
                          <div className="truncate bg-black text-xs text-white">
                            {/* {video.detail[language] || video.detail.es} */}{" "}
                            {/* holaaaaaaa */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ) : null,
          )
        ) : language === "es" ? (
          <p className="lowercase">
            No hay {section.title?.es} de{" "}
            {
              projectsData?.find((project) => project._id === selectedProject)
                ?.title?.es
            }
          </p>
        ) : (
          <p className="lowercase">
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
