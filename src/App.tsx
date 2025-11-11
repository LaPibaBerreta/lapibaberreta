import { Routes, Route } from "react-router";
import { useInitialData } from "./hooks/useInitialData";
import NavMenu from "./components/NavMenu";
import MainBackground from "./components/MainBackground";
import Home from "./pages/Home";
import PageSelector from "./components/PageSelector";
import Loading from "./components/Loading";

function App() {
  const { data, isLoading, error } = useInitialData();
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  const internalLinks = data?.sections?.filter((section) => section.reference);

  return (
    <div className="flex w-full flex-col items-start p-4 font-mono">
      {data?.backgroundImage && (
        <MainBackground image={data?.backgroundImage} />
      )}
      <NavMenu />
      <hr className="my-2 w-full" />
      <Routes>
        <Route path="/" element={<Home />} />

        {internalLinks?.map((section) => (
          <Route
            key={section.reference?._id}
            path={`/${section.reference?.slug}`}
            element={<PageSelector section={section} />}
          />
        ))}

        {internalLinks
          ?.filter(
            (section) =>
              section.reference?._id === "d0bb97dc-d6b7-40e6-90d8-e32b54eade96", // Publications
          )
          .map((section) => (
            <Route
              key={`${section.reference?._id}-detail`}
              path={`/${section.reference?.slug}/:slug`}
              element={<PageSelector section={section} />}
            />
          ))}
      </Routes>
    </div>
  );
}

export default App;
