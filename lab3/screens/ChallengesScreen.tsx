import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useGame} from '../context/GameContext';
import {useTheme} from '../context/ThemeContext';
import {
  SafeContainer,
  Header,
  HeaderTitle,
  ChallengeItem,
  ChallengeIcon,
  ChallengeInfo,
  ChallengeTitle,
  ChallengeDesc,
  ProgressBar,
  ProgressFill,
  SmallText,
} from '../components/StyledComponents';

const ChallengesScreen: React.FC = () => {
  const {challenges} = useGame();
  const {theme} = useTheme();

  const completed = challenges.filter(c => c.completed).length;

  return (
    <SafeContainer theme={theme}>
      <Header theme={theme}>
        <HeaderTitle theme={theme}>≡ Challenges</HeaderTitle>
        <Text style={[styles.counter, {color: theme.colors.textSecondary}]}>
          {completed}/{challenges.length}
        </Text>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {challenges.map(c => {
          const pct = Math.round((c.progress / c.target) * 100);
          return (
            <ChallengeItem key={c.id} theme={theme} completed={c.completed}>
              <ChallengeIcon>{c.icon}</ChallengeIcon>
              <ChallengeInfo>
                <ChallengeTitle theme={theme}>{c.title}</ChallengeTitle>
                <ChallengeDesc theme={theme}>{c.description}</ChallengeDesc>
                <ProgressBar theme={theme}>
                  <ProgressFill theme={theme} pct={pct} />
                </ProgressBar>
                <SmallText theme={theme} style={styles.progressText}>
                  {c.progress}/{c.target}
                </SmallText>
              </ChallengeInfo>
              <View style={styles.checkCircle}>
                {c.completed ? (
                  <View style={[styles.checkFilled, {backgroundColor: theme.colors.accent}]}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                ) : (
                  <View style={[styles.checkEmpty, {borderColor: theme.colors.border}]} />
                )}
              </View>
            </ChallengeItem>
          );
        })}
        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  counter: {
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    paddingTop: 8,
  },
  progressText: {
    marginTop: 3,
    textAlign: 'right',
    fontSize: 11,
  },
  checkCircle: {
    marginLeft: 12,
  },
  checkEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  checkFilled: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  bottomPad: {
    height: 20,
  },
});

export default ChallengesScreen;
