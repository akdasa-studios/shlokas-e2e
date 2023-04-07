import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'


test.describe('Inbox Deck', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
  })

  test('Inbox is empty', async () => {
    await app.tabs.inboxTab.click()
    await expect(app.tabs.inboxEmpty).toBeVisible()
  })
})