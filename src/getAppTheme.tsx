import { theme as primer } from "@primer/components";

const darkTheme = {
  backgroundColor: '#24292e',
  color: '#e1e4e8'
};

export default function(themeName: string) {
  if (themeName === "dark") {
    return Object.assign({}, primer, darkTheme);
  }

  return primer;
};
