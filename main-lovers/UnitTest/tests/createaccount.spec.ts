// import { test as setup,  } from '@playwright/test';

// import { test, expect } from "@playwright/test";

// test.describe("navigation", () => {
//   test.beforeEach(async ({ page }) => {
//     Go to the starting url before each test.
//     await page.goto("http://localhost:3000");
//   });

//   test("main navigation", async ({ page }) => {
//     Assertions use the expect API.
//     await expect(page).toHaveURL("http://localhost:3000");
//   });



// });

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
//   await page.locator('http://localhost:3000/complete_profile');
//   await page.getByPlaceholder('Username').click();
//   await page.getByPlaceholder('Username').fill('Matthieu le giga bg');
//   await page.getByPlaceholder('First Name').click();
//   await page.getByPlaceholder('First Name').fill('Matthieu');
//   await page.getByPlaceholder('Last Name').click();
//   await page.getByPlaceholder('Last Name').fill('Perry');
//   await page.getByPlaceholder('Address').click();
//   await page.getByPlaceholder('Address').fill('le kremlin bicètre');
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByRole('textbox').fill('2000-01-01');
//   await page.getByLabel('JavaScript').check();
//   await page.getByLabel('C++').check();
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByRole('radio').first().check();
//   await page.getByRole('checkbox').nth(3).check();
//   await page.getByRole('checkbox').nth(2).check();
//   await page.getByRole('checkbox').nth(4).check();
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByPlaceholder('Profile picture').click();
//   await page.getByPlaceholder('Profile picture').setInputFiles('Mat-le-bg.jpg');
//   await page.getByRole('img', { name: 'Uploaded Preview 1' }).click();
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByRole('button', { name: 'Merge one night' }).click();
//   await page.getByRole('button', { name: 'Start the adventure' }).click();



// test('testcreateusertest', async ({ page }) => {
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
//   await page.getByPlaceholder('Address').fill('le kremlin bicètre');
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByRole('textbox').fill('2000-01-01');
//   await page.getByLabel('JavaScript').check();
//   await page.getByLabel('Python').check();
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
// test.describe("connexion", () => {
//   test.beforeEach(async ({ page }) => {
//     // S'assure du point de depart url du test 
//     await page.goto("http://localhost:3000");
//   });
//   });
 

//   test("sign up", async ({ page }) => {
//     // Cliquez sur le bouton "Sign Up"
//     await page.click('text=Sign Up');

//     // Remplissage du formulaire avec l'e-mail et le mot de passe

//     await page.fill('input[name=email]', 'fotesdefraps@msn.com');
//     await page.fill('input[name=password]', 'azerty');
//     await page.fill('input[name=password]', 'azerty') ;}// a mettre 2 fois ?

  
  

//     Soumettre le formulaire
//     await Promise.all([
//       page.waitForNavigation(), // Attendre la redirection
//       page.click('text=Submit'), // Cliquer sur le bouton de soumission
//     ]);

//     Vérifier si la redirection a été effectuée avec succès
//     await expect(page).toHaveURL("http://localhost:3000/dashboard");
//   });
// });
