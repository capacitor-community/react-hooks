export declare function useStorage(): {
    get: (key: string) => Promise<string | null>;
    set: (key: string, value: string) => Promise<void>;
    remove: (key: string) => Promise<void>;
    keys: () => Promise<{
        keys: string[];
    }>;
    clear: () => Promise<void>;
};
export declare function useStorageItem(key: string, initialValue: string): (string | ((value: any) => Promise<void>) | null)[];
