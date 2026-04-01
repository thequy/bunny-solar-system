'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '@/data/quiz';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTION_COUNT = 10;

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const isMounted = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shuffledQuestions = useMemo(() => {
    const shuffled = shuffleArray(QUIZ_QUESTIONS);
    return shuffled.slice(0, QUESTION_COUNT);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    isMounted.current = true;
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
    setStreak(0);
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  const handleAnswer = useCallback((answer: number) => {
    if (!isMounted.current) return;
    setSelectedAnswer(answer);
    const correct = answer === shuffledQuestions[currentQuestion].correct;
    if (correct) {
      setScore(s => s + 10 + streak * 2);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    timeoutRef.current = setTimeout(() => {
      if (!isMounted.current) return;
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        setShowResult(true);
      }
    }, 1000);
  }, [currentQuestion, streak, shuffledQuestions]);

  useEffect(() => {
    if (!isOpen || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, currentQuestion, showResult, handleAnswer]);

  if (!isOpen) return null;

  if (showResult) {
    return (
      <div className="modal-overlay visible" onClick={onClose}>
        <div className="modal glass-panel" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Kết quả Quiz</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffd700' }}>
              {score} điểm
            </div>
            <p>Bạn đã hoàn thành quiz!</p>
          </div>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Quiz Hệ Mặt Trời</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span>Câu {currentQuestion + 1}/{shuffledQuestions.length}</span>
            <span style={{ color: timeLeft <= 5 ? '#ff4444' : '#ffd700' }}>
              ⏱️ {timeLeft}s
            </span>
            <span>Điểm: {score}</span>
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            height: '8px', 
            borderRadius: '4px',
            marginBottom: '20px' 
          }}>
            <div style={{ 
              background: '#ffd700', 
              height: '100%', 
              borderRadius: '4px',
              width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`,
              transition: 'width 0.3s'
            }} />
          </div>
          <div style={{ fontSize: '18px', marginBottom: '24px', fontWeight: '500' }}>
            {question.question}
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                style={{
                  padding: '16px',
                  border: selectedAnswer === index
                    ? index === question.correct ? '2px solid #00ff00' : '2px solid #ff0000'
                    : '2px solid rgba(100, 150, 255, 0.3)',
                  borderRadius: '8px',
                  background: selectedAnswer === index
                    ? index === question.correct ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'
                    : 'rgba(30, 30, 60, 0.8)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
