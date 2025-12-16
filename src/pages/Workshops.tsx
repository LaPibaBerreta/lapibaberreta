import { useWorkshops } from "../hooks/useWorkshops";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";
import { SECTION_IDS } from "../data/constants";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Workshops({ section }: { section: Section }) {
  const { data, isLoading, error } = useWorkshops();
  const { data: initialData } = useInitialData();

  const workshopsSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.WORKSHOPS,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col gap-2">
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      <div className="flex gap-2">
        {data &&
          data.map((workshop) => (
            <div key={workshop._id} className="border p-4">
              <NavLink
                to={`/${workshopsSection?.reference?.slug}/${workshop.slug?.current}`}
              >
                <h2>{workshop.title?.es}</h2>
                {workshop.date && <p>{workshop.date}</p>}
                {workshop.image && (
                  <img
                    src={
                      urlFor(workshop.image).format("webp").width(400).url() +
                      "&fit=max"
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
