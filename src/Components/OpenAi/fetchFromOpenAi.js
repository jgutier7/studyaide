export async function fetchFromOpenAi(providedApiKey, body) {
	const apiKey = providedApiKey || process.env.REACT_APP_OPENAI_API_KEY; 
	if (!apiKey) {
	  throw new Error(
		'You need to provide an API key. Make sure REACT_APP_OPENAI_API_KEY is set in your .env file.'
	  );
	}
  
	try {
	  const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify(body),
	  });
  
	  return await response.json();
	} catch (e) {
	  console.error(e);
	  throw new Error('Sorry, there was an error fetching from OpenAI');
	}
  }
 