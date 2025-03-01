export default function getTheme(): string {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme") as string;
  } else {
    return "light";
  }
}
