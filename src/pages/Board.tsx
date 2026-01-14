import { useBoard } from "../hooks/useBoard";
import Loading from "../components/Loading";

export default function Board() {
  const { data, isLoading, error } = useBoard();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      {data?.embed && (
        <div className="h-screen w-full rounded-full sm:h-175">
          <iframe src={data?.embed} width="100%" height="100%"></iframe>
        </div>
      )}
    </>
  );
}
