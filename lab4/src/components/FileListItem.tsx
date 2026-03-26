import React from 'react';
import {Alert, Text} from 'react-native';
import {FileRow, FileIconWrap, FileInfo, FileName, FileMeta, FileActions, IconButton} from './Styled';
import {FileItem, formatSize, formatDate} from '../utils/fileUtils';
import {colors} from '../theme';

interface Props {
  item: FileItem;
  onOpen: (item: FileItem) => void;
  onDelete: (item: FileItem) => void;
  onInfo: (item: FileItem) => void;
}

function getIcon(item: FileItem): string {
  if (item.isDirectory) return '📁';
  const ext = item.name.split('.').pop()?.toLowerCase() ?? '';
  const map: Record<string, string> = {
    txt: '📝',
    md: '📋',
    json: '🔧',
    js: '📜',
    ts: '📜',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    pdf: '📕',
    zip: '📦',
    mp3: '🎵',
    mp4: '🎬',
  };
  return map[ext] ?? '📄';
}

const FileListItem: React.FC<Props> = ({item, onOpen, onDelete, onInfo}) => {
  const handleDelete = () => {
    Alert.alert(
      'Підтвердження видалення',
      `Ви впевнені, що хочете видалити "${item.name}"?${item.isDirectory ? '\n\nУвага: папка та весь її вміст буде видалено!' : ''}`,
      [
        {text: 'Скасувати', style: 'cancel'},
        {text: 'Видалити', style: 'destructive', onPress: () => onDelete(item)},
      ]
    );
  };

  return (
    <FileRow onPress={() => onOpen(item)} activeOpacity={0.7}>
      <FileIconWrap isDir={item.isDirectory}>
        <Text style={{fontSize: 24}}>{getIcon(item)}</Text>
      </FileIconWrap>

      <FileInfo>
        <FileName numberOfLines={1}>{item.name}</FileName>
        <FileMeta>
          {item.isDirectory ? 'Папка' : formatSize(item.size ?? 0)}
          {item.modificationTime ? `  •  ${formatDate(item.modificationTime)}` : ''}
        </FileMeta>
      </FileInfo>

      <FileActions>
        <IconButton onPress={() => onInfo(item)} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Text style={{fontSize: 16}}>ℹ️</Text>
        </IconButton>
        <IconButton onPress={handleDelete} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Text style={{fontSize: 16, color: colors.danger}}>🗑️</Text>
        </IconButton>
      </FileActions>
    </FileRow>
  );
};

export default FileListItem;
