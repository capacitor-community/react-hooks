export declare function useAppState(): boolean;
/**
 * Get the URL the app was originally launched with. Note: if
 * you want to detect future app opens, use `useAppUrlOpen` instead,
 * which will stay updated.
 */
export declare function useAppLaunchUrl(): string;
export declare function useAppUrlOpen(): string | null;
