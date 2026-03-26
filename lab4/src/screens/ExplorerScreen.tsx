import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  Alert,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useFileManager} from '../context/FileManagerContext';
import {
  listDirectory,
  createFolder,
  createTextFile,
  deleteItem,
  isTextFile,
  FileItem,
} from '../utils/fileUtils';
import {colors} from '../theme';

import {
  Screen,
  Header,
  HeaderRow,
  HeaderTitle,
  IconButton,
  BreadcrumbRow,
  BreadcrumbItem,
  BreadcrumbText,
  BreadcrumbSep,
  FABContainer,
  FAB,
  FABText,
  EmptyWrap,
  EmptyText,
  SectionLabel,
} from '../components/Styled';
import FileListItem from '../components/FileListItem';
import CreateModal from '../components/CreateModal';
import FileInfoModal from '../components/FileInfoModal';
import MemoryCard from '../components/MemoryCard';

type RootStackParamList = {
  Explorer: undefined;
  Editor: {uri: string; name: string; readOnly?: boolean};
};

type Nav = NativeStackNavigationProp<RootStackParamList, 'Explorer'>;

const ExplorerScreen: React.FC = () => {
  const {currentUri, breadcrumbs, canGoBack, navigateTo, goBack, goHome} = useFileManager();
  const navigation = useNavigation<Nav>();

  const [items, setItems] = useState<FileItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [infoItem, setInfoItem] = useState<FileItem | null>(null);
  const [showFAB, setShowFAB] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const data = await listDirectory(currentUri);
    setItems(data);
    setRefreshing(false);
  }, [currentUri]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleOpen = (item: FileItem) => {
    if (item.isDirectory) {
      navigateTo(item.uri.endsWith('/') ? item.uri : item.uri + '/');
    } else if (isTextFile(item.name)) {
      navigation.navigate('Editor', {uri: item.uri, name: item.name});
    } else {
      Alert.alert('Файл', `Перегляд файлів типу .${item.name.split('.').pop()} не підтримується.`);
    }
  };

  const handleDelete = async (item: FileItem) => {
    try {
      await deleteItem(item.uri);
      await refresh();
    } catch {
      Alert.alert('Помилка', 'Не вдалося видалити елемент.');
    }
  };

  const handleCreateFolder = async (name: string) => {
    await createFolder(currentUri, name);
    await refresh();
  };

  const handleCreateFile = async (name: string, content?: string) => {
    await createTextFile(currentUri, name, content ?? '');
    await refresh();
  };

  const isRoot = breadcrumbs.length <= 1;

  return (
    <Screen>
      <Header>
        <HeaderRow>
          {canGoBack && (
            <IconButton onPress={goBack}>
              <Text style={{fontSize: 18}}>←</Text>
            </IconButton>
          )}
          <HeaderTitle numberOfLines={1}>
            {breadcrumbs[breadcrumbs.length - 1]}
          </HeaderTitle>
          {!isRoot && (
            <IconButton onPress={goHome}>
              <Text style={{fontSize: 18}}>🏠</Text>
            </IconButton>
          )}
          <IconButton onPress={refresh}>
            <Text style={{fontSize: 18}}>🔄</Text>
          </IconButton>
        </HeaderRow>

        <BreadcrumbRow horizontal showsHorizontalScrollIndicator={false}>
          {breadcrumbs.map((crumb, idx) => (
            <View key={idx} style={{flexDirection: 'row', alignItems: 'center'}}>
              {idx > 0 && <BreadcrumbSep> / </BreadcrumbSep>}
              <BreadcrumbItem active={idx === breadcrumbs.length - 1}>
                <BreadcrumbText active={idx === breadcrumbs.length - 1}>{crumb}</BreadcrumbText>
              </BreadcrumbItem>
            </View>
          ))}
        </BreadcrumbRow>
      </Header>

      <FlatList
        data={items}
        keyExtractor={item => item.uri}
        ListHeaderComponent={isRoot ? <MemoryCard /> : null}
        ListEmptyComponent={
          <EmptyWrap>
            <Text style={{fontSize: 48}}>📂</Text>
            <EmptyText>Папка порожня</EmptyText>
          </EmptyWrap>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />
        }
        renderItem={({item}) => (
          <FileListItem
            item={item}
            onOpen={handleOpen}
            onDelete={handleDelete}
            onInfo={setInfoItem}
          />
        )}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
      />

      <FABContainer>
        {showFAB && (
          <>
            <FAB color={colors.success} onPress={() => {setShowFAB(false); setShowCreateFile(true);}}>
              <Text style={{fontSize: 16, color: '#fff'}}>📄</Text>
              <FABText>Новий файл</FABText>
            </FAB>
            <FAB color={colors.warning} onPress={() => {setShowFAB(false); setShowCreateFolder(true);}}>
              <Text style={{fontSize: 16, color: '#fff'}}>📁</Text>
              <FABText>Нова папка</FABText>
            </FAB>
          </>
        )}
        <FAB onPress={() => setShowFAB(v => !v)}>
          <Text style={{fontSize: 22, color: '#fff'}}>{showFAB ? '✕' : '+'}</Text>
        </FAB>
      </FABContainer>

      <CreateModal
        visible={showCreateFolder}
        type="folder"
        onClose={() => setShowCreateFolder(false)}
        onCreate={handleCreateFolder}
      />
      <CreateModal
        visible={showCreateFile}
        type="file"
        onClose={() => setShowCreateFile(false)}
        onCreate={handleCreateFile}
      />
      <FileInfoModal
        visible={!!infoItem}
        item={infoItem}
        onClose={() => setInfoItem(null)}
      />
    </Screen>
  );
};

export default ExplorerScreen;
