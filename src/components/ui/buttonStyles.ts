export const buttonMotion = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const buttonBase =
  "inline-flex items-center _text-accent justify-center border-accent/20 min-w-12 cursor-pointer _font-black _bg-white/60 _font-display _bg-violet-200/20 _rounded-2xl _border _px-4 mx-2 _shadow-md _backdrop-blur-md transition-colors";
// "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

export const buttonVariants = {
  primary: "_hover:bg-pink _hover:text-white",
  pinnedPublication: "bg-yellow-200/80 hover:bg-pink-600 hover:text-white",
  secondary: "bg-neutral-200 text-black hover:bg-neutral-300",
  ghost: "bg-transparent hover:bg-neutral-100",
};

export type ButtonVariant = keyof typeof buttonVariants;
