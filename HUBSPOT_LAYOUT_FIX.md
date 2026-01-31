# HubSpot form: consent/terms stacked (not side-by-side)

If the **consent/terms checkboxes** still appear **side by side** on the contact form, the form is loading inside HubSpot’s iframe and our site CSS cannot change its layout.

## What we did in code

1. **`css: ''` in the embed** – Tells HubSpot to try “raw HTML” (no iframe) so our CSS can apply. This only works for forms that support raw HTML (e.g. some legacy forms).
2. **CSS overrides** – In `src/app/hubspot-form-overrides.css` we force consent rows to a single column. These only apply when the form is in our page (no iframe).

## If it’s still side-by-side: fix it in HubSpot

Change the **form layout** in HubSpot so the consent section is single column:

1. In HubSpot: **Marketing** → **Lead Capture** → **Forms**.
2. Open your **contact form** (the one on the contact page).
3. In the form editor:
   - Check the **Layout** or **Structure** of the form. If there’s a **multi-column** or **2-column** section that contains the consent/legal fields, switch that section to **single column** or **full width**.
   - Or: drag the **“Consent to communicate”** and **“Consent to process data”** (or similar) fields so each is in its **own row**, not in the same row.
4. Use the **Styling** tab (left sidebar) if your form has **Layout** or **Columns** options for the form or for a specific section; set that to **1 column** or **full width** for the consent area.
5. **Publish/Update** the form and refresh your site.

HubSpot’s **Data Privacy & Consent** settings only control the **wording** of the consent text, not the layout. Layout is controlled in the **form editor** (field order and column/layout options).

## Optional: use Developer code (Advanced) embed

If your plan allows it:

1. In the form: **Review and update** → **Update** → **Get embed code**.
2. Open the **Developer code (Advanced)** tab.
3. Copy that embed code and replace the current embed in `ContactForm.tsx` if you want to use HubSpot’s CSS variables for styling (they still may not control row vs column for consent; layout is usually set in the form editor as above).
