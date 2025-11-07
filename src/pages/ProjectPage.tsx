import type { InitialDataQueryResult } from "@/lib/types";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function ProjectPage({ section }: { section: Section }) {
  console.log("ProjectPage", section);

  return (
    <>
      <h1>project</h1>
      <div>sección project</div>
    </>
  );
}
