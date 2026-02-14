import { useWorkshops } from "../hooks/useWorkshops";
import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { SECTION_IDS } from "../data/constants";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "../components/SectionTitle";
import Image from "../components/Image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

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

      <div className="font-extra mb-3 animate-bounce rounded-full bg-black px-2 text-white sm:text-xl">
        + info:{" "}
        <a
          href="mailto:lapibaberretalove@gmail.com"
          target="_blank"
          className="underline"
        >
          lapibaberretalove@gmail.com
        </a>
      </div>

      <div
        className={`flex flex-col gap-3 ${data?.length === 1 ? "w-3/5 items-center" : "w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:grid"}`}
      >
        {data &&
          data.map((workshop) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={workshop._id}
              className="w-full"
            >
              <NavLink
                to={`/${workshopsSection?.reference?.slug}/${workshop.slug?.current}`}
              >
                {workshop.image && (
                  <Image imageData={workshop.image} width={800} />
                )}
                <h2 className="mt-1 leading-tight">
                  <ArrowUpRight className="mr-1 inline-block" size={18} />
                  {workshop.title?.es &&
                    (workshop.title[language] || workshop.title.es)}
                </h2>
              </NavLink>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
