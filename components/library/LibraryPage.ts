import { Page } from '@playwright/test'
import { testId } from '@utils/testId'
import { VerseDetailsPage } from './VerseDetailsPage'


export class LibraryPage {
  constructor(private readonly page: Page) {}

  get verseDetails() {
    return new VerseDetailsPage(this.page)
  }

  get searchbar() {
    return this.page.getByPlaceholder('Search')
  }

  get listItems() {
    return this.page.getByRole('listitem')
  }

  verse(title: string) {
    return this.page.getByRole('heading', { name: title })
  }

  verseBadge(number: string) {
    return this.page.getByTestId(testId(number, 'badge'))
  }
}