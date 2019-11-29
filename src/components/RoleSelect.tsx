import React from "react";
import RoleImage from "./RoleImage";
import { HeroRole, HeroRoles } from "../models/Hero";

interface Props {
  onChange: (role: HeroRole) => void;
  theme: string;
  selectedRole: HeroRole | null;
}

const RoleSelect = ({ onChange, theme, selectedRole }: Props) => (
  <div className="d-inline-flex flex-items-center">
    {HeroRoles.map((role, index) => {
      const domID = `role-${role}`;
      return (
        <label
          key={role}
          htmlFor={domID}
          className={`d-flex f3 flex-items-center text-normal ${
            index < HeroRoles.length - 1 ? "mr-4" : ""
          }`}
        >
          <input
            checked={role === selectedRole}
            value={role}
            id={domID}
            onChange={evt => onChange(evt.target.value as HeroRole)}
            type="radio"
            name="role"
          />
          <RoleImage role={role} theme={theme} className="mx-2" />
          {role}
        </label>
      );
    })}
  </div>
);

export default RoleSelect;
