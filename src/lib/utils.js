// /lib/utils.js
// This utility function is used to merge class names conditionally and handle Tailwind CSS classes more effectively.
// It uses the clsx library for conditional class names and tailwind-merge for merging Tailwind CSS classes.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
