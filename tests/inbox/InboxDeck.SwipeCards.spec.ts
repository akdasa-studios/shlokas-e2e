import { Application } from '@components/shared'
import { expect, test } from '@playwright/test'
import { addVerseToInbox } from '@scenarios/library'


test.describe('Inbox Deck › Swipe Cards', () => {
  let app: Application

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
    await addVerseToInbox(app, 'BG 1.1')
    await app.tabs.inboxTab.click()
  })

  test('Swipe card left', async () => {
    await app.inboxDeck.swipeCardLeft()

    await expect(app.inboxDeck.getCard('BG 1.1', 'Text')).toHaveAttribute('data-index', '0')
    await expect(app.inboxDeck.getCard('BG 1.1', 'Translation')).toHaveAttribute('data-index', '1')
    await expect(app.tabs.inboxBadge).toContainText('2')
  })

  test('Cycle swipe card left', async () => {
    await app.inboxDeck.swipeCardLeft()
    await app.inboxDeck.swipeCardLeft()

    await expect(app.inboxDeck.getCard('BG 1.1', 'Translation')).toHaveAttribute('data-index', '0')
    await expect(app.inboxDeck.getCard('BG 1.1', 'Text')).toHaveAttribute('data-index', '1')
  })

  test('Swipe card up', async () => {
    await app.inboxDeck.swipeCardUp()

    await expect(app.tabs.inboxBadge).toContainText('1')
  })

  test('Review badge', async () => {
    await app.inboxDeck.swipeCardUp()
    await app.tabs.libraryTab.click()
    await expect(app.library.verseBadge('BG 1.1')).toHaveText('Review')
  })

  test('Swipe all cards up', async () => {
    await app.inboxDeck.swipeCardUp()
    await app.inboxDeck.swipeCardUp()

    await expect(app.inboxDeck.inboxEmpty).toBeVisible()
    await expect(app.tabs.inboxBadge).toBeHidden()
  })

  test('Move card up', async () => {
    const distances = [40, 60, 120]

    for (const distance of distances) {
      await app.inboxDeck.swipeCardUp(distance, 25)
      await expect(app.tabs.inboxBadge).toContainText('2')
    }
  })
})