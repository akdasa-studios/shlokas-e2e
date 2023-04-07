import { InboxDeckPage, ReviewDeckPage } from '@components/decks'
import { LibraryPage, VerseDetailsPage } from '@components/library'
import { TabsBar } from '@components/shared'
import { Page } from '@playwright/test'

export interface ApplicationParams {
  tutorialEnabled?: boolean,
  libraryLastSyncDate?: number,
  date?: Date
}

export class Application {
  public readonly library: LibraryPage
  public readonly verseDetails: VerseDetailsPage
  public readonly tabs: TabsBar
  public readonly inboxDeck: InboxDeckPage
  public readonly reviewDeck: ReviewDeckPage

  constructor(public readonly page: Page) {
    this.library = new LibraryPage(page)
    this.verseDetails = new VerseDetailsPage(page)
    this.inboxDeck = new InboxDeckPage(page)
    this.tabs = new TabsBar(page)
    this.reviewDeck = new ReviewDeckPage(page)
  }

  async open(date: Date = undefined) {
    const params: ApplicationParams = {
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999,
    }
    if (date) { params.date = date }
    await this.goto('/home/library', params)
  }

  async goto(url: string, params?: ApplicationParams) {
    if (params) {
      // @ts-ignore
      const queryString = new URLSearchParams(params).toString()
      await this.page.goto(`${url}?${queryString}`)
    } else {
      await this.page.goto(url)
    }
  }
}