import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run fantarka:serve',
        production: 'nx run fantarka:preview',
      },
      ciWebServerCommand: 'nx run fantarka:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
