import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'


test.describe('Library › Add verse to Inbox', () => {
  let app: Application

  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
  })


  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('Add verse to the Inbox deck', async () => {
    await app.library.verse('BG 1.1').click()
    await app.library.verseDetails.addButton.click()

    await expect(app.library.verseBadge('BG 1.1')).toContainText('Inbox')
    await expect(app.tabs.inboxBadge).toContainText('2')
  })

  test('Add button is disabled if verse has already been added', async () => {
    await app.library.verse('BG 1.1').click()
    await app.library.verseDetails.addButton.click()
    await app.library.verse('BG 1.1').click()

    await expect(app.library.verseDetails.addButton).toBeDisabled()
  })

  test('Back returns to app.library', async () => {
    await app.library.verse('BG 1.1').click()
    await app.library.verseDetails.backButton.click()

    await expect(app.library.searchbar).toBeVisible()
  })
})
