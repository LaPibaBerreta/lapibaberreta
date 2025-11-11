import type { InitialDataQueryResult } from "@/lib/types";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Shows({ section }: { section: Section }) {
  return (
    <>{section.title && <h1 className="text-xl">{section.title.es}</h1>}</>
  );
}
