import * as FileSystem from 'expo-file-system';

export interface FileItem {
  name: string;
  uri: string;
  isDirectory: boolean;
  size?: number;
  modificationTime?: number;
}

export interface FileInfo {
  name: string;
  uri: string;
  isDirectory: boolean;
  size: number;
  modificationTime: number;
  extension: string;
  type: string;
}

export async function listDirectory(uri: string): Promise<FileItem[]> {
  try {
    const entries = await FileSystem.readDirectoryAsync(uri);
    const items: FileItem[] = await Promise.all(
      entries.map(async name => {
        const fullUri = uri.endsWith('/') ? `${uri}${name}` : `${uri}/${name}`;
        const info = await FileSystem.getInfoAsync(fullUri);
        return {
          name,
          uri: fullUri,
          isDirectory: info.isDirectory ?? false,
          size: (info as any).size,
          modificationTime: (info as any).modificationTime,
        };
      })
    );
    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch {
    return [];
  }
}

export async function createFolder(parentUri: string, name: string): Promise<void> {
  const uri = parentUri.endsWith('/')
    ? `${parentUri}${name}`
    : `${parentUri}/${name}`;
  await FileSystem.makeDirectoryAsync(uri, {intermediates: false});
}

export async function createTextFile(
  parentUri: string,
  name: string,
  content: string
): Promise<void> {
  const fileName = name.endsWith('.txt') ? name : `${name}.txt`;
  const uri = parentUri.endsWith('/')
    ? `${parentUri}${fileName}`
    : `${parentUri}/${fileName}`;
  await FileSystem.writeAsStringAsync(uri, content, {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

export async function readTextFile(uri: string): Promise<string> {
  return FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

export async function writeTextFile(uri: string, content: string): Promise<void> {
  await FileSystem.writeAsStringAsync(uri, content, {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

export async function deleteItem(uri: string): Promise<void> {
  await FileSystem.deleteAsync(uri, {idempotent: true});
}

export async function getFileInfo(uri: string, name: string): Promise<FileInfo> {
  const info = await FileSystem.getInfoAsync(uri, {size: true});
  const ext = name.includes('.') ? name.split('.').pop()!.toLowerCase() : '';
  const type = info.isDirectory
    ? 'Папка'
    : ext
    ? getFileType(ext)
    : 'Невідомий тип';

  return {
    name,
    uri,
    isDirectory: info.isDirectory ?? false,
    size: (info as any).size ?? 0,
    modificationTime: (info as any).modificationTime ?? 0,
    extension: ext,
    type,
  };
}

function getFileType(ext: string): string {
  const map: Record<string, string> = {
    txt: 'Текстовий файл',
    md: 'Markdown файл',
    json: 'JSON файл',
    js: 'JavaScript',
    ts: 'TypeScript',
    tsx: 'TypeScript JSX',
    jsx: 'JavaScript JSX',
    png: 'Зображення PNG',
    jpg: 'Зображення JPEG',
    jpeg: 'Зображення JPEG',
    gif: 'Зображення GIF',
    pdf: 'PDF документ',
    zip: 'ZIP архів',
    mp3: 'Аудіо MP3',
    mp4: 'Відео MP4',
  };
  return map[ext] ?? `Файл .${ext}`;
}

export interface MemoryStats {
  total: number;
  free: number;
  used: number;
}

export async function getMemoryStats(): Promise<MemoryStats> {
  const info = await FileSystem.getFreeDiskStorageAsync();
  const total = await FileSystem.getTotalDiskCapacityAsync();
  return {
    total,
    free: info,
    used: total - info,
  };
}

export function formatSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return '—';
  const d = new Date(timestamp * 1000);
  return d.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isTextFile(name: string): boolean {
  const textExts = ['txt', 'md', 'json', 'js', 'ts', 'tsx', 'jsx', 'html', 'css', 'csv', 'xml', 'log'];
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return textExts.includes(ext);
}
