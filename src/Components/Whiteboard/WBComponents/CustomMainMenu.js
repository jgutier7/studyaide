import React from 'react';
import { DefaultMainMenu, TldrawUiMenuGroup, TldrawUiMenuItem, DefaultMainMenuContent } from '@tldraw/tldraw';

function CustomMainMenu({ onBackToOverview, onSuggestIdeas, onGenerateQuiz }) {
  return (
    <DefaultMainMenu>
      <TldrawUiMenuGroup id="custom-items">
        <TldrawUiMenuItem
          id="backToOverview"
          label="Back to Overview"
          icon="arrow_back"
          onSelect={onBackToOverview}
        />
        <TldrawUiMenuItem
          id="suggestIdeas"
          label="Suggest More Ideas from OpenAI"
          icon="lightbulb" // Choose an appropriate icon or use "lightbulb" if suitable
          onSelect={onSuggestIdeas}
        />
        <TldrawUiMenuItem
          id="generateQuiz"
          label="Generate Quiz from OpenAI"
          icon="lightbulb" // Choose an appropriate icon or use "lightbulb" if suitable
          onSelect={onGenerateQuiz}
        />
      </TldrawUiMenuGroup>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
}

export default CustomMainMenu;
// import React from 'react';
// import { DefaultMainMenu, TldrawUiMenuGroup, TldrawUiMenuItem, DefaultMainMenuContent } from '@tldraw/tldraw';

// function CustomMainMenu({ onBackToOverview }) {
//   return (
//     <DefaultMainMenu>
//       <TldrawUiMenuGroup id="custom-items">
//         <TldrawUiMenuItem
//           id="backToOverview"
//           label="Back to Overview"
//           icon="arrow_back"
//           onSelect={onBackToOverview}
//         />
//       </TldrawUiMenuGroup>
//       <DefaultMainMenuContent />
//     </DefaultMainMenu>
//   );
// }

// export default CustomMainMenu;
