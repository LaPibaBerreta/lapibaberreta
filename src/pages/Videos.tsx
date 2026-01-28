import { useState } from "react";
import Loading from "../components/Loading";
import { useVideos } from "../hooks/useVideos";
import type { InitialDataQueryResult, VideosQueryResult } from "@/lib/types";
import VideoPlayer from "../components/VideoPlayer";
import useFilterByProject from "../hooks/useFilterByProject";
import useLanguage from "../hooks/useLanguage";
import { useProjects } from "../hooks/useProjects";
import VideoInfoPanel from "../components/VideoInfoPanel";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Videos({ section }: { section: Section }) {
  const { data, isLoading, error } = useVideos();
  const { data: projectsData, isLoading: projectsDataLoading } = useProjects();
  const { selectedProject } = useFilterByProject();
  const { language } = useLanguage();
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<
    VideosQueryResult[number] | null
  >(null);

  const filteredData = data?.filter((video) => {
    if (!selectedProject) return true;
    return video.project?._id === selectedProject;
  });

  const handleInfoClick = (video: VideosQueryResult[number]) => {
    setIsInfoPanelOpen(true);
    setSelectedVideo(video);
  };

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
      fullTitle = (language === "es" ? "Todos los " : "All ") + sectionTitle;
    } else {
      fullTitle =
        language === "en"
          ? `${projectTitle} ${sectionTitle}`
          : `${sectionTitle} de ${projectTitle}`;
    }
  }

  return (
    <>
      {fullTitle && (
        <h1 className="font-mono text-xl font-thin uppercase">{fullTitle}</h1>
      )}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {filteredData?.length ? (
          filteredData.map((video) =>
            video.embed ? (
              <div key={video._id} className="_max-h-80 p-4">
                <div className="h-55">
                  <VideoPlayer embedData={video.embed} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col items-start">
                    {video.title?.es && (
                      <h2 className="text-lg">
                        {video.title[language] || video.title.es}
                      </h2>
                    )}
                    <div className="flex gap-2">
                      {video.category?.name?.es && (
                        <div className="text-xs">
                          {video.category.name[language] ||
                            video.category.name.es}
                        </div>
                      )}

                      {video.detail?.es && (
                        <div className="border-l pl-2 text-xs">
                          {video.detail?.[language] || video.detail.es}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {video.text?.es && (
                  <button onClick={() => handleInfoClick(video)}>INFO</button>
                )}
              </div>
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
        {isInfoPanelOpen && selectedVideo && (
          <VideoInfoPanel
            video={selectedVideo}
            handleClose={() => setIsInfoPanelOpen(false)}
          />
        )}
      </div>
    </>
  );
}
