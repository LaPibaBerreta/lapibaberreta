import Button from "./ui/Button";
import { NavLink } from "react-router";
import { motion } from "motion/react";

export default function HelpButton() {
  const MotionNavLink = motion.create(NavLink);

  return (
    <Button
      as={MotionNavLink}
      to={`/que-es-esto`}
      motion="pop"
      className={({ isActive }) =>
        ` ${isActive ? "bg-accent! text-white" : ""}`
      }
    >
      [ ? ]
    </Button>
  );
}
