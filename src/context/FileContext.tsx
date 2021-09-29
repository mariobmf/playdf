import React, { createContext, useCallback, useState, useContext } from 'react';
import { DocumentResult } from 'expo-document-picker';

type FileProps = {
  name: string;
  size: number;
  uri: string;
};

interface FileContextData {
  playbackName: string | undefined;
  pdfFile: FileProps | undefined;
  playbackFile: FileProps | undefined;
  addPdfFile: (pdfFile: DocumentResult) => void;
  addPlaybackFile: (pdfFile: DocumentResult) => void;
  addPlaybackName: (name: string) => void;
}

const FileContext = createContext<FileContextData>({} as FileContextData);

const FileProvider: React.FC = ({ children }) => {
  const [playbackName, setPlaybackName] = useState<string>();
  const [pdfFile, setPdfFile] = useState<FileProps>();
  const [playbackFile, setPlaybackFile] = useState<FileProps>();

  const addPdfFile = useCallback((file: DocumentResult) => {
    if (file.type === 'success') {
      setPdfFile({
        name: file.name,
        size: file.size,
        uri: file.uri,
      });
    }
  }, []);

  const addPlaybackFile = useCallback((file: DocumentResult) => {
    if (file.type === 'success') {
      setPlaybackFile({
        name: file.name,
        size: file.size,
        uri: file.uri,
      });
    }
  }, []);

  const addPlaybackName = useCallback((name: string) => {
    setPlaybackName(name);
  }, []);

  return (
    <FileContext.Provider
      value={{
        pdfFile,
        playbackFile,
        playbackName,
        addPdfFile,
        addPlaybackFile,
        addPlaybackName,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

function useFile(): FileContextData {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error('useFile must be used within an FileProvider');
  }

  return context;
}

export { FileProvider, useFile };
