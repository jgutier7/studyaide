import React from 'react';
import { track, useEditor, Vec } from 'tldraw'

const InFrontOfCanvas = track(() => {
  const editor = useEditor();

  const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds()
  if (!selectionRotatedPageBounds) return null

  // Get the viewport's bounds to ensure the button is visible within it
  const pageCoordinates = Vec.Sub(
    editor.pageToScreen(selectionRotatedPageBounds.point),
    editor.getViewportScreenBounds()
)
  // Here we set the position to be inside the viewport at the bottom-right corner
  // Adjust these values if the button still does not appear

  return (
    <div
    style={{
        position: 'absolute',
        top: Math.max(64, pageCoordinates.y - 64),
        left: Math.max(64, pageCoordinates.x),
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        background: '#efefef',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
    }}
      onClick={() => editor.trigger('suggestIdeas')}
    >
      <button>Suggest More Ideas from OpenAI</button>
    </div>
  );
});

export default InFrontOfCanvas;
