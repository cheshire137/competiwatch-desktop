import React from "react";

interface Props {
  activePage: string;
  onExport: () => void;
}

const ExportButton = ({ activePage, onExport }: Props) => {
  if (!["matches", "import", "trends"].includes(activePage)) {
    return null;
  }

  return (
    <button
      type="button"
      className="btn-link text-small mr-3"
      onClick={() => onExport()}
    >
      Export matches
    </button>
  );
};

export default ExportButton;
