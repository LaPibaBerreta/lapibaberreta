import { Routes, Route } from "react-router";
import { useInitialData } from "./hooks/useInitialData";
import NavMenu from "./components/NavMenu";
import MainBackground from "./components/MainBackground";
import PageSelector from "./components/PageSelector";
import Loading from "./components/Loading";
import GraphSection from "./graph/GraphSection";
import { SECTION_IDS } from "./data/constants";
import Section from "./components/Section";
import ProjectSelectMenu from "./components/ProjectSelectMenu";
import LanguageToggle from "./components/LanguageToggle";
import PlayerContainer from "./components/PlayerContainer";

function App() {
  const { data, isLoading, error } = useInitialData();
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  const internalLinks = data?.sections?.filter((section) => section.reference);

  return (
    <div className="_font-mono flex w-full flex-col items-start">
      <MainBackground />

      <GraphSection />
      <ProjectSelectMenu />
      <div className="fixed top-5 right-5 z-100">
        <LanguageToggle />
      </div>
      <NavMenu />
      <PlayerContainer />
      <div className="pointer-events-none fixed inset-0 flex h-screen w-full items-center justify-center">
        <Routes>
          <Route path="/" element={null} />
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
