
export enum AppMode {
  QA = 'QA',
  GUIDE = 'GUIDE',
  DIAGNOSIS = 'DIAGNOSIS'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  mode: AppMode;
  messages: Message[];
}
