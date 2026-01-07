import { useContext } from "react";
import { FilterByProjectContext } from "../context/FilterByProjectContext";

export default function useFilterByProject() {
  const context = useContext(FilterByProjectContext);
  if (!context)
    throw new Error("useFilterByProject must be used within a ProjectProvider");
  return context;
}
