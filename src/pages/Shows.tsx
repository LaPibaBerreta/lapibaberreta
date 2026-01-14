import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { useInfo } from "../hooks/useInfo";
import SongkickWidget from "../components/SongkickWidget";
import useLanguage from "../hooks/useLanguage";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Shows({ section }: { section: Section }) {
  const {
    data: infoData,
    isLoading: isInfoLoading,
    error: infoError,
  } = useInfo();
  const { language } = useLanguage();

  if (isInfoLoading) return <Loading />;
  if (infoError) return <div>{infoError?.message}</div>;

  return (
    <section className="flex h-full flex-col items-center justify-center gap-2">
      {section.title?.es && (
        <h2 className="text-2xl uppercase">
          {section.title[language] || section.title.es}
        </h2>
      )}
      <div className="w-full rounded-lg sm:w-250">
        <SongkickWidget />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        {infoData?.bookingInfo?.es && (
          <>
            <h2 className="font-serif text-5xl font-thin">
              {infoData.bookingInfo[language] || infoData.bookingInfo.es}
            </h2>
            <span className="text-xl"> {infoData.bookingContact}</span>
          </>
        )}
      </div>
    </section>
  );
}
