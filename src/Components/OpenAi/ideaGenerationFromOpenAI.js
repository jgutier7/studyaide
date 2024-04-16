import { Editor, TLShapeId, createShapeId } from '@tldraw/tldraw';
import { fetchFromOpenAi } from './fetchFromOpenAi';

const systemPrompt = `Imagine you're the GPT-4 AI, assigned to support a team in their brainstorming session. Your task is to generate at most 8 high-level ideas by referring to the existing ones and the topics under consideration. If user provide instruction, please provide ideas relevant to user requirement. Each idea should be concise. Note that there could be no idea existed at the time. Return the idea suggestions in the provided JSON format.`;

const assistantPrompt = `
The returned JSON objects should follow this format:
{
    "ideas": [
        {
            "text": "description of suggestion 1",
        },
        {
            "text": "description of suggestion 2",
        },
        ...
    ]
}
`;

async function generateIdeas({ existing_ideas, topic = "", instruction = "" }) {
    const prompt = await buildSuggestionPromptForOpenAi(existing_ideas, topic, instruction);

    try {
        const apiKeyFromDangerousApiKeyInput = document.body.querySelector('#openai_key_risky_but_cool')?.value;

        const openAiResponse = await fetchFromOpenAi(apiKeyFromDangerousApiKeyInput, {
            model: 'gpt-4-1106-preview',
            response_format: { type: 'json_object' },
            max_tokens: 4096,
            temperature: 0,
            messages: prompt,
        });

        if (openAiResponse.error) {
            throw new Error(openAiResponse.error.message);
        }

        const response = openAiResponse.choices[0].message.content;
        const parsed_res = JSON.parse(response);
        console.log('openAiResponse: ', parsed_res);

        return parsed_res.ideas;
    } catch (e) {
        throw e;
    }
}

async function buildSuggestionPromptForOpenAi(existing_ideas, topic, instruction) {
    const text = `Existing ideas: ${existing_ideas.map((idea) => idea).join(', ')}; Topic: ${topic ? topic : "No topic is provided"}`;

    const userMessages = [
        {
            type: 'text',
            text: 'Here are existing ideas and topic.',
        },
        {
            type: 'text',
            text: text !== '' ? text : 'Oh, it looks like there was not any note.',
        },
        {
            type: 'text',
            text: instruction !== '' ? "Following is user instruction for idea generation instruction: " + instruction : 'No instruction is provided, you should generate ideas based on the existing ideas and the topic.'
        }
    ];

    return [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessages },
        { role: 'assistant', content: assistantPrompt },
    ];
}
