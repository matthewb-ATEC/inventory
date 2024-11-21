import { test, expect, beforeEach, describe } from '@playwright/test'
import { startReport } from './helper'

describe('example', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')
  })

  test(`default 'app' text is shown`, async ({ page }) => {
    const appText = page.getByText('app')
    await expect(appText).toBeVisible()
  })
})
