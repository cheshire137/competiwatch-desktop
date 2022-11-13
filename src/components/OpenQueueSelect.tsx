import React from "react";
import { ActionMenu, Button } from "@primer/react";

interface Props {
  openQueue: boolean;
  onOpenQueueChange: (newValue: boolean) => void;
}

const OpenQueueSelect = ({ openQueue, onOpenQueueChange }: Props) => {
  return (
    <ActionMenu mr={3}>
      <Button as="summary">{openQueue ? 'Open queue' : 'Role queue'}</Button>
      <ActionMenu.Modal>
        <ActionMenu.Header>Queue type</ActionMenu.Header>
        <ActionMenu.List>
          <ActionMenu.Item
            onClick={() => onOpenQueueChange(false)}
            selected={!openQueue}
          >Role queue</ActionMenu.Item>
          <ActionMenu.Item
            onClick={() => onOpenQueueChange(true)}
            selected={openQueue}
          >Open queue</ActionMenu.Item>
        </ActionMenu.List>
      </ActionMenu.Modal>
    </ActionMenu>
  );
};

export default OpenQueueSelect;
