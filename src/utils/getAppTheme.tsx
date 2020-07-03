import { theme as primer } from "@primer/components";
import darkTheme from "../themes/dark";
import lightTheme from "../themes/light";

export default function(themeName: string) {
  if (themeName === "dark") {
    return Object.assign({}, primer, darkTheme);
  }

  return Object.assign({}, primer, lightTheme);
}
