import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'


test.describe('Tutorial', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open({ tutorialEnabled: true })
  })

  /**
   * When: The application starts for the first time
   * Then: It should display tutorial pop-up
   */
  test('Shows tutorial popup when the application starts', async () => {
    await expect(app.tutorial.cardText).toContainText("Welcome to Shlokas!")
  })

  /**
   * When: User clicks "No" button in the tutorial pop-up
   * Then: Tutorial popup should be closed
   */
  test('Click NO button hides totorial overlay', async () => {
    await app.tutorial.button('no').click()
    await expect(app.tutorial.cardText).not.toBeVisible()
  })

  /**
   * When: User rejected tutorial
   *  And: User starts the application for the second time
   * Then: Tutorial popup should be closed
   */
  test('Do not show tutorial if it was rejected', async () => {
    await app.tutorial.button('no').click()
    await app.reload()
    await expect(app.tutorial.cardText).not.toBeVisible()
  })

  /**
   * When: User clicks "Yes" button in the tutorial pop-up
   * Then: Tutorial should go to the next step
   */
  test('Click YES button goes to the next step', async () => {
    await app.tutorial.button('yes').click()
    await expect(app.tutorial.cardText).toContainText('This is a library')
  })
})
