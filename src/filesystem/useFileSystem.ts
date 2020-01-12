
import { useCallback } from 'react';
import { Plugins, FileWriteOptions, FileWriteResult, FileReadOptions, FileReadResult, GetUriOptions, GetUriResult, FileDeleteOptions, FileDeleteResult } from '@capacitor/core';
import { AvailableResult } from '../util/models';
import { isFeatureAvailable } from '../util/feature-check';

interface FileSystemResult extends AvailableResult {
  getUri: (options: GetUriOptions) => Promise<GetUriResult>;
  deleteFile: (options: FileDeleteOptions) => Promise<FileDeleteResult>;
  readFile: (options: FileReadOptions) => Promise<FileReadResult>;
  writeFile: (options: FileWriteOptions) => Promise<FileWriteResult>;
}

export const availableFeatures = {
  useFileSystem: isFeatureAvailable('FileSystem', 'useFileSystem')
};

export function useFilesystem(): FileSystemResult {
  const { Filesystem } = Plugins;

  const getUri = useCallback(async (options: GetUriOptions) => {
    const result = await Filesystem.getUri(options);
    return result;
  }, []);

  const deleteFile = useCallback(async (options: FileDeleteOptions) => {
    const result = await Filesystem.deleteFile(options);
    return result;
  }, []);

  const readFile = useCallback(async (options: FileReadOptions) => {
    const result = await Filesystem.readFile(options);
    return result;
  }, []);

  const writeFile = useCallback(async (options: FileWriteOptions)  => {
    const result = await Filesystem.writeFile(options);
    return result;
  }, []);

  return {
    getUri,
    deleteFile,
    readFile,
    writeFile,
    isAvailable: true
  };
}
