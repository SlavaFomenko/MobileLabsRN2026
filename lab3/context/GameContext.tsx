import React, {createContext, useContext, useState, useCallback, ReactNode} from 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
  icon: string;
}

interface GameContextType {
  score: number;
  addScore: (points: number) => void;
  resetScore: () => void;
  challenges: Challenge[];
  updateChallengeProgress: (id: string, increment: number) => void;
  tapCount: number;
  doubleTapCount: number;
  swipeRightDone: boolean;
  swipeLeftDone: boolean;
  dragDone: boolean;
  longPressDone: boolean;
  pinchDone: boolean;
}

const initialChallenges: Challenge[] = [
  {
    id: 'tap10',
    title: 'Tap 10 times',
    description: 'Tap on the clicker object 10 times',
    target: 10,
    progress: 0,
    completed: false,
    icon: '👆',
  },
  {
    id: 'doubletap5',
    title: 'Double-tap 5 times',
    description: 'Double-tap on the clicker 5 times',
    target: 5,
    progress: 0,
    completed: false,
    icon: '✌️',
  },
  {
    id: 'longpress',
    title: 'Long press 3 seconds',
    description: 'Hold the clicker for 3 seconds',
    target: 1,
    progress: 0,
    completed: false,
    icon: '🤚',
  },
  {
    id: 'drag',
    title: 'Drag the object',
    description: 'Drag the clicker around the screen',
    target: 1,
    progress: 0,
    completed: false,
    icon: '✋',
  },
  {
    id: 'swiperight',
    title: 'Swipe right',
    description: 'Perform a quick swipe right gesture',
    target: 1,
    progress: 0,
    completed: false,
    icon: '👉',
  },
  {
    id: 'swipeleft',
    title: 'Swipe left',
    description: 'Perform a quick swipe left gesture',
    target: 1,
    progress: 0,
    completed: false,
    icon: '👈',
  },
  {
    id: 'pinch',
    title: 'Pinch to resize',
    description: 'Use pinch gesture to resize the clicker',
    target: 1,
    progress: 0,
    completed: false,
    icon: '🤏',
  },
  {
    id: 'reach100',
    title: 'Reach 100 points',
    description: 'Accumulate 100 total points',
    target: 100,
    progress: 0,
    completed: false,
    icon: '🏆',
  },
  {
    id: 'combo',
    title: 'Combo Master',
    description: 'Use 3 different gesture types in a row',
    target: 3,
    progress: 0,
    completed: false,
    icon: '🎯',
  },
];

const GameContext = createContext<GameContextType>({
  score: 0,
  addScore: () => {},
  resetScore: () => {},
  challenges: initialChallenges,
  updateChallengeProgress: () => {},
  tapCount: 0,
  doubleTapCount: 0,
  swipeRightDone: false,
  swipeLeftDone: false,
  dragDone: false,
  longPressDone: false,
  pinchDone: false,
});

export const GameProvider = ({children}: {children: ReactNode}) => {
  const [score, setScore] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [tapCount, setTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [swipeRightDone, setSwipeRightDone] = useState(false);
  const [swipeLeftDone, setSwipeLeftDone] = useState(false);
  const [dragDone, setDragDone] = useState(false);
  const [longPressDone, setLongPressDone] = useState(false);
  const [pinchDone, setPinchDone] = useState(false);
  const [comboSet, setComboSet] = useState(new Set<string>());

  const updateChallengeById = useCallback((id: string, newProgress: number) => {
    setChallenges(prev =>
      prev.map(c => {
        if (c.id === id) {
          const progress = Math.min(newProgress, c.target);
          return {...c, progress, completed: progress >= c.target};
        }
        return c;
      }),
    );
  }, []);

  const addScore = useCallback(
    (points: number) => {
      setScore(prev => {
        const newScore = prev + points;
        updateChallengeById('reach100', newScore);
        return newScore;
      });
    },
    [updateChallengeById],
  );

  const resetScore = useCallback(() => {
    setScore(0);
    setTapCount(0);
    setDoubleTapCount(0);
    setSwipeRightDone(false);
    setSwipeLeftDone(false);
    setDragDone(false);
    setLongPressDone(false);
    setPinchDone(false);
    setComboSet(new Set());
    setChallenges(initialChallenges.map(c => ({...c, progress: 0, completed: false})));
  }, []);

  const updateChallengeProgress = useCallback(
    (id: string, increment: number) => {
      // Track combo gestures
      const gestureIds = ['tap10', 'doubletap5', 'longpress', 'drag', 'swiperight', 'swipeleft', 'pinch'];
      if (gestureIds.includes(id)) {
        setComboSet(prev => {
          const next = new Set(prev);
          next.add(id);
          const size = next.size;
          updateChallengeById('combo', size);
          return next;
        });
      }

      switch (id) {
        case 'tap10':
          setTapCount(prev => {
            const next = prev + increment;
            updateChallengeById('tap10', next);
            return next;
          });
          break;
        case 'doubletap5':
          setDoubleTapCount(prev => {
            const next = prev + increment;
            updateChallengeById('doubletap5', next);
            return next;
          });
          break;
        case 'longpress':
          setLongPressDone(true);
          updateChallengeById('longpress', 1);
          break;
        case 'drag':
          setDragDone(true);
          updateChallengeById('drag', 1);
          break;
        case 'swiperight':
          setSwipeRightDone(true);
          updateChallengeById('swiperight', 1);
          break;
        case 'swipeleft':
          setSwipeLeftDone(true);
          updateChallengeById('swipeleft', 1);
          break;
        case 'pinch':
          setPinchDone(true);
          updateChallengeById('pinch', 1);
          break;
        default:
          break;
      }
    },
    [updateChallengeById],
  );

  return (
    <GameContext.Provider
      value={{
        score,
        addScore,
        resetScore,
        challenges,
        updateChallengeProgress,
        tapCount,
        doubleTapCount,
        swipeRightDone,
        swipeLeftDone,
        dragDone,
        longPressDone,
        pinchDone,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
