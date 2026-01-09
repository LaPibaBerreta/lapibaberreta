import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterByProjectProvider } from "./context/FilterByProjectContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { PlayerProvider } from "./context/PlayerContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 35,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <FilterByProjectProvider>
          <PlayerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PlayerProvider>
        </FilterByProjectProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
