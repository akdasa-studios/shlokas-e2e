import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'


test.describe('Tutorial :: Library', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open({
      tutorialEnabled: true,
      tutorialStep: 2,
    })
  })

  /**
   * When: User is at Library tutorial
   * Then: It should ask him to open BG 1.1
   */
  test('Shows proper text', async () => {
    await expect(app.tutorial.cardText).toContainText("Open BG 1.1")
  })

  /**
   * When: User is at Library tutorial
   * Then: It should not allow him to click any verse but "BG 1.1"
   */
  test('Do not allow to open any verse but BG 1.1', async () => {
    await app.library.verse("BG 2.13").click()
    await expect(app.library.verseDetails.addButton).not.toBeVisible()
  })
})
