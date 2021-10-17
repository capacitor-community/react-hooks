export interface AvailableResult {
  isAvailable: boolean;
}

export const notAvailable = {
  isAvailable: false,
};

export class FeatureNotAvailableError extends Error {
  constructor() {
    super();
    this.message =
      'Feature not available on this platform/device. Check availability before attempting to call this method';
    this.name = 'FeatureNotAvailableError';
  }
}
