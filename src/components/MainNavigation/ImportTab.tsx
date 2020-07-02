import React from "react";
import Tab from "./Tab";

interface Props {
  activePage: string;
}

const ImportTab = ({ activePage }: Props) => {
  if (activePage !== "import") {
    return null;
  }

  return (
    <Tab selected>
      Import
    </Tab>
  );
};

export default ImportTab;
