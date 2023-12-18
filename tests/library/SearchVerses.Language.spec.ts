import { test, expect } from '@playwright/test'
import { Application } from '@components/shared'
import { changeLanguage } from '@scenarios/settings'


test.describe('Library › Search › Change language', () => {
  let app: Application

  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()

    await changeLanguage(app, 'Русский')
  })


  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('Library updated to selected language', async () => {
    await expect(app.library.verse('бг 1.1')).toBeVisible()
  })

  test('Search by text foreign language', async ({ page }) => {
    await page.getByPlaceholder('Поиск').fill('Панду')

    await expect(app.library.listItems).toHaveCount(1)
    await expect(app.library.verse('бг 1.1')).toBeVisible()
  })
})
