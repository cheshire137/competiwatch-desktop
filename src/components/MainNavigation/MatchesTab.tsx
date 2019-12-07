import React, { useState, useEffect } from "react";
import Match from "../../models/Match";

interface Props {
  activeSeason: number;
  activePage: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const MatchesTab = ({
  activePage,
  activeSeason,
  onPageChange,
  underlineNavItemClass
}: Props) => {
  const [totalMatches, setTotalMatches] = useState<number>(-1);

  useEffect(() => {
    async function getTotalMatches() {
      const total = await Match.totalInSeason(activeSeason)
      setTotalMatches(total);
    }

    getTotalMatches();
  }, [activeSeason, activePage]);

  const totalBadge = totalMatches >= 0 && (
    <span className="Counter">{totalMatches}</span>
  );

  if (activePage === "matches") {
    return (
      <span className={underlineNavItemClass("matches", false)}>
        Matches {totalBadge}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={underlineNavItemClass("matches", true)}
      onClick={() => onPageChange("matches")}
    >
      Matches {totalBadge}
    </button>
  );
};

export default MatchesTab;
