import Loading from "../components/Loading";
import { useInitialData } from "../hooks/useInitialData";

export default function Home() {
  const { data, isLoading, error } = useInitialData();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="text-center">
      {data?.title && <h1>{data.title}</h1>}
    </section>
  );
}
