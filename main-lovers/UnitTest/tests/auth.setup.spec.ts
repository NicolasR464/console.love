// import { test as setup } from '@playwright/test';

// const authFile = 'playwright/.auth/user.json';

// setup('authenticate', async ({ page }) => {
  
// Effectue les étapes d'authentification
//   await page.goto('http://localhost:3000/');
//   await page.getByLabel('sername or email address').fill('username');
//   await page.getByLabel('Password').fill('password');
//   await page.getByRole('button', { name: 'Sign in' }).click();
//   Attendre que la page reçoive les cookies.
  
//   Parfois, le flux de connexion définit des cookies lors du processus de plusieurs redirections.
//   Attendre l'URL finale pour vous assurer que les cookies sont bien définis.
//   await page.waitForURL('https://github.com/');
//   Attendre que la page atteigne un état où tous les cookies sont définis.  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

//   fin de l'étape auth

//   await page.context().storageState({ path: authFile });
// });

//authentification pour test