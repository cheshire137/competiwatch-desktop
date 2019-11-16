import React from 'react';

interface Props {
  activePage: string;
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const EditMatchButton = ({ activePage, underlineNavItemClass }: Props) => {
  if (activePage !== 'edit-match') {
    return null
  }

  return (
    <span
      className={underlineNavItemClass('edit-match', false)}
    >Edit match</span>
  );
};

export default EditMatchButton;
