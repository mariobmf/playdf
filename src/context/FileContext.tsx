import React, { createContext, useCallback, useState, useContext } from 'react';

export interface FileProps {
  name: string;
  size: number;
  uri: string;
}

interface FileContextData {
  playbackName: string | undefined;
  playbackUri: string | undefined;
  addPlaybackUri: (uri: string) => void;
  addPlaybackName: (name: string) => void;
}

const FileContext = createContext<FileContextData>({} as FileContextData);

const FileProvider: React.FC = ({ children }) => {
  const [playbackName, setPlaybackName] = useState<string>();
  const [playbackUri, setPlaybackUri] = useState<string>();

  const addPlaybackUri = useCallback((uri: string) => {
    setPlaybackUri(uri);
  }, []);

  const addPlaybackName = useCallback((name: string) => {
    setPlaybackName(name);
  }, []);

  return (
    <FileContext.Provider
      value={{
        playbackUri,
        addPlaybackUri,
        playbackName,
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
