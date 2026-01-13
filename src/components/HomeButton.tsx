import { NavLink, useLocation } from "react-router";

export default function HomeButton() {
  const location = useLocation();

  return (
    <div className="fixed top-5 right-35 z-100">
      {location.pathname !== "/" && (
        <NavLink
          key="home"
          to="/"
          className={`hover:bg-accent pointer-events-auto flex size-18 cursor-pointer items-center justify-center gap-1 rounded-full border bg-white/40 text-4xl transition-colors hover:text-white`}
        >
          <img src="icons/home.svg" className="size-12" />
        </NavLink>
      )}
    </div>
  );
}
