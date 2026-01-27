import type { InitialDataQueryResult } from "@/lib/types";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function DefaultSection({ section }: { section: Section }) {
  console.log("default", section);

  return (
    <>
      <div>(～￣▽￣)～</div>
    </>
  );
}
