import { usePublications } from "../hooks/usePublications";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Publications({ section }: { section: Section }) {
  const { data, isLoading, error } = usePublications();
  const { data: initialData } = useInitialData();

  const publicationsSection = initialData?.sections?.find(
    (section) =>
      section.reference?._id === "d0bb97dc-d6b7-40e6-90d8-e32b54eade96",
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col gap-2">
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      <div className="flex gap-2">
        {data &&
          data.map((project) => (
            <div key={project._id} className="border p-4">
              <NavLink
                to={`/${publicationsSection?.reference?.slug}/${project.slug?.current}`}
              >
                <h2>{project.title?.es}</h2>
                {project.date && <p>{project.date}</p>}
                <div className="text-xs">{project.category?.name?.es}</div>
                {project.mainImage && (
                  <img
                    src={
                      urlFor(project.mainImage)
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
