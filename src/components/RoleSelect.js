import React, {Component} from 'react'
import RoleImage from './RoleImage'

const roles = ['Tank', 'Damage', 'Support']

class RoleSelect extends Component {
  onChange = event => {
    const role = event.target.value
    this.props.onChange(role)
  }

  render() {
    const { theme } = this.props
    const selectedRole = this.props.role
    return (
      <div className="d-inline-flex flex-items-center">
        {roles.map((role, index) => {
          const domID = `role-${role}`
          return (
            <label
              key={role}
              htmlFor={domID}
              className={`d-flex flex-items-center ${index < roles.length - 1 ? 'mr-4' : ''}`}
            >
              <input
                checked={role === selectedRole}
                value={role}
                id={domID}
                onChange={this.onChange}
                type="radio"
                name="role"
              />
              <RoleImage role={role} theme={theme} className="mx-2" />
              {role}
            </label>
          )
        })}
      </div>
    )
  }
}

export default RoleSelect
