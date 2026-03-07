import React, {useRef, useState} from 'react';
import {View, Animated, StyleSheet, Text, Alert} from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
  Directions,
} from 'react-native-gesture-handler';
import {useGame} from '../context/GameContext';
import {useTheme} from '../context/ThemeContext';

interface Props {
  onScorePopup: (points: number, x: number, y: number) => void;
}

const BALL_SIZE = 120;

const ClickerBall: React.FC<Props> = ({onScorePopup}) => {
  const {addScore, updateChallengeProgress} = useGame();
  const {theme} = useTheme();

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef({x: 0, y: 0});

  const scale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const composedScale = Animated.multiply(baseScale, pinchScale);

  const pressAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.spring(pressAnim, {toValue: 0.88, useNativeDriver: true, speed: 50}),
      Animated.spring(pressAnim, {toValue: 1, useNativeDriver: true, speed: 30}),
    ]).start();
  };

  const singleTapRef = useRef(null);
  const doubleTapRef = useRef(null);

  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      addScore(1);
      updateChallengeProgress('tap10', 1);
      animatePress();
      onScorePopup(1, event.nativeEvent.absoluteX, event.nativeEvent.absoluteY);
    }
  };

  const onDoubleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      addScore(2);
      updateChallengeProgress('doubletap5', 1);
      animatePress();
      onScorePopup(2, event.nativeEvent.absoluteX, event.nativeEvent.absoluteY);
    }
  };

  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onLongPress = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsLongPressing(true);
      longPressTimer.current = setTimeout(() => {
        addScore(5);
        updateChallengeProgress('longpress', 1);
        onScorePopup(5, 200, 300);
        setIsLongPressing(false);
      }, 100);
    }
    if (
      event.nativeEvent.state === State.END ||
      event.nativeEvent.state === State.CANCELLED ||
      event.nativeEvent.state === State.FAILED
    ) {
      setIsLongPressing(false);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    }
  };

  const onPan = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      translateX.setValue(lastOffset.current.x + event.nativeEvent.translationX);
      translateY.setValue(lastOffset.current.y + event.nativeEvent.translationY);
    }
    if (event.nativeEvent.state === State.END) {
      lastOffset.current.x += event.nativeEvent.translationX;
      lastOffset.current.y += event.nativeEvent.translationY;
      updateChallengeProgress('drag', 1);
    }
  };

  const onFlingRight = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const pts = Math.floor(Math.random() * 10) + 1;
      addScore(pts);
      updateChallengeProgress('swiperight', 1);
      onScorePopup(pts, 200, 300);
    }
  };

  const onFlingLeft = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const pts = Math.floor(Math.random() * 10) + 1;
      addScore(pts);
      updateChallengeProgress('swipeleft', 1);
      onScorePopup(pts, 200, 300);
    }
  };

  const onPinch = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const newScale = Math.max(0.5, Math.min(2.5, lastScale.current * event.nativeEvent.scale));
      scale.setValue(newScale);
    }
    if (event.nativeEvent.state === State.END) {
      lastScale.current = Math.max(0.5, Math.min(2.5, lastScale.current * event.nativeEvent.scale));
      addScore(3);
      updateChallengeProgress('pinch', 1);
      onScorePopup(3, 200, 300);
    }
  };

  const flingRightRef = useRef(null);
  const flingLeftRef = useRef(null);
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const longPressRef = useRef(null);

  return (
    <PinchGestureHandler ref={pinchRef} onHandlerStateChange={onPinch} simultaneousHandlers={[panRef]}>
      <Animated.View style={styles.wrapper}>
        <FlingGestureHandler
          ref={flingRightRef}
          direction={Directions.RIGHT}
          onHandlerStateChange={onFlingRight}>
          <FlingGestureHandler
            ref={flingLeftRef}
            direction={Directions.LEFT}
            onHandlerStateChange={onFlingLeft}>
            <PanGestureHandler ref={panRef} onHandlerStateChange={onPan} minDist={10}>
              <Animated.View
                style={[
                  styles.ballWrapper,
                  {
                    transform: [{translateX}, {translateY}],
                  },
                ]}>
                <LongPressGestureHandler
                  ref={longPressRef}
                  onHandlerStateChange={onLongPress}
                  minDurationMs={800}>
                  <Animated.View>
                    <TapGestureHandler
                      ref={doubleTapRef}
                      onHandlerStateChange={onDoubleTap}
                      numberOfTaps={2}>
                      <Animated.View>
                        <TapGestureHandler
                          ref={singleTapRef}
                          onHandlerStateChange={onSingleTap}
                          numberOfTaps={1}
                          waitFor={doubleTapRef}>
                          <Animated.View
                            style={[
                              styles.ball,
                              {
                                backgroundColor: isLongPressing
                                  ? theme.colors.secondary
                                  : theme.colors.primary,
                                transform: [
                                  {scale: Animated.multiply(pressAnim, scale)},
                                ],
                              },
                            ]}>
                            <Text style={styles.icon}>👆</Text>
                            <Text style={styles.label}>TAP ME</Text>
                          </Animated.View>
                        </TapGestureHandler>
                      </Animated.View>
                    </TapGestureHandler>
                  </Animated.View>
                </LongPressGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  ballWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  icon: {
    fontSize: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.5,
    marginTop: 4,
  },
});

export default ClickerBall;
