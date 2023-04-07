import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'
import { addCardsToReview } from '@scenarios/cards'
import { nextDays } from '@utils/dates'

test.describe('Review Deck › Schedule', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
    await addCardsToReview(page, ['BG 1.1'])
  })

  /**
   * if user skips multiple days in a row, the review deck should
   * show all the cards that were scheduled for those days.
   */
  test('Skip multiple days', async ({ page }) => {
    // act:
    await app.open(nextDays(10))

    // assert:
    // 1. we create 6 cards per verse, so we should see 6 cards
    await (expect(app.tabs.reviewBadge)).toHaveText('6')
  })

  /**
   * Message shows count of cards scheduled for tommorow.
   */
  test('Scheduled cards for tomorrow message', async ({ page }) => {
    // act:
    await app.open(nextDays(1))
    await app.tabs.reviewTab.click()

    await app.reviewDeck.card('BG 1.1', "NumberToTranslation").click()
    await app.reviewDeck.good.click()

    // assert:
    // 1. one card scheduled for today and one card from yesterday
    await expect(app.reviewDeck.cardsCountDueToTomorrow).toHaveText('You have 2 cards scheduled for tomorrow.')
  })

  /**
   * Scheduled for the next day card should be shown on the next day.
   */
  test('Schedule card for the next day', async ({ page }) => {
    // act:
    await app.open(nextDays(1))
    await app.tabs.reviewTab.click()

    await app.reviewDeck.card('BG 1.1', "NumberToTranslation").click()
    await app.reviewDeck.good.click()
    await app.open(nextDays(2))
    await app.tabs.reviewTab.click()

    // assert:
    // 1. one card scheduled for today and one card from yesterday
    await (expect(app.tabs.reviewBadge)).toHaveText('2')
  })
})