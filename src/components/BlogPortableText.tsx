import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";

export const BlogPortableText: PortableTextComponents = {
  types: {
    image: (props) => (
      <img
        className="my-1 max-w-full rounded-md"
        src={urlFor(props.value).format("webp").width(600).url() + "&fit=max"}
      />
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-2 whitespace-pre-line">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : ""}
          className="text-accent hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
