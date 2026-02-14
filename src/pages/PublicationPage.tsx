import { useParams } from "react-router";
import { usePublication } from "../hooks/usePublication";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import VideoPlayer from "../components/VideoPlayer";
import ImageGallery from "../components/ImageGallery";
import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";
import LoadToPlayerButton from "../components/LoadToPlayerButton";
import Button from "../components/ui/Button";
import PublicationMainImage from "../components/PublicationMainImage";
import { Dot } from "lucide-react";

export default function PublicationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = usePublication(slug!);
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  //Poeamario y poeasia se ven redundantes juntos
  const poemarioPoesia =
    data?.category?.name?.es?.toLowerCase() === "poemario" &&
    data?.project?.title?.es?.toLowerCase() === "poesía";

  return (
    <div>
      <div className="flex items-center gap-2">
        {data?.title?.es && (
          <h1 className="font-secondary text-4xl">
            {data.title[language] || data.title.es}
          </h1>
        )}
        {data?.embed && <LoadToPlayerButton data={data.embed} />}
      </div>

      <div className="mb-4 flex items-center opacity-70">
        <p>
          {data?.date ? new Date(data.date).toLocaleDateString([language]) : ""}
        </p>
        {data?.date && data?.category && <Dot size={20} />}
        {data?.category?.name?.es && (
          <p className="fn">
            {data.category.name[language] || data.category.name.es}
          </p>
        )}
        {data?.category && data?.project?.title && !poemarioPoesia && (
          <Dot size={20} />
        )}
        {data?.project?.title?.es && !poemarioPoesia && (
          <p className="font-mono">
            {data.project.title[language] || data.project.title.es}
          </p>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <div className="top-0 lg:sticky">
          {data?.mainImage && <PublicationMainImage image={data.mainImage} />}
        </div>
        <div>
          {data?.tracklist?.length && (
            <ul className="mb-4 font-mono">
              {data.tracklist.map((track, index) => {
                return (
                  <li key={index + track}>
                    {index + 1}. {track}
                  </li>
                );
              })}
            </ul>
          )}

          {data?.text?.es && (
            <div className="flex flex-col gap-2">
              <PortableText value={data.text[language] || data.text.es} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {data?.links?.length && (
          <ul className="my-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            {data.links.map((link) => (
              <li key={link._key}>
                <Button motion="pop" variant="link">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title?.es && (link.title[language] || link.title.es)}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}

        {data?.imageGallery?.length && (
          <ImageGallery data={data.imageGallery} />
        )}

        {data?.videos?.length && (
          <div className="flex flex-col gap-4">
            {data.videos.map((video) => (
              <div key={video._id} className="aspect-video">
                {video?.embed && <VideoPlayer embedData={video.embed} />}
              </div>
            ))}
          </div>
        )}

        {data?.additionalDocument && (
          <div className="font-secondary my-8 text-center text-6xl underline decoration-wavy">
            <NavLink to={"/" + data.additionalDocument?.slug?.current}>
              {data.additionalDocument.title?.es
                ? data.additionalDocument.title[language] ||
                  data.additionalDocument.title.es
                : "???"}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
