import Loading from "../components/Loading";
import { useVideos } from "../hooks/useVideos";
import type { InitialDataQueryResult } from "@/lib/types";
import VideoPlayer from "../components/VideoPlayer";
import { PortableText } from "@portabletext/react";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import { SECTION_IDS } from "../data/constants";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Videos({ section }: { section: Section }) {
  const { data, isLoading, error } = useVideos();
  const { data: initialData } = useInitialData();

  const videosSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.VIDEOS,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {data &&
          data.map((video) =>
            video.embed ? (
              <div key={video._id} className="border p-4">
                <h2>{video.title?.es}</h2>
                <p>{video.date ?? video.date}</p>
                <div className="text-xs">{video.category?.name?.es}</div>
                <VideoPlayer embedData={video.embed} />
                {video.text?.es && <PortableText value={video.text?.es} />}

                <NavLink
                  to={`/${videosSection?.reference?.slug}/${video.slug?.current}`}
                >
                  ver mas..
                </NavLink>
              </div>
            ) : null,
          )}
      </div>
    </>
  );
}
