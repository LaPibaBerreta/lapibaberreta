import { useWorkshops } from "../hooks/useWorkshops";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { SECTION_IDS } from "../data/constants";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "../components/SectionTitle";
import Image from "../components/Image";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Workshops({ section }: { section: Section }) {
  const { data, isLoading, error } = useWorkshops();
  const { data: initialData } = useInitialData();
  const { language } = useLanguage();

  const workshopsSection = initialData?.sections?.find(
    (section) => section.reference?._id === SECTION_IDS.WORKSHOPS,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col items-center gap-2">
      {section.title?.es && (
        <SectionTitle>
          {section.title[language] || section.title.es}
        </SectionTitle>
      )}
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        {data &&
          data.map((workshop) => (
            <div key={workshop._id} className="w-full p-4">
              <NavLink
                to={`/${workshopsSection?.reference?.slug}/${workshop.slug?.current}`}
              >
                {workshop.image && (
                  <Image imageData={workshop.image} width={600} />
                )}
                <h2>
                  {workshop.title?.es &&
                    (workshop.title[language] || workshop.title.es)}
                </h2>
                {workshop.date && <p>{workshop.date}</p>}
              </NavLink>
            </div>
          ))}
      </div>
    </section>
  );
}
