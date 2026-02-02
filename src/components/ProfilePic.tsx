import { useInitialData } from "../hooks/useInitialData";
import { urlFor } from "../lib/sanityImageUrl";
import { AnimatePresence, motion } from "motion/react";
import useLanguage from "../hooks/useLanguage";

export default function ProfilePic() {
  const { data, isLoading, error } = useInitialData();
  const { language } = useLanguage();

  if (isLoading) return null;
  if (error) return null;

  if (data?.backgroundImage)
    return (
      <AnimatePresence>
        {location.pathname == "/" && (
          <>
            <motion.img
              key="profile-pic"
              initial={{ y: 500 }}
              animate={{
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 1.5,
                  ease: "easeOut",
                },
              }}
              exit={{
                y: 500,
                transition: {
                  duration: 0.5,
                  ease: "easeIn",
                },
              }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="fixed -bottom-12 -z-10 w-40 rotate-15 transition-all sm:w-60 md:w-75"
              src={
                urlFor(data.backgroundImage)
                  .format("webp")
                  .width(300)
                  .height(300)
                  .url() + "&fit=max"
              }
            />
            {data?.status?.es && (
              <motion.div
                key="status"
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    duration: 0.2,
                    delay: 2.2,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  scale: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                }}
                className="fixed bottom-8 left-30 origin-left bg-white text-xs"
              >
                {data.status[language] || data.status.es}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    );
}
