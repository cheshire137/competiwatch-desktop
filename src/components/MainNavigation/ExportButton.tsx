import React from "react";
import LinkButton from "../LinkButton";

interface Props {
  activePage: string;
  onExport: () => void;
}

const ExportButton = ({ activePage, onExport }: Props) => {
  if (!["matches", "import", "trends"].includes(activePage)) {
    return null;
  }

  return (
    <LinkButton
      mr={3}
      style={{ fontSize: "12px" }}
      onClick={() => onExport()}
    >
      Export matches
    </LinkButton>
  );
};

export default ExportButton;
