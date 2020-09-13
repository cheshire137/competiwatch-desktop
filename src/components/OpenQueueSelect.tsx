import React from "react";
import { SelectMenu, Button } from "@primer/components";

interface Props {
  openQueue: boolean;
  onOpenQueueChange: (newValue: boolean) => void;
}

const OpenQueueSelect = ({ openQueue, onOpenQueueChange }: Props) => {
  return (
    <SelectMenu>
      <Button as="summary">{openQueue ? 'Open queue' : 'Role queue'}</Button>
      <SelectMenu.Modal>
        <SelectMenu.Header>Queue type</SelectMenu.Header>
        <SelectMenu.List>
          <SelectMenu.Item
            onClick={() => onOpenQueueChange(false)}
            selected={!openQueue}
          >Role queue</SelectMenu.Item>
          <SelectMenu.Item
            onClick={() => onOpenQueueChange(true)}
            selected={openQueue}
          >Open queue</SelectMenu.Item>
        </SelectMenu.List>
      </SelectMenu.Modal>
    </SelectMenu>
  );
};

export default OpenQueueSelect;
