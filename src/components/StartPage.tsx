import React from 'react';
import { Difficulty, GameSettings } from '../types';
import './StartPage.css';

interface StartPageProps {
  onStartGame: (settings: GameSettings) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const [difficulty, setDifficulty] = React.useState<Difficulty>('simple');
  const [wordCount, setWordCount] = React.useState(10);

  const difficultyOptions: { value: Difficulty; label: string }[] = [
    { value: 'simple', label: '简单' },
    { value: 'easy', label: '容易' },
    { value: 'hell', label: '地狱' },
  ];

  const wordCountOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  const handleStart = () => {
    onStartGame({ difficulty, wordCount });
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <h1 className="game-title">秒词</h1>
        <p className="game-subtitle">英语单词发音游戏</p>
        
        <div className="settings-section">
          <div className="setting-group">
            <h3 className="setting-title">难度选择</h3>
            <div className="difficulty-options">
              {difficultyOptions.map((option) => (
                <button
                  key={option.value}
                  className={`difficulty-btn ${difficulty === option.value ? 'active' : ''}`}
                  onClick={() => setDifficulty(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-group">
            <h3 className="setting-title">单词数量</h3>
            <div className="word-count-selector">
              <select
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="word-count-select"
              >
                {wordCountOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} 个单词
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button className="start-btn btn btn-primary" onClick={handleStart}>
          开始游戏
        </button>
      </div>
    </div>
  );
};

export default StartPage;