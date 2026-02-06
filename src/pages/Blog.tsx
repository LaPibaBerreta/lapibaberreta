import { useBlogPosts } from "../hooks/useBlogPosts";
import { PortableText } from "@portabletext/react";
import { BlogPortableText } from "../components/BlogPortableText";
import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "../components/SectionTitle";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Blog({ section }: { section: Section }) {
  const { data, isLoading, error } = useBlogPosts();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex flex-col items-center gap-2">
      {section?.title?.es && (
        <SectionTitle>
          {section.title[language] || section.title.es}
        </SectionTitle>
      )}
      {data &&
        data.map((post) => (
          <div key={post._id} className="max-w-prose sm:my-6">
            <div className="mb-3 flex flex-col">
              {post.title && (
                <h2 className="flex gap-1 text-xl font-bold">
                  <span>»</span>
                  {post.title.es && (post.title[language] || post.title.es)}
                </h2>
              )}

              <span className="">{post.date}</span>
            </div>

            <PortableText
              value={
                Array.isArray(post.text?.es)
                  ? post.text[language] || post.text.es
                  : []
              }
              components={BlogPortableText}
            />
            <hr className="my-8 opacity-40" />
          </div>
        ))}
    </section>
  );
}
