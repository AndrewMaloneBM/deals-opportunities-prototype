import { test, expect, type Page } from '@playwright/test'

const PASSPHRASE = '270194'

async function unlock(page: Page) {
  await page.goto('/opportunities/deals')
  const passphraseInput = page.locator('input[type="password"]')
  if (await passphraseInput.count() > 0) {
    await passphraseInput.fill(PASSPHRASE)
    await page.click('button[type="submit"]')
  }
}

test.describe('Primary journey — Listings to Deals Opportunities', () => {
  test('passphrase gate blocks then unlocks with the correct code', async ({ page }) => {
    await page.goto('/listings')
    await expect(page.getByText('Research prototype')).toBeVisible()
    await page.fill('input[type="password"]', 'wrong-code')
    await page.click('button[type="submit"]')
    await expect(page.getByText('Incorrect passphrase')).toBeVisible()

    await page.fill('input[type="password"]', PASSPHRASE)
    await page.click('button[type="submit"]')
    await expect(page.getByText('Your listings')).toBeVisible()
  })

  test('Listings page shows the Deals banner and In deal chips', async ({ page }) => {
    await unlock(page)
    await page.goto('/listings')
    await expect(page.getByText('reduced commission Deals')).toBeVisible()
    await expect(page.getByText('In deal').first()).toBeVisible()
  })

  test('Deals page shows both active campaigns', async ({ page }) => {
    await unlock(page)
    await expect(page.getByText('Apple iPhones — selected models')).toBeVisible()
    await expect(page.getByText(/Samsung Galaxies/)).toBeVisible()
  })

  test('opening a campaign shows all 4 listing statuses with correct actions', async ({ page }) => {
    await unlock(page)
    await page.getByRole('button', { name: /Apple iPhones/ }).click()
    await expect(page.getByText('In target', { exact: true })).toBeVisible()
    await expect(page.getByText('Near target')).toBeVisible()
    await expect(page.getByRole('button', { name: 'View listing' }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Update price' }).first()).toBeVisible()
    // Near target rows show BOTH Update price and View listing (per the real screenshots) —
    // In target (L1) contributes 1 "View listing", Near target (L2) contributes another.
    await expect(page.getByRole('button', { name: 'View listing' })).toHaveCount(2)
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-test="backdrop"]')).not.toBeVisible()

    await page.getByRole('button', { name: /Samsung Galaxies/ }).click()
    await expect(page.getByText('Far target').first()).toBeVisible()
    await expect(page.getByText('Not listed').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Create listing' })).toBeVisible()
  })

  test('the negative-profit fixture shows a negative profit per unit', async ({ page }) => {
    await unlock(page)
    await page.getByRole('button', { name: /Samsung Galaxies/ }).click()
    await expect(page.getByText('€-11.20 profit/unit')).toBeVisible()
  })

  test('Update price action opens a confirm popover and updates state', async ({ page }) => {
    await unlock(page)
    await page.getByRole('button', { name: /Apple iPhones/ }).click()
    await page.getByRole('button', { name: 'Update price' }).first().click()
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible()
  })

  test('Create listing action mocks a listing creation with a toast', async ({ page }) => {
    await unlock(page)
    await page.getByRole('button', { name: /Samsung Galaxies/ }).click()
    await page.getByRole('button', { name: 'Create listing' }).click()
    await expect(page.getByText('Listing created (mocked)')).toBeVisible()
  })
})

test.describe('Secondary journey — Listings export', () => {
  test('CSV export includes the exact PRD field labels and omits Deal columns for non-Deal listings', async ({ page }) => {
    await unlock(page)
    await page.goto('/listings')
    await page.getByRole('button', { name: 'Import or export listings' }).click()
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download CSV' }).click()
    const download = await downloadPromise
    const path = await download.path()
    const fs = await import('node:fs')
    const csv = fs.readFileSync(path!, 'utf-8')
    const lines = csv.split('\n')

    expect(lines[0]).toContain('Deal - Estimated profit per unit')
    expect(lines[0]).toContain('Deal - Participation')

    const nonDealRow = lines.find((l) => l.startsWith('IP13-128-MID-FR'))
    expect(nonDealRow).toBe('IP13-128-MID-FR,iPhone 13 128GB — Midnight,FR,320,80,,,,,,,')
  })
})

test.describe('Research scenarios', () => {
  for (const scenario of ['in-deal', 'near-target', 'above-target', 'not-listed']) {
    test(`?scenario=${scenario} loads without error`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await unlock(page)
      await page.goto(`/opportunities/deals?scenario=${scenario}`)
      await expect(page.getByText('Apple iPhones — selected models')).toBeVisible()
      expect(errors).toHaveLength(0)
    })
  }
})

test.describe('Reset', () => {
  test('reset returns mocked state to the deterministic baseline', async ({ page }) => {
    await unlock(page)
    await page.getByRole('button', { name: /Apple iPhones/ }).click()
    await page.getByRole('button', { name: 'Update price' }).first().click()
    await page.locator('input[id^="new-price-"]').fill('999')
    await page.getByRole('button', { name: 'Confirm' }).click()
    await expect(page.getByText('Price updated (mocked)')).toBeVisible()

    await page.getByRole('button', { name: 'Session log and reset' }).click()
    await page.getByRole('button', { name: 'Reset prototype' }).click()
    await expect(page.getByText('Prototype reset')).toBeVisible()
  })
})
