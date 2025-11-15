// /api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

// This function will only proxy requests for MegaLLM
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, model } = req.body;

  // ✅ CORRECTED: Use the private, server-side environment variable
  const apiKey = process.env.MEGALLM_API_KEY;
  const apiUrl = 'https://megallm.io/v1/chat/completions';
  
  if (!apiKey) {
    console.error('MegaLLM API key is not configured on the server. Check environment variables.');
    return res.status(500).json({ error: 'API key for MegaLLM is not configured on the server.' });
  }

  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 8192,
        stream: true,
      }),
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.json().catch(() => ({ message: 'Failed to parse error response' }));
        console.error('MegaLLM API Error:', errorBody);
        return res.status(apiResponse.status).json(errorBody);
    }
    
    // Set headers to stream the response back to the client
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Pipe the stream from MegaLLM directly to the client
    if (!apiResponse.body) {
        throw new Error("Response body is null");
    }
    const reader = apiResponse.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      res.write(decoder.decode(value));
    }
    
    res.end();

  } catch (error) {
    console.error('Proxy Error:', error instanceof Error ? error.message : String(error));
    res.status(500).json({ error: 'An unexpected error occurred in the proxy.' });
  }
}
