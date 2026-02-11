import { useBoard } from "../hooks/useBoard";
import Loading from "../components/Loading";
import HomeButton from "../components/HomeButton";
import { motion } from "motion/react";

export default function Board() {
  const { data, isLoading, error } = useBoard();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <motion.section className="flex h-screen w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        className="pointer-events-auto relative w-3/4 min-w-1/2 rounded-2xl border border-black/20 bg-white/50 shadow-md md:max-h-[calc(100vh-12rem)]"
      >
        {data?.embed && (
          <div className="h-[calc(100vh-12rem)] w-full">
            <iframe
              src={data?.embed}
              width="100%"
              height="100%"
              className="rounded-2xl"
            ></iframe>
          </div>
        )}
        <HomeButton className="absolute -top-6 -right-6 hidden sm:block" />
      </motion.div>
    </motion.section>
  );
}
