import { useState, useEffect } from "react";
import { useInitialData } from "../hooks/useInitialData";
import NavMenuList from "./NavMenuList";
import type { InitialDataQueryResult } from "../lib/types";
import { Menu, X } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";
import { motion } from "motion/react";
import { useLocation } from "react-router";

type InitialData = NonNullable<InitialDataQueryResult>;
type Section = NonNullable<InitialData["sections"]>[number];

export default function NavMenu() {
  const { data } = useInitialData();
  const mobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);

  const sections: Section[] = data?.sections ?? [];

  const firstGroup = sections.filter((section) => section.group === "0");
  const secondGroup = sections.filter((section) => section.group === "1");
  const thirdGroup = sections.filter((section) => section.group === "2");
  const location = useLocation();

  useEffect(() => {
    if (mobile) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <nav className="font-body pointer-events-none fixed inset-0 z-100">
      {mobile && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="border-accent/20 pointer-events-auto fixed right-5 bottom-5 z-100 flex size-12 cursor-pointer items-center justify-center rounded-full border bg-white/60"
        >
          {!isOpen ? (
            <Menu size={36} strokeWidth={1} />
          ) : (
            <X strokeWidth={1} size={42} />
          )}
        </motion.button>
      )}

      {!mobile ? (
        <ul className="mr-30 flex w-full flex-col items-center justify-center gap-3 text-lg sm:flex-row">
          {firstGroup?.length && (
            <NavMenuList
              data={firstGroup}
              className="pointer-events-auto fixed top-20 left-5 flex flex-col gap-2"
            />
          )}

          {secondGroup?.length && (
            <NavMenuList
              data={secondGroup}
              className="pointer-events-auto fixed right-5 bottom-5 flex gap-2"
            />
          )}

          {thirdGroup?.length && (
            <NavMenuList
              data={thirdGroup}
              className="pointer-events-auto fixed top-1/2 right-5 flex flex-col gap-2 text-end"
            />
          )}
        </ul>
      ) : isOpen ? (
        sections.length && (
          <NavMenuList
            data={sections}
            className="pointer-events-auto flex h-screen flex-col items-end justify-end gap-2 bg-violet-200/20 pr-6 pb-20 text-xl backdrop-blur-md"
          />
        )
      ) : null}
    </nav>
  );
}
