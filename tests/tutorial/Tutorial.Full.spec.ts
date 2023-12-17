import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'


test.describe('Tutorial :: Full', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open({ tutorialEnabled: true })
  })

  test('User is able to go throught all tutorial', async () => {
    await app.tutorial.button("yes").click()

    await app.tutorial.card(2).waitFor()
    await app.library.verse("BG 1.1").click()
    await app.verseDetails.addButton.click()
    await app.tabs.inboxTab.click()

    await app.tutorial.card(6).waitFor()
    await app.inboxDeck.swipeCardLeft()

    // TODO: TBD later...
  })

})
