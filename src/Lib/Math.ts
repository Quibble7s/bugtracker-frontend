/**
 * Linear interpolates between min and max by the step.
 * @param min The min value.
 * @param max The max value.
 * @param step The current step.
 * @returns The interpolated value. Example: Lerp(0, 10, 0.5) == 5.
 */
export const Lerp = (min: number, max: number, step: number) => {
  step = Clamp01(step);
  return (1 - step) * min + step * max;
};

/**
 * Interpolates between 0 and 1 by the value.
 * @param min The min value.
 * @param max The max value.
 * @param value The value.
 * @returns The inverse of the interpolated value. Example: InverseLerp(0, 255, 255) == 1.
 */
export const InverseLerp = (min: number, max: number, value: number) => {
  return Clamp01((value - min) / (max - min));
};

/**
 * Clamps a value between 0 and 1.
 * @param value The value.
 * @returns The clamped value.
 */
export const Clamp01 = (value: number) => {
  return value < 0 ? 0 : value > 1 ? 1 : value;
};

/**
 * Clamps a value between min and max.
 * @param min The min value.
 * @param max The max value.
 * @param value The value.
 * @returns The clamped value.
 */
export const Clamp = (min: number, max: number, value: number) => {
  return value < min ? min : value > max ? max : value;
};
