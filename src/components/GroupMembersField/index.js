import React, { Component } from 'react'
import ReactAutocomplete from 'react-autocomplete'
import './GroupMembersField.css'

class GroupMembersField extends Component {
  constructor(props) {
    super(props)

    this.state = { hideCopyGroup: false }
  }

  filterGroupMembers = inputValue => {
    const chosenGroupMembers = inputValue.toLowerCase().split(',')
    const lastMember = chosenGroupMembers[chosenGroupMembers.length - 1].trim()
    let groupMembers = []

    if (lastMember.length > 0) {
      groupMembers = this.props.groupMembers.filter(groupMember => {
        const lowerGroupMember = groupMember.toLowerCase()
        return lowerGroupMember !== lastMember &&
          lowerGroupMember.indexOf(lastMember) === 0
      })
    }

    return groupMembers
  }

  shouldGroupMemberRender = (groupMember, inputValue) => {
    const membersToList = this.filterGroupMembers(inputValue)
    return membersToList.indexOf(groupMember) > -1
  }

  onGroupChange = event => {
    const group = event.target.value
    const groupSize = this.groupSizeFrom(group)

    this.props.onGroupChange(group, groupSize)
  }

  groupSizeFrom(group) {
    let groupSize = 1

    if (group && group.trim().length > 1) {
      const validGroupMembers = group.split(',').filter(member => member.trim().length > 0)
      groupSize = validGroupMembers.length + 1
    }

    return groupSize
  }

  onGroupMemberSelect = (value, groupMember) => {
    const { group, onGroupChange } = this.props
    const chosenGroupMembers = group.split(',')
      .filter(groupMember => groupMember.trim().length > 0)
      .map(groupMember => groupMember.trim())
    const newGroupMembers = chosenGroupMembers.slice(0, chosenGroupMembers.length - 1)

    if (newGroupMembers.indexOf(groupMember) < 0) {
      newGroupMembers.push(groupMember)
    }

    const newGroup = newGroupMembers.join(', ')
    const newGroupSize = newGroupMembers.length + 1
    onGroupChange(newGroup, newGroupSize)
  }

  renderGroupMember = (groupMember, isHighlighted) => {
    const classes = ['p-2']
    if (isHighlighted) {
      classes.push('highlighted')
    }

    return (
      <div key={groupMember} className={classes.join(' ')}>
        {groupMember}
      </div>
    )
  }

  copyPreviousMatchGroup = event => {
    event.currentTarget.blur()

    const group = this.props.latestGroup
    const groupSize = this.groupSizeFrom(group)

    this.props.onGroupChange(group, groupSize)
    this.setState(prevState => ({ hideCopyGroup: true }))
  }

  renderAutocompleteMenu = items => {
    const classes = ['position-absolute', 'border', 'rounded-1', 'box-shadow', 'autocomplete-menu']
    if (items.length < 1) {
      classes.push('d-none')
    }

    return (
      <div
        className={classes.join(' ')}
        children={items}
      />
    )
  }

  onMenuVisibilityChange = isOpen => {
    const { input, menu } = this.autocomplete.refs
    if (!input || !menu || !isOpen) {
      return
    }

    menu.style.width = `${input.clientWidth}px`
  }

  render() {
    const { group, groupMembers, latestGroup } = this.props
    const { hideCopyGroup } = this.state
    const inputProps = {
      id: 'match-group',
      className: 'form-control width-full',
      placeholder: 'Separate names with commas'
    }
    const wrapperStyle = {}

    return (
      <dl className="form-group mt-0">
        <dt>
          <label
            htmlFor="match-group"
          >Group members:</label>
        </dt>
        <dd>
          <ReactAutocomplete
            value={group}
            getItemValue={groupMember => groupMember}
            items={groupMembers}
            onChange={this.onGroupChange}
            onSelect={this.onGroupMemberSelect}
            renderItem={this.renderGroupMember}
            renderMenu={this.renderAutocompleteMenu}
            inputProps={inputProps}
            shouldItemRender={this.shouldGroupMemberRender}
            wrapperStyle={wrapperStyle}
            onMenuVisibilityChange={this.onMenuVisibilityChange}
            ref={autocomplete => { this.autocomplete = autocomplete }}
          />
          <p className="note clearfix">
            List friends you grouped with.
            {!hideCopyGroup && typeof latestGroup === 'string' && latestGroup.length > 0 ? (
              <button
                type="button"
                className="btn-link float-right"
                onClick={this.copyPreviousMatchGroup}
              >Copy from last match</button>
            ) : null}
          </p>
        </dd>
      </dl>
    )
  }
}

export default GroupMembersField
