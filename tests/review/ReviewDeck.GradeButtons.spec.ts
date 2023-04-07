import { expect, test } from '@playwright/test'
import { Application } from '@components/shared'
import { addCardsToReview } from '@scenarios/cards'
import { nextDays } from '@utils/dates'


test.describe('Review Deck › Grade Buttons', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)

    await app.open()
    await addCardsToReview(page, ['BG 1.1'])
    await app.open(nextDays(1))
    await app.tabs.reviewTab.click()
  })

  /**
   * When user clics "Good" button, the card should be removed from the
   * review deck, because it is scheduled for another day.
   */
  test('Answer "Good"', async () => {
    const card = app.reviewDeck.card('BG 1.1', "NumberToTranslation")

    // act:
    await card.click()
    await app.reviewDeck.good.click()

    // assert:
    await expect(app.reviewDeck.reviewEmpty).toBeVisible()
  })

  /**
   * When user clicks "Forgot" button, the card should be shown again
   * in the review deck.
   */
  test('Answer "Forgot" for the last card', async () => {
    const card = app.reviewDeck.card('BG 1.1', "NumberToTranslation")

    // act:
    await card.click()
    await app.reviewDeck.forgot.click()

    // assert:
    // 1. card is still in the review deck
    await expect(app.reviewDeck.reviewEmpty).toBeHidden()
    await expect(card).toBeVisible()
    await expect(card).toHaveAttribute('data-index', '0')
  })
})