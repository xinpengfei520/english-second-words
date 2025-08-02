import React from 'react';
import { Word, WordResult, GameSettings } from '../types';
import { mockScoring } from '../mockData';
import './GamePage.css';

interface GamePageProps {
  words: Word[];
  settings: GameSettings;
  onGameEnd: (results: WordResult[]) => void;
}

const GamePage: React.FC<GamePageProps> = ({ words, settings, onGameEnd }) => {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [results, setResults] = React.useState<WordResult[]>([]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [wordTimer, setWordTimer] = React.useState(2); // 每个单词2秒倒计时
  const [gameTime, setGameTime] = React.useState(0); // 游戏总时间
  const [isWordActive, setIsWordActive] = React.useState(false);
  const wordsListRef = React.useRef<HTMLDivElement>(null);

  // 游戏总时间计时器
  React.useEffect(() => {
    if (!gameStarted) return;
    
    const timer = setInterval(() => {
      setGameTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  // 单词倒计时
  React.useEffect(() => {
    if (!isWordActive || wordTimer <= 0) return;

    const timer = setTimeout(() => {
      setWordTimer(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [wordTimer, isWordActive]);

  // 当倒计时结束时自动评分
  React.useEffect(() => {
    if (wordTimer === 0 && isWordActive) {
      handleWordComplete();
    }
  }, [wordTimer, isWordActive]);

  // 自动滚动到当前单词
  React.useEffect(() => {
    if (wordsListRef.current && gameStarted) {
      const currentWordElement = wordsListRef.current.children[currentWordIndex] as HTMLElement;
      if (currentWordElement) {
        currentWordElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentWordIndex, gameStarted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setIsWordActive(true);
      setWordTimer(2);
    }
    setIsRecording(!isRecording);
  };

  const handleWordComplete = () => {
    const currentWord = words[currentWordIndex];
    const scoring = mockScoring();
    
    const newResult: WordResult = {
      wordId: currentWord.id,
      score: scoring.score,
      hasAudio: scoring.hasAudio,
    };

    const newResults = [...results, newResult];
    setResults(newResults);
    setIsWordActive(false);

    // 检查是否还有下一个单词
    if (currentWordIndex < words.length - 1) {
      // 延迟一下再切换到下一个单词
      setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
        setWordTimer(2);
        setIsWordActive(true);
      }, 500);
    } else {
      // 游戏结束
      setTimeout(() => {
        onGameEnd(newResults);
      }, 1000);
    }
  };

  const handleEndGame = () => {
    // 为未完成的单词添加0分结果
    const remainingResults: WordResult[] = [];
    for (let i = currentWordIndex; i < words.length; i++) {
      remainingResults.push({
        wordId: words[i].id,
        score: 0,
        hasAudio: false,
      });
    }
    onGameEnd([...results, ...remainingResults]);
  };

  const getWordResult = (wordId: number): WordResult | undefined => {
    return results.find(result => result.wordId === wordId);
  };

  const progress = ((currentWordIndex + (isWordActive ? 1 : 0)) / words.length) * 100;

  return (
    <div className="game-page">
      <div className="game-container">
        {/* 顶部进度条和时间 */}
        <div className="top-section">
          <div className="word-progress">
            {currentWordIndex + 1}/{words.length}
          </div>
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="game-time">{formatTime(gameTime)}</div>
          </div>
        </div>

        {/* 单词列表 */}
        <div className="words-section">
          <div className="words-list" ref={wordsListRef}>
            {words.map((word, index) => {
              const result = getWordResult(word.id);
              const isCurrent = index === currentWordIndex;
              const isCompleted = result !== undefined;
              
              return (
                <div 
                  key={word.id} 
                  className={`word-item ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <div className="word-text">{word.text}</div>
                  
                  {isCurrent && isWordActive && !isCompleted && (
                    <div className="word-timer">
                      <div 
                        className="timer-bar"
                        style={{ width: `${(wordTimer / 2) * 100}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="word-result">
                      <div className={`result-icon ${result.hasAudio ? 'success' : 'error'}`}>
                        {result.hasAudio ? '✓' : '✗'}
                      </div>
                      <div className="result-score">{result.score}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部录音按钮 */}
        <div className="bottom-section">
          <button 
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleStartRecording}
          >
            {!gameStarted ? '🎤' : isRecording ? '✗' : '🎤'}
          </button>
          <div className="record-hint">
            {!gameStarted ? '点击开始游戏' : '请大声朗读出单词'}
          </div>
          {gameStarted && (
            <button className="end-game-btn btn btn-danger" onClick={handleEndGame}>
              结束游戏
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;