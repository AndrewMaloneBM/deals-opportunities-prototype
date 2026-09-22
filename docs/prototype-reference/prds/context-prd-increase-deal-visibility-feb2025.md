**LEVEL CONFIDENTIAL - BM ONLY**

# (prd) Increase the deal visibility for sellers

|OKR|Master the Market|
|---|---|
|Scope|Seller Back Office - EU|
|Epic||
|Target release|Q4|
|Document|READY|
|status||
|Owners|Product:<br>@Antony THALIEN|
||Design & Content:<br>@Andrew MALONE<br>@Elizabeth<br>HUDSON|
||Tech:<br>@Marina PLANELLS GUASCH|
||Stakeholder:<br>@Torrin BALSOLLIER<br>@Antoine<br>BARBRY|
|Links|Slack channel:<br>#temp-deal-in-seller-bo-tech<br>Catch up|
||Dynamic deals PRD:<br>Vision master the market 2025 (OKR1):<br>Dynamic Deals<br>OKR #1 2025<br>- Master the market (Back Market's Price Vision)|
||Figma:<br>Listings|

## Objective

Enable sellers to access deals information autonomously in the Seller Back Office.

## Why it matters?

Despite its position as the market leader in Europe, Back Market faces increasing competition from specialized marketplaces like Refurbed, generalist platforms such as Amazon and CDiscount, and traditional retailers including Orange, Bouyges, Darty, and MediaMarkt.

Back Market's price index has risen significantly year-over-year due to two main factors:

1. Higher Selling Costs: The company incurs a blended cost to sell of approximately 14%, which is higher than the 5-10% costs faced by competitors.

2. Stricter Quality and Compliance Standards: Back Market maintains rigorous quality and compliance requirements.

To address these challenges, we have developed several pricing strategies, including offering seller deals. The objective of these deals is to provide exceptionally competitive prices on key products with strong demand and significant influence on price perception. This approach aims to enhance Back Market's competitiveness in the market.

## Whatʼs the problem?

For now, the seller awareness regarding deals rely on manual actions:

- We are sending emails to seller with the deal price

- SSM are reminding them to sellers

If we want to scale this mechanism, we need to make sure that our deals are visible for sellers.

## What does success look like?

Every seller can see the deal price & incentive available for every product.

No more manual tasks to communicate deals to sellers.

Increase the count of sellers participating in deals.

## Solutions

We identified 3 and we will focus on the first of those solution for now.

- Display the Seller deals in the Seller BO

- Display the Seller deals in CSV

- Display the Sellers deals in API

## Description of the deal mechanism

- Deals are at BackBox level

- Price incentive: An order will have a commissions discount if it is priced at deal price

Volume incentive: And another commission discount if he reaches a certain volume of sales

## Iterations

Given that there are still discussions ongoing regarding the scheme of the volume incentive, we will first focus on the price incentive and then on the volume.

Step 1: Display the Seller deals in the Seller BO in the listing page

As a seller, I want to know the different deals running at Back Market

In the Listing page, there is a banner with:

deals information:

name

market

timeframe

some information about how deals work

and the possibility to export every products in deal in a CSV

As a seller, I want to see which of my listings is included into deals

I can filter my listing

And I have a little icon next to every listing in deal

As a seller, I see the deal price and I can adjust to the deal price

Next to the backbox price, we display the deal price and a button for seller to unlock deals.

## Implementation

We recommend to follow the same implementation than the Sales Maximizer Price: we save the data to display in a bigquery table and we call this table to display deals in the BO. Fields of the deal table

Table

- deal_campaign_name → to be added manually following this rules:

[Brand] [Product] — selected models/all models

(Brand is always singular. Product name is always plural.)

Examples: Apple MacBooks — selected models

Apple iPhones & Samsung Galaxies — selected models

- [Category] — selected models/all models

(Category is always plural.)

Example: Robot vacuums — all models

- deal_campaign_start_date

- deal_campaign_end_date

- market

- product_public_id

- backbox grade

special_offer_type

deal_target_price_start_date

deal_target_price_end_date

deal_target_price_local_currency

min commission discount

max commission discount

PRODUCT_MODEL

PRODUCT_STORAGE

PRODUCT_DUAL_SIM

PRODUCT_NAME

CATEGORY_CLUSTER

CATEGORY_SUB_CLUSTER

“CATEGORY_3” fields

BACKBOX_GRADE_LABEL

SPECIAL_OFFER_TYPE_LABEL

Fields required by SellerXP: please check the specs to keep one source of truth only (specs) Deals

Deals will be defined based on the volume incentive: one deal per scope of volume.

Open question: what is the max count of lines possible for the CSV for sellers?

Step 2: Display the Seller deals in CSV: TBD

Step 3: Display the Sellers deals in API: TBD
