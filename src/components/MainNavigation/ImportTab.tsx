import React from "react";
import Tab from "./Tab";

interface Props {
  activePage: string;
  theme: string;
}

const ImportTab = ({ activePage, theme }: Props) => {
  if (activePage !== "import") {
    return null;
  }

  return (
    <Tab selected appTheme={theme}>
      Import
    </Tab>
  );
};

export default ImportTab;
