import { getJestProjectsAsync } from '@nx/jest';

/* eslint-disable */
const esModules = [
  'react-component-lib',
  '@dctjs/react',
].join('|');

export default async () => ({
  projects: await getJestProjectsAsync(),

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFiles: ['jest-canvas-mock', './jest.setup.ts'],
});
