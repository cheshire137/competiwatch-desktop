import React, { Component } from 'react'

class GroupMembersField extends Component {
  onGroupChange = event => {
    const group = event.target.value
    let groupSize = 1

    if (group) {
      const validGroupMembers = group.split(',').filter(member => member.trim().length > 0)
      groupSize = validGroupMembers.length + 1
    }

    this.props.onGroupChange(group, groupSize)
  }

  render() {
    const { group } = this.props

    return (
      <dl className="form-group mt-0">
        <dt>
          <label
            htmlFor="match-group"
          >Group members:</label>
        </dt>
        <dd>
          <input
            id="match-group"
            type="text"
            className="form-control width-full"
            value={group}
            onChange={this.onGroupChange}
            placeholder="Separate names with commas"
          />
          <p className="note">
            List friends you grouped with.
          </p>
        </dd>
      </dl>
    )
  }
}

export default GroupMembersField
