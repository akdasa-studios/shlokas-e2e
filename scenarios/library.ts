import { Application } from "@components/shared"

export async function addVerseToInbox(app: Application, verse: string) {
  await app.library.verse(verse).click()
  await app.verseDetails.addButton.click()
  await app.verseDetails.addButton.waitFor({ state: 'detached' })
}