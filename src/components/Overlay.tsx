import NavMenu from "./NavMenu";
import ProjectSelectMenu from "./ProjectSelectMenu";
import PlayerContainer from "./PlayerContainer";
import { NavLink } from "react-router";
import ProfilePic from "./ProfilePic";

export default function Overlay() {
  return (
    <>
      <header className="fixed top-2 left-4 z-100 flex flex-col lg:flex-row lg:gap-2">
        <h1 className="font-display text-[6.4vw] sm:text-[4.5vw] lg:text-[3vw]">
          {location.pathname != "/" ? (
            <NavLink to={"/"}>LA PIBA BERRETA</NavLink>
          ) : (
            "LA PIBA BERRETA"
          )}
        </h1>
        <ProjectSelectMenu />
      </header>
      <NavMenu />
      <ProfilePic />
      <PlayerContainer />
    </>
  );
}
