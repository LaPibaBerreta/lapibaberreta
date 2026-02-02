import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { useInitialData } from "./hooks/useInitialData";
import MainBackground from "./components/MainBackground";
import PageSelector from "./components/PageSelector";
import Loading from "./components/Loading";
import GraphSection from "./graph/GraphSection";
import { SECTION_IDS } from "./data/constants";
import { AnimatePresence } from "motion/react";
import Overlay from "./components/Overlay";
import HelpPage from "./pages/HelpPage";

function App() {
  const location = useLocation();
  const { data, isLoading, error } = useInitialData();
  const [bgActive, setBgActive] = useState<boolean>(true);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  const internalLinks = data?.sections?.filter((section) => section.reference);

  return (
    <div className="flex w-full flex-col items-start">
      <MainBackground bgActive={bgActive} />
      <GraphSection />
      <Overlay />
      <div className="pointer-events-none fixed inset-0 flex h-screen w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={null} />
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
                  section.reference?._id === SECTION_IDS.PUBLICATIONS ||
                  section.reference?._id === SECTION_IDS.WORKSHOPS ||
                  section.reference?._id === SECTION_IDS.VIDEOS,
              )
              .map((section) => (
                <Route
                  key={`${section.reference?._id}-detail`}
                  path={`/${section.reference?.slug}/:slug`}
                  element={<PageSelector section={section} />}
                />
              ))}
            <Route
              path="/que-es-esto"
              element={
                <HelpPage setBgActive={setBgActive} bgActive={bgActive} />
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
