import { theme as primer } from "@primer/components";
import { colors } from "@primer/primitives";

const darkTheme = {
  backgroundColor: '#24292e',
  color: '#e1e4e8',
  linkColor: colors.blue[3],
  borderColor: colors.gray[8],
  headerLinkColor: colors.white,
  headerLinkBackgroundColor: colors.gray[9],
  buttonShownOnHoverColor: colors.gray[3]
};

const lightTheme = {
  backgroundColor: colors.white,
  linkColor: colors.blue[5],
  borderColor: colors.gray[2],
  headerLinkColor: colors.gray[9],
  headerLinkBackgroundColor: colors.white,
  buttonShownOnHoverColor: colors.gray[8]
};

export default function(themeName: string) {
  if (themeName === "dark") {
    return Object.assign({}, primer, darkTheme);
  }

  return Object.assign({}, primer, lightTheme);
};
