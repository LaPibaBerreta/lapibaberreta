import { usePhotos } from "../hooks/usePhotos";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import HomeButton from "../components/HomeButton";
import { motion } from "motion/react";

export default function Photos() {
  const { data, isLoading, error } = usePhotos();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="_backdrop-blur-md pointer-events-auto flex h-screen w-full items-center justify-center bg-violet-200/20"
      >
        <motion.div
          initial={{ opacity: 0, scaleY: 0.75 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.75 }}
          className="w-3/4"
        >
          {data?.imageGallery && <ImageGallery data={data.imageGallery} />}
          <HomeButton className="absolute top-16 right-16" />
        </motion.div>
      </motion.section>
    </>
  );
}
