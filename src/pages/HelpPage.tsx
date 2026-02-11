import ProjectSelectMenu from "../components/ProjectSelectMenu";
import HomeButton from "../components/HomeButton";
import Button from "../components/ui/Button";
import type { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { helpUiText } from "../data/helpUiText";
import useLanguage from "../hooks/useLanguage";

type HelpPagePropsType = {
  bgActive: boolean;
  setBgActive: Dispatch<SetStateAction<boolean>>;
};

export default function HelpPage({ bgActive, setBgActive }: HelpPagePropsType) {
  const { language } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, scaleY: 0.75 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.75 }}
      className="bg-accent pointer-events-auto relative flex h-screen w-full flex-col gap-2 p-2 py-24 sm:h-auto sm:max-w-prose sm:rounded-2xl sm:pt-2 sm:pb-3"
    >
      <div className="text-7xl">?????</div>

      <div className="absolute right-16 bottom-2 flex h-12 items-start gap-2 sm:-top-6 sm:-right-6">
        <HomeButton />
      </div>

      <div>
        {helpUiText[language].filter}
        <div className="mt-2 flex w-full justify-start">
          <ProjectSelectMenu />
        </div>
      </div>
      <div>{helpUiText[language].navigation}</div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div>{helpUiText[language].background.label}</div>
        <Button
          motion="pop"
          onClick={() => setBgActive(!bgActive)}
          className="self-start rounded-2xl border bg-white px-4 sm:px-2"
        >
          {bgActive ? "OFF" : "ON"}
        </Button>
      </div>

      <div className="mt-6 flex w-full justify-start gap-2">
        <div>{helpUiText[language].credits.label}</div>
        <Button variant="link" motion="pop">
          <a href="https://i10.dev" target="_blank">
            {helpUiText[language].credits.name}
          </a>
        </Button>
      </div>
    </motion.section>
  );
}
