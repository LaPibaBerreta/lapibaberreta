export const buttonMotionPresets = {
  none: {},
  subtle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  pop: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
} as const;

export type ButtonMotionPreset = keyof typeof buttonMotionPresets;
