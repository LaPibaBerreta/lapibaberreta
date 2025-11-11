import type { InitialDataQueryResult } from "@/lib/types";
import { useBoard } from "../hooks/useBoard";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Board({ section }: { section: Section }) {
  const { data, isLoading, error } = useBoard();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      {data?.text?.es && <PortableText value={data.text.es} />}
      {data?.embed && (
        <div className="h-[600px] w-full rounded-full">
          <iframe src={data?.embed} width="100%" height="100%"></iframe>
        </div>
      )}
    </>
  );
}
