import React from 'react';
import { DefaultMainMenu, TldrawUiMenuGroup, TldrawUiMenuItem, DefaultMainMenuContent } from '@tldraw/tldraw';

function CustomMainMenu({ onBackToOverview }) {
  return (
    <DefaultMainMenu>
      <TldrawUiMenuGroup id="custom-items">
        <TldrawUiMenuItem
          id="backToOverview"
          label="Back to Overview"
          icon="arrow_back"
          onSelect={onBackToOverview}
        />
      </TldrawUiMenuGroup>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
}

export default CustomMainMenu;
