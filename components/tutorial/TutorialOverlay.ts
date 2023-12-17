import { Locator, Page } from '@playwright/test'
import { testId } from '@utils/testId'


export class TutorialOverlay {
  constructor(
    private readonly locator: Locator
  ) {}

  card(id: number) {
    return this.locator.getByTestId(testId("tutorial-card", id.toString()))
  }

  get cardText() {
    return this.locator.getByTestId("tutorial-card-text")
  }

  button(id: string) {
    return this.locator.getByTestId(testId("tutorial-card-button", id))
  }
}