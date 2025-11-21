
# Keyturn Studio – Prospect List Gathering SOP

Last updated: 2025-11-14

This document describes the full **TTP/SOP** for gathering, cleaning, and prioritizing hotel/inn prospects for Keyturn Studio.

The goal is to turn prospecting from random suffering into a **repeatable machine**:
1. Scrape properties from OTAs (Booking.com / Expedia) into a raw table.
2. Clean and rate them quickly (A/B/C, notes, reasons).
3. Promote the best ones into an outreach-ready list tied to your CRM.
4. Track which regions are actually “goldmines” and which to drop.

---

## 1. Spreadsheet Structure

Create ONE master Google Sheet or Excel file, called something like:

> `Keyturn – Prospect Machine`

It should have **three tabs**:

1. `RAW_SCRAPE` – raw data from scrapers/exports.
2. `CLEANED_HOTELS` – filtered, rated, and annotated properties.
3. `OUTREACH_READY` – contacts you’re actually going to email / call.

### 1.1 Tab: `RAW_SCRAPE`

**Purpose:** Dump all unprocessed OTA scrape data here. You don’t “think” here; you just paste data.

**Columns (exact names):**

- `source` – e.g. `booking`, `expedia`, `manual`.
- `region` – broad region label you choose, e.g. `Northumberland`, `Cotswolds`, `Lake District`.
- `town` – city/village name from the scraper or manual entry.
- `property_name` – name of the hotel/inn/B&B.
- `property_type` – hotel / inn / guest house / B&B / apartment / etc.
- `rooms` – number of rooms (if known; can be blank).
- `review_score` – OTA review score, e.g. `8.7`.
- `booking_url` – URL to the OTA listing (Booking.com / Expedia page).
- `website_url` – direct website if the OTA lists it.
- `raw_id` – unique ID from the scraper OR just a running number you assign.

**Usage rules:**

- Never manually edit scraped values except to fix obvious formatting.
- All new OTA data gets appended at the bottom of this tab.

---

### 1.2 Tab: `CLEANED_HOTELS`

**Purpose:** This is your **working table** where you actually think and rate properties.

**Columns:**

Core status/rating columns:

- `status`  
  - `unreviewed` – you haven’t opened the website yet.
  - `skipped` – you’ve looked and decided not worth pursuing.
  - `qualified` – okay fit, maybe later (B-style prospects).
  - `prospect` – strong fit, you want them in outreach.
- `fit_rating`  
  - `A` – perfect ICP, good demand, bad/weak site → strong money upside.
  - `B` – okay fit or middling site → still possible.
  - `C` – not worth time (too small, chain, great site already, etc.).
- `reason_code` – short code for *why* you rated it A/B/C, examples:
  - `wix_bad` – Wix/Squarespace DIY site that sucks.
  - `ota_only` – no website at all; OTA-only presence.
  - `already_good` – site is already modern/strong.
  - `chain` – branded chain / group, not your lane.
  - `out_of_size` – too small or too large for your sweet spot.

Property data (copied from `RAW_SCRAPE`):

- `region`
- `town`
- `property_name`
- `property_type`
- `rooms`
- `review_score`
- `booking_url`
- `website_url`

Qualitative data (you add manually as you review):

- `tech_stack` – wix / squarespace / wp / other / unknown (can be rough).
- `site_notes` – 5–10 words about the website, e.g.:
  - `Wix, no direct booking CTA`
  - `Old WP, slow, booking buried`
  - `OTA-only, no site`
- `business_notes` – notes about the business itself, e.g.:
  - `9.3 rating, strong weekend demand`
  - `Right by castle, strong tourism`
  - `Seasonal coastal inn`

**Population:**

- You bring data in from `RAW_SCRAPE` by filtering and copy/paste (see Section 3).

---

### 1.3 Tab: `OUTREACH_READY`

**Purpose:** This is your **pipeline input** – the list that gets synced to HubSpot or used to send emails/Looms.

**Columns:**

- `outreach_status`
  - `not_started`
  - `in_progress`
  - `replied`
  - `call_booked`
  - `closed_won`
  - `closed_lost`
- `fit_rating`
- `region`
- `town`
- `property_name`
- `decision_maker_name` – once you find it (owner/GM).
- `email` – best available email for outreach.
- `website_url`
- `booking_url`
- `personal_intro` – personalized AI-assisted icebreaker line based on the site.
- `last_contacted_at` – date of last email or touch.
- `notes` – anything relevant for sales (referrals, objections, etc.).

