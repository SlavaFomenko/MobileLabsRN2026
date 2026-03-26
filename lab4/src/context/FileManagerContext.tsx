import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import * as FileSystem from 'expo-file-system';

interface FileManagerContextType {
  currentUri: string;
  history: string[];
  canGoBack: boolean;
  navigateTo: (uri: string) => void;
  goBack: () => void;
  goHome: () => void;
  breadcrumbs: string[];
}

const ROOT = FileSystem.documentDirectory ?? '';

function buildBreadcrumbs(uri: string): string[] {
  const rel = uri.replace(ROOT, '');
  const parts = rel.split('/').filter(Boolean);
  return ['Home', ...parts];
}

const FileManagerContext = createContext<FileManagerContextType>({
  currentUri: ROOT,
  history: [],
  canGoBack: false,
  navigateTo: () => {},
  goBack: () => {},
  goHome: () => {},
  breadcrumbs: ['Home'],
});

export const FileManagerProvider = ({children}: {children: ReactNode}) => {
  const [currentUri, setCurrentUri] = useState(ROOT);
  const [history, setHistory] = useState<string[]>([]);

  const navigateTo = useCallback((uri: string) => {
    setHistory(prev => [...prev, currentUri]);
    setCurrentUri(uri);
  }, [currentUri]);

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setCurrentUri(prev);
  }, [history]);

  const goHome = useCallback(() => {
    setHistory([]);
    setCurrentUri(ROOT);
  }, []);

  return (
    <FileManagerContext.Provider
      value={{
        currentUri,
        history,
        canGoBack: history.length > 0,
        navigateTo,
        goBack,
        goHome,
        breadcrumbs: buildBreadcrumbs(currentUri),
      }}>
      {children}
    </FileManagerContext.Provider>
  );
};

export const useFileManager = () => useContext(FileManagerContext);
export {ROOT};
