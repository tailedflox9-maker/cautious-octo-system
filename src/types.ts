// src/types.ts
export type ModelProvider = 'google' | 'mistral' | 'zhipu' | 'groq' | 'cerebras' | 'megallm';

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
  | 'zai-glm-4.6'
  // MegaLLM Models
  | 'gpt-5.1'
  | 'claude-sonnet-4-5-20250929'
  | 'claude-haiku-4-5-20251001'
  | 'gpt-5'
  | 'gpt-5-mini';

export interface APISettings {
  googleApiKey: string;
  zhipuApiKey: string;
  mistralApiKey: string;
  groqApiKey: string;
  cerebrasApiKey: string;
  megallmApiKey: string;
  selectedModel: ModelID;
  selectedProvider: ModelProvider;
}

export * from './types/book';
