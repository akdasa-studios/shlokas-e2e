import { InboxDeckPage, ReviewDeckPage } from '@components/decks'
import { LibraryPage, VerseDetailsPage } from '@components/library'
import { TabsBar } from '@components/shared'
import { TutorialOverlay } from '@components/tutorial'
import { Page } from '@playwright/test'

export interface ApplicationParams {
  tutorialEnabled?: boolean,
  tutorialStep?: number,
  libraryLastSyncDate?: number,
  autoSyncOnLogin?: boolean,
  reviewCardsInRandomOrder?: boolean,
  date?: Date
}

export class Application {
  public readonly library: LibraryPage
  public readonly verseDetails: VerseDetailsPage
  public readonly tabs: TabsBar
  public readonly inboxDeck: InboxDeckPage
  public readonly reviewDeck: ReviewDeckPage
  public readonly tutorial: TutorialOverlay

  constructor(
    public readonly page: Page
  ) {
    this.library = new LibraryPage(page)
    this.verseDetails = new VerseDetailsPage(page)
    this.inboxDeck = new InboxDeckPage(page)
    this.tabs = new TabsBar(page)
    this.reviewDeck = new ReviewDeckPage(page)
    this.tutorial = new TutorialOverlay(page.getByTestId("tutorial-overlay"))
  }

  async open(
    params: ApplicationParams = {}
  ) {
    const defaultParams: ApplicationParams = {
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999,
      reviewCardsInRandomOrder: false,
    }
    await this.goto(
      '/home/library',
       Object.assign({}, defaultParams, params)
    )
  }

  async reload() {
    await this.page.reload()
  }

  async goto(
    url: string,
    params?: ApplicationParams
  ) {
    if (params) {
      // @ts-ignore
      const queryString = new URLSearchParams(params).toString()
      await this.page.goto(`${url}?${queryString}`)
    } else {
      await this.page.goto(url)
    }
  }
}