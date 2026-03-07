import styled from 'styled-components/native';
import {AppTheme} from '../theme';


export const SafeContainer = styled.SafeAreaView<{theme: AppTheme}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Container = styled.View<{theme: AppTheme}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


export const Card = styled.View<{theme: AppTheme}>`
  background-color: ${({theme}) => theme.colors.surface};
  border-radius: 16px;
  padding: 16px;
  margin: 8px 16px;
  shadow-color: ${({theme}) => theme.colors.cardShadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: 4;
`;


export const ScoreCard = styled.View<{theme: AppTheme}>`
  background-color: ${({theme}) => theme.colors.scoreBackground};
  border-radius: 16px;
  padding: 20px 40px;
  align-items: center;
  margin: 16px 24px 8px;
`;

export const ScoreLabel = styled.Text<{theme: AppTheme}>`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: ${({theme}) => theme.colors.textSecondary};
  text-transform: uppercase;
`;

export const ScoreValue = styled.Text<{theme: AppTheme}>`
  font-size: 56px;
  font-weight: 800;
  color: ${({theme}) => theme.colors.scoreText};
  line-height: 64px;
`;


export const Title = styled.Text<{theme: AppTheme}>`
  font-size: 22px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;

export const Subtitle = styled.Text<{theme: AppTheme}>`
  font-size: 14px;
  color: ${({theme}) => theme.colors.textSecondary};
  margin-top: 2px;
`;

export const BodyText = styled.Text<{theme: AppTheme}>`
  font-size: 14px;
  color: ${({theme}) => theme.colors.text};
`;

export const SmallText = styled.Text<{theme: AppTheme}>`
  font-size: 12px;
  color: ${({theme}) => theme.colors.textSecondary};
`;


export const Header = styled.View<{theme: AppTheme}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({theme}) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.border};
`;

export const HeaderTitle = styled.Text<{theme: AppTheme}>`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;


export const ClickerLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1.5px;
  margin-top: 6px;
`;


export const HintRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const HintIcon = styled.Text`
  font-size: 18px;
  width: 28px;
`;

export const HintText = styled.Text<{theme: AppTheme}>`
  font-size: 13px;
  color: ${({theme}) => theme.colors.textSecondary};
`;


export const ChallengeItem = styled.View<{theme: AppTheme; completed: boolean}>`
  background-color: ${({theme, completed}) =>
    completed ? theme.colors.completedBg : theme.colors.surface};
  border-radius: 12px;
  padding: 14px 16px;
  margin: 6px 16px;
  flex-direction: row;
  align-items: center;
  border-left-width: ${({completed}) => (completed ? '4px' : '0px')};
  border-left-color: ${({theme}) => theme.colors.completedBorder};
  shadow-color: ${({theme}) => theme.colors.cardShadow};
  shadow-offset: 0px 1px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ChallengeIcon = styled.Text`
  font-size: 28px;
  margin-right: 12px;
`;

export const ChallengeInfo = styled.View`
  flex: 1;
`;

export const ChallengeTitle = styled.Text<{theme: AppTheme}>`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text};
`;

export const ChallengeDesc = styled.Text<{theme: AppTheme}>`
  font-size: 12px;
  color: ${({theme}) => theme.colors.textSecondary};
  margin-top: 2px;
`;

export const ProgressBar = styled.View<{theme: AppTheme}>`
  height: 4px;
  background-color: ${({theme}) => theme.colors.border};
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.View<{theme: AppTheme; pct: number}>`
  height: 4px;
  width: ${({pct}) => pct}%;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 2px;
`;


export const SettingRow = styled.View<{theme: AppTheme}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: ${({theme}) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.border};
`;

export const SettingLabel = styled.Text<{theme: AppTheme}>`
  font-size: 16px;
  color: ${({theme}) => theme.colors.text};
`;

export const SectionHeader = styled.Text<{theme: AppTheme}>`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.textSecondary};
  padding: 20px 20px 8px;
`;


export const PrimaryButton = styled.TouchableOpacity<{theme: AppTheme}>`
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 12px;
  padding: 14px 32px;
  align-items: center;
  margin: 8px 16px;
`;

export const PrimaryButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
`;

export const DangerButton = styled.TouchableOpacity<{theme: AppTheme}>`
  background-color: ${({theme}) => theme.colors.danger};
  border-radius: 12px;
  padding: 14px 32px;
  align-items: center;
  margin: 8px 16px;
`;
