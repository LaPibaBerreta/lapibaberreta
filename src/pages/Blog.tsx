import { useBlogPosts } from "../hooks/useBlogPosts";
import { PortableText } from "@portabletext/react";
import { BlogPortableText } from "../components/BlogPortableText";

export default function Blog() {
  const { data, isLoading, error } = useBlogPosts();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="my-6">
      <h1 className="font-bold">Blog</h1>
      {data &&
        data.map((post) => (
          <div key={post._id} className="my-6 max-w-prose">
            <div className="mb-1 flex flex-row gap-2">
              <span className="underline">{post.date}</span>
              {post.title && <h2 className="font-bold">{post.title.es}</h2>}
            </div>

            <PortableText
              value={Array.isArray(post.text?.es) ? post.text.es : []}
              components={BlogPortableText}
            />
            <hr className="my-6 opacity-40" />
          </div>
        ))}
    </section>
  );
}
