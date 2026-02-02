import type { InitialDataQueryResult } from "@/lib/types";
import { useContact } from "../hooks/useContact";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import ContactForm from "../components/ContactForm";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/ui/Button";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Contact({ section }: { section: Section }) {
  const { data, isLoading, error } = useContact();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <div className="flex w-full flex-col items-center gap-2 pb-8">
      {section.title?.es && (
        <SectionTitle>
          {section.title[language] || section.title.es}
        </SectionTitle>
      )}

      <ContactForm />

      {data?.bookingInfo?.es && (
        <p>{data.bookingInfo.es || data.bookingInfo[language]}</p>
      )}
      {data?.email && <a href={"mailto:" + data.email}>{data.email}</a>}

      {data?.links?.length && (
        <ul className="flex flex-col items-start gap-1">
          {data.links.map((link) => (
            <li key={link._key}>
              <Button motion="pop" variant="link">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title?.es && (link.title[language] || link.title.es)}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