**Population:**

- Rows are only added here when `status = prospect` (and sometimes good `qualified` B’s) in `CLEANED_HOTELS`.

---

## 2. Input Pipeline – Getting Data into `RAW_SCRAPE`

### 2.1 Pick Focus Regions (“Goldmines”)

At any given time, you should only be working **2–3 regions**. Examples (UK-centric to match your case study):

- `Northumberland & Borders`
- `Cotswolds`
- `Lake District edges`
- `Yorkshire Coast`
- `Cornwall` / `Devon`

The idea is: **clusters** of inns/small hotels in tourist areas, not random industrial towns.

For each region, you’ll:

1. Scrape properties from OTAs (Booking / Expedia).
2. Move that data → `RAW_SCRAPE`.
3. Later decide which regions are worth scaling based on how many A/B prospects they produce.

---

### 2.2 Scraping from Booking.com (example workflow)

For a given region:

1. Go to **Booking.com**.
2. Search for the region/town, e.g. `"Cotswolds"`.
3. Apply filters:
   - Property type: **Hotels / Inns / Guest houses / B&Bs**.
   - Optional: minimum review score (e.g. **8.0+** to avoid dying properties).
4. Copy the **search URL** – this URL is what you feed into your scraper.

---

### 2.3 Running Apify (or similar) on OTA search URLs

Use an Apify actor like **“Booking.com Hotels Scraper”** (or equivalent). In the actor input:

- Provide the **search URLs** for your chosen regions.
- Use default options for fields unless you know what you’re doing.

When the run completes:

1. Download the dataset as **JSON**.
2. Convert JSON → CSV with only the useful columns.

Useful columns to keep (names will depend on actor but the idea is):

- `name` → `property_name`
- `address`/`city` → `town`
- `url` → `booking_url`
- `website` → `website_url`
- `reviewScore` → `review_score`
- `numberOfRooms` → `rooms`
- `propertyType` → `property_type`

Everything else is optional and can be thrown away.

You can:
- Use an online JSON → CSV converter then manually delete extra columns, **or**
- Use a simple small script (Python/JS) to select only the fields you want.

3. Add the **`source`** and **`region`** columns as needed (e.g. `booking`, `Northumberland`).
4. Paste/appending this CSV into `RAW_SCRAPE`.

Now `RAW_SCRAPE` contains unprocessed properties from that region.

---

## 3. Cleaning & Rating – Working in `CLEANED_HOTELS`

This is the core activity that turns raw noise into a usable prospect list.

### 3.1 Move Filtered Data Into `CLEANED_HOTELS`

In `RAW_SCRAPE`:

1. Apply filters:
   - `property_type` → include only hotels / inns / guest houses / B&Bs.
   - `rooms` → if available, filter roughly **8–40**. If not available, leave blank and decide later.
2. Select the visible rows and **copy** them.
3. Paste these rows into `CLEANED_HOTELS` (append below any existing data).

In `CLEANED_HOTELS`, for newly pasted rows, set defaults:

- `status` = `unreviewed`
- `fit_rating` = *(empty)*
- `reason_code` = *(empty)*

---

### 3.2 The 3–Minute Rating Loop

Work in small batches, e.g. **20–30 rows at a time**. The goal is fast judgment, not perfection.

For each row (property):

1. **Check `website_url`:**
   - If empty, copy the `property_name` + `town` and search in Google quickly:
     - If there is truly **no website**, set:
       - `status` = `skipped`
       - `fit_rating` = `C`
       - `reason_code` = `ota_only`
       - `site_notes` = `No website, OTA-only`
       - Move on to next row.

2. **Open the website** (Ctrl+Click the `website_url` from Sheets).

3. **Quick mental checks (max 30–45 seconds):**
   - Is it in your **size range** (~8–40 rooms or visually similar scale)?
   - Is it clearly **independent**, not a big chain?
   - Does the website **suck or leave money on the table**?
     - DIY Wix/Squarespace look
     - No direct booking engine
     - Terrible mobile experience
     - No “book direct” messaging

