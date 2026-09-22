# Deals Opportunities — Research Prototype

**Status: temporary, ~1 week research prototype. Fully mocked data. Not connected to any Back Market production system. To be dismantled after testing concludes.**

## What this is

A standalone, front-end-only prototype of two Back Market Seller Back Office surfaces — the Listings page and the new **Opportunities → Deals** experience — built to test the Deals Opportunities MVP with external sellers in 30-minute moderated research sessions.

- **Independent project.** No dependency on the Seller XP hub, any other Seller XP repository, or any other personal prototype repository.
- **Real Revolve components.** Uses the actual `@backmarket/design-system` npm package (not a lookalike), consumed the same way `BackMarket/front-apps` does — via a local `@ds` alias, since the package's own compiled output requires it.
- **Fully mocked.** All data is deterministic, typed, client-side fixtures. All "actions" (view listing, update price, create listing, export CSV) mutate local state only and never make a network call.
- **Reference material**: see `docs/PLAN.md` for the full implementation plan and `docs/prototype-reference/` for the source PRDs, front-apps research notes, and visual references this was built from.

## Research this supports

Six questions, per the research brief:
1. Can sellers discover a relevant Deal? (Listings page banner → Opportunities/Deals)
2. Can sellers understand the campaign details? (campaign card → drawer)
3. Can sellers understand the four listing statuses? (In Deal / Near target / Above target / Not listed)
4. Can sellers understand the price and commission trade-off? (per-listing profit/unit shown inline + CSV export)
5. Can sellers choose the correct next action? (View listing / Update price / Create listing)
6. Can sellers understand the export fields? (Listings CSV export with Deal columns)

## Running locally

```bash
npm install       # requires registry access to @backmarket/design-system — see below
npm run dev        # http://localhost:3000
npm run test        # unit tests (Vitest) — calculation logic
npm run test:e2e   # e2e tests (Playwright) — full user journeys
npm run generate    # static build to .output/public
```

### Revolve package access

`@backmarket/design-system` is a private BackMarket GitHub Packages module. Your `~/.npmrc` needs:

```
@backmarket:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<a GH PAT with read:packages, SSO-authorized for the BackMarket org>
```

## Deterministic research scenarios

Four starting states, set via query param (data-state only — no UI hints, per the research brief):

- `/opportunities/deals?scenario=in-deal`
- `/opportunities/deals?scenario=near-target`
- `/opportunities/deals?scenario=above-target`
- `/opportunities/deals?scenario=not-listed`

## Access

The deployed prototype sits behind a **symbolic passphrase gate** — client-side only, not real security (this repo is public and the gate's logic is fully inspectable in the shipped JS). Its only purpose is to keep the URL from being casually stumbled into during the testing window. The passphrase is shared with the moderator separately, not committed to this repo in plaintext anywhere it'd be indexed.

`public/robots.txt` disallows all crawling, and the page sets a `noindex, nofollow` meta tag.

## Resetting between sessions

Click the small ⚙ control in the bottom-right corner → **Reset prototype**. This clears all mocked price updates / listing creations back to the deterministic fixture baseline, and clears the session event log. The same panel lets a moderator **download the session event log** as JSON at any time.

## Architecture

- **Framework**: Nuxt 4 + TypeScript, statically generated (`nuxt generate`) — no server, no database, no auth.
- **Design system**: real `@backmarket/design-system` (Revolve), consumed via a `@ds` alias (see `nuxt.config.ts`) — this mirrors how `front-apps` itself resolves the package (its own compiled output imports internally via the same alias convention), not an invented pattern.
- **Domain logic**: `app/domain/types.ts` + `app/domain/calculations.ts` — pure, unit-tested functions implementing the real Step 0 PRD's calculation rules and the real Step 1 PRD's status matrix exactly.
- **Fixtures**: `app/fixtures/` — deterministic, typed, covers every required research state (all 4 statuses, 2 campaigns, 2 product types, 4 markets, varied stock/commission, one deliberately negative-profit-per-unit case).
- **State**: Nuxt `useState` (SSR-safe shared reactive state) + a handful of composables (`useListingActions`, `useCsvExport`, `useEventLog`, `useDealScenario`) — no store library needed at this scale.

## Reference material this was built from

- `docs/prototype-reference/prds/` — the two real Confluence PRDs (Step 0: Deal info in the listings export; Step 1: Deal Opportunities MVP)
- `docs/prototype-reference/notes/front-apps-deals-feature-findings.md` — read-only research into `BackMarket/front-apps`' real, in-progress implementation of this same feature (component structure, Revolve import map, status enum) — **not depended on**, only referenced
- `docs/prototype-reference/existing-prototype/` — Andrew's own prior concept exploration (the officially-linked design reference for Jira ticket SXP-9914)
- `docs/PLAN.md` — the full planning document, including every resolved decision

## Disabling / deleting

This is meant to be temporary. To fully dismantle after the testing window:
1. Unpublish GitHub Pages for this repo (Settings → Pages → disable).
2. Delete the repo, or make it private.
3. Revoke the dedicated CI npm token (GitHub → Settings → Developer settings → Personal access tokens) and remove the `NPM_REGISTRY_TOKEN` repo secret.
