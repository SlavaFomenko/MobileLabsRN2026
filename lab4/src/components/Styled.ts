import styled from 'styled-components/native';
import {colors, spacing, radius} from '../theme';

export const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  background-color: ${colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  padding: 12px 16px 8px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.text};
  flex: 1;
`;

export const IconButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
`;

export const BreadcrumbRow = styled.ScrollView`
  margin-top: 8px;
`;

export const BreadcrumbItem = styled.TouchableOpacity<{active?: boolean}>`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({active}) => (active ? colors.primaryLight : 'transparent')};
`;

export const BreadcrumbText = styled.Text<{active?: boolean}>`
  font-size: 12px;
  color: ${({active}) => (active ? colors.primary : colors.textSecondary)};
  font-weight: ${({active}) => (active ? '600' : '400')};
`;

export const BreadcrumbSep = styled.Text`
  font-size: 12px;
  color: ${colors.textMuted};
  padding: 4px 2px;
`;

export const FileRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const FileIconWrap = styled.View<{isDir?: boolean}>`
  width: 44px;
  height: 44px;
  border-radius: ${radius.md}px;
  align-items: center;
  justify-content: center;
  background-color: ${({isDir}) => (isDir ? colors.warningLight : colors.primaryLight)};
  margin-right: 12px;
`;

export const FileInfo = styled.View`
  flex: 1;
`;

export const FileName = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.text};
`;

export const FileMeta = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-top: 2px;
`;

export const FileActions = styled.View`
  flex-direction: row;
  gap: 4px;
`;

export const Card = styled.View`
  background-color: ${colors.surface};
  border-radius: ${radius.lg}px;
  padding: ${spacing.md}px;
  margin: ${spacing.sm}px ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const CardTitle = styled.Text`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${colors.textSecondary};
  margin-bottom: 12px;
`;

export const MemoryBarWrap = styled.View`
  height: 8px;
  background-color: ${colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0 4px;
`;

export const MemoryBarFill = styled.View<{pct: number}>`
  height: 8px;
  width: ${({pct}) => pct}%;
  background-color: ${({pct}) => (pct > 85 ? colors.danger : pct > 60 ? colors.warning : colors.primary)};
  border-radius: 4px;
`;

export const MemoryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MemoryLabel = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

export const MemoryValue = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.text};
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalSheet = styled.View`
  background-color: ${colors.surface};
  border-top-left-radius: ${radius.xl}px;
  border-top-right-radius: ${radius.xl}px;
  padding: 24px 20px 40px;
`;

export const ModalHandle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${colors.border};
  align-self: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  border-width: 1.5px;
  border-color: ${colors.border};
  border-radius: ${radius.md}px;
  padding: 12px 14px;
  font-size: 15px;
  color: ${colors.text};
  background-color: ${colors.background};
  margin-bottom: 12px;
`;

export const TextArea = styled.TextInput`
  border-width: 1.5px;
  border-color: ${colors.border};
  border-radius: ${radius.md}px;
  padding: 12px 14px;
  font-size: 14px;
  color: ${colors.text};
  background-color: ${colors.background};
  min-height: 120px;
  text-align-vertical: top;
  margin-bottom: 12px;
  font-family: monospace;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-top: 4px;
`;

export const Btn = styled.TouchableOpacity<{variant?: 'primary' | 'danger' | 'ghost'}>`
  flex: 1;
  padding: 13px;
  border-radius: ${radius.md}px;
  align-items: center;
  background-color: ${({variant}) =>
    variant === 'primary'
      ? colors.primary
      : variant === 'danger'
      ? colors.danger
      : colors.background};
  border-width: ${({variant}) => (variant === 'ghost' ? '1.5px' : '0px')};
  border-color: ${colors.border};
`;

export const BtnText = styled.Text<{variant?: 'primary' | 'danger' | 'ghost'}>`
  font-size: 15px;
  font-weight: 700;
  color: ${({variant}) => (variant === 'ghost' ? colors.textSecondary : '#fff')};
`;

export const FABContainer = styled.View`
  position: absolute;
  bottom: 24px;
  right: 20px;
  gap: 12px;
  align-items: flex-end;
`;

export const FAB = styled.TouchableOpacity<{color?: string}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({color}) => color ?? colors.primary};
  border-radius: 28px;
  padding: 13px 20px;
  gap: 8px;
  elevation: 6;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
`;

export const FABText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export const EmptyWrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const EmptyText = styled.Text`
  font-size: 15px;
  color: ${colors.textMuted};
  margin-top: 12px;
  text-align: center;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

export const InfoValue = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text};
  flex-shrink: 1;
  margin-left: 12px;
  text-align: right;
`;

export const SectionLabel = styled.Text`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${colors.textSecondary};
  padding: 16px 16px 6px;
`;

export const Chip = styled.View<{bg?: string}>`
  background-color: ${({bg}) => bg ?? colors.primaryLight};
  border-radius: 20px;
  padding: 3px 10px;
  align-self: flex-start;
`;

export const ChipText = styled.Text<{color?: string}>`
  font-size: 11px;
  font-weight: 700;
  color: ${({color}) => color ?? colors.primary};
`;
