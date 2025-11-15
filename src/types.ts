// src/types.ts
export type ModelProvider = 'google' | 'mistral' | 'zhipu' | 'groq' | 'cerebras';

export type ModelID =
  // Google Gemini Models
  | 'gemini-2.5-flash-lite'
  | 'gemini-2.5-flash'
  | 'gemma-3-27b-it'
  | 'gemini-2.5-pro'
  // ZhipuAI (GLM) Models
  | 'glm-4.5-flash'
  // Mistral Models
  | 'mistral-small-latest'
  | 'mistral-medium-latest'
  | 'mistral-large-latest'
  // Groq Models
  | 'llama-3.3-70b-versatile'
  | 'openai/gpt-oss-120b'
  | 'openai/gpt-oss-20b'
  | 'moonshotai/kimi-k2-instruct-0905'
  // Cerebras Models
  | 'gpt-oss-120b'
  | 'qwen-3-235b-a22b-instruct-2507'
  | 'zai-glm-4.6';

export interface APISettings {
  googleApiKey: string;
  zhipuApiKey: string;
  mistralApiKey: string;
  groqApiKey: string;
  cerebrasApiKey: string;
  selectedModel: ModelID;
  selectedProvider: ModelProvider;
}

export * from './types/book';
