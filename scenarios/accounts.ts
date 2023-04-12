import { Browser, BrowserContext, Page } from '@playwright/test'
import { TabsBar } from '@components/shared'
import { Account } from '@components/settings'
import { MAIL_URL } from '@utils/env'

export async function signUp(
  context: BrowserContext,
  appPage: Page,
  email: string
) {
  const account = new Account(appPage)

  // act
  await account.open()
  await account.signUpViaEmail.click()
  await account.name.type('Ivan Petrović')
  await account.email.click()
  await account.email.type(email)
  await account.password.click()
  await account.password.type('12345678')
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

  await mailPage.frameLocator('iframe').getByRole('link', { name: 'Confirm email' }).click()
  await mailPage.waitForTimeout(4000) // code below doesn't work for some reason
  await mailPage.close()
  // const [popup] = await Promise.all([
  //   mailPage.waitForEvent('popup'),
  //  mailPage.frameLocator('iframe').getByRole('link', { name: 'Confirm email' }).click()
  // ])
  // popup.getByText('Email has been confirmed!').waitFor()
}

export async function logIn(
  appPage: Page,
  email: string,
) {
  await appPage.bringToFront()
  const account = new Account(appPage)

  await account.open()
  await account.logIn.click()
  await appPage.getByRole('dialog').waitFor()
  await account.email.clear()
  await account.password.clear()
  await account.email.click()
  await account.email.type(email)
  await account.password.click()
  await account.password.type('12345678')
  await account.logIn.click()
  await appPage.waitForTimeout(750)
}

export async function logInNewDevice(
  browser: Browser,
  email: string
): Promise<[BrowserContext, Page]> {
  const context = await browser.newContext()
  const page    = await context.newPage()
  const tabs    = new TabsBar(page)

  await page.goto('/?tutorialEnabled=false')
  await tabs.settingsTab.click()
  await logIn(page, email)

  return [context, page]
}

export async function sync(page: Page) {
  const account  = new Account(page)
  // const tabs     = new TabsBar(page)
  // const settings = new Settings(page)

  // await tabs.settingsTab.click()
  // await settings.account.click()
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