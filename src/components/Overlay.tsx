import NavMenu from "./NavMenu";
import ProjectSelectMenu from "./ProjectSelectMenu";
import LanguageToggle from "./LanguageToggle";
import PlayerContainer from "./PlayerContainer";
import { NavLink } from "react-router";
import ProfilePic from "./ProfilePic";

export default function Overlay() {
  return (
    <>
      <div className="fixed top-2 left-4 z-100 flex flex-col md:flex-row">
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl">
          {location.pathname != "/" ? (
            <NavLink to={"/"}>LA PIBA BERRETA</NavLink>
          ) : (
            "LA PIBA BERRETA"
          )}
        </h1>
        <ProjectSelectMenu />
      </div>
      <div className="bg-secondary fixed top-4 right-0 z-100 flex gap-2 p-1 text-xl">
        <div>?</div>
        <LanguageToggle />
      </div>
      <NavMenu />

      <ProfilePic />
      <PlayerContainer />
    </>
  );
}
