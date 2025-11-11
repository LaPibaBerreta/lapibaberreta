import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import { useSectionSlug } from "../hooks/useSectionSlug";
import Loading from "../components/Loading";

export default function NavMenu() {
  const { data } = useInitialData();
  const { data: sectionSlug, isLoading: sectionSlugLoading } = useSectionSlug();

  if (sectionSlugLoading) return <Loading />;

  const publicationsSlug = sectionSlug?.find(
    (section) => section._id === "d0bb97dc-d6b7-40e6-90d8-e32b54eade96",
  );

  return (
    <nav>
      <ul className="flex flex-col">
        <li key="hogar" className="text-2xl">
          <NavLink key="home" to="/" className="">
            {data?.title}
          </NavLink>
        </li>
        {data?.sections &&
          data.sections.map((section) => (
            <li key={section.reference?._id || section.url}>
              {section.reference ? (
                section.reference._type === "project" && publicationsSlug ? (
                  <NavLink
                    to={
                      "/" +
                      publicationsSlug.slug?.current +
                      "/" +
                      section.reference.slug
                    }
                    className=""
                  >
                    <>{section.title?.es}</>
                  </NavLink>
                ) : (
                  <NavLink to={"/" + section.reference.slug} className="">
                    <>{section.title?.es}</>
                  </NavLink>
                )
              ) : (
                section.url && (
                  <a
                    href={section.url}
                    target="_blank"
                    className="bg-blue-200/30"
                  >
                    {section.title?.es}
                  </a>
                )
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
}
