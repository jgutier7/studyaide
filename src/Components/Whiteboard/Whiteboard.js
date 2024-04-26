import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
// import InFrontOfCanvas from './WBComponents/InFrontOfCanvas'; 
import CustomMainMenu from './WBComponents/CustomMainMenu'
import { useEditorEvents } from './hooks';
//import { Modal } from 'react-bootstrap';
import Modal from 'react-modal';
import { randomSelectColor } from './utils';
import { fetchFromOpenAi } from '../OpenAi/fetchFromOpenAi'; // Adjust the path as needed
import { createQuiz } from '../OpenAi/QuizCreator'; // Adjust the path as needed

function Whiteboard() {
  const navigate = useNavigate();
  const { handleEvent } = useEditorEvents();
  const [editor, setEditor] = useState(null);
  const username = "Jacob";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleBackToOverview = () => navigate('/');

  const components = {
    MainMenu: () => <CustomMainMenu onBackToOverview={handleBackToOverview} onSuggestIdeas={sendToOpenAi} onGenerateQuiz={handleQuizGeneration} />,
    // MainMenu: () => <CustomMainMenu onBackToOverview={handleBackToOverview} />,
    // InFrontOfTheCanvas: () => <InFrontOfCanvas onSuggestIdeas={sendToOpenAi} />,
    TopPanel: CustomTopZone,
    SharePanel: CustomShareZone,
  };

  const handleQuizGeneration = async () => {
    const studyBoard = 'CollegeBoard';
    const selectedClass = 'Biology';
    const topics = ['Heredity', 'Molecular Genetics'];
    try {
      const quiz = await createQuiz(studyBoard, selectedClass, topics);
      console.log('Generated Quiz:', quiz);
      setQuizQuestions(quiz.questions); // Adjust according to your actual data structure
      setModalIsOpen(true);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
    }
  };

  const displaySuggestedTerms = useCallback((suggestedTerms) => {
    if (!editor || !suggestedTerms) return;
  
    const terms = JSON.parse(suggestedTerms).suggested_terms;
    console.log("Terms",terms);
    if (!terms) return;
  
    const shapes = terms.flatMap((term, index) => {
      const baseY = 100 + index * 60; // Adjust spacing between entries 
      return [
        {
          type: 'text',
          id: undefined,
          parentId: "page",
          x: 100,
          y: baseY,
          props: {
            text: `${term.term}`,
            color: 'black',
            size: 'm',
            font: 'sans',
            align: 'start',
            w: 400,
            autoSize: true,
            scale: 1,
          }
        },
        {
          type: 'text',
          id: undefined,
          parentId: "page",
          x: 250, // Indent the definition for clear separation
          y: 100 + Math.random(1, 100), // Slightly lower than the term
          props: {
            text: `${term.definition}`,
            color: 'grey', // Different color to distinguish from the term
            size: 's', // Smaller size for definitions
            font: 'sans',
            align: 'start',
            w: 350,
            autoSize: true,
            scale: 1,
          }
        }
      ];
    });
  
    try {
      editor.createShapes(shapes);
    } catch (error) {
      console.error('Error creating shapes in tldraw:', error);
    }
  }, [editor]);
  
  
  
  
  
  const sendToOpenAi = useCallback(async () => {
    if (!editor) return;
  
    const shapes = editor.getCurrentPageShapes();
    const textPrompt = shapes.map(shape => shape.props.text).join('\n');
    console.log(textPrompt)

    const body = {
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to support AP Biology students. Your task is to help the user understand AP Biology concepts deeply, provide personalized study tips, and generate quizzes and flashcards based on AP curriculum. You should adapt your responses to fit Joe's study schedule, his learning style, and his pace. Encourage active learning and critical thinking and help him draw connections between concepts. You will get a list of notes that the user already has, and you will make suggestions of new concepts or notes the student can learn that are related to what they currently have"
        },
        {
          role: "user",
          content: "Here are the terms and definitions I've gathered from my study session on the whiteboard: " + textPrompt + ". Based on these notes, can you suggest additional important terms, definitions, or concepts (max 10) that I should focus on for my AP Biology exam? Respond in a JSON format such that it's structured like: {suggested_terms: [{term:, defintion:}, ...] }"
        }
      ],
      max_tokens: 3000
    };
  
    try {
        const response = await fetchFromOpenAi(process.env.REACT_APP_OPENAI_API_KEY, body);
        if (response.choices && response.choices[0] && response.choices[0].message) {
          const suggestedTerms = response.choices[0].message.content;
          console.log(suggestedTerms)
          displaySuggestedTerms(suggestedTerms);
        }
      } catch (error) {
        console.error('Error sending data to OpenAI:', error);
      }
    }, [editor, displaySuggestedTerms]);
  
  
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
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <div>
        {quizQuestions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <div>
              {Object.entries(question.options).map(([key, value]) => (
                <button key={key}>{key.toUpperCase()}: {value}</button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </div>
    </Modal>
    </div>
  );
}

function CustomTopZone() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Increase progress by a small amount (e.g., 1%) every second
        // currently 60 second time
        const newProgress = prevProgress + 0.5;
        // Reset progress to 0 when it reaches 100%
        return newProgress;
        //newProgress >= 100 ? 0 : newProgress;
      });
    }, 1000); // Update progress every second

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  return (
    <div
      style={{
        width: '450px', // Width of the rectangle
        height: '30px', // Height of the rectangle
        position: 'relative',
        border: '2px',
        borderRadius: '8px',
        backgroundColor: '#2B2B2B', // Background color of the rectangle
        overflow: 'hidden', // Hide overflow content
      }}
    >
      <div
        style={{
          width: `${progress}%`, // Fill width based on progress
          height: '100%', // Height of the filling (same as parent)
          backgroundColor: '#CE51C9', // Color of the filling
          transition: 'width 1s', // Smooth transition effect
        }}
      />
    </div>
  );
}

function CustomShareZone() {
  return (
    <div
      style={{
        width: '160px', // Width of the rectangle
        height: '200px', // Height of the rectangle
        padding: '5px',
        textAlign: 'left', 
        border: '2px',
        borderRadius: '8px',
        position: 'relative',
        backgroundColor: '#2B2B2B', // Background color of the rectangle
        overflow: 'hidden', // Hide overflow content
      }}
    >
      <h4>Let's start studying:</h4>
      <ul>
        <li>Add terms and definitions</li>
        <li>Upload diagrams or images</li>
        <li>Group terms with shapes</li>
        <li>Draw connections</li>
      </ul>
      <p>Stuck? Suggest more terms from OpenAI</p>
    </div>
  )
}

export default Whiteboard;
