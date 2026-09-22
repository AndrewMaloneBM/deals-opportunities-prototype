### **LEVEL CONFIDENTIAL - BM ONLY**

# Deals Adoption - Sellers Feedback - SellerVoiceDigest

Sources: SAB Session #1 (Jan 2026), SAB Stakeholder Engagement (Jan 2026), Deal Next Steps doc (Jan 2026), Pricing x Sourcing Research (Q1 2025), Prototype test (Jun 2025), Ask Sellers Anything Edition #1 — Pricing (Jul 2026), SSM feedback (Jul 2026), User testing Jun 2025, Early campaign results Apr 2025, BackForum Pricing Workshop Sept 2025, SXP Vision 2026, PRD Deal Visibility Feb 2025, SAB Feedback Loop Apr 2026

Period covered: 2025–2026 only

🔴 Signal 1 — Deals are highly valued in principle, but structurally inaccessible

SAB Session #1 poll (Jan 2026) — when asked which feature would be most valuable, sellers ranked Volume-Based Incentives #1 (10 votes) and Deals API #2 (8 votes) out of 22 respondents. Deals as a concept are wanted. The execution is where it breaks.

SAB Stakeholder Engagement (Jan 2026) — explicit finding: "Deals are highly valued by sellers and drive volume." This sits alongside "Back Market delivers higher sales velocity than other platforms" as the two most cited positives.

🔴 Signal 2 — Deal prices are too low for many sellers to participate

## Abir (Nest Green) — prototype session, Jun 2025:

"We havenʼt participated in any [commission discount deals] because the prices were too low. Weʼre more focused on the 5% commission break available in other countries."

Aaron (Loop Mobile) — ASA Jul 2026: skips deal invitations where the target price is £80–100 below the buy box and below what he earns on other marketplaces.

Hayley (SSM, Jul 2026): Swiftedge, TSJ, Applehot, Grozber all confirmed 439€ with 5% discount “will not be sustainable” for iPhone 15 Excellent grade.

Jack R (SSM, Jul 2026): "50% of the opps in that file are breakeven or loss making for him."

SAB Feedback Loop, Apr 2026: commission rates flagged as “too high” — rated 🟢 Minor. BM communicated fees are not increasing. No structural action. BM has decided not to compete on fees — Deals are the commercial answer. If deals donʼt work economically, sellers have no margin lever.

🔴 Signal 3 — Deals are invisible to sellers who donʼt manually log into the BO

Deal Next Steps doc (Jan 2026): 0.2% click rate on the deal button vs. 60% on save and 40% on Win BackBox. Deal details downloaded only 915 times in 3 months (~10/day).

Alan (Bluesky) — ASA Jul 2026: redirected iPhone Air stock to B2B the week before a BM deal launched. Silent GMV loss.

Pricing x Sourcing Research Q1 2025: 74% of BM GMV moves through API-connected sellers. No Deals API. Deal target prices absent from CSV export.

User testing, Jun 2025 (Kieran, Ingram/Best4Tech):

"The seller is thrilled weʼre moving away from the manual deals process, as itʼs far too time-consuming."

Internal summary: "The current process is very manual, with sellers notified only once per week. Communication limited to email creates a true lack of visibility that explains poor engagement and participation rates." Documented Jun 2025. Process unchanged as of Jul 2026.

Deal email process (May–Jul 2026): invitations sent manually by email. Target prices in a spreadsheet. Updated weekly on Tuesdays, effective Thursdays. Sellers have at most 2 daysʼ notice per price update. For Asia-sourcing sellers (2–3 week lead times) this is unworkable.

🔴 Signal 4 — Deals work when sellers participate — the commercial case is proven

Early campaign results, Apr 2025:

GMV increment: +9% on iPhones (+6% to +12%)

Seller adoption: 60% of eligible GMV at deal price ROI: ~0.6

BackForum Pricing Workshop, Sept 2025: "More than 300 sellers participating in commission reduction campaigns. Initial results demonstrated strong adoption."

