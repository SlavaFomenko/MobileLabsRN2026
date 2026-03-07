import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

interface ScorePopupItem {
  id: number;
  points: number;
  x: number;
  y: number;
}

interface Props {
  popups: ScorePopupItem[];
  onRemove: (id: number) => void;
}

const Popup: React.FC<{item: ScorePopupItem; onDone: () => void}> = ({item, onDone}) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {toValue: 0, duration: 900, useNativeDriver: true}),
      Animated.timing(translateY, {toValue: -60, duration: 900, useNativeDriver: true}),
    ]).start(() => onDone());
  }, []);

  return (
    <Animated.View
      style={[
        styles.popup,
        {
          left: item.x - 20,
          top: item.y - 60,
          opacity,
          transform: [{translateY}],
        },
      ]}>
      <Text style={styles.text}>+{item.points}</Text>
    </Animated.View>
  );
};

const ScorePopup: React.FC<Props> = ({popups, onRemove}) => {
  return (
    <>
      {popups.map(p => (
        <Popup key={p.id} item={p} onDone={() => onRemove(p.id)} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    zIndex: 999,
    pointerEvents: 'none',
  },
  text: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2196F3',
    textShadowColor: '#fff',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default ScorePopup;
