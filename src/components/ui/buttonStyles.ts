export const buttonMotion = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const buttonBase =
  "inline-flex items-center justify-center cursor-pointer transition-colors drop-shadow-[0_0_2px_white]";

// TODO: ajustar variantes
export const buttonVariants = {
  primary: "",
  pinnedPublication: "bg-yellow-200/80 hover:bg-pink-600 hover:text-white",
  secondary: "bg-neutral-200 text-black hover:bg-neutral-300",
  ghost: "bg-transparent hover:bg-neutral-100",
};

export type ButtonVariant = keyof typeof buttonVariants;
