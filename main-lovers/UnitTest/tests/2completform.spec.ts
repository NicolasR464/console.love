// import { test, expect } from "@playwright/test";
// import sleep from "p-sleep";



// test('createaccount', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await page.click('text=Sign Up');

//   await page.fill('input[placeholder="email"]', 'fotesdefraps@msn.com');
//   await page.fill('input[placeholder="password"]', 'azerty');
// await page.getByPlaceholder('password').nth(2).fill('azerty');

//   await page.click('button:has-text("Sign In with your credentials")');
//   await page.waitForNavigation();

//   // Attendre le chargement de la page complete_profile
//   await page.waitForURL('http://localhost:3000/complete_profile');

//   // Effectuer les actions de saisie dans les champs du formulaire de profil complet
//   await page.fill('input[placeholder="Username"]', 'Matthieu le giga bg');
//   await page.fill('input[placeholder="First Name"]', 'Matthieu');
//   await page.fill('input[placeholder="Last Name"]', 'Perry');
//   await page.fill('input[placeholder="Address"]', 'le kremlin bicètre');

//   // Cliquez sur le bouton pour soumettre le formulaire de profil complet
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByLabel('Go').check();

//   // Ajouter des attentes supplémentaires pour vérifier les résultats
//   await page.waitForURL('http://localhost:3000/success');
//    await page.pause()

//   // Effectuer les vérifications nécessaires pour s'assurer que le profil complet est traité correctement

// });




// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await page.getByText('Sign Up').click();
//   await page.getByPlaceholder('email', { exact: true }).click();
//   await page.getByPlaceholder('email', { exact: true }).fill('fotesdefraps@msn.com');
//   await page.getByPlaceholder('password').nth(1).click();
//   await page.getByPlaceholder('password').nth(1).fill('azerty');
//   await page.getByPlaceholder('password').nth(2).click();
//   await page.getByPlaceholder('password').nth(2).fill('azerty');
//   await page.getByRole('button', { name: 'Sign In with your credentials' }).click();
//   await page.goto('http://localhost:3000/complete_profile');
//   await page.getByPlaceholder('Username').click();
//   await page.getByPlaceholder('Username').fill('Matthieu le giga bg');
//   await page.getByPlaceholder('First Name').click();
//   await page.getByPlaceholder('First Name').fill('Matthieu');
//   await page.getByPlaceholder('Last Name').click();
//   await page.getByPlaceholder('Last Name').fill('Perry');
//   await page.getByPlaceholder('Address').click();
//   await page.getByPlaceholder('Address').fill('Le kremlin bicètre');
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByLabel('Go').check();
//   await page.getByLabel('C#').check();
//   await page.getByRole('textbox').fill('2000-01-01');
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByRole('radio').first().check();
//   await page.getByRole('checkbox').nth(2).check();
//   await page.getByRole('checkbox').nth(3).check();
//   await page.getByRole('checkbox').nth(4).check();
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByPlaceholder('Profile picture').click();
//   await page.getByPlaceholder('Profile picture').setInputFiles('Mat-le-bg.jpg');
//   await page.getByRole('img', { name: 'Uploaded Preview 1' }).click();
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByRole('button', { name: 'Merge one night' }).click();
//   await page.getByRole('button', { name: 'Start the adventure' }).click();
// });