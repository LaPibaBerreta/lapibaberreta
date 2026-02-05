import ProjectSelectMenu from "../components/ProjectSelectMenu";
import HomeButton from "../components/HomeButton";
import Button from "../components/ui/Button";
import type { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

type HelpPagePropsType = {
  bgActive: boolean;
  setBgActive: Dispatch<SetStateAction<boolean>>;
};

export default function HelpPage({ bgActive, setBgActive }: HelpPagePropsType) {
  return (
    <motion.section
      initial={{ opacity: 0, scaleY: 0.75 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.75 }}
      className="bg-accent pointer-events-auto relative flex max-w-prose flex-col gap-2 rounded-2xl p-2 pb-3"
    >
      <div className="text-7xl">?????</div>
      <HomeButton variantX={true} className="absolute -top-6 -right-6" />

      <div>
        Puedes usar este filtro (o el que está arriba, que funciona igual) para
        ver el contenido del sitio por proyecto:
        <div className="flex w-full justify-start pl-4">
          <ProjectSelectMenu />
        </div>
      </div>
      <div>
        El sitio se puede recorrer de dos maneras: haciendo click en los íconos
        del gráfico central o usando el menú ubicado a la izquierda. Ambos
        caminos llevan a los mismos contenidos.
      </div>

      <div>
        En el gráfico puedes: scrollear para hacer zoom, hacer click y arrastrar
        el fondo para moverte, arrastrar los íconos con el cursor.
      </div>

      <div>
        Si quieres desactivar la animación de fondo, puedes usar el siguiente
        botón:
        <div className="flex w-full justify-start pl-4">
          <Button
            onClick={() => setBgActive(!bgActive)}
            className="mt-2 self-start rounded-2xl bg-white px-2"
          >
            {bgActive ? "SIN FONDO" : "CON FONDO"}
          </Button>
        </div>
      </div>

      <div className="pt-2">
        Diseñado y programado con amor por:{" "}
        <Button variant="link" motion="pop">
          <a href="https://i10.dev" target="_blank">
            instrumento
          </a>
        </Button>
      </div>
    </motion.section>
  );
}
