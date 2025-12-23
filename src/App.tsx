import { Routes, Route } from "react-router";
import { useInitialData } from "./hooks/useInitialData";
import NavMenu from "./components/NavMenu";
import MainBackground from "./components/MainBackground";
// import Home from "./pages/Home";
import PageSelector from "./components/PageSelector";
import Loading from "./components/Loading";
import GraphSection from "./graph/GraphSection";
import { SECTION_IDS } from "./data/constants";
import Section from "./components/Section";
import logoBerreta from "./assets/logo-2.png";

function App() {
  const { data, isLoading, error } = useInitialData();
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  const internalLinks = data?.sections?.filter((section) => section.reference);

  return (
    <div className="_font-mono flex w-full flex-col items-start">
      {data?.backgroundImage && (
        <MainBackground image={data?.backgroundImage} />
      )}

      <header className="fixed top-5 right-5 z-20 flex flex-col">
        <NavMenu />
      </header>
      <div className="text-accent pointer-events-none fixed top-0 -z-10 flex h-screen w-full flex-row items-end justify-center">
        <img
          src={logoBerreta}
          className="mb-4 h-16 opacity-90"
          alt="La piba berreta logo"
        />
        {/* <h1 className="text-shadow-accent text-9xl opacity-40 text-shadow-md"> */}
        {/*   {data?.title} */}
        {/* </h1> */}
      </div>
      <GraphSection />
      <div className="pointer-events-none fixed inset-0 flex h-screen w-full items-center justify-center">
        <Routes>
          <Route path="/" />
          {internalLinks?.map((section) => (
            <Route
              key={section.reference?._id}
              path={`/${section.reference?.slug}`}
              element={
                <Section>
                  <PageSelector section={section} />
                </Section>
              }
            />
          ))}
          {internalLinks
            ?.filter(
              (section) =>
                section.reference?._id === SECTION_IDS.PUBLICATIONS ||
                section.reference?._id === SECTION_IDS.WORKSHOPS ||
                section.reference?._id === SECTION_IDS.VIDEOS,
            )
            .map((section) => (
              <Route
                key={`${section.reference?._id}-detail`}
                path={`/${section.reference?.slug}/:slug`}
                element={
                  <Section>
                    <PageSelector section={section} />
                  </Section>
                }
              />
            ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