Key implication: the deal mechanic works. When the right sellers at the right price participate, GMV uplift is material. The problem is getting sellers to the starting line.

## 🔴 Signal 5 — No real-time tracking kills in-period adjustment

Aaron (Loop Mobile) — ASA Jul 2026: learns deal performance at month-end from his AM. Too late to adjust.

SXP Vision 2026: real-time tracking is a known backlog item. Post-action summary planned as BO notification within 48–72h. Status: dependency on Pricing tool in BigQuery.

Deal Next Steps doc (Jan 2026): "Show analytics on our pricing mechanisms to sellers" — listed as to do. Still unresolved Jul 2026.

🟡 Signal 6 — SKU/taxonomy mapping blocks large sellers

Kieran (Ingram/Best4Tech) — ASA Jul 2026: manually maps BM taxonomy to his own SKUs every deal cycle. Pricing against last weekʼs data by the time mapping is done.

🟡 Signal 7 — Deal visibility in the Listing Page was already scoped — status unclear

PRD: Increase deal visibility for sellers (Feb 2025) — 17 months ago, this feature was fully scoped:

- Deal banner in Listing Page (name, market, timeframe)

- Filter to see which listings are in deals

- Deal price visible alongside BackBox price

- CSV export of all listings in deal

⚠ If this PRD hasnʼt shipped, the August discovery may be re-documenting problems already fully understood in early 2025. Worth asking: what blocked it?

## 🟡 Signal 8 — Commission display is confusing

Abir (Nest Green) — prototype test Jun 2025: commission discount displayed in red, reads as “danger” not “benefit.” Wrong first impression for the deal mechanic.

🟢 Signal 9 — Deals API and volume incentives = top 2 feature requests

SAB Session #1 poll (Jan 2026): Volume-Based Incentives (10 votes), Deals API (8 votes). Explicit since Jan 2026.

## Summary table

|Theme|Signal|Sources|Period|
|---|---|---|---|
|Manual process = #1<br>adoption blocker (seller-<br>stated)|🔴 Strong|User testing (Kieran)|Jun 2025|
|Deals work commercially|🔴 Strong|Early campaign results,|Apr–Sept 2025|
|(+9%GMV uplift)||BackForum||
|Deals highly valued in|🔴 Strong|SAB Session #1,SAB|Jan 2026|
|principle||Engagement||
|Deal prices too low to|🔴 Strong|Nest Green, Loop|Jun 2025+Jul 2026|
|participate commercially||Mobile, SSMs||
|Deals invisible outside|🔴 Strong|Deal Next Steps, Pricing|Q1 2025+Jul 2026|
|the BO (no API,no CSV)||Research, ASA||
|No real-time deal<br>tracking → no in-period<br>adjustment|🔴 Strong|Loop Mobile, Deal Next<br>Steps, SXP Vision|Jan–Jul 2026|
|Deal visibility PRD<br>scoped Feb 2025 —<br>status unknown|🟡 Moderate|PRD:deal visibility|Feb 2025|
|SKU/taxonomy friction<br>blocks large sellers|🟡 Moderate|Ingram/Best4Tech (ASA)|Jul 2026|
|Commission display<br>confusing (red = danger)|🟡 Moderate|Nest Green (prototype<br>test)|Jun 2025|
|Deals API + volume<br>incentives = top 2<br>feature requests|🟡 Moderate|SAB Session #1 poll|Jan 2026|
|Commission rates too<br>high — no action<br>planned|🟡 Moderate|SAB Feedback Loop|Apr 2026|

## ⚠ Key framing notes for discovery

1. Two different blockers, two different fixes. For the 53 positive-margin opportunities Roberto identified, the blocker is not economics — itʼs awareness and access. For the 81 negative-margin ones, economics comes first. The August interviews should validate this split.

2. The PRD question. Deal visibility in the Listing Page was scoped in Feb 2025. If it hasnʼt shipped, ask what blocked it before designing new solutions.

3. Deals work. +9% GMV uplift is proven. This isnʼt a validation problem — itʼs a distribution and access problem.
