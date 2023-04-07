import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'
import { addCardsToReview } from '@scenarios/cards'
import { nextDays } from '@utils/dates'


test.describe('Review Deck › Swipe Cards', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    app.open()
    await addCardsToReview(page, ['BG 1.1', 'BG 2.13'])
  })

  /**
   * When user opens the review deck, they should see cards if he has
   * added cards to review.
   */
  test('Swipe all cards up', async () => {
    // act:
    await app.open(nextDays(1))
    await app.tabs.reviewTab.click()

    await app.reviewDeck.swipeCardUp()
    await app.reviewDeck.swipeCardUp()

    // assert:
    // 1. review badge should be hidden because all cards are swiped
    // 2. review deck should be empty - no cards to review
    await expect(app.tabs.reviewBadge).toBeHidden()
    await expect(app.reviewDeck.reviewEmpty).toBeVisible()
  })
})