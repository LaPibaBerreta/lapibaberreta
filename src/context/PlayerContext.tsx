import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type PlayerContextType = {
  currentEmbed: string | null;
  setCurrentEmbed: Dispatch<SetStateAction<string | null>>;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [currentEmbed, setCurrentEmbed] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <PlayerContext.Provider
      value={{ currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
