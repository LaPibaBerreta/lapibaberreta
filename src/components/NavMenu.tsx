import { useState, useEffect } from "react";
import { useInitialData } from "../hooks/useInitialData";
import NavMenuList from "./NavMenuList";
import type { InitialDataQueryResult } from "../lib/types";
import { SquareMenu, SquareX } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";
import { motion } from "motion/react";

type InitialData = NonNullable<InitialDataQueryResult>;
type Section = NonNullable<InitialData["sections"]>[number];

export default function NavMenu() {
  const { data } = useInitialData();
  const mobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(true);

  const sections: Section[] = data?.sections ?? [];

  const firstGroup = sections.filter((section) => section.group === "0");
  const secondGroup = sections.filter((section) => section.group === "1");
  const thirdGroup = sections.filter((section) => section.group === "2");

  useEffect(() => {
    if (mobile) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="_mb-5 _relative pointer-events-none fixed inset-0 z-100 font-mono">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="pointer-events-auto fixed right-5 bottom-5 z-100 flex cursor-pointer items-center justify-center rounded-md"
      >
        {!isOpen ? (
          <SquareMenu size={42} strokeWidth={0.75} fill="white" />
        ) : (
          <SquareX size={42} strokeWidth={0.75} fill="white" />
        )}
      </motion.button>
      {isOpen && (
        <ul className="mr-30 flex w-full flex-col items-center justify-center gap-3 text-lg sm:flex-row">
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
              className="pointer-events-auto fixed top-1/2 right-5 flex flex-col gap-2 text-end"
            />
          )}
        </ul>
      )}
    </nav>
  );
}
