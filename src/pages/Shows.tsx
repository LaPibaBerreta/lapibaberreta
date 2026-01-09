import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { useInfo } from "../hooks/useInfo";
import { PortableText } from "@portabletext/react";
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
    <section>
      {section.title?.es && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      {infoData?.bookingInfo?.es && (
        <PortableText
          value={infoData.bookingInfo[language] || infoData.bookingInfo.es}
        />
      )}
      <SongkickWidget />
    </section>
  );
}
