import React, { createContext, useCallback, useState, useContext } from 'react';

export interface FileProps {
  name: string;
  size: number;
  uri: string;
}

interface FileContextData {
  playbackName: string | undefined;
  pdfFileUri: string | undefined;
  playbackFileUri: string | undefined;
  addPdfFileUri: (uri: string) => void;
  addPlaybackFileUri: (uri: string) => void;
  addPlaybackName: (name: string) => void;
}

const FileContext = createContext<FileContextData>({} as FileContextData);

const FileProvider: React.FC = ({ children }) => {
  const [playbackName, setPlaybackName] = useState<string>();
  const [pdfFileUri, setPdfFileUri] = useState<string>();
  const [playbackFileUri, setPlaybackFileUri] = useState<string>();

  const addPdfFileUri = useCallback((uri: string) => {
    setPdfFileUri(uri);
  }, []);

  const addPlaybackFileUri = useCallback((uri: string) => {
    setPlaybackFileUri(uri);
  }, []);

  const addPlaybackName = useCallback((name: string) => {
    setPlaybackName(name);
  }, []);

  return (
    <FileContext.Provider
      value={{
        pdfFileUri,
        playbackFileUri,
        playbackName,
        addPdfFileUri,
        addPlaybackFileUri,
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
