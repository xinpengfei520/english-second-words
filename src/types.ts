// 游戏难度类型
export type Difficulty = 'simple' | 'easy' | 'hell';

// 单词数据类型
export interface Word {
  id: number;
  text: string;
  pronunciation?: string;
}

// 单词结果类型
export interface WordResult {
  wordId: number;
  score: number;
  hasAudio: boolean;
}

// 游戏设置类型
export interface GameSettings {
  difficulty: Difficulty;
  wordCount: number;
}

// 游戏状态类型
export type GameState = 'start' | 'playing' | 'result';

// 游戏统计类型
export interface GameStats {
  totalWords: number;
  unreadWords: number;
  readWords: number;
  averageScoreOfRead: number;
  averageScoreOfAll: number;
}