import { Application } from "@components/shared"

export async function changeLanguage(app: Application, language: string) {
    await app.tabs.settingsTab.click()
    await app.page.getByTestId('language').click()
    await app.page.getByRole('button', { name: language }).click()
    await app.tabs.libraryTab.click()
}