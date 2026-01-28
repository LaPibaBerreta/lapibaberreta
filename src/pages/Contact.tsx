import type { InitialDataQueryResult } from "@/lib/types";
import { useContact } from "../hooks/useContact";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import ContactForm from "../components/ContactForm";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Contact({ section }: { section: Section }) {
  const { data, isLoading, error } = useContact();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      {section.title && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}

      <ContactForm />

      {data?.bookingInfo?.es && (
        <p>{data.bookingInfo.es || data.bookingInfo[language]}</p>
      )}
      {data?.email && <a href={"mailto:" + data.email}>{data.email}</a>}

      {data?.links?.length && (
        <ul className="flex flex-col items-start gap-1">
          {data.links.map((link) => (
            <li
              key={link._key}
              className="border-accent/40 rounded-2xl border px-2"
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title?.es && (link.title[language] || link.title.es)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
