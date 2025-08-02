import { Word, Difficulty } from './types';

// Mock单词数据
const mockWords: Record<Difficulty, Word[]> = {
  simple: [
    { id: 1, text: 'cat' },
    { id: 2, text: 'dog' },
    { id: 3, text: 'book' },
    { id: 4, text: 'pen' },
    { id: 5, text: 'car' },
    { id: 6, text: 'sun' },
    { id: 7, text: 'moon' },
    { id: 8, text: 'tree' },
    { id: 9, text: 'fish' },
    { id: 10, text: 'bird' },
    { id: 11, text: 'house' },
    { id: 12, text: 'water' },
    { id: 13, text: 'fire' },
    { id: 14, text: 'food' },
    { id: 15, text: 'hand' },
    { id: 16, text: 'eye' },
    { id: 17, text: 'ear' },
    { id: 18, text: 'nose' },
    { id: 19, text: 'mouth' },
    { id: 20, text: 'head' },
  ],
  easy: [
    { id: 21, text: 'computer' },
    { id: 22, text: 'telephone' },
    { id: 23, text: 'beautiful' },
    { id: 24, text: 'important' },
    { id: 25, text: 'different' },
    { id: 26, text: 'interesting' },
    { id: 27, text: 'wonderful' },
    { id: 28, text: 'education' },
    { id: 29, text: 'information' },
    { id: 30, text: 'development' },
    { id: 31, text: 'environment' },
    { id: 32, text: 'government' },
    { id: 33, text: 'management' },
    { id: 34, text: 'technology' },
    { id: 35, text: 'university' },
    { id: 36, text: 'restaurant' },
    { id: 37, text: 'hospital' },
    { id: 38, text: 'library' },
    { id: 39, text: 'museum' },
    { id: 40, text: 'airport' },
  ],
  hell: [
    { id: 41, text: 'pronunciation' },
    { id: 42, text: 'responsibility' },
    { id: 43, text: 'characteristics' },
    { id: 44, text: 'administration' },
    { id: 45, text: 'representative' },
    { id: 46, text: 'internationalization' },
    { id: 47, text: 'incomprehensible' },
    { id: 48, text: 'antidisestablishmentarianism' },
    { id: 49, text: 'pneumonoultramicroscopicsilicovolcanoconiosiss' },
    { id: 50, text: 'supercalifragilisticexpialidocious' },
    { id: 51, text: 'pseudopseudohypoparathyroidism' },
    { id: 52, text: 'floccinaucinihilipilification' },
    { id: 53, text: 'hippopotomonstrosesquippedaliophobia' },
    { id: 54, text: 'spectrophotofluorometrically' },
    { id: 55, text: 'psychoneuroendocrinological' },
    { id: 56, text: 'radioimmunoelectrophoresis' },
    { id: 57, text: 'immunoelectrophoretically' },
    { id: 58, text: 'tetraiodophenolphthalein' },
    { id: 59, text: 'hepaticocholangiogastrostomy' },
    { id: 60, text: 'pneumoencephalographically' },
  ]
};

// 获取指定难度和数量的单词
export const getWords = (difficulty: Difficulty, count: number): Word[] => {
  const words = mockWords[difficulty];
  const result: Word[] = [];
  
  // 如果需要的数量超过该难度的单词数，就重复使用
  for (let i = 0; i < count; i++) {
    const wordIndex = i % words.length;
    const originalWord = words[wordIndex];
    result.push({
      ...originalWord,
      id: i + 1, // 重新分配ID以确保唯一性
    });
  }
  
  return result;
};

// 模拟录音评分
export const mockScoring = (): { score: number; hasAudio: boolean } => {
  // 80%的概率有录音，20%的概率没有录音
  const hasAudio = Math.random() > 0.2;
  
  if (!hasAudio) {
    return { score: 0, hasAudio: false };
  }
  
  // 有录音的情况下，随机生成1-100的分数
  // 为了让游戏更有趣，我们让分数偏向高分
  const score = Math.floor(Math.random() * 40) + 60; // 60-100分
  return { score, hasAudio: true };
};