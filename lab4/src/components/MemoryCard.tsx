import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getMemoryStats, formatSize, MemoryStats} from '../utils/fileUtils';
import {
  Card,
  CardTitle,
  MemoryBarWrap,
  MemoryBarFill,
  MemoryRow,
  MemoryLabel,
  MemoryValue,
} from './Styled';
import {colors} from '../theme';

const MemoryCard: React.FC = () => {
  const [stats, setStats] = useState<MemoryStats | null>(null);

  useEffect(() => {
    getMemoryStats().then(setStats).catch(() => {});
  }, []);

  if (!stats) return null;

  const pct = Math.round((stats.used / stats.total) * 100);

  return (
    <Card>
      <CardTitle>Використання пам'яті</CardTitle>

      <MemoryRow>
        <View style={{alignItems: 'center'}}>
          <MemoryValue>{formatSize(stats.total)}</MemoryValue>
          <MemoryLabel>Всього</MemoryLabel>
        </View>
        <View style={{alignItems: 'center'}}>
          <MemoryValue style={{color: colors.danger}}>{formatSize(stats.used)}</MemoryValue>
          <MemoryLabel>Зайнято</MemoryLabel>
        </View>
        <View style={{alignItems: 'center'}}>
          <MemoryValue style={{color: colors.success}}>{formatSize(stats.free)}</MemoryValue>
          <MemoryLabel>Вільно</MemoryLabel>
        </View>
      </MemoryRow>

      <MemoryBarWrap>
        <MemoryBarFill pct={pct} />
      </MemoryBarWrap>

      <MemoryRow>
        <MemoryLabel>Зайнято {pct}%</MemoryLabel>
        <MemoryLabel>Вільно {100 - pct}%</MemoryLabel>
      </MemoryRow>
    </Card>
  );
};

export default MemoryCard;
