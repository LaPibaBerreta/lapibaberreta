import { usePublications } from "../hooks/usePublications";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";
import { SECTION_IDS } from "../data/constants";
import useLanguage from "../hooks/useLanguage";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Publications({ section }: { section: Section }) {
  const { data, isLoading, error } = usePublications();
  const { data: initialData } = useInitialData();
  const { language } = useLanguage();

  const publicationsSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.PUBLICATIONS,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col gap-2">
      {section.title?.es && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {data &&
          data.map((publication) => (
            <div key={publication._id} className="rounded-2xl border p-4">
              <NavLink
                to={`/${publicationsSection?.reference?.slug}/${publication.slug?.current}`}
              >
                {publication.title?.es && (
                  <h2>{publication.title[language] || publication.title.es}</h2>
                )}
                {publication.date && <p>{publication.date}</p>}
                {publication.category?.name?.es && (
                  <div className="text-xs">
                    {publication.category.name[language] ||
                      publication.category.name.es}
                  </div>
                )}
                {publication.mainImage && (
                  <img
                    src={
                      urlFor(publication.mainImage)
                        .format("webp")
                        .width(400)
                        .url() + "&fit=max"
                    }
                  />
                )}
              </NavLink>
            </div>
          ))}
      </div>
    </section>
  );
}
