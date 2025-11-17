import type { InitialDataQueryResult } from "@/lib/types";
import { useInfo } from "../hooks/useInfo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function InfoPage({ section }: { section: Section }) {
  const { data, isLoading, error } = useInfo();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      {data?.bio?.es && <PortableText value={data.bio.es} />}
      {data?.email && <a href={"mailto:" + data.email}>{data.email}</a>}
      {data?.links?.length &&
        data.links.map((link) => (
          <a
            key={link._key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {link.title?.es}
          </a>
        ))}
    </>
  );
}
