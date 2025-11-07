import { NavLink } from "react-router";
import { useInitialData } from "../hooks/useInitialData";

export default function NavMenu() {
  const { data } = useInitialData();

  return (
    <nav>
      <ul className="flex gap-1">
        <li key="hogar">
          <NavLink key="home" to="/" className="">
            Hogar
          </NavLink>
        </li>
        {data?.sections &&
          data.sections.map((section) => (
            <li key={section.reference?._id}>
              {section.reference ? (
                <NavLink to={"/" + section.reference.slug} className="">
                  <>{section.title?.es}</>
                </NavLink>
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
