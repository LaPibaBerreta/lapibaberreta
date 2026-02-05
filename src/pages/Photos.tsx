import { usePhotos } from "../hooks/usePhotos";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";

export default function Photos() {
  const { data, isLoading, error } = usePhotos();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return <>{data?.imageGallery && <ImageGallery data={data.imageGallery} />}</>;
}
