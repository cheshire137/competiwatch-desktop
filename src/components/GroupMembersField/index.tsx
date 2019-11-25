import React, { useState, ReactElement } from "react";
import ReactAutocomplete from "react-autocomplete";
import "./GroupMembersField.css";

interface Props {
  group: string;
  latestGroup: string | null;
  groupMembers: string[];
  onGroupChange: (group: string, groupSize: number) => void;
}

const GroupMembersField = ({
  group,
  groupMembers,
  latestGroup,
  onGroupChange
}: Props) => {
  const [hideCopyGroup, setHideCopyGroup] = useState(false);
  let autocomplete: ReactAutocomplete | null = null;

  const filterGroupMembers = (inputValue: string) => {
    const chosenGroupMembers = inputValue.toLowerCase().split(",");
    const lastMember = chosenGroupMembers[chosenGroupMembers.length - 1].trim();
    let groupMembers: string[] = [];

    if (lastMember.length > 0) {
      groupMembers = groupMembers.filter(groupMember => {
        const lowerGroupMember = groupMember.toLowerCase();
        return (
          lowerGroupMember !== lastMember &&
          lowerGroupMember.indexOf(lastMember) === 0
        );
      });
    }

    return groupMembers;
  };

  const shouldGroupMemberRender = (groupMember: string, inputValue: string) => {
    const membersToList = filterGroupMembers(inputValue);
    return membersToList.indexOf(groupMember) > -1;
  };

  const groupSizeFrom = (group: string) => {
    let groupSize = 1;

    if (group && group.trim().length > 1) {
      const validGroupMembers = group
        .split(",")
        .filter(member => member.trim().length > 0);
      groupSize = validGroupMembers.length + 1;
    }

    return groupSize;
  };

  const onGroupMemberSelect = (value: string, groupMember: string) => {
    const chosenGroupMembers = group
      .split(",")
      .filter(groupMember => groupMember.trim().length > 0)
      .map(groupMember => groupMember.trim());
    const newGroupMembers = chosenGroupMembers.slice(
      0,
      chosenGroupMembers.length - 1
    );

    if (newGroupMembers.indexOf(groupMember) < 0) {
      newGroupMembers.push(groupMember);
    }

    const newGroup = newGroupMembers.join(", ");
    const newGroupSize = newGroupMembers.length + 1;
    onGroupChange(newGroup, newGroupSize);
  };

  const renderGroupMember = (groupMember: string, isHighlighted: boolean) => {
    const classes = ["p-2"];
    if (isHighlighted) {
      classes.push("highlighted");
    }

    return (
      <div key={groupMember} className={classes.join(" ")}>
        {groupMember}
      </div>
    );
  };

  const copyPreviousMatchGroup = () => {
    if (latestGroup) {
      onGroupChange(latestGroup, groupSizeFrom(latestGroup));
    }
    setHideCopyGroup(true);
  };

  const renderAutocompleteMenu = (items: React.ReactNode[]) => {
    const classes = [
      "position-absolute",
      "border",
      "rounded-1",
      "box-shadow",
      "autocomplete-menu"
    ];
    if (items.length < 1) {
      classes.push("d-none");
    }

    return <div className={classes.join(" ")} children={items} />;
  };

  const onMenuVisibilityChange = (isOpen: boolean) => {
    if (!autocomplete) {
      return;
    }
    const { input, menu } = autocomplete.refs;
    if (!input || !menu || !isOpen) {
      return;
    }

    menu.style.width = `${input.clientWidth}px`;
  };

  const inputProps = {
    id: "match-group",
    className: "form-control width-full",
    placeholder: "Separate names with commas"
  };
  const wrapperStyle = {};

  return (
    <dl className="form-group mt-0">
      <dt>
        <label htmlFor="match-group">Group members:</label>
      </dt>
      <dd>
        <ReactAutocomplete
          value={group}
          getItemValue={groupMember => groupMember}
          items={groupMembers}
          onChange={evt =>
            onGroupChange(evt.target.value, groupSizeFrom(evt.target.value))
          }
          onSelect={onGroupMemberSelect}
          renderItem={renderGroupMember}
          renderMenu={renderAutocompleteMenu}
          inputProps={inputProps}
          shouldItemRender={shouldGroupMemberRender}
          wrapperStyle={wrapperStyle}
          onMenuVisibilityChange={onMenuVisibilityChange}
          ref={ac => {
            autocomplete = ac;
          }}
        />
        <p className="note clearfix">
          List friends you grouped with.
          {!hideCopyGroup &&
            typeof latestGroup === "string" &&
            latestGroup.length > 0 && (
              <button
                type="button"
                className="btn-link float-right"
                onClick={copyPreviousMatchGroup}
              >
                Copy from last match
              </button>
            )}
        </p>
      </dd>
    </dl>
  );
};

export default GroupMembersField;
