import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
// import InFrontOfCanvas from './WBComponents/InFrontOfCanvas'; 
import CustomMainMenu from './WBComponents/CustomMainMenu';
import { useEditorEvents } from './hooks';
import { randomSelectColor } from './utils';
import { fetchFromOpenAi } from '../OpenAi/fetchFromOpenAi'; // Adjust the path as needed

function Whiteboard() {
  const navigate = useNavigate();
  const { handleEvent } = useEditorEvents();
  const [editor, setEditor] = useState(null);
  const username = "Jacob";

  const handleBackToOverview = () => navigate('/');

  const components = {
    MainMenu: () => <CustomMainMenu onBackToOverview={handleBackToOverview} onSuggestIdeas={sendToOpenAi} />,
    // MainMenu: () => <CustomMainMenu onBackToOverview={handleBackToOverview} />,
    // InFrontOfTheCanvas: () => <InFrontOfCanvas onSuggestIdeas={sendToOpenAi} />,
  };

  const sendToOpenAi = useCallback(async () => {
    if (!editor) return;
  
    const shapes = editor.getCurrentPageShapes();
    const textPrompt = shapes.map(shape => shape.props.text).join('\n');
    console.log(textPrompt)

    const body = {
      model: "gpt-3.5-turbo", // Specify the model you have access to, e.g., "gpt-4" or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to support AP Biology students. Your task is to help the user understand AP Biology concepts deeply, provide personalized study tips, and generate quizzes and flashcards based on AP curriculum. You should adapt your responses to fit Joe's study schedule, his learning style, and his pace. Encourage active learning and critical thinking and help him draw connections between concepts. You will get a list of notes that the user already has, and you will make suggestions of new concepts or notes the student can learn that are related to what they currently have"
        },
        {
          role: "user",
          content: "Here are the terms and definitions I've gathered from my study session on the whiteboard: " + textPrompt + ". Based on these notes, can you suggest additional important terms, definitions, or concepts that I should focus on for my AP Biology exam? Please provide these in JSON format."
        }
      ],
      max_tokens: 3000
    };
  
    try {
      const response = await fetchFromOpenAi(process.env.REACT_APP_OPENAI_API_KEY, body);
      const messageContent = response.choices[0].message;
      console.log(messageContent);

    } catch (error) {
      console.error('Error sending data to OpenAI:', error);
    }
  }, [editor]);
  
  
  // const handleSuggestIdeas = useCallback(() => {
  //   console.log("Suggesting Ideas");
  //   sendToOpenAi();
  // }, [sendToOpenAi]);
  // const handleSuggestIdeas = useCallback(() => {
  //   if (editor) {
  //     sendToOpenAi();
  // }, [editor, sendToOpenAi]);
  
  return (
    <div className="whiteboard" style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        components={components}
        onMount={(setEditorInstance) => {
          if (setEditorInstance) {
            setEditor(setEditorInstance);
            setEditorInstance.user.updateUserPreferences({
              color: randomSelectColor(),
              name: username,
              isDarkMode: true,
            });
            setEditorInstance.on('event', (event) => {
              handleEvent(event, setEditorInstance);
            });
          }
        }}
      />
    </div>
  );
}

export default Whiteboard;
