import { Page } from '@playwright/test'

export class Account {
  constructor(private readonly page: Page) {}

  get signUpViaEmail() { return this.page.getByRole('button', { name: 'Sign in with Email'})  }
  get email()    { return this.page.getByLabel('EMail').first() }
  get code()     { return this.page.getByLabel('Code').first() }
  get signUp()   { return this.page.getByRole('button',  { name: 'Next'}) }
  get logIn()    { return this.page.getByRole('button',  { name: 'Log In'}) }
  get signIn()   { return this.page.getByRole('button',  { name: 'Sign In'}) }
  get sync()     { return this.page.getByRole('button',  { name: 'Force Syncing'}) }
  get verifyEmail() { return this.page.getByTestId('verifyEmail') }
  get syncingProgress() { return this.page.getByTestId('syncing-progress') }

  async open() {
    await this.page.goto('/home/settings/account?tutorialEnabled=false&reviewCardsInRandomOrder=false')
  }
}