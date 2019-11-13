jest.mock('@capacitor/core', () => {
  return {
    Plugins: {
      Clipboard: {
        read: async () => {
          return { value: 'fake' };
        },
        write: async (value: string) => {
          return {}
        }
      }
    }
  }
});