4. **Assign ratings and codes:**

   - `fit_rating`:
     - `A` – perfect ICP + strong demand + clearly weak site/booking setup.
     - `B` – okay ICP or site is not horrific but still improvable.
     - `C` – not worth time (too small, chain, great site, wrong market, etc.).

   - `status`:
     - `prospect` → for `A` fits.
     - `qualified` → for `B` fits (maybe later/outbound or retarget).
     - `skipped` → for `C` fits.

   - `reason_code` (examples):
     - `wix_bad` – Wix/Squarespace with weak UX.
     - `ota_only` – no site at all.
     - `already_good` – modern, well-built site.
     - `chain` – chain or branded group.
     - `out_of_size` – too small/big.

   - `site_notes` – 5–10 words:
     - e.g. `Wix, no direct booking CTA`, `Old WP, slow, booking buried`.

   - `tech_stack` – if you can see it quickly (Wix footer, etc.), jot it down.

Do NOT overthink. The point is: turn unreviewed into **A/B/C with a reason**.

---

## 4. Promoting Prospects to `OUTREACH_READY`

Once you’ve rated a batch:

1. In `CLEANED_HOTELS`, filter:
   - `status` in (`prospect`, `qualified`)
   - `fit_rating` in (`A`, `B`)

2. Copy those rows and **paste into `OUTREACH_READY`**.

In `OUTREACH_READY`, add or initialize:

- `outreach_status` = `not_started`.
- Keep property data (region, town, property_name, website_url, booking_url).
- Later, you will fill in:
  - `decision_maker_name`
  - `email`
  - `personal_intro`
  - `last_contacted_at`
  - `notes`

This becomes the **source of truth** for your sales pipeline and email sequences.

---

## 5. Region Performance Tracking

To avoid wasting time on low-yield areas, create a small summary table (can be on a separate tab or at the bottom of `CLEANED_HOTELS`).

For each `region`, track:

- `total_properties_reviewed` – count of rows in `CLEANED_HOTELS` for that region.
- `A_count` – count where `fit_rating = "A"`.
- `B_count` – count where `fit_rating = "B"`.
- `C_count` – count where `fit_rating = "C"`.
- `A_plus_B_per_50` – how many A/B you get for every 50 properties reviewed.

Example summary:

| Region              | Reviewed | A | B | C | A+B per 50 |
|---------------------|----------|---|---|---|------------|
| Northumberland      | 60       | 8 | 12| 40| 20         |
| Cotswolds           | 60       | 3 | 7 | 50| 10         |
| Random City         | 60       | 0 | 4 | 56| 4          |

Interpretation:

- Regions giving **20+ A/B per 50** reviewed are **worth more scrapes and deeper attention**.
- Regions giving **<10 A/B per 50** are probably not worth continuing to mine.

This turns region selection into a **data-driven decision** instead of a feeling.

---

## 6. Weekly & Daily Rhythm

To make this sustainable and automatic, use a simple cadence.

### Weekly (1–2 times per week): Data Input

1. Choose 1–2 regions to work on.
2. Scrape OTA data (Booking.com / Expedia) via Apify.
3. Convert JSON → CSV with only the useful columns.
4. Append the data into `RAW_SCRAPE`.
5. Filter and copy new rows into `CLEANED_HOTELS` for review.

### Most Days: Rating Sessions

- Spend a **25–30 minute** focused block:
  - Rate 20–40 new rows in `CLEANED_HOTELS`.
  - A/B/C, status, reason_code, brief notes.
- After rating, filter to A/B and promote them into `OUTREACH_READY` when you need more outreach fuel.

### When Planning Outreach Sprints:

- From `OUTREACH_READY`, filter:
  - `outreach_status = "not_started"`.
  - `fit_rating in ("A", "B")`.
- Take a batch (e.g. 30–50) and:
  - Find contact emails.
  - Generate personalized intros (with AI).
  - Load into your sequencer / CRM.

---

## 7. Summary

This SOP gives you a **repeatable system**:

1. **Scrape** OTA data → `RAW_SCRAPE`.
2. **Filter & copy** relevant hospitality properties → `CLEANED_HOTELS`.
3. **Quickly rate** A/B/C with `status` + `reason_code` + short notes.
4. **Promote** only A/B properties into `OUTREACH_READY`.
5. **Track region performance** so you double down where you find the most A/B prospects.
6. Use `OUTREACH_READY` as the base for **actual outreach**, not random domain surfing.

Run this consistently and your bottleneck won’t be “who do I contact?”—it will be “how do I close more of these?”.
