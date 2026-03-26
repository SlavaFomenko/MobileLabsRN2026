import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {readTextFile, writeTextFile} from '../utils/fileUtils';
import {colors} from '../theme';
import {
  Screen,
  Header,
  HeaderRow,
  HeaderTitle,
  IconButton,
  TextArea,
  Container,
  Chip,
  ChipText,
} from '../components/Styled';

type RootStackParamList = {
  Explorer: undefined;
  Editor: {uri: string; name: string; readOnly?: boolean};
};

type EditorRoute = RouteProp<RootStackParamList, 'Editor'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'Editor'>;

const EditorScreen: React.FC = () => {
  const route = useRoute<EditorRoute>();
  const navigation = useNavigation<Nav>();
  const {uri, name, readOnly} = route.params;

  const [content, setContent] = useState('');
  const [original, setOriginal] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(!readOnly);

  useEffect(() => {
    readTextFile(uri)
      .then(text => {
        setContent(text);
        setOriginal(text);
      })
      .catch(() => {
        Alert.alert('Помилка', 'Не вдалося відкрити файл.');
        navigation.goBack();
      })
      .finally(() => setLoading(false));
  }, [uri]);

  const isDirty = content !== original;

  const handleSave = async () => {
    setSaving(true);
    try {
      await writeTextFile(uri, content);
      setOriginal(content);
      Alert.alert('✅ Збережено', 'Файл успішно збережено.');
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти файл.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (isDirty && editMode) {
      Alert.alert('Незбережені зміни', 'Зберегти зміни перед виходом?', [
        {text: 'Не зберігати', style: 'destructive', onPress: () => navigation.goBack()},
        {text: 'Скасувати', style: 'cancel'},
        {text: 'Зберегти', onPress: async () => {await handleSave(); navigation.goBack();}},
      ]);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <Header>
        <HeaderRow>
          <IconButton onPress={handleBack}>
            <Text style={{fontSize: 18}}>←</Text>
          </IconButton>
          <HeaderTitle numberOfLines={1}>{name}</HeaderTitle>

          {isDirty && editMode && (
            <Chip bg={colors.warningLight}>
              <ChipText color={colors.warning}>●  Не збережено</ChipText>
            </Chip>
          )}

          <IconButton onPress={() => setEditMode(v => !v)}>
            <Text style={{fontSize: 18}}>{editMode ? '👁' : '✏️'}</Text>
          </IconButton>

          {editMode && (
            <IconButton onPress={handleSave} disabled={saving || !isDirty}>
              <Text style={{fontSize: 18, opacity: isDirty ? 1 : 0.4}}>💾</Text>
            </IconButton>
          )}
        </HeaderRow>
      </Header>

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TextArea
            value={content}
            onChangeText={setContent}
            editable={editMode}
            multiline
            scrollEnabled
            style={{
              flex: 1,
              margin: 16,
              minHeight: undefined,
              backgroundColor: editMode ? '#fff' : colors.background,
              borderColor: editMode ? colors.primary : colors.border,
            }}
            placeholder="Файл порожній..."
            placeholderTextColor={colors.textMuted}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </KeyboardAvoidingView>
      )}
    </Screen>
  );
};

export default EditorScreen;
