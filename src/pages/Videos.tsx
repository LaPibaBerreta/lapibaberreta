import Loading from "../components/Loading";
import { useVideos } from "../hooks/useVideos";
import type { InitialDataQueryResult } from "@/lib/types";
import VideoPlayer from "../components/VideoPlayer";
import { PortableText } from "@portabletext/react";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import { SECTION_IDS } from "../data/constants";
import useFilterByProject from "../hooks/useFilterByProject";
import useLanguage from "../hooks/useLanguage";
import { useProjects } from "../hooks/useProjects";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Videos({ section }: { section: Section }) {
  const { data, isLoading, error } = useVideos();
  const { data: initialData } = useInitialData();
  const { data: projectsData, isLoading: projectsDataLoading } = useProjects();
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

  return (
    <>
      {section.title?.es && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {filteredData?.length ? (
          filteredData.map((video) =>
            video.embed ? (
              <div key={video._id} className="border p-4">
                {video.title?.es && (
                  <h2>{video.title[language] || video.title.es}</h2>
                )}
                <p>{video.date ?? video.date}</p>
                {video.category?.name?.es && (
                  <div className="text-xs">
                    {video.category.name[language] || video.category.name.es}
                  </div>
                )}
                <VideoPlayer embedData={video.embed} />
                {video.text?.es && (
                  <PortableText value={video.text[language] || video.text.es} />
                )}

                <NavLink
                  to={`/${videosSection?.reference?.slug}/${video.slug?.current}`}
                >
                  {language === "es" ? "Ver más" : "See more"}
                </NavLink>
              </div>
            ) : null,
          )
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
    </>
  );
}
