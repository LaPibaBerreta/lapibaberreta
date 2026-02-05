import { useParams } from "react-router";
import type { InitialDataQueryResult } from "@/lib/types";
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

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function PublicationPage({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = usePublication(slug!);
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log("Location:", location);
  console.log("Slug from useParams:", slug);
  console.log("Section:", section);

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

      <div className="mb-2 flex gap-2">
        <p>{data?.date}</p>
        {data?.category?.name?.es && (
          <p>{data.category.name[language] || data.category.name.es}</p>
        )}
        {data?.project?.title?.es && !poemarioPoesia && (
          <p>{data.project.title[language] || data.project.title.es}</p>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          {data?.mainImage && <PublicationMainImage image={data.mainImage} />}
        </div>
        <div>
          {data?.tracklist?.length ? (
            <ul>
              {data.tracklist.map((track, index) => {
                return (
                  <li key={index + track}>
                    {index + 1}. {track}
                  </li>
                );
              })}
            </ul>
          ) : (
            data?.text?.es && (
              <PortableText value={data.text[language] || data.text.es} />
            )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {data?.tracklist?.length && data?.text?.es && (
          <PortableText value={data.text[language] || data.text.es} />
        )}

        {data?.links?.length && (
          <ul className="my-4 flex flex-wrap gap-2">
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
              <div key={video._id} className="h-100">
                {video?.embed && <VideoPlayer embedData={video.embed} />}
              </div>
            ))}
          </div>
        )}

        {data?.additionalDocument && (
          <div className="font-secondary my-8 text-center text-6xl underline">
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
