import type { InitialDataQueryResult } from "@/lib/types";
import { useInfo } from "../hooks/useInfo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function InfoPage({ section }: { section: Section }) {
  const { data, isLoading, error } = useInfo();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      {section.title && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      {data?.bio?.es && (
        <div className="">
          <PortableText value={data.bio[language] || data.bio.es} />
        </div>
      )}
      {data?.pressLinks?.length && (
        <ul className="my-4 flex flex-wrap gap-2">
          {data.pressLinks.map((link) => (
            <li
              key={link._key}
              className="border-accent/40 rounded-2xl border px-2 whitespace-nowrap"
            >
              <a
                key={link._key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title?.es && (link.title[language] || link.title.es)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
