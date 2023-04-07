import { InboxDeckPage } from '@components/decks'
import { LibraryPage, VerseDetailsPage } from '@components/library'
import { TabsBar } from '@components/shared'
import { Page } from '@playwright/test'


export async function addCardsToReview(page: Page, verses: string[]) {
  const library = new LibraryPage(page)
  const verseDetailsPage = new VerseDetailsPage(page)
  const inbox = new InboxDeckPage(page)
  const tabs = new TabsBar(page)

  // add verses to inbox
  for (const verse of verses) {
    await library.verse(verse).click()
    await verseDetailsPage.addButton.click()
    await verseDetailsPage.addButton.waitFor({ state: 'detached' })
  }

  await tabs.inboxTab.click()

  // memorize cards form inbox
  for (var i = 0; i < verses.length * 2; i++) {
      await inbox.swipeCardUp()
  }
}


export async function addCardsToInbox(page: Page, verses: string[]) {
  const library = new LibraryPage(page)
  const verseDetailsPage = new VerseDetailsPage(page)

  // add verses to inbox
  for (const verse of verses) {
    await library.verse(verse).click()
    await verseDetailsPage.addButton.click()
  }
}

