/** Merge class names — lightweight cn() without extra deps */
export function cn(...classes: (string | undefined | null | false | 0)[]) {
  return classes.filter(Boolean).join(" ");
}
