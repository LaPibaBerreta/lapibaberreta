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
  const { isDesktop } = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const sections: Section[] = data?.sections ?? [];

  const firstGroup = sections.filter((section) => section.group === "0");
  const secondGroup = sections.filter((section) => section.group === "1");
  const thirdGroup = sections.filter((section) => section.group === "2");
  const location = useLocation();

  useEffect(() => {
    if (!isDesktop) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <nav className="pointer-events-none fixed inset-0 z-150">
      {!isDesktop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="pointer-events-auto fixed right-4 bottom-4 z-100 flex size-12 cursor-pointer items-center justify-center rounded-full border bg-white/60"
        >
          {!isOpen ? (
            <Menu size={36} strokeWidth={1} />
          ) : (
            <X strokeWidth={1} size={42} />
          )}
        </motion.button>
      )}

      {isDesktop ? (
        <div>
          {firstGroup?.length && (
            <NavMenuList
              data={firstGroup}
              className="pointer-events-auto fixed top-18 left-4 flex flex-col p-1 font-mono text-xl"
            />
          )}

          {secondGroup?.length && (
            <NavMenuList
              data={secondGroup}
              className="pointer-events-auto fixed top-4 right-20 flex gap-2 p-1 text-xl uppercase"
            />
          )}

          {thirdGroup?.length && (
            <NavMenuList
              data={thirdGroup}
              className="pointer-events-auto fixed right-4 bottom-4 flex flex-col text-end"
            />
          )}
        </div>
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
