import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type FilterByProjectContextType = {
  selectedProject: string | null;
  setSelectedProject: Dispatch<SetStateAction<string | null>>;
};

const FilterByProjectContext = createContext<FilterByProjectContextType | null>(
  null,
);

type FilterByProjectProviderProps = {
  children: ReactNode;
};

const FilterByProjectProvider = ({
  children,
}: FilterByProjectProviderProps) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  return (
    <FilterByProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </FilterByProjectContext.Provider>
  );
};

export { FilterByProjectContext, FilterByProjectProvider };
