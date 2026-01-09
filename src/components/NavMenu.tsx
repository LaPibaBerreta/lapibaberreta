import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useInitialData } from "../hooks/useInitialData";
import NavMenuList from "./NavMenuList";
import type { InitialDataQueryResult } from "../lib/types";

type InitialData = NonNullable<InitialDataQueryResult>;
type Section = NonNullable<InitialData["sections"]>[number];

export default function NavMenu() {
  const { data } = useInitialData();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sections: Section[] = data?.sections ?? [];

  const firstGroup = sections.filter((section) => section.group === "0");
  const secondGroup = sections.filter((section) => section.group === "1");
  const thirdGroup = sections.filter((section) => section.group === "2");

  return (
    <nav className="_mb-5 _relative pointer-events-none fixed inset-0 z-100 font-mono">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`${isOpen ? "bg-black" : ""} pointer-events-auto fixed right-5 bottom-5 z-100 flex size-12 items-center justify-center border border-black`}
      >
        <div
          className={`${isOpen ? "bg-white" : "bg-black"} size-10 rounded-full`}
        />
      </button>
      {isOpen && (
        <ul className="mr-30 flex w-full flex-col items-center justify-center gap-3 text-lg sm:flex-row">
          {location.pathname !== "/" && (
            <NavLink
              key="home"
              to="/"
              className={`pointer-events-auto flex min-w-12 cursor-pointer items-center justify-center gap-1 rounded-4xl border bg-white/40 transition-colors hover:bg-black hover:text-white`}
            >
              X
            </NavLink>
          )}

          {firstGroup?.length && (
            <NavMenuList
              data={firstGroup}
              className="pointer-events-auto fixed top-20 left-5"
            />
          )}

          {secondGroup?.length && (
            <NavMenuList
              data={secondGroup}
              className="pointer-events-auto fixed right-20 bottom-5 flex gap-2"
            />
          )}

          {thirdGroup?.length && (
            <NavMenuList
              data={thirdGroup}
              className="pointer-events-auto fixed top-1/2 right-5 text-end"
            />
          )}
        </ul>
      )}
    </nav>
  );
}
