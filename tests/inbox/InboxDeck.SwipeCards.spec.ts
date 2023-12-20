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


  /**
   * Swiping a card left should put a card at the end of the inbox deck
   */
  test('Swipe card left', async () => {
    await app.inboxDeck.swipeCardLeft()

    await expect(app.inboxDeck.getCard('BG 1.1', 'Text'))
      .toHaveAttribute('data-index', '0')
    await expect(app.inboxDeck.getCard('BG 1.1', 'Translation'))
      .toHaveAttribute('data-index', '1')
    await expect(app.tabs.inboxBadge) // No card removed from the inbox
      .toContainText('2')
  })


  /**
   * Changing cards in the inbox deck must be looped
   */
  test('Swipe cards in the loop', async () => {
    await app.inboxDeck.swipeCardLeft()
    await app.inboxDeck.swipeCardLeft()

    await expect(app.inboxDeck.getCard('BG 1.1', 'Translation'))
      .toHaveAttribute('data-index', '0')
    await expect(app.inboxDeck.getCard('BG 1.1', 'Text'))
      .toHaveAttribute('data-index', '1')
  })


  /**
   * Swiping a card up should remove a card from the inbox deck
   */
  test('Swipe card up', async () => {
    await app.inboxDeck.swipeCardUp()

    await expect(app.tabs.inboxBadge).toContainText('1')
  })


  /**
   * If the card has been memorized, a “Review” badge should appear
   * next to the verse number in the library
   */
  test('Memorize card', async () => {
    await app.inboxDeck.swipeCardUp()
    await app.tabs.libraryTab.click()
    await expect(app.library.verseBadge('BG 1.1')).toHaveText('Review')
  })


  /**
   * If user memorized all cards then:
   * 1. The badge with the number of cards in the inbox deck should disappear
   * 2. The "Inbox is empty" message should be visible
   */
  test('Memorize all cards', async () => {
    await app.inboxDeck.swipeCardUp()
    await app.inboxDeck.swipeCardUp()

    await expect(app.inboxDeck.inboxEmpty).toBeVisible()
    await expect(app.tabs.inboxBadge).toBeHidden()
  })


  /**
   * To swipe the card up, the user needs to move it a sufficient distance
   */
  test('Move card up', async () => {
    const distances = [40, 60, 120]

    for (const distance of distances) {
      await app.inboxDeck.swipeCardUp(distance, 25)
      await expect(app.tabs.inboxBadge).toContainText('2') // No, the card is not swiped up yet
    }
  })
})