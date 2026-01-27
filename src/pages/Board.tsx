import { useBoard } from "../hooks/useBoard";
import Loading from "../components/Loading";
import HomeButton from "../components/HomeButton";

export default function Board() {
  const { data, isLoading, error } = useBoard();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <section className="flex h-screen w-full items-center justify-center bg-violet-200/20 backdrop-blur-md">
      <div className="border-accent/20 _bg-violet-200/20 _sm:px-3 _min-h-1/3 _h-screen pointer-events-auto relative w-full min-w-1/2 rounded-2xl border bg-white/50 shadow-md sm:w-3/4 md:max-h-[80vh]">
        {/* <div className="_sm:p-6 _h-screen _sm:h-[79.8vh] overflow-y-auto"> */}
        {data?.embed && (
          <div className="h-screen w-full sm:h-[79.8vh]">
            <iframe
              src={data?.embed}
              width="100%"
              height="100%"
              className="rounded-2xl"
            ></iframe>
          </div>
        )}
        {/* </div> */}
        <HomeButton className="absolute -top-6 -right-6" />
      </div>
    </section>
  );
}
