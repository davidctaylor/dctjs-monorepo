/* eslint-disable */
const esModules = [
  'react-component-lib',
  '@dctjs/react',
].join('|');
export default {
  displayName: 'fantarka-ui',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  coverageDirectory: '../../../coverage/libs/fantarka/ui',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFiles: ['jest-canvas-mock', './jest.setup.ts'],
};

// /* eslint-disable */
// const esModules = [
//   'react-component-lib',
//   '@dctjs/react',
// ].join('|');
// export default {
//   displayName: 'fantarka',
//   preset: '../../jest.preset.js',
//   transform: {
//     '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
//     '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   moduleDirectories: ['node_modules', 'src'],
//   coverageDirectory: '../../coverage/apps/fantarka',
//   transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
//   setupFiles: ['jest-canvas-mock', './jest.setup.ts'],
// };
