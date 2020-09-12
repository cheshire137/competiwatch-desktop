import React from "react";
import { SubNav } from "@primer/components";

interface Props {
  openQueue: boolean;
  onOpenQueueChange: (newValue: boolean) => void;
}

const OpenQueueSelect = ({ openQueue, onOpenQueueChange }: Props) => {
  const onChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newValue: boolean) => {
    event.preventDefault();
    event.currentTarget.blur();
    onOpenQueueChange(newValue);
  };

  return (
    <SubNav aria-label="Open queue or role queue">
      <SubNav.Link
        onClick={e => onChange(e, false)}
        selected={!openQueue}
      >Role queue</SubNav.Link>
      <SubNav.Link
        onClick={e => onChange(e, true)}
        selected={openQueue}
      >Open queue</SubNav.Link>
    </SubNav>
  );
};

export default OpenQueueSelect;
