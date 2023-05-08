import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'
import { getRandomString, logInNewDevice, signUp } from '@scenarios/accounts'


test.describe('Settings › Account › Email', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
  })

  test('Register new account', async ({ page, context }) => {
    const uniqueEmail = getRandomString()
    const email       = `${uniqueEmail}@test.rs`

    await signUp(context, page, email)
    await expect(page.getByText('Welcome back!')).toBeVisible()
  })

  test('Log In on another device', async ({ page, context, browser }) => {
    const uniqueEmail = getRandomString()
    const email       = `${uniqueEmail}@test.rs`

    // device1: register and login
    await signUp(context, page, email)

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    await expect(page2.getByText('Welcome back!')).toBeVisible()

    await page2.close()
    await context2.close()
  })
})