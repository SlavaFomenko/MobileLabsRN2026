import React, {useState, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useGame} from '../context/GameContext';
import {useTheme} from '../context/ThemeContext';
import ClickerBall from '../components/ClickerBall';
import ScorePopup from '../components/ScorePopup';
import {
  SafeContainer,
  Header,
  HeaderTitle,
  ScoreCard,
  ScoreLabel,
  ScoreValue,
  Card,
  HintRow,
  HintIcon,
  HintText,
} from '../components/StyledComponents';

interface Popup {
  id: number;
  points: number;
  x: number;
  y: number;
}

let popupCounter = 0;

const HINTS = [
  {icon: '👆', text: 'Tap: +1 point'},
  {icon: '✌️', text: 'Double-tap: +2 points'},
  {icon: '🤚', text: 'Long-press (3s): +5 points'},
  {icon: '👉', text: 'Swipe: +1-10 random points'},
  {icon: '🤏', text: 'Pinch: +3 points'},
];

const GameScreen: React.FC = () => {
  const {score} = useGame();
  const {theme} = useTheme();
  const [popups, setPopups] = useState<Popup[]>([]);

  const handleScorePopup = useCallback((points: number, x: number, y: number) => {
    const id = ++popupCounter;
    setPopups(prev => [...prev, {id, points, x, y}]);
  }, []);

  const removePopup = useCallback((id: number) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <SafeContainer theme={theme}>
      <Header theme={theme}>
        <HeaderTitle theme={theme}>≡ Gesture Clicker</HeaderTitle>
      </Header>

      <ScoreCard theme={theme}>
        <ScoreLabel theme={theme}>SCORE</ScoreLabel>
        <ScoreValue theme={theme}>{score}</ScoreValue>
      </ScoreCard>

      <View style={styles.clickerArea}>
        <ClickerBall onScorePopup={handleScorePopup} />
      </View>

      <Card theme={theme} style={styles.hintsCard}>
        {HINTS.map((h, i) => (
          <HintRow key={i}>
            <HintIcon>{h.icon}</HintIcon>
            <HintText theme={theme}>{h.text}</HintText>
          </HintRow>
        ))}
      </Card>

      <ScorePopup popups={popups} onRemove={removePopup} />
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  clickerArea: {
    flex: 1,
    minHeight: 200,
  },
  hintsCard: {
    marginBottom: 8,
  },
});

export default GameScreen;
