import { fetchFromOpenAi } from './fetchFromOpenAi';

export async function createQuiz(studyBoard, selectedClass, topics) {
    // Construct the prompt dynamically based on the selected class and topics
    const prompt = `Based on previous exams from ${studyBoard} for the AP ${selectedClass}, quiz me on these topics: ${topics.join(', ')}. [user has selected multiple choice quiz] Provide the questions, options, and correct answers in JSON format.`;

    const body = {
        model: "gpt-4-1106-preview", // or any other suitable model
        prompt: prompt,
        response_format: { type: 'json_object' },
        max_tokens: 800 // Adjusted max tokens to provide ample space for detailed questions and multiple options
    };

    try {
        const quizData = await fetchFromOpenAi(process.env.REACT_APP_OPENAI_API_KEY, body);
        // Assuming the API returns the data directly in the desired format:
        const formattedQuiz = JSON.parse(quizData); // Parse the JSON string to an object
        console.log('Quiz Data:', formattedQuiz);
        return formattedQuiz; // Return the parsed JSON object
    } catch (error) {
        console.error('Error creating quiz: ', error);
        throw error;
    }
}
