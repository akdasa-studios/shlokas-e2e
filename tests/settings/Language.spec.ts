import { test, expect } from '@playwright/test'
import { Application } from '@components/shared'


test.beforeEach(async ({ page }) => {
  await new Application(page).goto('/home/library', {
    tutorialEnabled: false,
    libraryLastSyncDate: 9999999999999,
    reviewCardsInRandomOrder: false,
  })
  await page.getByTestId('settings-tab').click()
})

test.describe('Settings › Language', () => {
  test('Change language', async ({ page }) => {
    await page.getByTestId('language').click()
    await page.getByRole('button', { name: 'Русский' }).click()
    await expect(page.getByRole('banner')).toHaveText('Настройки')
  })

  test('Saves settings', async ({ page }) => {
    await page.getByTestId('language').click()
    await page.getByRole('button', { name: 'Русский' }).click()
    await page.reload()
    await expect(page.getByRole('banner')).toHaveText('Настройки')
  })
})