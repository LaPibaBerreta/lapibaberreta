import type { InitialDataQueryResult } from "@/lib/types";
import { usePhotos } from "../hooks/usePhotos";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import useLanguage from "../hooks/useLanguage";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Photos({ section }: { section: Section }) {
  const { data, isLoading, error } = usePhotos();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      {section.title?.es && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      {data?.imageGallery && <ImageGallery data={data.imageGallery} />}
    </>
  );
}
