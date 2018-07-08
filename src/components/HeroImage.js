import React, { Component } from 'react'
import HeroUtil from '../models/HeroUtil'

class HeroImage extends Component {
  render() {
    const { hero, className } = this.props
    const slug = HeroUtil.slugify(hero)
    const src = require(`../images/heroes/${slug}.png`)

    return (
      <img
        src={src}
        alt={hero}
        className={className}
        width="20"
        height="20"
      />
    )
  }
}

export default HeroImage
