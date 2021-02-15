
import { useCallback } from 'react';
import { Filesystem, WriteFileOptions, WriteFileResult, ReadFileOptions, ReadFileResult, GetUriOptions, GetUriResult, DeleteFileOptions } from '@capacitor/filesystem';
import { AvailableResult } from '../util/models';
import { isFeatureAvailable } from '../util/feature-check';

interface FileSystemResult extends AvailableResult {
  getUri: (options: GetUriOptions) => Promise<GetUriResult>;
  deleteFile: (options: DeleteFileOptions) => Promise<void>;
  readFile: (options: ReadFileOptions) => Promise<ReadFileResult>;
  writeFile: (options: WriteFileOptions) => Promise<WriteFileResult>;
}

export const availableFeatures = {
  useFileSystem: isFeatureAvailable('FileSystem', 'useFileSystem')
};

export function useFilesystem(): FileSystemResult {
  const getUri = useCallback(async (options: GetUriOptions) => {
    const result = await Filesystem.getUri(options);
    return result;
  }, []);

  const deleteFile = useCallback(async (options: DeleteFileOptions) => {
    const result = await Filesystem.deleteFile(options);
    return result;
  }, []);

  const readFile = useCallback(async (options: ReadFileOptions) => {
    const result = await Filesystem.readFile(options);
    return result;
  }, []);

  const writeFile = useCallback(async (options: WriteFileOptions)  => {
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
