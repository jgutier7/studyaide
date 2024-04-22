import React from 'react'
import {Tldraw, 
        createShapeId
} from '@tldraw/tldraw';
import { editor } from '@tldraw/editor'
import '@tldraw/tldraw/tldraw.css';
import { fetchFromOpenAi } from '../OpenAi/fetchFromOpenAi'; // Adjust the path as needed

const generateIdas = () => {
    fetchFromOpenAi(process.env.REACT_APP_OPENAI_API_KEY, body) {
        for (const [term, definition] of body) {
            var newShapeId = createShapeId()
            editor.createShape({
                "id": "newShapeId",
                "type": "geo",
                "x": 106,
                "y": 294,
                "props": {
                    "text": term,
                },
            })
        }
    }
}
