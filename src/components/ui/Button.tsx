import * as React from "react";
import type { ElementType, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";

import { buttonBase, buttonVariants } from "./buttonStyles";
import type { ButtonVariant } from "./buttonStyles";
import { buttonMotionPresets } from "./buttonMotion";
import type { ButtonMotionPreset } from "./buttonMotion";

/* ------------------------------------------------------------
 * Polymorphic types
 * ------------------------------------------------------------ */

type PolymorphicProps<
  T extends ElementType,
  OwnProps extends object,
> = OwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps | "as">;

/* ------------------------------------------------------------
 * Button props
 * ------------------------------------------------------------ */

type ButtonOwnProps = {
  variant?: ButtonVariant;
  motion?: ButtonMotionPreset;
};

export type ButtonProps<T extends ElementType> = PolymorphicProps<
  T,
  ButtonOwnProps
>;

/* ------------------------------------------------------------
 * className merging (string OR function)
 * ------------------------------------------------------------ */

type ClassNameFn = (...args: unknown[]) => string;
type ClassNameProp = string | ClassNameFn | undefined;

function mergeClassName(base: string, className: ClassNameProp): ClassNameProp {
  if (typeof className === "function") {
    return (...args: unknown[]) => clsx(base, className(...args));
  }

  return clsx(base, className);
}

/* ------------------------------------------------------------
 * Component
 * ------------------------------------------------------------ */

const MotionButton = motion.button;

export default function Button<T extends ElementType = "button">(
  props: ButtonProps<T>,
) {
  const {
    as,
    variant = "primary",
    motion: motionPreset = "none",
    ...rest
  } = props;

  const Component =
    motionPreset !== "none" ? (as ?? MotionButton) : (as ?? "button");

  const motionProps = buttonMotionPresets[motionPreset];

  const { className, ...componentProps } = rest as {
    className?: ClassNameProp;
  };

  return React.createElement(Component, {
    ...motionProps,
    ...componentProps,
    // 👇 React typing boundary cast (intentional & safe)
    className: mergeClassName(
      clsx(buttonBase, buttonVariants[variant]),
      className,
    ) as unknown as string,
  });
}
