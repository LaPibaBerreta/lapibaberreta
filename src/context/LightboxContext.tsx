import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type LightboxContextType = {
  isLightboxOpen: boolean;
  setIsLightboxOpen: Dispatch<SetStateAction<boolean>>;
  currentImage: string | null;
  setCurrentImage: Dispatch<SetStateAction<string | null>>;
};

const LightboxContext = createContext<LightboxContextType | null>(null);

type LightboxProviderProps = {
  children: ReactNode;
};

const LightboxProvider = ({ children }: LightboxProviderProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  return (
    <LightboxContext.Provider
      value={{
        isLightboxOpen,
        setIsLightboxOpen,
        currentImage,
        setCurrentImage,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export { LightboxContext, LightboxProvider };
