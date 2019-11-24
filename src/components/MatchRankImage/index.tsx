import React from "react";
import "./MatchRankImage.css";

const rankTierFor = (rank: number) => {
  if (rank < 1500) {
    return "bronze";
  }
  if (rank < 2000) {
    return "silver";
  }
  if (rank < 2500) {
    return "gold";
  }
  if (rank < 3000) {
    return "platinum";
  }
  if (rank < 3500) {
    return "diamond";
  }
  if (rank < 4000) {
    return "master";
  }
  if (rank <= 5000) {
    return "grandmaster";
  }
};

interface Props {
  rank: number;
  priorRank?: number;
  className?: string;
}

const MatchRankImage = ({ rank, priorRank, className }: Props) => {
  const rankTier = rankTierFor(rank);
  if (!rankTier) {
    return null;
  }

  if (priorRank && rankTier === rankTierFor(priorRank)) {
    return null;
  }

  const src = require(`../../images/ranks/${rankTier}.png`);
  const imgClass = `rank-image rank-${rankTier} ${className}`;
  return (
    <span
      className="d-inline-block tooltipped-n tooltipped"
      aria-label={`${rank} SR, ${rankTier}`}
    >
      <img src={src} className={imgClass} alt={`${rank} (${rankTier})`} />
    </span>
  );
};

export default MatchRankImage;
