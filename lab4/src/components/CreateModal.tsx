import React, {useState} from 'react';
import {Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View} from 'react-native';
import {
  Overlay,
  ModalSheet,
  ModalHandle,
  ModalTitle,
  Input,
  TextArea,
  ButtonRow,
  Btn,
  BtnText,
} from './Styled';

interface Props {
  visible: boolean;
  type: 'folder' | 'file';
  onClose: () => void;
  onCreate: (name: string, content?: string) => Promise<void>;
}

const CreateModal: React.FC<Props> = ({visible, type, onClose, onCreate}) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onCreate(name.trim(), type === 'file' ? content : undefined);
      setName('');
      setContent('');
      onClose();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setContent('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Overlay>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ModalSheet>
                <ModalHandle />
                <ModalTitle>
                  {type === 'folder' ? '📁 Нова папка' : '📄 Новий файл'}
                </ModalTitle>

                <Input
                  placeholder={type === 'folder' ? 'Назва папки' : 'Назва файлу (без .txt)'}
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  placeholderTextColor="#94A3B8"
                />

                {type === 'file' && (
                  <TextArea
                    placeholder="Початковий вміст файлу..."
                    value={content}
                    onChangeText={setContent}
                    multiline
                    numberOfLines={5}
                    placeholderTextColor="#94A3B8"
                  />
                )}

                <ButtonRow>
                  <Btn variant="ghost" onPress={handleClose}>
                    <BtnText variant="ghost">Скасувати</BtnText>
                  </Btn>
                  <Btn variant="primary" onPress={handleCreate} disabled={loading || !name.trim()}>
                    <BtnText variant="primary">{loading ? 'Створення...' : 'Створити'}</BtnText>
                  </Btn>
                </ButtonRow>
              </ModalSheet>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateModal;
