import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'


test.describe('Review Deck', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
  })

  /**
   * Review deck is empty if user has not added any cards.
   */
  test('Deck is empty', async () => {
    // act:
    await app.tabs.reviewTab.click()

    // assert:
    await expect(app.reviewDeck.reviewEmpty).toBeVisible()
    await expect(app.reviewDeck.cardsCountDueToTomorrow).toBeHidden()
  })
})