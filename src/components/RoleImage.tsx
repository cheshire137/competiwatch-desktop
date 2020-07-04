import React from "react";
import { AvatarProps, Avatar } from "@primer/components";

const knownRoles = ["tank", "support", "damage"];

interface Props extends AvatarProps {
  role: string;
  size?: number;
  theme: string;
}

const RoleImage = ({ role, size, theme, mr, mx }: Props) => {
  const slug = role.toLowerCase();
  if (knownRoles.indexOf(slug) < 0) {
    return <span>{role}</span>;
  }
  let color = "";
  if (theme === "dark") {
    color = "-invert";
  }
  const src = require(`../images/roles/${slug}${color}.png`);

  return (
    <Avatar
      mx={mr ? mr : mx}
      mr={mx ? mx : mr}
      src={src}
      alt={role}
      width={size || 20}
      height={size || 20}
    />
  );
};

export default RoleImage;
