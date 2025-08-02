import React from 'react';
import { WordResult, GameStats } from '../types';
import './ResultPage.css';

interface ResultPageProps {
  results: WordResult[];
  totalWords: number;
  onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ results, totalWords, onRestart }) => {
  const calculateStats = (): GameStats => {
    const readWords = results.filter(result => result.hasAudio);
    const unreadWords = results.filter(result => !result.hasAudio);
    
    const totalScoreOfRead = readWords.reduce((sum, result) => sum + result.score, 0);
    const totalScoreOfAll = results.reduce((sum, result) => sum + result.score, 0);
    
    const averageScoreOfRead = readWords.length > 0 ? Math.round(totalScoreOfRead / readWords.length) : 0;
    const averageScoreOfAll = Math.round(totalScoreOfAll / totalWords);
    
    return {
      totalWords,
      unreadWords: unreadWords.length,
      readWords: readWords.length,
      averageScoreOfRead,
      averageScoreOfAll,
    };
  };

  const stats = calculateStats();
  
  const getPerformanceLevel = (score: number): { level: string; color: string; emoji: string } => {
    if (score >= 90) return { level: '优秀', color: '#4caf50', emoji: '🏆' };
    if (score >= 80) return { level: '良好', color: '#2196f3', emoji: '👍' };
    if (score >= 70) return { level: '一般', color: '#ff9800', emoji: '😊' };
    if (score >= 60) return { level: '及格', color: '#ff5722', emoji: '😐' };
    return { level: '需要努力', color: '#f44336', emoji: '💪' };
  };

  const performance = getPerformanceLevel(stats.averageScoreOfAll);

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-header">
          <h1 className="result-title">游戏结束</h1>
          <p className="result-subtitle">让我们看看你的表现吧！</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalWords}</div>
            <div className="stat-label">总单词数</div>
          </div>
          
          <div className="stat-card success">
            <div className="stat-number">{stats.readWords}</div>
            <div className="stat-label">已读单词</div>
          </div>
          
          <div className="stat-card error">
            <div className="stat-number">{stats.unreadWords}</div>
            <div className="stat-label">未读单词</div>
          </div>
          
          <div className="stat-card primary">
            <div className="stat-number">{stats.averageScoreOfRead}</div>
            <div className="stat-label">已读平均分</div>
          </div>
          
          <div className="stat-card highlight" style={{ backgroundColor: performance.color }}>
            <div className="stat-number">{stats.averageScoreOfAll}</div>
            <div className="stat-label">总体平均分</div>
          </div>
        </div>

        <div className="performance-section">
          <div className="performance-badge" style={{ backgroundColor: performance.color }}>
            <span className="performance-emoji">{performance.emoji}</span>
            <span className="performance-level">{performance.level}</span>
          </div>
        </div>

        <div className="detailed-results">
          <h3 className="section-title">详细结果</h3>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={result.wordId} className={`result-item ${result.hasAudio ? 'read' : 'unread'}`}>
                <div className="result-index">{index + 1}</div>
                <div className="result-status">
                  <div className={`status-icon ${result.hasAudio ? 'success' : 'error'}`}>
                    {result.hasAudio ? '✓' : '✗'}
                  </div>
                </div>
                <div className="result-score-detail">{result.score}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="result-actions">
          <button className="restart-btn btn btn-primary" onClick={onRestart}>
            再来一局
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;