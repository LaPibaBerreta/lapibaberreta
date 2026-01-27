import type { ReactElement } from "react";
import HomeButton from "./HomeButton";

type Props = {
  children: ReactElement;
};

export default function Section({ children }: Props) {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-violet-200/20 backdrop-blur-md">
      <div className="border-accent/20 _bg-violet-200/20 pointer-events-auto relative h-screen min-h-1/3 w-full min-w-1/2 rounded-2xl border bg-white/50 shadow-md sm:w-3/4 sm:px-3 md:max-h-[80vh]">
        <div className="h-screen overflow-y-auto sm:h-[79.8vh] sm:p-6">
          {children}
        </div>
        <HomeButton className="absolute -top-6 -right-6" />
      </div>
    </section>
  );
}
