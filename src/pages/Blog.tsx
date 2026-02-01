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
          <div key={post._id} className="my-6 max-w-prose">
            <div className="mb-1 flex flex-row gap-2">
              <span className="underline">{post.date}</span>
              {post.title && (
                <h2 className="font-bold">
                  {post.title.es && (post.title[language] || post.title.es)}
                </h2>
              )}
            </div>

            <PortableText
              value={
                Array.isArray(post.text?.es)
                  ? post.text[language] || post.text.es
                  : []
              }
              components={BlogPortableText}
            />
            <hr className="my-6 opacity-40" />
          </div>
        ))}
    </section>
  );
}
