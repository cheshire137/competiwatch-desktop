import React from 'react';

interface Props {
  activePage: string;
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const ImportButton = ({ activePage, underlineNavItemClass }: Props) => {
  if (activePage !== 'import') {
    return null
  }

  return (
    <span
      className={underlineNavItemClass('import', false)}
    >Import</span>
  );
};

export default ImportButton;
