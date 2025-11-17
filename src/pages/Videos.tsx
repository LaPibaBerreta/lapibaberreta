import Loading from "../components/Loading";
import { useVideos } from "../hooks/useVideos";
import type { InitialDataQueryResult } from "@/lib/types";
import VideoPlayer from "../components/VideoPlayer";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Videos({ section }: { section: Section }) {
  const { data, isLoading, error } = useVideos();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      <div className="flex gap-2">
        {data &&
          data.map((video) =>
            video.embed ? (
              <div key={video._id} className="border p-4">
                <h2>{video.title?.es}</h2>
                <div className="text-xs">{video.category?.name?.es}</div>
                <VideoPlayer embedData={video.embed} />
              </div>
            ) : null,
          )}
      </div>
    </>
  );
}
