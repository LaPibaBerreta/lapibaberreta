import { useParams } from "react-router";
import type { InitialDataQueryResult } from "@/lib/types";
import { useWorkshop } from "../hooks/useWorkshop";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import Button from "../components/ui/Button";
import Image from "../components/Image";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function WorkshopPage({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useWorkshop(slug!);
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log("Location:", location);
  console.log("Slug from useParams:", slug);
  console.log("Section:", section);

  return (
    <div className="flex w-full justify-center">
      <div className="flex max-w-prose flex-col">
        <div className="mb-3 flex flex-col">
          {data?.title?.es && (
            <h1 className="text-xl">{data.title[language] || data.title.es}</h1>
          )}
          <span>{data?.date}</span>
        </div>

        <div className="mb-3 flex flex-col gap-2">
          {data?.image && <Image imageData={data.image} width={800} />}

          {data?.text?.es && (
            <PortableText value={data.text[language] || data.text.es} />
          )}
        </div>

        {data?.links?.length && (
          <div className="flex flex-col items-start gap-1">
            {data.links.map((link) => (
              <Button motion="pop" variant="link">
                <a
                  key={link._key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title?.es && (link.title[language] || link.title.es)}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
