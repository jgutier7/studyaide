import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import CustomMainMenu from './CustomMainMenu';
import { useEditorEvents } from './hooks';
import { randomSelectColor } from './utils';

function Whiteboard() {
  const navigate = useNavigate();
  const { handleEvent } = useEditorEvents();
  const [editor, setEditor] = useState(null);
  const username = "Jacob";

  const handleBackToOverview = () => {
    navigate('/');
  };

  const components = {
    MainMenu: () => <CustomMainMenu onBackToOverview={handleBackToOverview} />,
  };

  return (
    <div className="whiteboard" style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        components={components}
        onMount={(editor) => {
          editor.user.updateUserPreferences({
            color: randomSelectColor(),
            name: username,
            isDarkMode: true,
          });
          editor.on('event', (event) => {
            setEditor(editor);
            handleEvent(event, editor);
          });
        }}
      />
    </div>
  );
}

export default Whiteboard;
