import { Locator, Page } from '@playwright/test'
import { testId } from '@utils/testId'

export class ReviewDeckPage {
  constructor(private readonly page: Page) {}

  get good() { return this.page.getByTestId('good') }
  get forgot() { return this.page.getByTestId('forgot') }

  card(verseNumber: string, type: ReviewCardType) {
    return this.page.getByTestId(testId(verseNumber, 'card', type))
  }

  get tutorialCardIds() {
    return [
      'tutorial.review.questionAnswer',
      'tutorial.review.intervals',
    ]
  }
  get reviewEmpty() { return this.page.getByTestId('reviewEmpty') }
  get cardsCountDueToTomorrow() { return this.page.getByTestId('cardsCountDueToTomorrow') }

  async swipeCardUp() {
    await this.page.waitForTimeout(750)
    await this.page.mouse.move(40, 580)
    await this.page.mouse.down()
    await this.page.mouse.move(40, 340, { steps: 2 })
    await this.page.mouse.up()
    await this.page.waitForTimeout(750)
  }
}