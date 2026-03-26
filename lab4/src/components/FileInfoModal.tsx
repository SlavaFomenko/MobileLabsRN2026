import React, {useEffect, useState} from 'react';
import {Modal, TouchableWithoutFeedback, ScrollView, Text} from 'react-native';
import {FileItem, FileInfo, getFileInfo, formatSize, formatDate} from '../utils/fileUtils';
import {
  Overlay,
  ModalSheet,
  ModalHandle,
  ModalTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  Btn,
  BtnText,
  Chip,
  ChipText,
} from './Styled';
import {colors} from '../theme';

interface Props {
  visible: boolean;
  item: FileItem | null;
  onClose: () => void;
}

const FileInfoModal: React.FC<Props> = ({visible, item, onClose}) => {
  const [info, setInfo] = useState<FileInfo | null>(null);

  useEffect(() => {
    if (item) {
      getFileInfo(item.uri, item.name).then(setInfo).catch(() => {});
    }
  }, [item]);

  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Overlay>
          <TouchableWithoutFeedback>
            <ModalSheet>
              <ModalHandle />
              <ModalTitle>
                {item.isDirectory ? '📁 ' : '📄 '}Інформація
              </ModalTitle>

              {info && (
                <>
                  <InfoRow>
                    <InfoLabel>Назва</InfoLabel>
                    <InfoValue numberOfLines={2}>{info.name}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Тип</InfoLabel>
                    <Chip bg={item.isDirectory ? colors.warningLight : colors.primaryLight}>
                      <ChipText color={item.isDirectory ? colors.warning : colors.primary}>
                        {info.type}
                      </ChipText>
                    </Chip>
                  </InfoRow>
                  {!item.isDirectory && (
                    <>
                      <InfoRow>
                        <InfoLabel>Розширення</InfoLabel>
                        <InfoValue>.{info.extension || '—'}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>Розмір</InfoLabel>
                        <InfoValue>{formatSize(info.size)}</InfoValue>
                      </InfoRow>
                    </>
                  )}
                  <InfoRow>
                    <InfoLabel>Змінено</InfoLabel>
                    <InfoValue>{formatDate(info.modificationTime)}</InfoValue>
                  </InfoRow>
                  <InfoRow style={{borderBottomWidth: 0}}>
                    <InfoLabel>Шлях</InfoLabel>
                    <InfoValue numberOfLines={3} style={{fontSize: 11}}>
                      {info.uri}
                    </InfoValue>
                  </InfoRow>
                </>
              )}

              <Btn variant="primary" onPress={onClose} style={{marginTop: 16}}>
                <BtnText variant="primary">Закрити</BtnText>
              </Btn>
            </ModalSheet>
          </TouchableWithoutFeedback>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FileInfoModal;
