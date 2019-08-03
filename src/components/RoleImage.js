import React, {Component} from 'react'

const knownRoles = ['tank', 'support', 'damage']

class RoleImage extends Component {
  render() {
    const {role, className, size} = this.props
    const slug = role.toLowerCase()
    if (knownRoles.indexOf(slug) < 0) {
      return <span>{role}</span>
    }

    const src = require(`../images/roles/${slug}.png`)

    return (
      <img
        src={src}
        alt={role}
        className={className}
        width={size || 20}
        height={size || 20}
      />
    )
  }
}

export default RoleImage
