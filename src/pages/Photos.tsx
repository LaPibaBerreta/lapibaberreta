import { usePhotos } from "../hooks/usePhotos";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import HomeButton from "../components/HomeButton";

export default function Photos() {
  const { data, isLoading, error } = usePhotos();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      <section className="_backdrop-blur-md pointer-events-auto flex h-screen w-full items-center justify-center bg-violet-200/20">
        <div className="w-3/4">
          {data?.imageGallery && <ImageGallery data={data.imageGallery} />}
          <HomeButton className="absolute top-16 right-16" />
        </div>
      </section>
    </>
  );
}
