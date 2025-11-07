import { Routes, Route } from "react-router";
import { useInitialData } from "./hooks/useInitialData";
import NavMenu from "./components/NavMenu";
import MainBackground from "./components/MainBackground";
import Home from "./pages/Home";
import PageSelector from "./components/PageSelector";

function App() {
  const { data, isLoading, error } = useInitialData();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  const internalLinks = data?.sections?.filter((section) => section.reference);

  return (
    <div className="flex w-full flex-col items-center p-4 font-mono">
      {data?.backgroundImage && (
        <MainBackground image={data?.backgroundImage} />
      )}
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        {internalLinks?.map((section) => (
          <Route
            key={section.reference?._id}
            path={`/${section.reference?.slug}`}
            element={<PageSelector section={section} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
