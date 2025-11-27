# InvoCreator – Free, Privacy-First Invoice Generator

**InvoCreator** is a free, browser-based invoice generator that runs entirely on the client side.  
No signup, no tracking, no data leaves your device – you fill the form, print or export, and that’s it.

👉 Live tool: **https://www.invocreator.com**

---

## ✨ Key Features

- **100% client-side**  
  - No server, no database, no cookies, no tracking pixels.  
  - All data stays in your browser until you print or save as PDF.

- **Multi-language & market aware**  
  - English (International / EU)  
  - English (US)  
  - German (DE)  
  - Spanish (ES)  
  - Italian (IT)  
  - Slovenian (SI)  
  - Swedish (SE)  
  - Bosnian / Croatian / Serbian (BHS)  
  - Field labels, notes and documentation are localized per language/market.

- **Invoice layout tuned for real-world use**  
  - Seller & buyer details with optional logos  
  - Itemized lines with quantities, units and prices  
  - Subtotals, tax/VAT, and gross total  
  - Optional customer number, order reference, notes, footer, etc.

- **VAT / tax handling**  
  - VAT percentage per market  
  - **Reverse charge** toggle for EU scenarios (VAT paid by recipient)  
  - Text explanations localized per language.

- **Payment QR code**  
  - Optional QR for payment (SEPA QR for EUR and generic data otherwise)  
  - Printed cleanly together with invoice totals.

- **Templates via JSON**  
  - **Download JSON template**: save current invoice as a JSON file.  
  - **Load JSON template**: restore a saved invoice later.  
  - Useful for recurring customers or product sets.

- **Light / dark theme**  
  - Theme toggle that also keeps the print layout clean and readable.

- **Print-ready output**  
  - Optimized for browser “Print → Save as PDF”.  
  - UI controls, buttons and non-essential chrome are hidden in print view.

- **Localized documentation**  
  - Inline documentation/help available for each supported language.

---

## 🧑‍💻 How to Use

1. Open **https://www.invocreator.com** in a modern browser.
2. Select **Language / Market** at the top.
3. Fill in:
   - Seller (your) details  
   - Buyer details  
   - Invoice items  
   - Optional notes, footer, reverse charge, QR code, etc.
4. Click **Print invoice** and use the browser’s print dialog to:
   - Print on paper, or  
   - Save as PDF.
5. Optionally use:
   - **Download JSON template** to keep a reusable invoice layout.  
   - **Load JSON template** to restore it later.

---

## 🔐 Privacy & Data

- All logic is implemented in static HTML/CSS/JS.  
- There is **no backend** – no form submissions, no accounts.  
- Nothing is sent to any server by design.  
- You are responsible for storing and backing up your generated invoices/PDFs.

If you self-host this project, the same properties apply as long as you serve it as static files.

---

## 🛠 Tech Stack

- Static **HTML + CSS + Vanilla JavaScript**
- No frontend framework
- Localization via a simple `invoice-i18n.js`
- Hosted on **GitHub Pages**, fronted by **Cloudflare**
- QR generation with a tiny JS QR library

---

## 🚀 Self-hosting

You can host your own copy of InvoCreator.

1. Clone the repository:

   ```
   git clone https://github.com/sbozich/invocreator.git
   cd invocreator
  ```
   
Serve the folder with any static file server, for example:



```
npx serve .
```

Open http://localhost:3000 (or whichever port serve reports).

There is no build step – what’s in the repo is what’s served.

🌍 Roadmap / Ideas
Additional languages & markets

Extra invoice fields (e.g. purchase order, project name)

Optional multi-currency helper notes

More payment QR formats where available

🤝 Feedback & Support
Suggestions and comments: modblaises@proton.me

You can support this tool via BuyMeACoffee (link in the site footer).

📄 License
Note: Choose a license before publishing this section widely.
A common choice for tools like this is the MIT License.
