# Hisoft IT Solutions Website Project Report

Date: 24 May 2026

## Project Overview

This project is a production-ready static website for Hisoft IT Solutions Pvt. Ltd. The site is designed for shared hosting deployment, including Hostinger `public_html`, and includes company pages, service pages, policy URLs, bilingual English/Marathi switching, responsive layouts, animated branding, service illustrations and SEO-friendly public routes.

## Completed Pages

- Home: IT company overview, dynamic hero heading, service highlights, dashboard visuals, product portfolio and project CTA.
- About Us: Company profile, working approach, mission, vision and team section.
- Services: IT services and software product cards linked to detailed service sections.
- Service Details: Detailed information for school software, college software, websites, digital marketing, GST billing, ERP, custom software, payment gateway, Android apps, hospital/clinic, petrol pump and business management software.
- Contact & Help: Company contact details, enquiry form, support buttons and FAQ section.
- Privacy Policy: Public URL for app and website compliance.
- Terms of Service: Public terms page.
- Refund Policy: Public refund page.
- Data Safety: Public data safety declaration page.
- Help: Redirect-style page pointing users to Contact FAQ.

## Key Features

- Responsive HTML/CSS/JS static website.
- Animated Hisoft logo using the provided `hisoft.png` logo.
- Dynamic home hero heading with rotating business segments.
- English and Marathi language switching with human-style Marathi plus common IT English terms.
- Service cards with relevant PNG images and linked detail sections.
- Animated but lightweight backgrounds, card effects, dashboard charts and product motion.
- Footer includes meaningful company content, policy links, support links and Google Maps rating prompt.
- SEO basics: title tags, descriptions, canonical links, sitemap and robots file.
- Accessibility improvements: visible focus states, labelled contact form, `aria-live` form status, descriptive image alt text and semantic service detail navigation.

## Public Policy URLs

- `/privacy-policy/`
- `/terms/`
- `/refund-policy/`
- `/data-safety/`

These routes are ready for app listing and compliance submission.

## Contact Details Used

- Company: Hisoft IT Solutions Pvt. Ltd.
- Location: Vishal Nagar, 7 Hills Road, Chhatrapati Sambhaji Nagar, Maharashtra, PIN-431001
- Phone: 8830350465 / 9699139573
- Email: info@hisofttechnology.com
- Google Maps rating link: https://share.google/zXlta1xiny0M98AwX

## Hostinger Deployment

The website is static and does not require Node.js, PHP, database setup or a build server. Upload the contents of the generated `hostinger-build` folder to Hostinger `public_html`.

Required upload contents:

- `index.html`
- `about/`
- `services/`
- `contact/`
- `privacy-policy/`
- `terms/`
- `refund-policy/`
- `data-safety/`
- `help/`
- `assets/`
- `robots.txt`
- `sitemap.xml`

After upload, verify:

- `https://hisofttechnology.com/`
- `https://hisofttechnology.com/privacy-policy/`
- `https://hisofttechnology.com/terms/`
- `https://hisofttechnology.com/refund-policy/`
- `https://hisofttechnology.com/data-safety/`

## Notes

- The project uses external image URLs from Pexels for some page hero images. For fully offline hosting, download and replace those URLs with local images in `assets/`.
- No personal donation number is present.
- Privacy Policy is linked in the footer, not the main navbar.
- Help and FAQ are merged under `/contact/#faq`.
