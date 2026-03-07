import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from './context/ThemeContext';
import {GameProvider} from './context/GameContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider>
        <GameProvider>
          <AppNavigator />
        </GameProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
