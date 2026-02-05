import type { InitialDataQueryResult } from "@/lib/types";
import { useContact } from "../hooks/useContact";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import ContactForm from "../components/ContactForm";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/ui/Button";
import Marquee from "../components/Marquee";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Contact({ section }: { section: Section }) {
  const { data, isLoading, error } = useContact();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <div className="flex w-full flex-col items-center gap-1 pb-8">
      {data?.bookingInfo?.es && (
        <div className="font-extra sticky top-0 mb-4 flex w-full flex-nowrap overflow-hidden rounded-2xl bg-black text-2xl text-white">
          <Marquee text={data.bookingInfo[language] || data.bookingInfo.es} />
        </div>
      )}

      {section.title?.es && (
        <SectionTitle>
          {section.title[language] || section.title.es}
        </SectionTitle>
      )}

      <ContactForm />

      <div className="my-2 flex flex-col items-center">
        <p className="font-extra text-xl">
          {data?.email && <a href={"mailto:" + data.email}>{data.email}</a>}
        </p>
      </div>

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
