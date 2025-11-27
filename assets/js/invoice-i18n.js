// assets/js/invoice-i18n.js
(function () {
  const languages = {
    en_intl: {
      code: "en_intl",
      name: "English (International / EU)",
      settings: {
        taxLabel: "VAT (%)",
        defaultCurrency: "EUR",
        dateFormat: "eu", // dd/MM/YYYY for display/print
        reverseChargeEnabled: true,
        showIban: true,
        showUsBankFields: false
      }
    },

    en_us: {
      code: "en_us",
      name: "English (United States)",
      settings: {
        taxLabel: "Tax (%)",
        defaultCurrency: "USD",
        dateFormat: "us", // MM/DD/YYYY for display/print
        reverseChargeEnabled: false,
        showIban: false,
        showUsBankFields: true
      }
    },

    sv_se: {
      code: "sv_se",
      name: "Svenska (Sverige)",
      settings: {
        taxLabel: "Moms (%)",
        defaultCurrency: "SEK",
        // Sweden is ISO-friendly: 2025-11-06
        dateFormat: "iso",
        reverseChargeEnabled: true,
        showIban: true,
        showUsBankFields: false
      }
    },

    sl_si: {
      code: "sl_si",
      name: "Slovenščina (Slovenija)",
      settings: {
        taxLabel: "DDV (%)",
        defaultCurrency: "EUR",
        // Slovenian style: 06.11.2025
        dateFormat: "dot-eu",
        reverseChargeEnabled: true,
        showIban: true,
        showUsBankFields: false
      }
    },

    // Germany preset
    de_de: {
      code: "de_de",
      name: "Deutsch (D-A-CH)",
      settings: {
        taxLabel: "MwSt (%)",
        defaultCurrency: "EUR",
        dateFormat: "dot-eu", // 06.11.2025
        reverseChargeEnabled: true,
        showIban: true,
        showUsBankFields: false
      }
    },

    bhs: {
      code: "bhs",
      name: "B/H/S (bosanski / hrvatski / srpski)",
      settings: {
        taxLabel: "PDV (%)",
        defaultCurrency: "", // user selects BAM, EUR, RSD, etc.
        dateFormat: "dot-eu", // DD.MM.YYYY
        reverseChargeEnabled: true, // users in HR, BA, RS can enable if needed
        showIban: true, // IBAN used across HR/BA/RS
        showUsBankFields: false
      }
    },

    // Italian preset
    it_it: {
      code: "it_it",
      name: "Italiano (Italia)",
      settings: {
        taxLabel: "IVA (%)",
        defaultCurrency: "EUR",
        dateFormat: "eu", // DD/MM/YYYY
        reverseChargeEnabled: true,
        showIban: true,
        showUsBankFields: false
      }
    },

    // Spanish preset (Spain only)
    es_es: {
      code: "es_es",
      name: "Español (España)",
      settings: {
        taxLabel: "IVA (%)",
        defaultCurrency: "EUR",
        dateFormat: "eu", // DD/MM/YYYY
        reverseChargeEnabled: true,
        showIban: true,
        showUsBankFields: false
      }
    }
  };

  // ISO-ish list of recognized countries; code mainly for future use / defaults.
  const countries = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "BR", name: "Brazil" },
    { code: "BN", name: "Brunei" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "CV", name: "Cabo Verde" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "CA", name: "Canada" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "KM", name: "Comoros" },
    { code: "CD", name: "Congo (DRC)" },
    { code: "CG", name: "Congo (Republic)" },
    { code: "CR", name: "Costa Rica" },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "HR", name: "Croatia" },
    { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czechia" },
    { code: "DK", name: "Denmark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "SZ", name: "Eswatini" },
    { code: "ET", name: "Ethiopia" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GH", name: "Ghana" },
    { code: "GR", name: "Greece" },
    { code: "GD", name: "Grenada" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" },
    { code: "HN", name: "Honduras" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "LA", name: "Laos" },
    { code: "LV", name: "Latvia" },
    { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libya" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" },
    { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia" },
    { code: "MD", name: "Moldova" },
    { code: "MC", name: "Monaco" },
    { code: "MN", name: "Mongolia" },
    { code: "ME", name: "Montenegro" },
    { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Netherlands" },
    { code: "NZ", name: "New Zealand" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "KP", name: "North Korea" },
    { code: "MK", name: "North Macedonia" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PW", name: "Palau" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russia" },
    { code: "RW", name: "Rwanda" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "LC", name: "Saint Lucia" },
    { code: "VC", name: "Saint Vincent and the Grenadines" },
    { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" },
    { code: "ST", name: "Sao Tome and Principe" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SN", name: "Senegal" },
    { code: "RS", name: "Serbia" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" },
    { code: "KR", name: "South Korea" },
    { code: "SS", name: "South Sudan" },
    { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SY", name: "Syria" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania" },
    { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TG", name: "Togo" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" },
    { code: "TR", name: "Turkey" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "VA", name: "Vatican City" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" }
  ];

  // Currency list: commonly used + room to extend.
  const currencies = [
    // Common first
    { code: "EUR", label: "EUR – Euro" },
    { code: "USD", label: "USD – US Dollar" },
    { code: "GBP", label: "GBP – British Pound" },
    { code: "CHF", label: "CHF – Swiss Franc" },
    { code: "SEK", label: "SEK – Swedish Krona" },
    { code: "NOK", label: "NOK – Norwegian Krone" },
    { code: "DKK", label: "DKK – Danish Krone" },
    { code: "CAD", label: "CAD – Canadian Dollar" },
    { code: "AUD", label: "AUD – Australian Dollar" },
    { code: "NZD", label: "NZD – New Zealand Dollar" },
    { code: "JPY", label: "JPY – Japanese Yen" },
    { code: "CNY", label: "CNY – Chinese Yuan" },
    { code: "HKD", label: "HKD – Hong Kong Dollar" },
    { code: "SGD", label: "SGD – Singapore Dollar" },
    { code: "INR", label: "INR – Indian Rupee" },
    { code: "BRL", label: "BRL – Brazilian Real" },
    { code: "RUB", label: "RUB – Russian Ruble" },
    { code: "ZAR", label: "ZAR – South African Rand" },
    { code: "TRY", label: "TRY – Turkish Lira" },
    { code: "PLN", label: "PLN – Polish Złoty" },
    { code: "CZK", label: "CZK – Czech Koruna" },
    { code: "HUF", label: "HUF – Hungarian Forint" },
    { code: "RON", label: "RON – Romanian Leu" },
    { code: "BGN", label: "BGN – Bulgarian Lev" },
    { code: "HRK", label: "HRK – Croatian Kuna (legacy)" },
    { code: "RSD", label: "RSD – Serbian Dinar" },
    { code: "BAM", label: "BAM – Bosnian Convertible Mark" },
    { code: "MKD", label: "MKD – North Macedonian Denar" },
    { code: "ALL", label: "ALL – Albanian Lek" },
    { code: "ISK", label: "ISK – Icelandic Króna" },
    { code: "MXN", label: "MXN – Mexican Peso" },
    { code: "ARS", label: "ARS – Argentine Peso" },
    { code: "CLP", label: "CLP – Chilean Peso" },
    { code: "COP", label: "COP – Colombian Peso" },
    { code: "PEN", label: "PEN – Peruvian Sol" },
    { code: "UYU", label: "UYU – Uruguayan Peso" },
    { code: "AED", label: "AED – UAE Dirham" },
    { code: "SAR", label: "SAR – Saudi Riyal" },
    { code: "QAR", label: "QAR – Qatari Riyal" },
    { code: "KWD", label: "KWD – Kuwaiti Dinar" },
    { code: "ILS", label: "ILS – Israeli New Shekel" },
    { code: "EGP", label: "EGP – Egyptian Pound" },
    { code: "NGN", label: "NGN – Nigerian Naira" },
    { code: "KES", label: "KES – Kenyan Shilling" },
    { code: "TZS", label: "TZS – Tanzanian Shilling" },
    { code: "GHS", label: "GHS – Ghanaian Cedi" },
    { code: "PKR", label: "PKR – Pakistani Rupee" },
    { code: "BDT", label: "BDT – Bangladeshi Taka" },
    { code: "LKR", label: "LKR – Sri Lankan Rupee" },
    { code: "THB", label: "THB – Thai Baht" },
    { code: "MYR", label: "MYR – Malaysian Ringgit" },
    { code: "IDR", label: "IDR – Indonesian Rupiah" },
    { code: "VND", label: "VND – Vietnamese Đồng" },
    { code: "KRW", label: "KRW – South Korean Won" }
  ];

  const translations = {
    en_intl: {
"app.title": "Free Invoice Generator",
"app.tagline": "Professional invoices with complete privacy — no signup and zero tracking.",
"app.languages": "Languages: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Language / Market",
      "toolbar.theme": "Theme",

      // Sections
      "section.seller": "Seller",
      "section.buyer": "Buyer",
      "section.invoiceDetails": "Invoice details",
      "section.items": "Items",
      "section.totals": "Totals",
      "section.notes": "Notes",
      "section.payment": "Payment details",
      "section.invoice": "Invoice",

      // Seller block
      "seller.logo": "Seller logo (optional)",
      "seller.name": "Seller name",
      "seller.address": "Seller address",
      "seller.country": "Country",
      "seller.vatId": "VAT / Tax ID",
      "seller.regId": "Company registration / HRB",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Bank account (local)",
      "seller.swift": "SWIFT / BIC (optional)",
      "seller.email": "Email",
      "seller.phone": "Phone",
      "seller.website": "Website",
      "seller.reference": "Seller reference number",
      "seller.routing": "Routing number (US)",


      // Buyer block
      "buyer.logo": "Buyer logo (optional)",
      "buyer.name": "Buyer name / company",
      "buyer.address": "Buyer address",
      "buyer.country": "Country",
      "buyer.vatId": "VAT / Tax ID",
      "buyer.customerNumber": "Customer number",


      // Invoice details
      "invoice.number": "Invoice number",
      "invoice.date": "Invoice date",
      "invoice.dueDate": "Due date",

      "invoice.currency": "Currency",



      // Items table
      "items.description": "Description",
      "items.quantity": "Quantity",
      "items.unit": "Unit",
      "items.unitPrice": "Unit price (net)",
      "items.vatRate": "VAT rate (%)",
      "items.subtotalNet": "Subtotal (net)",
      "items.period": "Period (optional)",
      "items.addItem": "Add item",
      "items.removeItem": "Remove",
      "items.periodFrom": "From",
      "items.periodTo": "To",
      "items.lineTotal": "Amount (net)",

      // Totals
      "totals.subtotal": "Subtotal (net)",
      "totals.tax": "Tax/VAT",
      "totals.total": "Total (gross)",

      // Notes
      "notes.label": "Notes / additional information",
      "notes.placeholder":
        "Payment terms, legal notes, project description…",

      // Payment / QR / reverse charge
      "payment.showQr":
        "Payment QR (SEPA for EUR, generic otherwise)",
      "payment.qrHint":
        "Scan to prefill payment: IBAN/account, amount, currency and invoice number.",
      "payment.reverseCharge":
        "Reverse charge (VAT paid by recipient)",
      "payment.reverseChargeText":
        "VAT is not charged. The recipient is liable for VAT under reverse charge rules.",
      "payment.qrLabel": "Payment QR",
      "payment.qrHelp":
        "Scan to prefill payment: IBAN/account, amount, currency and invoice number.",
      "payment.reverseChargeNote":
        "Reverse charge: VAT to be accounted by the recipient according to applicable regulations.",
      "payment.iban": "IBAN",
      "payment.account": "Bank account",
      "payment.routing": "Routing number (US)",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Payment Reference",
      "payment.notes": "Payment notes",

      // Buttons
      "btn.generatePdf": "Generate PDF",
      "btn.print": "Print invoice",
      "btn.downloadJson": "Download JSON template",
      "btn.loadJson": "Load JSON template",
      "btn.reset": "Reset form",
      "confirm.reset": "Clear all invoice data?",

      // Generic UI bits
      "country.placeholder": "Select country",
      "sign.signatureImage": "Signature image (optional)",
      "sign.author": "Author / Signature",
      "sign.stampImage": "Stamp image (optional)",
      "templates.title": "Templates",
      "templates.save": "Save",
      "templates.delete": "Delete",

      // Validation errors
      "error.required": "{field} is required.",
      "error.ibanMissing":
        "IBAN or bank account (or US routing + account) must be entered.",
      "error.ibanInvalid": "IBAN appears invalid.",
      "error.noItems":
        "At least one non-empty line item is required.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Advanced features, one click away",
      "pro.subtitle":
        "This area will unlock extra layouts, presets and smart helpers in a future premium version.",
      "pro.features.smartPdf": "Smart PDF naming",
      "pro.features.customFooter": "Custom footer presets",
      "pro.features.multiSeller": "Multiple seller profiles",
      "pro.features.savedBuyers": "Saved buyers & contacts",
            "pro.features.extraLayouts": "Extra invoice layouts (A/B)",

      // Documentation button label
      "btn.showDocs": "Documentation / Help",

      // Fallback if doc sections are missing
      "doc.missing": "Documentation is not yet available for this language.",

      // Documentation structure for the modal
      doc: {
        title: "Documentation & Usage",
        tocTitle: "Sections",
        sections: [
          {
            id: "intro",
            shortLabel: "Overview",
            heading: "What this tool does",
            paragraphs: [
              "This generator helps you create clean PDF invoices directly in your browser.",
              "All data stays on your device. Nothing is stored on a server and there is no login or tracking."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Basic usage",
            heading: "Basic usage",
            paragraphs: [
              "Fill in your seller and buyer details, set the invoice number and dates, then add one or more line items.",
              "The totals update automatically as you enter quantities, unit prices and the tax rate."
            ],
            bullets: [
              "Seller section: your business or personal details",
              "Buyer section: your client’s details",
              "Invoice details: number, issue date and due date",
              "Items: description, period (optional), quantity, unit, net price"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "JSON export and import",
            paragraphs: [
              "Use JSON export to save a full snapshot of the invoice: language, parties, items, tax rate and payment details.",
              "Later you can import the same JSON file to restore everything exactly as it was."
            ],
            bullets: [
              "Export JSON: creates a .json file you can store safely",
              "Import JSON: loads all fields and items from a previously saved file",
              "Useful for recurring clients or when working on multiple invoices in parallel"
            ]
          },
          {
            id: "qr",
            shortLabel: "QR code",
            heading: "Payment QR code",
            paragraphs: [
              "If you enter an IBAN (or local account) and enable the QR option, the tool creates a payment QR code.",
              "For EUR with a valid IBAN it follows the SEPA standard, otherwise a generic payment string is used."
            ],
            bullets: [
              "QR content is based on IBAN/account, total amount, currency and invoice number",
              "The same QR code appears on the screen and in the print layout",
              "Disable the QR option if you prefer a classic invoice without QR"
            ]
          },
          {
            id: "vat",
            shortLabel: "VAT & reverse charge",
            heading: "VAT and reverse charge",
            paragraphs: [
              "Set the VAT rate as a percentage. The tax amount and gross total are calculated automatically.",
              "If you tick the reverse charge option, the VAT rate is forced to 0 and the invoice shows a reverse-charge note."
            ],
            bullets: [
              "VAT rate is applied to the net subtotal of all items",
              "Reverse charge temporarily locks the VAT field at 0%",
              "Always follow local tax rules and consult your accountant if in doubt"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Privacy",
            heading: "Privacy and data handling",
            paragraphs: [
              "This tool runs fully in your browser. No invoice data is sent to any server by the generator itself.",
              "Files you download (PDF or JSON) are stored only where you save them on your device."
            ],
            bullets: [
              "No user accounts, no cloud sync, no automatic backups",
              "Clear the form if you work on a shared computer",
              "You are responsible for where you store and send the generated files"
            ]
          }
        ]
      }
    
     
    },

    en_us: {
"app.title": "Free Invoice Generator",
"app.tagline": "Create professional invoices with full privacy — no signup and zero tracking.",
"app.languages": "Languages: EN/US · DE · ES · IT · BHS · SL · SV",


      // Sections
      "section.seller": "Seller",
      "section.buyer": "Buyer",
      "section.invoiceDetails": "Invoice details",
      "section.items": "Items",
      "section.totals": "Totals",
      "section.notes": "Notes",
      "section.payment": "Payment details",
      "section.invoice": "Invoice",

      // Seller block
      "seller.logo": "Seller logo (optional)",
      "seller.name": "Seller name",
      "seller.address": "Seller address",
      "seller.country": "Country",
      "seller.vatId": "Tax ID",
      "seller.regId": "Company registration",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Bank account",
      "seller.swift": "SWIFT / BIC (optional)",
      "seller.email": "Email",
      "seller.phone": "Phone",
      "seller.website": "Website",
      "seller.reference": "Seller reference number",
      "seller.routing": "Routing number",


      // Buyer block
      "buyer.logo": "Buyer logo (optional)",
      "buyer.name": "Buyer name / company",
      "buyer.address": "Buyer address",
      "buyer.country": "Country",
      "buyer.vatId": "Tax ID",
      "buyer.customerNumber": "Customer number",


      // Invoice details
      "invoice.number": "Invoice number",
      "invoice.date": "Invoice date",
      "invoice.dueDate": "Due date",

      "invoice.currency": "Currency",



      // Items table
      "items.description": "Description",
      "items.quantity": "Quantity",
      "items.unit": "Unit",
      "items.unitPrice": "Unit price (net)",
      "items.vatRate": "Tax rate (%)",
      "items.subtotalNet": "Subtotal (net)",
      "items.period": "Period (optional)",
      "items.addItem": "Add item",
      "items.removeItem": "Remove",
      "items.periodFrom": "From",
      "items.periodTo": "To",
      "items.lineTotal": "Amount (net)",

      // Totals
      "totals.subtotal": "Subtotal (net)",
      "totals.tax": "Tax amount",
      "totals.total": "Total (gross)",

      // Notes
      "notes.label": "Notes / additional information",
      "notes.placeholder":
        "Payment terms, legal notes, project description…",

      // Payment / QR / reverse charge
      "payment.showQr":
        "Payment QR (SEPA for EUR, generic otherwise)",
      "payment.qrHint":
        "Scan to prefill payment: account, amount, currency and invoice number.",
      "payment.reverseCharge":
        "Reverse charge (tax paid by recipient)",
      "payment.reverseChargeText":
        "Tax is not charged. The recipient is liable for tax under reverse charge rules.",
      "payment.qrLabel": "Payment QR",
      "payment.qrHelp":
        "Scan to prefill payment: account, amount, currency and invoice number.",
      "payment.reverseChargeNote":
        "Reverse charge: tax to be accounted by the recipient according to applicable regulations.",
      "payment.iban": "IBAN",
      "payment.account": "Bank account",
      "payment.routing": "Routing number",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Payment Reference",
      "payment.notes": "Payment notes",

      // Buttons
      "btn.generatePdf": "Generate PDF",
      "btn.print": "Print invoice",
      "btn.downloadJson": "Download JSON template",
      "btn.loadJson": "Load JSON template",
      "btn.reset": "Reset form",
      "confirm.reset": "Clear all invoice data?",

      // Generic UI bits
      "country.placeholder": "Select country",
      "sign.signatureImage": "Signature image (optional)",
      "sign.author": "Author / Signature",
      "sign.stampImage": "Stamp image (optional)",
      "templates.title": "Templates",
      "templates.save": "Save",
      "templates.delete": "Delete",
      "toolbar.language": "Language / Market",
	  "toolbar.theme": "Theme",

      // Validation errors
      "error.required": "{field} is required.",
      "error.ibanMissing":
        "IBAN or bank account (or US routing + account) must be entered.",
      "error.ibanInvalid": "IBAN appears invalid.",
      "error.noItems":
        "At least one non-empty line item is required.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Advanced features, one click away",
      "pro.subtitle":
        "This area will unlock extra layouts, presets and smart helpers in a future premium version.",
      "pro.features.smartPdf": "Smart PDF naming",
      "pro.features.customFooter": "Custom footer presets",
      "pro.features.multiSeller": "Multiple seller profiles",
      "pro.features.savedBuyers": "Saved buyers & contacts",
      "pro.features.extraLayouts": "Extra invoice layouts (A/B)",
      
      //Documentation
      "btn.showDocs": "Documentation / Help",
    },

    de_de: {
"app.title": "Kostenloser Rechnungsgenerator",
"app.tagline": "Professionelle Rechnungen mit vollständigem Datenschutz — keine Registrierung, kein Tracking.",
"app.languages": "Sprachen: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Sprache / Markt",
      "toolbar.theme": "Thema",

      "section.seller": "Verkäufer",
      "section.buyer": "Käufer",
      "section.invoiceDetails": "Rechnungsdetails",
      "section.items": "Positionen",
      "section.totals": "Summen",
      "section.notes": "Hinweise",
      "section.payment": "Zahlungsdetails",
      "section.invoice": "Rechnung",

      "seller.logo": "Logo des Verkäufers (optional)",
      "seller.name": "Name des Verkäufers",
      "seller.address": "Adresse des Verkäufers",
      "seller.country": "Land",
      "seller.vatId": "USt-IdNr. / Steuernummer",
      "seller.regId": "Handelsregister / HRB",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Bankkonto (lokal)",
      "seller.swift": "SWIFT / BIC (optional)",
      "seller.email": "E-Mail",
      "seller.phone": "Telefon",
      "seller.website": "Webseite",
      "seller.reference": "Referenznummer des Verkäufers",
      "seller.routing": "Routing-Nummer",


      "buyer.logo": "Logo des Käufers (optional)",
      "buyer.name": "Name / Firma des Käufers",
      "buyer.address": "Adresse des Käufers",
      "buyer.country": "Land",
      "buyer.vatId": "USt-IdNr. / Steuernummer",
      "buyer.customerNumber": "Kundennummer",


      "invoice.number": "Rechnungsnummer",
      "invoice.date": "Rechnungsdatum",
      "invoice.dueDate": "Fälligkeitsdatum",

      "invoice.currency": "Währung",



      "items.description": "Beschreibung",
      "items.quantity": "Menge",
      "items.unit": "Einheit",
      "items.unitPrice": "Einzelpreis (netto)",
      "items.vatRate": "MwSt.-Satz (%)",
      "items.subtotalNet": "Zwischensumme (netto)",
      "items.period": "Zeitraum (optional)",
      "items.addItem": "Position hinzufügen",
      "items.removeItem": "Entfernen",
      "items.periodFrom": "Von",
      "items.periodTo": "Bis",
      "items.lineTotal": "Betrag (netto)",

      "totals.subtotal": "Zwischensumme (netto)",
      "totals.tax": "Steuerbetrag",
      "totals.total": "Gesamtsumme (brutto)",

      "notes.label": "Hinweise / zusätzliche Informationen",
      "notes.placeholder":
        "Zahlungsbedingungen, rechtliche Hinweise, Projektbeschreibung…",

      "payment.showQr":
        "Zahlungs-QR (SEPA für EUR, sonst allgemein)",
      "payment.qrHint":
        "Mit dem Scan werden Konto, Betrag, Währung und Rechnungsnummer vorausgefüllt.",
      "payment.reverseCharge":
        "Reverse-Charge (Steuerschuld beim Empfänger)",
      "payment.reverseChargeText":
        "Die Umsatzsteuer wird nicht berechnet. Der Empfänger schuldet die Steuer (Reverse-Charge-Verfahren).",
      "payment.qrLabel": "Zahlungs-QR",
      "payment.qrHelp":
        "Scannen, um Zahlung vorzufüllen: IBAN/Konto, Betrag, Währung und Rechnungsnummer.",
      "payment.reverseChargeNote":
        "Reverse-Charge: Die Umsatzsteuer ist vom Leistungsempfänger gemäß den geltenden Vorschriften zu schulden.",
      "payment.iban": "IBAN",
      "payment.account": "Bankkonto",
      "payment.routing": "Routing-Nummer",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Verwendungszweck",
      "payment.notes": "Zahlungshinweise",

      "btn.generatePdf": "PDF erzeugen",
      "btn.print": "Rechnung drucken",
      "btn.downloadJson": "JSON-Vorlage herunterladen",
      "btn.loadJson": "JSON-Vorlage laden",
      "btn.reset": "Formular zurücksetzen",
      "confirm.reset": "Alle Rechnungsdaten löschen?",

      "country.placeholder": "Land auswählen",
      "sign.signatureImage": "Unterschriftsbild (optional)",
      "sign.author": "Autor / Unterschrift",
      "sign.stampImage": "Stempelbild (optional)",
      "templates.title": "Vorlagen",
      "templates.save": "Speichern",
      "templates.delete": "Löschen",

      "error.required": "Das Feld {field} ist erforderlich.",
      "error.ibanMissing":
        "IBAN oder Bankkonto (oder US-Routing + Kontonummer) muss angegeben werden.",
      "error.ibanInvalid": "Die IBAN scheint ungültig zu sein.",
      "error.noItems":
        "Mindestens eine nicht-leere Rechnungsposition ist erforderlich.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Erweiterte Funktionen mit einem Klick",
      "pro.subtitle":
        "Dieser Bereich schaltet in einer künftigen Premium-Version zusätzliche Layouts, Vorlagen und Assistenten frei.",
      "pro.features.smartPdf": "Intelligente PDF-Benennung",
      "pro.features.customFooter": "Individuelle Fußzeilen-Vorlagen",
      "pro.features.multiSeller": "Mehrere Verkäuferprofile",
      "pro.features.savedBuyers": "Gespeicherte Kunden & Kontakte",
      "pro.features.extraLayouts": "Weitere Rechnungs-Layouts (A/B)",
      
      // Documentation
      "btn.showDocs": "Dokumentation / Hilfe",
      
            // Fallback if doc sections are missing
      "doc.missing": "Für diese Sprache ist die Dokumentation noch nicht verfügbar.",

      // Documentation structure for the modal
      doc: {
        title: "Dokumentation & Nutzung",
        tocTitle: "Abschnitte",
        sections: [
          {
            id: "intro",
            shortLabel: "Überblick",
            heading: "Was dieses Tool macht",
            paragraphs: [
              "Dieser Generator hilft Ihnen, saubere PDF-Rechnungen direkt im Browser zu erstellen.",
              "Alle Daten bleiben auf Ihrem Gerät. Es wird nichts auf einem Server gespeichert, es gibt kein Login und kein Tracking."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Grundbedienung",
            heading: "Grundlegende Verwendung",
            paragraphs: [
              "Tragen Sie die Daten von Verkäufer und Käufer ein, setzen Sie Rechnungsnummer und Datum und fügen Sie eine oder mehrere Positionen hinzu.",
              "Die Summen werden automatisch aktualisiert, sobald Sie Mengen, Einzelpreise und den Steuersatz eintragen."
            ],
            bullets: [
              "Bereich Verkäufer: Ihre geschäftlichen oder privaten Daten",
              "Bereich Käufer: die Daten Ihres Kunden",
              "Rechnungsdetails: Nummer, Ausstellungsdatum und Fälligkeit",
              "Positionen: Beschreibung, Zeitraum (optional), Menge, Einheit, Nettopreis"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "JSON-Export und -Import",
            paragraphs: [
              "Mit dem JSON-Export speichern Sie einen vollständigen Schnappschuss der Rechnung: Sprache, Beteiligte, Positionen, Steuersatz und Zahlungsdaten.",
              "Später können Sie dieselbe JSON-Datei importieren und alle Felder genau so wiederherstellen."
            ],
            bullets: [
              "JSON exportieren: erzeugt eine .json-Datei, die Sie sicher ablegen können",
              "JSON importieren: lädt alle Felder und Positionen aus einer zuvor gespeicherten Datei",
              "Nützlich für wiederkehrende Kunden oder wenn Sie an mehreren Rechnungen parallel arbeiten"
            ]
          },
          {
            id: "qr",
            shortLabel: "QR-Code",
            heading: "Zahlungs-QR-Code",
            paragraphs: [
              "Wenn Sie eine IBAN (oder ein lokales Konto) eintragen und die QR-Option aktivieren, erzeugt das Tool einen Zahlungs-QR-Code.",
              "Für EUR mit gültiger IBAN wird der SEPA-Standard verwendet, andernfalls wird ein allgemeiner Zahlungstext genutzt."
            ],
            bullets: [
              "Der QR-Inhalt basiert auf IBAN/Konto, Gesamtbetrag, Währung und Rechnungsnummer",
              "Der gleiche QR-Code erscheint sowohl auf dem Bildschirm als auch im Drucklayout",
              "Deaktivieren Sie die QR-Option, wenn Sie eine klassische Rechnung ohne QR bevorzugen"
            ]
          },
          {
            id: "vat",
            shortLabel: "MwSt & Reverse-Charge",
            heading: "Mehrwertsteuer und Reverse-Charge",
            paragraphs: [
              "Legen Sie den Mehrwertsteuersatz in Prozent fest. Steuerbetrag und Bruttosumme werden automatisch berechnet.",
              "Wenn Sie die Reverse-Charge-Option aktivieren, wird der Steuersatz auf 0 gesetzt und die Rechnung enthält einen passenden Hinweis."
            ],
            bullets: [
              "Der MwSt-Satz wird auf die Netto-Zwischensumme aller Positionen angewendet",
              "Bei Reverse-Charge wird das MwSt-Feld vorübergehend auf 0 % gesperrt",
              "Beachten Sie immer die lokalen Steuervorschriften und sprechen Sie im Zweifel mit Ihrem Steuerberater"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Datenschutz",
            heading: "Datenschutz und Datenverarbeitung",
            paragraphs: [
              "Dieses Tool läuft vollständig in Ihrem Browser. Vom Generator selbst werden keine Rechnungsdaten an einen Server gesendet.",
              "Dateien, die Sie herunterladen (PDF oder JSON), werden nur dort gespeichert, wo Sie sie auf Ihrem Gerät ablegen."
            ],
            bullets: [
              "Keine Benutzerkonten, kein Cloud-Sync, keine automatischen Backups",
              "Löschen Sie das Formular, wenn Sie an einem gemeinsam genutzten Rechner arbeiten",
              "Sie sind selbst dafür verantwortlich, wo Sie die erzeugten Dateien speichern und wie Sie sie versenden"
            ]
          }
        ]
      }
    },

    it_it: {
"app.title": "Generatore di fatture gratuito",
"app.tagline": "Fatture professionali con completa privacy — nessuna registrazione e nessun tracciamento.",
"app.languages": "Lingue: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Lingua / Mercato",
      "toolbar.theme": "Tema",

      "section.seller": "Fornitore",
      "section.buyer": "Cliente",
      "section.invoiceDetails": "Dettagli fattura",
      "section.items": "Voci",
      "section.totals": "Totali",
      "section.notes": "Note",
      "section.payment": "Dettagli pagamento",
      "section.invoice": "Fattura",

      "seller.logo": "Logo del fornitore (opzionale)",
      "seller.name": "Nome del fornitore",
      "seller.address": "Indirizzo del fornitore",
      "seller.country": "Paese",
      "seller.vatId": "Partita IVA / Codice fiscale",
      "seller.regId": "Registrazione aziendale",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Conto bancario (locale)",
      "seller.swift": "SWIFT / BIC (opzionale)",
      "seller.email": "E-mail",
      "seller.phone": "Telefono",
      "seller.website": "Sito web",
      "seller.reference": "Riferimento fornitore",
      "seller.routing": "Numero di routing",


      "buyer.logo": "Logo del cliente (opzionale)",
      "buyer.name": "Nome / Ragione sociale del cliente",
      "buyer.address": "Indirizzo del cliente",
      "buyer.country": "Paese",
      "buyer.vatId": "Partita IVA / Codice fiscale",
      "buyer.customerNumber": "Codice cliente",


      "invoice.number": "Numero fattura",
      "invoice.date": "Data fattura",
      "invoice.dueDate": "Data di scadenza",

      "invoice.currency": "Valuta",



      "items.description": "Descrizione",
      "items.quantity": "Quantità",
      "items.unit": "Unità",
      "items.unitPrice": "Prezzo unitario (imponibile)",
      "items.vatRate": "Aliquota IVA (%)",
      "items.subtotalNet": "Subtotale (imponibile)",
      "items.period": "Periodo (opzionale)",
      "items.addItem": "Aggiungi riga",
      "items.removeItem": "Rimuovi",
      "items.periodFrom": "Dal",
      "items.periodTo": "Al",
      "items.lineTotal": "Importo (netto)",

      "totals.subtotal": "Subtotale (imponibile)",
      "totals.tax": "Importo imposta",
      "totals.total": "Totale (lordo)",

      "notes.label": "Note / informazioni aggiuntive",
      "notes.placeholder":
        "Condizioni di pagamento, note legali, descrizione del progetto…",

      "payment.showQr":
        "QR pagamento (SEPA per EUR, generico altrimenti)",
      "payment.qrHint":
        "La scansione compila conto, importo, valuta e numero fattura.",
      "payment.reverseCharge":
        "Reverse charge (IVA a carico del destinatario)",
      "payment.reverseChargeText":
        "L'IVA non è addebitata. Il destinatario è debitore d'imposta in regime di reverse charge.",
      "payment.qrLabel": "QR di pagamento",
      "payment.qrHelp":
        "Scansiona per precompilare il pagamento: IBAN/conto, importo, valuta e numero fattura.",
      "payment.reverseChargeNote":
        "Reverse charge: l’IVA deve essere contabilizzata dal destinatario secondo la normativa applicabile.",
      "payment.iban": "IBAN",
      "payment.account": "Conto bancario",
      "payment.routing": "Numero di routing",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Causale pagamento",
      "payment.notes": "Note di pagamento",

      "btn.generatePdf": "Genera PDF",
      "btn.print": "Stampa fattura",
      "btn.downloadJson": "Scarica modello JSON",
      "btn.loadJson": "Carica modello JSON",
      "btn.reset": "Reimposta modulo",
      "confirm.reset": "Cancellare tutti i dati delle fatture?",

      "country.placeholder": "Seleziona il paese",
      "sign.signatureImage": "Immagine della firma (opzionale)",
      "sign.author": "Autore / Firma",
      "sign.stampImage": "Immagine del timbro (opzionale)",
      "templates.title": "Modelli",
      "templates.save": "Salva",
      "templates.delete": "Elimina",

      "error.required": "Il campo {field} è obbligatorio.",
      "error.ibanMissing":
        "È necessario inserire l’IBAN o il conto bancario (o routing + conto USA).",
      "error.ibanInvalid": "L’IBAN sembra non essere valido.",
      "error.noItems":
        "È richiesta almeno una riga di fattura non vuota.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Funzioni avanzate a portata di clic",
      "pro.subtitle":
        "Quest’area attiverà layout extra, preset e assistenti intelligenti in una futura versione premium.",
      "pro.features.smartPdf": "Denominazione intelligente dei PDF",
      "pro.features.customFooter": "Modelli di piè di pagina personalizzati",
      "pro.features.multiSeller": "Profili multipli del fornitore",
      "pro.features.savedBuyers": "Clienti e contatti salvati",
      "pro.features.extraLayouts": "Layout aggiuntivi di fattura (A/B)",

      // Documentation button label
      "btn.showDocs": "Documentazione / Guida",

      // Fallback if doc sections are missing
      "doc.missing": "La documentazione non è ancora disponibile per questa lingua.",

      // Documentation structure for the modal
      doc: {
        title: "Documentazione & utilizzo",
        tocTitle: "Sezioni",
        sections: [
          {
            id: "intro",
            shortLabel: "Panoramica",
            heading: "Che cosa fa questo strumento",
            paragraphs: [
              "Questo generatore ti aiuta a creare fatture PDF pulite direttamente nel browser.",
              "Tutti i dati restano sul tuo dispositivo. Nulla viene salvato su un server e non ci sono login o sistemi di tracciamento."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Uso di base",
            heading: "Utilizzo di base dello strumento",
            paragraphs: [
              "Compila i dati del fornitore e del cliente, imposta il numero di fattura e le date, quindi aggiungi una o più righe.",
              "I totali si aggiornano automaticamente quando modifichi quantità, prezzi unitari e aliquota IVA."
            ],
            bullets: [
              "Sezione Fornitore: i tuoi dati aziendali o personali",
              "Sezione Cliente: i dati del tuo cliente",
              "Dettagli fattura: numero, data di emissione e scadenza",
              "Voci: descrizione, periodo (opzionale), quantità, unità, prezzo imponibile"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "Esportazione e importazione JSON",
            paragraphs: [
              "Con l’esportazione JSON salvi uno snapshot completo della fattura: lingua, soggetti, voci, aliquota IVA e dati di pagamento.",
              "In un secondo momento puoi importare lo stesso file JSON per ripristinare ogni campo esattamente com’era."
            ],
            bullets: [
              "Esporta JSON: crea un file .json che puoi conservare in modo sicuro",
              "Importa JSON: carica tutti i campi e le voci da un file salvato in precedenza",
              "Utile per clienti ricorrenti o se lavori su più fatture in parallelo"
            ]
          },
          {
            id: "qr",
            shortLabel: "Codice QR",
            heading: "Codice QR di pagamento",
            paragraphs: [
              "Se inserisci un IBAN (o un conto locale) e abiliti l’opzione QR, lo strumento genera un codice QR di pagamento.",
              "Per EUR con IBAN valido viene usato lo standard SEPA, altrimenti viene creato un testo di pagamento generico."
            ],
            bullets: [
              "Il contenuto del QR si basa su IBAN/conto, importo totale, valuta e numero di fattura",
              "Lo stesso codice QR compare sia a schermo sia nel layout di stampa",
              "Disattiva l’opzione QR se preferisci una fattura classica senza codice QR"
            ]
          },
          {
            id: "vat",
            shortLabel: "IVA & reverse charge",
            heading: "IVA e reverse charge",
            paragraphs: [
              "Imposta l’aliquota IVA in percentuale. L’importo dell’imposta e il totale lordo vengono calcolati automaticamente.",
              "Se attivi l’opzione reverse charge, l’aliquota IVA viene forzata a 0 e sulla fattura compare una nota di reverse charge."
            ],
            bullets: [
              "L’aliquota IVA viene applicata al subtotale imponibile di tutte le voci",
              "Con reverse charge il campo IVA resta bloccato temporaneamente a 0%",
              "Segui sempre la normativa fiscale locale e, in caso di dubbio, confrontati con il tuo commercialista"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Privacy",
            heading: "Privacy e gestione dei dati",
            paragraphs: [
              "Questo strumento funziona interamente nel tuo browser. Nessun dato di fattura viene inviato a server da parte del generatore stesso.",
              "I file che scarichi (PDF o JSON) vengono salvati solo dove decidi tu sul tuo dispositivo."
            ],
            bullets: [
              "Nessun account utente, nessuna sincronizzazione cloud, nessun backup automatico",
              "Pulisci il modulo se lavori su un computer condiviso",
              "Sei tu il responsabile di dove archivi e come invii i file generati"
            ]
          }
        ]
      },
    },

    es_es: {
"app.title": "Generador de facturas gratuito",
"app.tagline": "Facturas profesionales con total privacidad — sin registro y sin seguimiento.",
"app.languages": "Idiomas: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Idioma / Mercado",
      "toolbar.theme": "Tema",

      "section.seller": "Proveedor",
      "section.buyer": "Cliente",
      "section.invoiceDetails": "Detalles de la factura",
      "section.items": "Conceptos",
      "section.totals": "Totales",
      "section.notes": "Notas",
      "section.payment": "Detalles de pago",
      "section.invoice": "Factura",

      "seller.logo": "Logotipo del proveedor (opcional)",
      "seller.name": "Nombre del proveedor",
      "seller.address": "Dirección del proveedor",
      "seller.country": "País",
      "seller.vatId": "NIF / CIF / IVA",
      "seller.regId": "Registro mercantil",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Cuenta bancaria (local)",
      "seller.swift": "SWIFT / BIC (opcional)",
      "seller.email": "Correo electrónico",
      "seller.phone": "Teléfono",
      "seller.website": "Sitio web",
      "seller.reference": "Referencia del proveedor",
      "seller.routing": "Número de routing",


      "buyer.logo": "Logotipo del cliente (opcional)",
      "buyer.name": "Nombre / empresa del cliente",
      "buyer.address": "Dirección del cliente",
      "buyer.country": "País",
      "buyer.vatId": "NIF / CIF / IVA",
      "buyer.customerNumber": "Número de cliente",


      "invoice.number": "Número de factura",
      "invoice.date": "Fecha de la factura",
      "invoice.dueDate": "Fecha de vencimiento",

      "invoice.currency": "Moneda",



      "items.description": "Descripción",
      "items.quantity": "Cantidad",
      "items.unit": "Unidad",
      "items.unitPrice": "Precio unitario (neto)",
      "items.vatRate": "Tipo de IVA (%)",
      "items.subtotalNet": "Subtotal (neto)",
      "items.period": "Periodo (opcional)",
      "items.addItem": "Añadir línea",
      "items.removeItem": "Eliminar",
      "items.periodFrom": "Desde",
      "items.periodTo": "Hasta",
      "items.lineTotal": "Importe (neto)",

      "totals.subtotal": "Subtotal (neto)",
      "totals.tax": "Importe del impuesto",
      "totals.total": "Total (bruto)",

      "notes.label": "Notas / información adicional",
      "notes.placeholder":
        "Condiciones de pago, notas legales, descripción del proyecto…",

      "payment.showQr":
        "QR de pago (SEPA para EUR, genérico en otro caso)",
      "payment.qrHint":
        "Al escanear se rellenan cuenta, importe, moneda y número de factura.",
      "payment.reverseCharge":
        "Inversión del sujeto pasivo (IVA a cargo del destinatario)",
      "payment.reverseChargeText":
        "No se repercute IVA. El destinatario es el responsable del impuesto según el régimen de inversión del sujeto pasivo.",
      "payment.qrLabel": "QR de pago",
      "payment.qrHelp":
        "Escanea para rellenar el pago: IBAN/cuenta, importe, moneda y número de factura.",
      "payment.reverseChargeNote":
        "Inversión del sujeto pasivo: el IVA debe ser declarado por el destinatario según la normativa aplicable.",
      "payment.iban": "IBAN",
      "payment.account": "Cuenta bancaria",
      "payment.routing": "Número de routing",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Concepto de pago",
      "payment.notes": "Notas de pago",

      "btn.generatePdf": "Generar PDF",
      "btn.print": "Imprimir factura",
      "btn.downloadJson": "Descargar plantilla JSON",
      "btn.loadJson": "Cargar plantilla JSON",
      "btn.reset": "Reiniciar formulario",
      "confirm.reset":
        "¿Eliminar todos los datos de facturas?",

      "country.placeholder": "Selecciona el país",
      "sign.signatureImage": "Imagen de firma (opcional)",
      "sign.author": "Autor / Firma",
      "sign.stampImage": "Imagen del sello (opcional)",
      "templates.title": "Plantillas",
      "templates.save": "Guardar",
      "templates.delete": "Eliminar",

      "error.required": "El campo {field} es obligatorio.",
      "error.ibanMissing":
        "Debes introducir el IBAN o la cuenta bancaria (o routing + cuenta en EE. UU.).",
      "error.ibanInvalid":
        "El IBAN parece no ser válido.",
      "error.noItems":
        "Se requiere al menos una línea de factura no vacía.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Funciones avanzadas a un clic",
      "pro.subtitle":
        "Esta zona activará diseños extra, plantillas y asistentes inteligentes en una futura versión premium.",
      "pro.features.smartPdf": "Nomenclatura inteligente de PDFs",
      "pro.features.customFooter": "Plantillas de pie de página personalizadas",
      "pro.features.multiSeller": "Múltiples perfiles de proveedor",
      "pro.features.savedBuyers": "Clientes y contactos guardados",
      "pro.features.extraLayouts": "Diseños extra de factura (A/B)",

      // Documentation button label
      "btn.showDocs": "Documentación / Ayuda",

      // Fallback if doc sections are missing
      "doc.missing": "La documentación aún no está disponible para este idioma.",

      // Documentation structure for the modal
      doc: {
        title: "Documentación y uso",
        tocTitle: "Secciones",
        sections: [
          {
            id: "intro",
            shortLabel: "Resumen",
            heading: "Qué hace esta herramienta",
            paragraphs: [
              "Este generador te ayuda a crear facturas PDF limpias directamente en el navegador.",
              "Todos los datos permanecen en tu dispositivo. No se guarda nada en ningún servidor y no hay inicio de sesión ni sistemas de seguimiento."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Uso básico",
            heading: "Cómo utilizar la herramienta",
            paragraphs: [
              "Rellena los datos del proveedor y del cliente, establece el número de factura y las fechas y luego añade una o varias líneas.",
              "Los totales se actualizan automáticamente a medida que introduces cantidades, precios unitarios y tipo de IVA."
            ],
            bullets: [
              "Sección Proveedor: tus datos empresariales o personales",
              "Sección Cliente: los datos de tu cliente",
              "Detalles de la factura: número, fecha de emisión y vencimiento",
              "Líneas: descripción, periodo (opcional), cantidad, unidad, precio neto"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "Exportación e importación JSON",
            paragraphs: [
              "Con la exportación JSON guardas una instantánea completa de la factura: idioma, partes, líneas, tipo de IVA y datos de pago.",
              "Más adelante puedes importar el mismo archivo JSON para restaurar todos los campos exactamente como estaban."
            ],
            bullets: [
              "Exportar JSON: crea un archivo .json que puedes guardar de forma segura",
              "Importar JSON: carga todos los campos y líneas desde un archivo guardado previamente",
              "Útil para clientes recurrentes o cuando trabajas con varias facturas en paralelo"
            ]
          },
          {
            id: "qr",
            shortLabel: "Código QR",
            heading: "Código QR de pago",
            paragraphs: [
              "Si introduces un IBAN (o una cuenta local) y activas la opción QR, la herramienta genera un código QR de pago.",
              "Para EUR con IBAN válido se utiliza el estándar SEPA; en caso contrario se usa un texto de pago genérico."
            ],
            bullets: [
              "El contenido del QR se basa en IBAN/cuenta, importe total, moneda y número de factura",
              "El mismo código QR aparece tanto en pantalla como en el diseño de impresión",
              "Desactiva la opción QR si prefieres una factura clásica sin código QR"
            ]
          },
          {
            id: "vat",
            shortLabel: "IVA e inversión",
            heading: "IVA e inversión del sujeto pasivo",
            paragraphs: [
              "Configura el tipo de IVA en porcentaje. El importe del impuesto y el total bruto se calculan automáticamente.",
              "Si activas la opción de inversión del sujeto pasivo, el tipo de IVA se fija en 0 y en la factura aparece una nota correspondiente."
            ],
            bullets: [
              "El tipo de IVA se aplica al subtotal neto de todas las líneas",
              "Con inversión del sujeto pasivo el campo de IVA se bloquea temporalmente al 0%",
              "Sigue siempre la normativa fiscal local y consulta con tu asesor si tienes dudas"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Privacidad",
            heading: "Privacidad y tratamiento de datos",
            paragraphs: [
              "Esta herramienta se ejecuta completamente en tu navegador. El generador en sí no envía datos de factura a ningún servidor.",
              "Los archivos que descargas (PDF o JSON) solo se guardan donde tú decidas en tu propio dispositivo."
            ],
            bullets: [
              "Sin cuentas de usuario, sin sincronización en la nube, sin copias de seguridad automáticas",
              "Borra el formulario si trabajas en un ordenador compartido",
              "Tú eres responsable de dónde almacenas y cómo envías los archivos generados"
            ]
          }
        ]
      },
    },

    sv_se: {
"app.title": "Gratis fakturagenerator",
"app.tagline": "Professionella fakturor med fullständig integritet — ingen registrering och ingen spårning.",
"app.languages": "Språk: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Språk / Marknad",
      "toolbar.theme": "Tema",

      "section.seller": "Säljare",
      "section.buyer": "Köpare",
      "section.invoiceDetails": "Fakturauppgifter",
      "section.items": "Rader",
      "section.totals": "Summering",
      "section.notes": "Anteckningar",
      "section.payment": "Betalningsuppgifter",
      "section.invoice": "Faktura",

      "seller.logo": "Säljarens logotyp (valfritt)",
      "seller.name": "Säljarens namn",
      "seller.address": "Säljarens adress",
      "seller.country": "Land",
      "seller.vatId": "Momsregistreringsnummer",
      "seller.regId": "Organisationsnummer / registrering",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Bankkonto (lokalt)",
      "seller.swift": "SWIFT / BIC (valfritt)",
      "seller.email": "E-post",
      "seller.phone": "Telefon",
      "seller.website": "Webbplats",
      "seller.reference": "Säljarens referensnummer",
      "seller.routing": "Routingnummer",


      "buyer.logo": "Köparens logotyp (valfritt)",
      "buyer.name": "Köparens namn / företag",
      "buyer.address": "Köparens adress",
      "buyer.country": "Land",
      "buyer.vatId": "Momsregistreringsnummer",
      "buyer.customerNumber": "Kundnummer",


      "invoice.number": "Fakturanummer",
      "invoice.date": "Fakturadatum",
      "invoice.dueDate": "Förfallodatum",

      "invoice.currency": "Valuta",



      "items.description": "Beskrivning",
      "items.quantity": "Antal",
      "items.unit": "Enhet",
      "items.unitPrice": "Enhetspris (exkl. moms)",
      "items.vatRate": "Momssats (%)",
      "items.subtotalNet": "Delsumma (exkl. moms)",
      "items.period": "Period (valfri)",
      "items.addItem": "Lägg till rad",
      "items.removeItem": "Ta bort",
      "items.periodFrom": "Från",
      "items.periodTo": "Till",
      "items.lineTotal": "Belopp (netto)",

      "totals.subtotal": "Delsumma (exkl. moms)",
      "totals.tax": "Momssumma",
      "totals.total": "Totalsumma (inkl. moms)",

      "notes.label": "Anteckningar / ytterligare information",
      "notes.placeholder":
        "Betalningsvillkor, juridiska texter, projektbeskrivning…",

      "payment.showQr":
        "Betalnings-QR (SEPA för EUR, generisk annars)",
      "payment.qrHint":
        "Vid skanning fylls konto, belopp, valuta och fakturanummer i.",
      "payment.reverseCharge":
        "Omvänd skattskyldighet (moms betalas av köparen)",
      "payment.reverseChargeText":
        "Moms debiteras inte. Köparen redovisar momsen enligt reglerna om omvänd skattskyldighet.",
      "payment.qrLabel": "Betalnings-QR",
      "payment.qrHelp":
        "Skanna för att fylla i betalningen: IBAN/konto, belopp, valuta och fakturanummer.",
      "payment.reverseChargeNote":
        "Omvänd skattskyldighet: moms redovisas av mottagaren enligt gällande regler.",
      "payment.iban": "IBAN",
      "payment.account": "Bankkonto",
      "payment.routing": "Routingnummer",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Betalningsreferens",
      "payment.notes": "Betalningsinformation",

      "btn.generatePdf": "Skapa PDF",
      "btn.print": "Skriv ut faktura",
      "btn.downloadJson": "Ladda ner JSON-mall",
      "btn.loadJson": "Ladda JSON-mall",
      "btn.reset": "Återställ formulär",
      "confirm.reset": "Rensa all fakturadata?",

      "country.placeholder": "Välj land",
      "sign.signatureImage": "Signaturbild (valfritt)",
      "sign.author": "Författare / Signatur",
      "sign.stampImage": "Stämpelbild (valfritt)",
      "templates.title": "Mallar",
      "templates.save": "Spara",
      "templates.delete": "Ta bort",

      "error.required": "Fältet {field} är obligatoriskt.",
      "error.ibanMissing":
        "IBAN eller bankkonto (eller amerikanskt routing- och kontonummer) måste anges.",
      "error.ibanInvalid": "IBAN verkar vara ogiltigt.",
      "error.noItems":
        "Minst en icke-tom radpost krävs.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Avancerade funktioner med ett klick",
      "pro.subtitle":
        "Detta område låser upp extra layouter, förinställningar och smarta hjälpfunktioner i en framtida premiumversion.",
      "pro.features.smartPdf": "Smart namngivning av PDF-filer",
      "pro.features.customFooter": "Anpassade sidfotsmallar",
      "pro.features.multiSeller": "Flera säljarprofiler",
      "pro.features.savedBuyers": "Sparade kunder och kontakter",
      "pro.features.extraLayouts": "Extra fakturalayouter (A/B)",

      // Documentation button label
      "btn.showDocs": "Dokumentation / Hjälp",

      // Fallback if doc sections are missing
      "doc.missing": "Dokumentationen är ännu inte tillgänglig på detta språk.",

      // Documentation structure for the modal
      doc: {
        title: "Dokumentation & användning",
        tocTitle: "Avsnitt",
        sections: [
          {
            id: "intro",
            shortLabel: "Översikt",
            heading: "Vad verktyget gör",
            paragraphs: [
              "Den här generatorn hjälper dig att skapa rena PDF-fakturor direkt i webbläsaren.",
              "All data stannar på din enhet. Ingenting sparas på en server, och det finns varken inloggning eller spårning."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Grundläggande",
            heading: "Grundläggande användning",
            paragraphs: [
              "Fyll i säljarens och köparens uppgifter, ange fakturanummer och datum och lägg sedan till en eller flera rader.",
              "Summorna uppdateras automatiskt när du ändrar kvantiteter, enhetspriser och momssats."
            ],
            bullets: [
              "Avsnitt Säljare: dina företags- eller personuppgifter",
              "Avsnitt Köpare: din kunds uppgifter",
              "Fakturadetaljer: nummer, fakturadatum och förfallodatum",
              "Rader: beskrivning, period (valfritt), antal, enhet, nettobelopp"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "JSON-export och -import",
            paragraphs: [
              "Med JSON-export sparar du ett komplett snapshot av fakturan: språk, parter, rader, momssats och betalningsuppgifter.",
              "Senare kan du importera samma JSON-fil och återställa alla fält exakt som de var."
            ],
            bullets: [
              "Exportera JSON: skapar en .json-fil som du kan lagra säkert",
              "Importera JSON: laddar alla fält och rader från en tidigare sparad fil",
              "Användbart för återkommande kunder eller när du arbetar med flera fakturor parallellt"
            ]
          },
          {
            id: "qr",
            shortLabel: "QR-kod",
            heading: "Betalnings-QR-kod",
            paragraphs: [
              "Om du anger ett IBAN (eller ett lokalt konto) och aktiverar QR-alternativet genererar verktyget en betalnings-QR-kod.",
              "För EUR med giltigt IBAN används SEPA-standard; annars används en generell betalningstext."
            ],
            bullets: [
              "QR-innehållet baseras på IBAN/konto, totalbelopp, valuta och fakturanummer",
              "Samma QR-kod visas både på skärmen och i utskriftslayouten",
              "Avaktivera QR-alternativet om du föredrar en klassisk faktura utan QR-kod"
            ]
          },
          {
            id: "vat",
            shortLabel: "Moms & omvänd",
            heading: "Moms och omvänd skattskyldighet",
            paragraphs: [
              "Ställ in momssatsen i procent. Momsbeloppet och bruttototalen räknas ut automatiskt.",
              "Om du aktiverar omvänd skattskyldighet sätts momssatsen till 0 och fakturan får en motsvarande notering."
            ],
            bullets: [
              "Momssatsen tillämpas på nettodelsumman av alla rader",
              "Vid omvänd skattskyldighet låses momsfältet tillfälligt på 0 %",
              "Följ alltid de lokala skattereglerna och rådgör med din revisor vid osäkerhet"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Integritet",
            heading: "Integritet och datahantering",
            paragraphs: [
              "Verktyget körs helt och hållet i din webbläsare. Själva generatorn skickar inga fakturadata till någon server.",
              "Filerna du laddar ner (PDF eller JSON) sparas endast där du själv väljer på din enhet."
            ],
            bullets: [
              "Inga användarkonton, ingen molnsynkronisering, inga automatiska säkerhetskopior",
              "Rensa formuläret om du arbetar på en delad dator",
              "Du ansvarar själv för var du lagrar och hur du skickar de genererade filerna"
            ]
          }
        ]
      },
    },

    sl_si: {
"app.title": "Brezplačni izdelovalec računov",
"app.tagline": "Profesionalni računi s popolno zasebnostjo — brez registracije in brez sledenja.",
"app.languages": "Jeziki: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Jezik / Trg",
      "toolbar.theme": "Tema",

      "section.seller": "Prodajalec",
      "section.buyer": "Kupec",
      "section.invoiceDetails": "Podrobnosti računa",
      "section.items": "Postavke",
      "section.totals": "Skupaj",
      "section.notes": "Opombe",
      "section.payment": "Podatki o plačilu",
      "section.invoice": "Račun",

      "seller.logo": "Logotip prodajalca (neobvezno)",
      "seller.name": "Ime prodajalca",
      "seller.address": "Naslov prodajalca",
      "seller.country": "Država",
      "seller.vatId": "ID za DDV / davčna številka",
      "seller.regId": "Matična številka / registracija",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Bančni račun (lokalni)",
      "seller.swift": "SWIFT / BIC (neobvezno)",
      "seller.email": "E-pošta",
      "seller.phone": "Telefon",
      "seller.website": "Spletna stran",
      "seller.reference": "Referenca prodajalca",
      "seller.routing": "Številka routing",


      "buyer.logo": "Logotip kupca (neobvezno)",
      "buyer.name": "Ime / podjetje kupca",
      "buyer.address": "Naslov kupca",
      "buyer.country": "Država",
      "buyer.vatId": "ID za DDV / davčna številka",
      "buyer.customerNumber": "Številka kupca",


      "invoice.number": "Številka računa",
      "invoice.date": "Datum računa",
      "invoice.dueDate": "Datum zapadlosti",

      "invoice.currency": "Valuta",



      "items.description": "Opis",
      "items.quantity": "Količina",
      "items.unit": "Enota",
      "items.unitPrice": "Cena na enoto (brez DDV)",
      "items.vatRate": "Stopnja DDV (%)",
      "items.subtotalNet": "Vmesni seštevek (brez DDV)",
      "items.period": "Obdobje (neobvezno)",
      "items.addItem": "Dodaj postavko",
      "items.removeItem": "Odstrani",
      "items.periodFrom": "Od",
      "items.periodTo": "Do",
      "items.lineTotal": "Znesek (neto)",

      "totals.subtotal": "Vmesni seštevek (brez DDV)",
      "totals.tax": "Znesek DDV",
      "totals.total": "Skupaj (z DDV)",

      "notes.label": "Opombe / dodatne informacije",
      "notes.placeholder":
        "Plačilni pogoji, pravna besedila, opis projekta…",

      "payment.showQr":
        "Plačilni QR (SEPA za EUR, splošen sicer)",
      "payment.qrHint":
        "S skeniranjem se izpolnijo račun, znesek, valuta in številka računa.",
      "payment.reverseCharge":
        "Obrnjen davčni zavezanec (DDV plača prejemnik)",
      "payment.reverseChargeText":
        "DDV se ne zaračuna. Prejemnik je zavezanec za DDV po pravilih obrnjene davčne obveznosti.",
      "payment.qrLabel": "Plačilni QR",
      "payment.qrHelp":
        "Skenirajte za predizpolnitev plačila: IBAN/račun, znesek, valuta in številka računa.",
      "payment.reverseChargeNote":
        "Obrnjen davčni zavezanec: DDV obračuna prejemnik v skladu z veljavnimi predpisi.",
      "payment.iban": "IBAN",
      "payment.account": "Bančni račun",
      "payment.routing": "Številka routing",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Sklic / referenca",
      "payment.notes": "Plačilne opombe",

      "btn.generatePdf": "Ustvari PDF",
      "btn.print": "Natisni račun",
      "btn.downloadJson": "Prenesi JSON predlogo",
      "btn.loadJson": "Naloži JSON predlogo",
      "btn.reset": "Ponastavi obrazec",
      "confirm.reset":
        "Ali želite počistiti vse podatke računa?",

      "country.placeholder": "Izberite državo",
      "sign.signatureImage": "Slika podpisa (neobvezno)",
      "sign.author": "Avtor / Podpis",
      "sign.stampImage": "Slika žiga (neobvezno)",
      "templates.title": "Predloge",
      "templates.save": "Shrani",
      "templates.delete": "Izbriši",

      "error.required": "Polje {field} je obvezno.",
      "error.ibanMissing":
        "Vnesti morate IBAN ali bančni račun (ali routing + račun za ZDA).",
      "error.ibanInvalid": "IBAN se zdi neveljaven.",
      "error.noItems":
        "Zahtevana je vsaj ena ne-prazna postavka računa.",

      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Napredne funkcije z enim klikom",
      "pro.subtitle":
        "To območje bo v prihodnji premium različici odklenilo dodatne postavitve, prednastavitve in pametne pomočnike.",
      "pro.features.smartPdf": "Pametno poimenovanje PDF-jev",
      "pro.features.customFooter": "Predloge za prilagojeno nogo računa",
      "pro.features.multiSeller": "Več prodajnih profilov",
      "pro.features.savedBuyers": "Shranjene stranke in kontakti",
      "pro.features.extraLayouts": "Dodatne postavitve računa (A/B)",

      // Documentation button label
      "btn.showDocs": "Dokumentacija / Pomoč",

      // Fallback if doc sections are missing
      "doc.missing": "Dokumentacija za ta jezik še ni na voljo.",

      // Documentation structure for the modal
      doc: {
        title: "Dokumentacija in uporaba",
        tocTitle: "Poglavja",
        sections: [
          {
            id: "intro",
            shortLabel: "Pregled",
            heading: "Kaj omogoča to orodje",
            paragraphs: [
              "Ta generator vam pomaga ustvariti čiste PDF račune neposredno v brskalniku.",
              "Vsi podatki ostanejo na vaši napravi. Ni shranjevanja na strežnik, ni prijave in ni sledenja."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Osnovna raba",
            heading: "Osnovna uporaba orodja",
            paragraphs: [
              "Izpolnite podatke prodajalca in kupca, nastavite številko računa in datume, nato dodajte eno ali več postavk.",
              "Vsote se samodejno posodabljajo, ko spreminjate količine, cene na enoto in stopnjo DDV."
            ],
            bullets: [
              "Prodajalec: vaši poslovni ali osebni podatki",
              "Kupec: podatki vaše stranke",
              "Podrobnosti računa: številka, datum izdaje in zapadlosti",
              "Postavke: opis, obdobje (neobvezno), količina, enota, neto cena"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "JSON izvoz in uvoz",
            paragraphs: [
              "Z izvozom JSON shranite celoten posnetek računa: jezik, udeležence, postavke, stopnjo DDV in plačilne podatke.",
              "Kasneje lahko isti JSON ponovno uvozite in obnovite vsa polja natanko tako, kot so bila."
            ],
            bullets: [
              "Izvoz JSON: ustvari .json datoteko, ki jo lahko varno shranite",
              "Uvoz JSON: naloži vsa polja in postavke iz prej shranjene datoteke",
              "Uporabno pri stalnih strankah ali ko hkrati pripravljate več računov"
            ]
          },
          {
            id: "qr",
            shortLabel: "QR koda",
            heading: "Plačilna QR koda",
            paragraphs: [
              "Če vnesete IBAN (ali lokalni račun) in omogočite možnost QR, orodje ustvari plačilno QR kodo.",
              "Za EUR z veljavnim IBAN se uporabi SEPA standard, sicer se uporabi splošno besedilo za plačilo."
            ],
            bullets: [
              "Vsebina QR temelji na IBAN/računu, skupnem znesku, valuti in številki računa",
              "Ista QR koda je prikazana na zaslonu in v tiskani postavitvi",
              "Če želite klasičen račun brez QR kode, možnost QR preprosto izklopite"
            ]
          },
          {
            id: "vat",
            shortLabel: "DDV & reverse",
            heading: "DDV in obrnjena davčna obveznost",
            paragraphs: [
              "Nastavite stopnjo DDV v odstotkih. Znesek davka in bruto vsota se izračunata samodejno.",
              "Če vključite možnost obrnjene davčne obveznosti (reverse charge), se stopnja DDV nastavi na 0 in na računu se doda ustrezna opomba."
            ],
            bullets: [
              "Stopnja DDV se uporablja na neto vmesni seštevek vseh postavk",
              "Pri obrnjeni davčni obveznosti je polje DDV začasno zaklenjeno na 0 %",
              "Vedno sledite lokalnim davčnim pravilom in se po potrebi posvetujte z računovodjo"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Zasebnost",
            heading: "Zasebnost in upravljanje podatkov",
            paragraphs: [
              "Orodje deluje v celoti v vašem brskalniku. Sam generator ne pošilja podatkov o računih na noben strežnik.",
              "Datoteke, ki jih prenesete (PDF ali JSON), so shranjene samo tam, kjer jih shranite vi na svoji napravi."
            ],
            bullets: [
              "Ni uporabniških računov, ni sinhronizacije v oblak, ni samodejnih varnostnih kopij",
              "Ob izbiri skupnega računalnika po koncu delo počistite obrazec",
              "Vi ste odgovorni za to, kje shranjujete in kako pošiljate ustvarjene datoteke"
            ]
          }
        ]
      },
    },

    bhs: {
"app.title": "Besplatan generator faktura",
"app.tagline": "Profesionalne fakture uz potpunu privatnost — bez registracije i bez praćenja.",
"app.languages": "Jezici: EN/US · DE · ES · IT · BHS · SL · SV",

      "toolbar.language": "Jezik / Tržište",
      "toolbar.theme": "Tema",

      "section.seller": "Prodavac",
      "section.buyer": "Kupac",
      "section.invoiceDetails": "Detalji računa",
      "section.items": "Stavke",
      "section.totals": "Ukupno",
      "section.notes": "Napomene",
      "section.payment": "Podaci za plaćanje",
      "section.invoice": "Račun",

      "seller.logo": "Logo prodavca (opcionalno)",
      "seller.name": "Ime / naziv prodavca",
      "seller.address": "Adresa prodavca",
      "seller.country": "Država",
      "seller.vatId": "PDV / poreski broj",
      "seller.regId": "Matični broj / registracija",
      "seller.iban": "IBAN",
      "seller.bankAccount": "Broj računa (lokalni)",
      "seller.swift": "SWIFT / BIC (opcionalno)",
      "seller.email": "E-mail",
      "seller.phone": "Telefon",
      "seller.website": "Web stranica",
      "seller.reference": "Referentni broj prodavca",
      "seller.routing": "Routing broj",


      "buyer.logo": "Logo kupca (opcionalno)",
      "buyer.name": "Ime / naziv kupca",
      "buyer.address": "Adresa kupca",
      "buyer.country": "Država",
      "buyer.vatId": "PDV / poreski broj",
      "buyer.customerNumber": "Broj kupca",


      "invoice.number": "Broj računa",
      "invoice.date": "Datum računa",
      "invoice.dueDate": "Rok plaćanja",

      "invoice.currency": "Valuta",



      "items.description": "Opis",
      "items.quantity": "Količina",
      "items.unit": "Jedinica",
      "items.unitPrice": "Jedinična cijena (bez PDV)",
      "items.vatRate": "Stopa PDV (%)",
      "items.subtotalNet": "Međuzbir (bez PDV)",
      "items.period": "Period (opcionalno)",
      "items.addItem": "Dodaj stavku",
      "items.removeItem": "Ukloni",
      "items.periodFrom": "Od",
      "items.periodTo": "Do",
      "items.lineTotal": "Iznos (neto)",

      "totals.subtotal": "Međuzbir (bez PDV)",
      "totals.tax": "Iznos PDV",
      "totals.total": "Ukupno (sa PDV)",

      "notes.label": "Napomene / dodatne informacije",
      "notes.placeholder":
        "Uslovi plaćanja, pravne napomene, opis projekta…",

      "payment.showQr":
        "QR za plaćanje (SEPA za EUR, generički u ostalim slučajevima)",
      "payment.qrHint":
        "Skeniranjem se popunjavaju račun, iznos, valuta i broj računa.",
      "payment.reverseCharge":
        "Reverse charge (PDV plaća primalac)",
      "payment.reverseChargeText":
        "PDV nije obračunat. Primalac je obavezan da obračuna PDV po reverse charge principu.",
      "payment.qrLabel": "QR za plaćanje",
      "payment.qrHelp":
        "Skeniraj da se popune podaci za plaćanje: IBAN/račun, iznos, valuta i broj računa.",
      "payment.reverseChargeNote":
        "Reverse charge: PDV prijavljuje primatelj usluge u skladu sa važećim propisima.",
      "payment.iban": "IBAN",
      "payment.account": "Broj računa",
      "payment.routing": "Routing broj",
      "payment.swift": "SWIFT / BIC",
      "payment.reference": "Svrha plaćanja",
      "payment.notes": "Napomene za plaćanje",

      "btn.generatePdf": "Kreiraj PDF",
      "btn.print": "Štampaj račun",
      "btn.downloadJson": "Preuzmi JSON šablon",
      "btn.loadJson": "Učitaj JSON šablon",
      "btn.reset": "Resetuj formu",
      "confirm.reset": "Obrisati sve podatke računa?",

      "country.placeholder": "Odaberite državu",
      "sign.signatureImage": "Slika potpisa (opcionalno)",
      "sign.author": "Autor / Potpis",
      "sign.stampImage": "Slika pečata (opcionalno)",
      "templates.title": "Šabloni",
      "templates.save": "Sačuvaj",
      "templates.delete": "Obriši",

      "error.required": "Polje {field} je obavezno.",
      "error.ibanMissing":
        "Morate unijeti IBAN ili broj računa (ili US routing + račun).",
      "error.ibanInvalid": "IBAN izgleda neispravno.",
      "error.noItems":
        "Potrebna je barem jedna neprazna stavka na računu.",

      // PRO teaser
      // PRO teaser
      "pro.badge": "PRO",
      "pro.title": "Napredne funkcije na jedan klik",
      "pro.subtitle":
        "Ovaj dio će u budućoj premium verziji otključati dodatne izglede, šablone i pametne pomoćnike.",
      "pro.features.smartPdf": "Pametno imenovanje PDF fajlova",
      "pro.features.customFooter": "Prilagođeni šabloni podnožja",
      "pro.features.multiSeller": "Više profila prodavca",
      "pro.features.savedBuyers": "Sačuvani kupci i kontakti",
      "pro.features.extraLayouts": "Dodatni izgled računa (A/B)",

      // Documentation button label
      "btn.showDocs": "Dokumentacija / Pomoć",

      // Fallback if doc sections are missing
      "doc.missing": "Dokumentacija za ovaj jezik još nije dostupna.",

      // Documentation structure for the modal
      doc: {
        title: "Dokumentacija & upotreba",
        tocTitle: "Poglavlja",
        sections: [
          {
            id: "intro",
            shortLabel: "Pregled",
            heading: "Šta ovaj alat radi",
            paragraphs: [
              "Ovaj generator vam pomaže da napravite čiste PDF fakture direktno u pregledaču.",
              "Svi podaci ostaju na vašem uređaju. Nema čuvanja na serveru, nema prijave i nema praćenja."
            ]
          },
          {
            id: "basic-usage",
            shortLabel: "Osnovna upotreba",
            heading: "Osnovni način korištenja",
            paragraphs: [
              "Popunite podatke o prodavcu i kupcu, postavite broj fakture i datume, a zatim dodajte jednu ili više stavki.",
              "Ukupni iznosi se automatski ažuriraju kada mijenjate količine, jedinične cijene i stopu PDV."
            ],
            bullets: [
              "Sekcija Prodavac: vaši poslovni ili lični podaci",
              "Sekcija Kupac: podaci vaše stranke",
              "Detalji računa: broj, datum izdavanja i rok plaćanja",
              "Stavke: opis, period (opcionalno), količina, jedinica, neto cijena"
            ]
          },
          {
            id: "json",
            shortLabel: "JSON",
            heading: "JSON izvoz i uvoz",
            paragraphs: [
              "JSON izvoz čuva kompletan snimak fakture: jezik, učesnike, stavke, stopu PDV i podatke o plaćanju.",
              "Kasnije možete ponovo uvesti isti JSON i vratiti sva polja tačno onako kako su bila."
            ],
            bullets: [
              "Izvoz JSON: kreira .json fajl koji možete sigurno sačuvati",
              "Uvoz JSON: učitava sva polja i stavke iz ranije sačuvanog fajla",
              "Korisno za stalne klijente ili kada radite na više faktura paralelno"
            ]
          },
          {
            id: "qr",
            shortLabel: "QR kod",
            heading: "QR kod za plaćanje",
            paragraphs: [
              "Ako unesete IBAN (ili lokalni račun) i uključite opciju QR, alat generiše QR kod za plaćanje.",
              "Za EUR sa važećim IBAN-om koristi se SEPA standard, u suprotnom se koristi generički tekst za plaćanje."
            ],
            bullets: [
              "Sadržaj QR koda se zasniva na IBAN/računu, ukupnom iznosu, valuti i broju fakture",
              "Isti QR kod se prikazuje na ekranu i u štampanom izgledu",
              "Isključite QR opciju ako želite klasičan račun bez QR koda"
            ]
          },
          {
            id: "vat",
            shortLabel: "PDV & reverse",
            heading: "PDV i reverse charge",
            paragraphs: [
              "Postavite stopu PDV u procentima. Iznos PDV i ukupno sa PDV se računaju automatski.",
              "Ako uključite opciju reverse charge, stopa PDV se postavlja na 0 i na fakturi se dodaje odgovarajuća napomena."
            ],
            bullets: [
              "Stopa PDV se primjenjuje na neto međuzbir svih stavki",
              "Kod reverse charge režima, polje PDV je privremeno zaključano na 0%",
              "Uvijek pratite lokalne poreske propise i po potrebi se konsultujte sa računovođom"
            ]
          },
          {
            id: "privacy",
            shortLabel: "Privatnost",
            heading: "Privatnost i rukovanje podacima",
            paragraphs: [
              "Alat radi u potpunosti u vašem pregledaču. Sam generator ne šalje podatke o fakturi ni na jedan server.",
              "Fajlovi koje preuzimate (PDF ili JSON) čuvaju se samo tamo gdje ih vi snimite na svom uređaju."
            ],
            bullets: [
              "Nema korisničkih naloga, nema sinhronizacije u oblaku, nema automatskih backup-a",
              "Ako radite na zajedničkom računaru, po završetku rada obrišite podatke iz forme",
              "Vi ste odgovorni gdje čuvate i kako šaljete generisane fajlove"
            ]
          }
        ]
      }
    }
  };

  window.InvoiceI18N = {
    languages,
    countries,
    currencies,
    translations
  };
})();
