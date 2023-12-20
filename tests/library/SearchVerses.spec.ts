import { test, expect } from '@playwright/test'
import { Application } from '@components/shared'


test.describe('Library › Search', () => {
  let app: Application

  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.open()
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('By verse number', async () => {
    await app.library.searchbar.fill('BG 1.1')
    await expect(app.library.listItems).toHaveCount(1)
  })

  test('By text', async () => {
    await app.library.searchbar.fill('embodied')
    await expect(app.library.listItems).toHaveCount(1)
    await expect(app.library.verse('bg 2.13')).toBeVisible()
  })

  test('By verse', async () => {
    await app.library.searchbar.fill('kim akurvata')
    await expect(app.library.listItems).toHaveCount(1)
    await expect(app.library.verse('bg 1.1')).toBeVisible()
  })

  test('Nothing found', async () => {
    await app.library.searchbar.fill('<NOTHING FOUND>')
    await expect(app.library.listItems).toHaveCount(0)
    await expect(app.library.verse('bg 1.1')).toBeHidden()
  })

  test('Respects diacritics', async () => {
    await app.library.searchbar.fill('Dhṛtarāṣṭra')
    await expect(app.library.listItems).toHaveCount(1)
    await expect(app.library.verse('bg 1.1')).toBeVisible()
  })

  test('Ignores case', async () => {
    await app.library.searchbar.fill('bg 1.1')
    await expect(app.library.listItems).toHaveCount(1)
    await expect(app.library.verse('bg 1.1')).toBeVisible()
  })

  test('Ignores diacritics', async () => {
    await app.library.searchbar.fill('Dhrtarastra')
    await expect(app.library.listItems).toHaveCount(1)
    await expect(app.library.verse('bg 1.1')).toBeVisible()
  })
})