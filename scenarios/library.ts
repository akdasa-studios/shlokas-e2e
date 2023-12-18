import { Application } from "@components/shared"

export async function addVerseToInbox(app: Application, verse: string) {
  await app.library.verse(verse).click()
  await app.library.verseDetails.addButton.click()
  await app.library.verseDetails.addButton.waitFor({ state: 'detached' })
}