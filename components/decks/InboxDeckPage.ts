import { Page } from '@playwright/test'
import { testId } from '@utils/testId'

export class InboxDeckPage {
  constructor(private readonly page: Page) {}

  get inboxEmpty() {
    return this.page.getByTestId('inboxEmpty')
  }

  getCard(verse: string, type: string) {
    return this.page.getByTestId(testId(verse, 'card', type))
  }

  async swipeCardLeft() {
    await this.page.waitForTimeout(750)
    await this.page.mouse.move(90, 160)
    await this.page.mouse.down()
    await this.page.mouse.move(10, 160, { steps: 2 })
    await this.page.mouse.up()
    await this.page.waitForTimeout(750)
  }

  async swipeCardUp(distance: number = 240, steps: number = 2) {
    await this.page.waitForTimeout(750)
    await this.page.mouse.move(40, 520)
    await this.page.mouse.down()
    await this.page.mouse.move(40, 520 - distance, { steps })
    await this.page.mouse.up()
    await this.page.waitForTimeout(750)
  }
}