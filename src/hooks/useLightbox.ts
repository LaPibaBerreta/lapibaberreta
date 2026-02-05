import { useContext } from "react";
import { LightboxContext } from "../context/LightboxContext.tsx";

export default function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) throw new Error("Must be used within LightboxProvider");
  return context;
}
