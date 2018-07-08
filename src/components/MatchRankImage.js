import React, { Component } from 'react'
import './MatchRankImage.css'

const rankTierFor = rank => {
  if (rank < 1500) {
    return 'bronze'
  }
  if (rank < 2000) {
    return 'silver'
  }
  if (rank < 2500) {
    return 'gold'
  }
  if (rank < 3000) {
    return 'platinum'
  }
  if (rank < 3500) {
    return 'diamond'
  }
  if (rank < 4000) {
    return 'master'
  }
  return 'grandmaster'
}

class MatchRankImage extends Component {
  render() {
    const { rank, isPlacement, priorRank, className } = this.props

    if (typeof rank !== 'number') {
      return null
    }

    const rankTier = rankTierFor(rank)
    if (priorRank && rankTier === rankTierFor(priorRank)) {
      return null
    }

    const src = require(`../images/ranks/${rankTier}.png`)
    const imgClass = `rank-image rank-${rankTier} ${className}`
    return (
      <span className="d-inline-block tooltipped-n tooltipped">
        <img
          src={src}
          className={imgClass}
          aria-label={rank}
        />
      </span>
    )
  }
}

export default MatchRankImage
