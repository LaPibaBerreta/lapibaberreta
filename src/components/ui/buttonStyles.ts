export const buttonMotion = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const buttonBase =
  "inline-flex items-center justify-center cursor-pointer transition-colors";

export const buttonVariants = {
  primary: "",
  pinnedPublication: "bg-white/80 font-mono text-2xl",
  special: "font-secondary",
  secondary: "bg-neutral-200 text-black hover:bg-neutral-300",
  ghost: "bg-transparent hover:bg-neutral-100",
  link: "border-black rounded-2xl border px-2 whitespace-nowrap bg-black text-white",
  linkMenu: "text-white whitespace-nowrap bg-black text-xl font-mono",
};

export type ButtonVariant = keyof typeof buttonVariants;
