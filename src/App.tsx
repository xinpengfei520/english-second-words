import React from 'react';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import ResultPage from './components/ResultPage';
import { GameState, GameSettings, Word, WordResult } from './types';
import { getWords } from './mockData';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = React.useState<GameState>('start');
  const [gameSettings, setGameSettings] = React.useState<GameSettings | null>(null);
  const [words, setWords] = React.useState<Word[]>([]);
  const [results, setResults] = React.useState<WordResult[]>([]);

  const handleStartGame = (settings: GameSettings) => {
    setGameSettings(settings);
    const gameWords = getWords(settings.difficulty, settings.wordCount);
    setWords(gameWords);
    setResults([]);
    setGameState('playing');
  };

  const handleGameEnd = (gameResults: WordResult[]) => {
    setResults(gameResults);
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('start');
    setGameSettings(null);
    setWords([]);
    setResults([]);
  };

  return (
    <div className="app">
      {gameState === 'start' && (
        <StartPage onStartGame={handleStartGame} />
      )}
      
      {gameState === 'playing' && gameSettings && words.length > 0 && (
        <GamePage 
          words={words}
          settings={gameSettings}
          onGameEnd={handleGameEnd}
        />
      )}
      
      {gameState === 'result' && (
        <ResultPage 
          results={results}
          totalWords={words.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;