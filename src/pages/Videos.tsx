import { useState } from "react";
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

const CATEGORY_NAMES = [
  { es: "En vivo", en: "Live" },
  { es: "Videoclip", en: "Music videos" },
  { es: "Película", en: "Films" },
];

export default function Videos({ section }: { section: Section }) {
  const { data, isLoading, error } = useVideos();
  const { data: projectsData, isLoading: projectsDataLoading } = useProjects();
  const { data: initialData } = useInitialData();
  const { selectedProject } = useFilterByProject();
  const { language } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const videosSection = initialData?.sections?.find(
    (item) => item.reference?._id === SECTION_IDS.VIDEOS,
  );

  const projectVideos = (data ?? []).filter((video) => {
    if (!selectedProject) return true;
    return video.project?._id === selectedProject;
  });

  const categories = CATEGORY_NAMES.map((name) => ({
    ...name,
    id: projectVideos.find((video) => {
      const categoryName = video.category?.name;
      return (
        categoryName?.es?.toLowerCase() === name.es.toLowerCase() ||
        categoryName?.en?.toLowerCase() === name.en.toLowerCase()
      );
    })?.category?._id,
  })).filter((category) => category.id);

  const filteredData = projectVideos.filter(
    (video) => video.category?._id === selectedCategory,
  );

  if (isLoading || projectsDataLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const selectedProjectData = projectsData?.find(
    (project) => project._id === selectedProject,
  );

  const sectionTitle = section.title?.[language] || section.title?.es;
  const projectTitle =
    selectedProjectData?.title?.[language] || selectedProjectData?.title?.es;

  const fullTitle = projectTitle
    ? language === "en"
      ? `${projectTitle} ${sectionTitle || "Videos"}`
      : `${sectionTitle || "Videos"} de ${projectTitle}`
    : sectionTitle || "Videos";

  return (
    <section className="flex flex-col items-center gap-6">
      <SectionTitle>{fullTitle}</SectionTitle>

      {!selectedCategory ? (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id!)}
              className="flex min-h-36 items-center justify-center border border-current p-6 text-xl transition hover:bg-black hover:text-white"
            >
              {category[language] || category.es}
            </button>
          ))}
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className="self-start underline underline-offset-4"
          >
            {language === "en" ? "← Back to categories" : "← Volver a categorías"}
          </button>

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {filteredData.length ? (
              filteredData.map((video) =>
                video.embed ? (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
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
                        />
                      )}
                      <div className="mt-1 flex items-start gap-1">
                        <ProjectIndicator
                          color={video.project?.color || "000"}
                        />
                        <div className="leading-tight">
                          {video.title?.es && (
                            <h2>{video.title[language] || video.title.es}</h2>
                          )}
                          {video.category?.name?.es && (
                            <div className="text-xs">
                              {video.category.name[language] ||
                                video.category.name.es}
                            </div>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </motion.div>
                ) : null,
              )
            ) : (
              <p className="col-span-full text-center">
                {language === "en"
                  ? "No videos in this category."
                  : "No hay videos en esta categoría."}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
