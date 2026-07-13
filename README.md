# Gimme website

A responsive, single-page marketing website for Gimme, designed for golf course general managers and built to match the approved modern green-and-sand concept.

## What is included

- Responsive landing page with sticky navigation
- Product phone mockups built in HTML/CSS
- Benefits and five-step ordering flow
- Interactive Revenue Impact Calculator based on the supplied ROI model
- Operator analytics dashboard preview
- Demo request form with validation and a pre-filled email handoff
- Accessibility basics, SEO metadata, reduced-motion support, and mobile navigation
- GitHub Pages deployment workflow

## Run locally

No build tools are required.

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Calculator logic

The calculator uses three customer-facing inputs:

- Average order value
- Extra orders per busy day
- Busy service days per month

Outputs:

- Incremental monthly sales = average order value × extra orders × busy days
- Gross profit = incremental monthly sales × 65%
- Revenue multiple = incremental monthly sales ÷ $199 monthly subscription
- Groups served per month = 30 groups per busy day × busy days

The assumptions are illustrative and can be changed in `script.js`.

## Demo form

The form validates required fields and opens a pre-filled email to `info@gimmedelivery.com`. This works on a static GitHub Pages site without exposing API keys.

For a background submission that does not open an email app, connect the form to Formspree, HubSpot, Web3Forms, or a serverless API route and replace the submit handler in `script.js`.

## Deploy with GitHub Pages

1. Create a GitHub repository.
2. Upload all files in this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. The included workflow deploys the site after every push to `main`.

## Brand assets

The `/assets` folder includes the supplied Gimme wordmark, icon, secondary seal, and the approved visual mockup for reference.
