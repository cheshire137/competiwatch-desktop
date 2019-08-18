import React from 'react'

const knownRoles = ['tank', 'support', 'damage']

interface Props {
  role: string;
  className?: string;
  size?: number;
  theme: string;
}

const RoleImage = (props: Props) => {
  const {role, className, size, theme} = props
  const slug = role.toLowerCase()
  if (knownRoles.indexOf(slug) < 0) {
    return <span>{role}</span>
  }
  let color = ''
  if (theme === 'dark') {
    color = '-invert'
  }
  const src = require(`../images/roles/${slug}${color}.png`)

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

export default RoleImage
