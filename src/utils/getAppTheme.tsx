import { theme as primer } from "@primer/react";
import darkTheme from "../themes/dark";
import lightTheme from "../themes/light";

export default function(themeName: string) {
  if (themeName === "dark") {
    return Object.assign({}, primer, darkTheme);
  }

  return Object.assign({}, primer, lightTheme);
}
