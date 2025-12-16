import { usePublications } from "../hooks/usePublications";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";
import { SECTION_IDS } from "../data/constants";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Publications({ section }: { section: Section }) {
  const { data, isLoading, error } = usePublications();
  const { data: initialData } = useInitialData();

  const publicationsSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.PUBLICATIONS,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col gap-2">
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      <div className="flex gap-2">
        {data &&
          data.map((publication) => (
            <div key={publication._id} className="border p-4">
              <NavLink
                to={`/${publicationsSection?.reference?.slug}/${publication.slug?.current}`}
              >
                <h2>{publication.title?.es}</h2>
                {publication.date && <p>{publication.date}</p>}
                <div className="text-xs">{publication.category?.name?.es}</div>
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
