import React from 'react'
import RoleImage from './RoleImage'

const roles = ['Tank', 'Damage', 'Support'];

interface Props {
  onChange: (role: string) => void;
  theme: string;
  selectedRole: string;
}

const RoleSelect = ({ onChange, theme, selectedRole }: Props) => (
  <div className="d-inline-flex flex-items-center">
    {roles.map((role, index) => {
      const domID = `role-${role}`
      return (
        <label
          key={role}
          htmlFor={domID}
          className={`d-flex f3 flex-items-center text-normal ${index < roles.length - 1 ? 'mr-4' : ''}`}
        >
          <input
            checked={role === selectedRole}
            value={role}
            id={domID}
            onChange={evt => onChange(evt.target.value)}
            type="radio"
            name="role"
          />
          <RoleImage role={role} theme={theme} className="mx-2" />
          {role}
        </label>
      )
    })}
  </div>
);

export default RoleSelect;
