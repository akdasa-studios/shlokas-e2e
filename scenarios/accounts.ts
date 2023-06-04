import { Browser, BrowserContext, Page } from '@playwright/test'
import { TabsBar } from '@components/shared'
import { Account, Settings } from '@components/settings'
import { MAIL_URL } from '@utils/env'

export async function signUp(
  context: BrowserContext,
  appPage: Page,
  email: string
) {
  const tabs = new TabsBar(appPage)
  const settings = new Settings(appPage)
  const account = new Account(appPage)

  // navigate to account page
  await tabs.settingsTab.click()
  await settings.account.click()

  // act
  await account.signUpViaEmail.click()
  await account.email.click()
  await account.email.type(email)
  await account.signUp.click()
  await appPage.waitForTimeout(2000)

  // 1. open mail client and confirm email
  const mailPage = await context.newPage()
  await mailPage.goto(MAIL_URL)
  await mailPage.evaluate(() =>
    localStorage.setItem('mailcatcherSeparatorHeight', '400')
  )
  await mailPage.goto(MAIL_URL)

  await mailPage.getByRole('cell', { name: `<${email}>` }).first().click()

  const code = await mailPage.frameLocator('iframe').getByTitle('code').textContent()
  // await mailPage.waitForTimeout(4000) // code below doesn't work for some reason
  await mailPage.close()

  await account.code.click()
  await account.code.type(code)
  await account.signIn.click()
  await account.signIn.waitFor({ state: 'hidden' })

  // const [popup] = await Promise.all([
  //   mailPage.waitForEvent('popup'),
  //  mailPage.frameLocator('iframe').getByRole('link', { name: 'Confirm email' }).click()
  // ])
  // popup.getByText('Email has been confirmed!').waitFor()
}

export async function logInNewDevice(
  browser: Browser,
  email: string
): Promise<[BrowserContext, Page]> {
  const context = await browser.newContext()
  const page    = await context.newPage()
  const tabs    = new TabsBar(page)

  await page.goto('/home/library/?tutorialEnabled=false&autoSyncOnLogin=false&reviewCardsInRandomOrder=false')
  await tabs.settingsTab.click()
  await signUp(context, page, email)

  return [context, page]
}

export async function sync(page: Page) {
  const account = new Account(page)
  await account.sync.click()
}

export function getRandomString(length=16) {
  const characters ='abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}