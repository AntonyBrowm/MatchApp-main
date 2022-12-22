module.exports = {
  name: 'auth',
  exposes: {
    './home': './src/remote-home-entry.ts',
    './verify': './src/remote-verify-entry.ts',
  }
};

