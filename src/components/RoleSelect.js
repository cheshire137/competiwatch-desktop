import React, {Component} from 'react'

const roles = ['Tank', 'Damage', 'Support']

class RoleSelect extends Component {
  onChange = event => {
    const role = event.target.value
    this.props.onChange(role)
  }

  render() {
    const { role } = this.props
    return (
      <select
        className="form-select"
        value={role || ''}
        id="role-select"
        onChange={this.onChange}
      >
        <option value=""></option>
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    )
  }
}

export default RoleSelect
