import React, { useState, useEffect } from "react";
import Match from "../../models/Match";
import Tab from "./Tab";

interface Props {
  activeSeason: number;
  activePage: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const MatchesTab = ({
  activePage,
  activeSeason,
  onPageChange
}: Props) => {
  const [totalMatches, setTotalMatches] = useState<number>(-1);

  useEffect(() => {
    async function getTotalMatches() {
      const total = await Match.totalInSeason(activeSeason);
      setTotalMatches(total);
    }

    getTotalMatches();
  }, [activeSeason, activePage]);

  const totalBadge = totalMatches >= 0 && (
    <span className="Counter">{totalMatches}</span>
  );

  return (
    <Tab
      selected={activePage === "matches"}
      onClick={() => onPageChange("matches")}
    >
      Matches {totalBadge}
    </Tab>
  );
};

export default MatchesTab;
