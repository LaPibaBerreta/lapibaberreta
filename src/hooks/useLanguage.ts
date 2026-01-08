import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("Must be used within LanguageProvider");
  return context;
}
