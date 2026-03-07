import React from 'react';
import {ScrollView, Switch, View, Text, StyleSheet, Alert} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {useGame} from '../context/GameContext';
import {
  SafeContainer,
  Header,
  HeaderTitle,
  SettingRow,
  SettingLabel,
  SectionHeader,
  DangerButton,
  PrimaryButtonText,
} from '../components/StyledComponents';

const SettingsScreen: React.FC = () => {
  const {theme, isDark, toggleTheme} = useTheme();
  const {score, resetScore, challenges} = useGame();

  const completed = challenges.filter(c => c.completed).length;

  const handleReset = () => {
    Alert.alert('Reset Game', 'Are you sure you want to reset all progress?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Reset',
        style: 'destructive',
        onPress: resetScore,
      },
    ]);
  };

  return (
    <SafeContainer theme={theme}>
      <Header theme={theme}>
        <HeaderTitle theme={theme}>⚙ Settings</HeaderTitle>
      </Header>

      <ScrollView>
        <SectionHeader theme={theme}>Appearance</SectionHeader>

        <SettingRow theme={theme}>
          <View>
            <SettingLabel theme={theme}>Dark Theme</SettingLabel>
            <Text style={[styles.sub, {color: theme.colors.textSecondary}]}>
              {isDark ? 'Dark mode enabled' : 'Light mode enabled'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{false: '#ccc', true: theme.colors.primary}}
            thumbColor={isDark ? '#fff' : '#f4f3f4'}
          />
        </SettingRow>

        <SectionHeader theme={theme}>Statistics</SectionHeader>

        <SettingRow theme={theme}>
          <SettingLabel theme={theme}>Current Score</SettingLabel>
          <Text style={[styles.value, {color: theme.colors.primary}]}>{score}</Text>
        </SettingRow>

        <SettingRow theme={theme}>
          <SettingLabel theme={theme}>Challenges Completed</SettingLabel>
          <Text style={[styles.value, {color: theme.colors.accent}]}>
            {completed}/{challenges.length}
          </Text>
        </SettingRow>

        <SettingRow theme={theme}>
          <SettingLabel theme={theme}>App Version</SettingLabel>
          <Text style={[styles.value, {color: theme.colors.textSecondary}]}>1.0.0</Text>
        </SettingRow>

        <SectionHeader theme={theme}>About</SectionHeader>

        <SettingRow theme={theme}>
          <View style={{flex: 1}}>
            <SettingLabel theme={theme}>Gesture Clicker</SettingLabel>
            <Text style={[styles.sub, {color: theme.colors.textSecondary}]}>
              Lab Work #3 — Custom Gestures in React Native
            </Text>
          </View>
        </SettingRow>

        <SectionHeader theme={theme}>Danger Zone</SectionHeader>

        <DangerButton theme={theme} onPress={handleReset}>
          <PrimaryButtonText>Reset All Progress</PrimaryButtonText>
        </DangerButton>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  sub: {
    fontSize: 12,
    marginTop: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPad: {
    height: 40,
  },
});

export default SettingsScreen;
