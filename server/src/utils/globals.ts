export const BASE_URL =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : process.env.BASE_URL;


export const capitalize = (sentence: string) => {
  return sentence.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
};