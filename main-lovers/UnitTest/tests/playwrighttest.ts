import { PlaywrightTestConfig, devices} from "@playwright/test";

const config : PlaywrightTestConfig = {

    timeout:10_000,
    use:{
      trace: 'retain-on-failure'
    },

    projects: [
        {
          name: 'setup',
          testMatch: '**/*.setup.ts',
        },
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
          dependencies: ['setup'],
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
          dependencies: ['setup'],
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
          dependencies: ['setup'],
        },
      ],
}

export default config