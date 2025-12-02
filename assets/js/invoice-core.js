// assets/js/invoice-core.js
(function () {
  const I18N = window.InvoiceI18N || {};
  const LANGS = I18N.languages || {};
  const COUNTRIES = I18N.countries || [];
  const CURRENCIES = I18N.currencies || [];
  
  // Default seller country per language
const LANG_DEFAULT_COUNTRY = {
  en_intl: "",
  en_us:   "US",
  de_de:   "",
  es_es:   "ES",
  it_it:   "IT",
  sl_si:   "SI",
  sv_se:   "SE",
  bhs:     ""
};

// Locale used for number formatting per language
const LANG_NUMBER_LOCALE = {
  en_intl: "de-DE", // English, EU-style
  en_us:   "en-US",
  de_de:   "de-DE",
  es_es:   "es-ES",
  it_it:   "it-IT",
  sl_si:   "sl-SI",
  sv_se:   "sv-SE",
  bhs:     "de-DE"  // B/H/S – comma decimal, dot thousands
};

	let currentLangKey = "en_intl";
	let qrInstance = null;
	let lastQrData = "";              // NEW: remembered QR content
	let darkTheme = false;
	let storedTaxRateBeforeReverse = null; // NEW: remember tax before reverse charge
  let lastSubtotalRaw = 0;
  let lastTaxRaw = 0;
  let lastTotalRaw = 0;


  // --- i18n helpers for title & <html lang> -----------------------------

  function getCurrentTranslations() {
    const all = window.InvoiceI18N && window.InvoiceI18N.translations;
    if (!all) return {};
    return all[currentLangKey] || all["en_intl"] || {};
  }

  function applyAppTitleI18n() {
    const t = getCurrentTranslations();

    if (t["app.title"]) {
      // <title> in <head>
      document.title = t["app.title"];

      // H1 in toolbar
      const h1 = document.getElementById("app-title");
      if (h1) h1.textContent = t["app.title"];
    }
  }



  function $(id) {
    return document.getElementById(id);
  }


  // Allow only digits, comma and dot in a text input
  function attachNumericFilter(input) {
    if (!input) return;
    input.addEventListener("input", function () {
      const oldValue = input.value;
      const filtered = oldValue.replace(/[^0-9.,]/g, "");
      if (filtered !== oldValue) {
        const pos = input.selectionStart;
        input.value = filtered;
        // best-effort caret correction
        if (typeof pos === "number") {
          const diff = oldValue.length - filtered.length;
          const newPos = Math.max(0, pos - diff);
          input.setSelectionRange(newPos, newPos);
        }
      }
    });
  }

  function formatNumber(num) {
    if (!isFinite(num)) return "0.00";
    return num.toFixed(2);
  }

  function formatDisplayNumber(num) {
  if (!isFinite(num)) return "0.00";

  const cfg = getCurrentLanguageConfig();
  const langKey = currentLangKey || "en_intl";

  const locale =
    (cfg && cfg.settings && cfg.settings.numberLocale) ||
    LANG_NUMBER_LOCALE[langKey] ||
    "en-GB";

  if (typeof Intl !== "undefined" && Intl.NumberFormat) {
    // cache per-locale formatter on the function
    if (!formatDisplayNumber._cache) {
      formatDisplayNumber._cache = {};
    }
    const key = locale + "|2";
    if (!formatDisplayNumber._cache[key]) {
      formatDisplayNumber._cache[key] = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return formatDisplayNumber._cache[key].format(num);
  }

  // Fallback: old behaviour
  return formatNumber(num);
}


  function getCurrentLanguageConfig() {
    return LANGS[currentLangKey] || LANGS["en_intl"];
  }
  
   function buildDocModalContents() {
    const modal = $("doc-modal");
    if (!modal) return;

    const titleEl = $("doc-modal-title");
    const tocEl = $("doc-modal-toc");
    const contentEl = $("doc-modal-content");

    const t = getCurrentTranslations();
    const allTranslations =
      window.InvoiceI18N && window.InvoiceI18N.translations;

    // 1) Try doc for current language
    let docCfg = (t && t.doc) || null;

    // 2) If none, fall back to en_intl documentation (shared English docs)
    if (!docCfg && allTranslations && allTranslations.en_intl) {
      docCfg = allTranslations.en_intl.doc || null;
    }

    if (!docCfg) {
      docCfg = {};
    }

    const sections = Array.isArray(docCfg.sections) ? docCfg.sections : [];

    // Title
    if (titleEl) {
      titleEl.textContent =
        docCfg.title ||
        (t && t["btn.showDocs"]) ||
        "Documentation";
    }

    // TOC
    if (tocEl) {
      let tocHtml = "";
      const tocTitle = docCfg.tocTitle || "Sections";
      tocHtml += `<h3>${tocTitle}</h3>`;

      if (sections.length) {
        tocHtml += "<ul>";
        sections.forEach(function (sec) {
          if (!sec || !sec.id) return;
          const label = sec.shortLabel || sec.heading || sec.id;
          tocHtml +=
            `<li><a href="#doc-section-${sec.id}" ` +
            `data-doc-target="${sec.id}">` +
            `${label}</a></li>`;
        });
        tocHtml += "</ul>";
      } else {
        tocHtml += "<ul></ul>";
      }

      tocEl.innerHTML = tocHtml;
    }

    // Body content
    if (contentEl) {
      let bodyHtml = "";
      sections.forEach(function (sec) {
        if (!sec || !sec.id) return;
        const heading = sec.heading || "";
        const paragraphs = Array.isArray(sec.paragraphs)
          ? sec.paragraphs
          : [];
        const bullets = Array.isArray(sec.bullets) ? sec.bullets : [];

        bodyHtml +=
          `<section class="doc-section" id="doc-section-${sec.id}">`;

        if (heading) {
          bodyHtml += `<h3>${heading}</h3>`;
        }

        paragraphs.forEach(function (p) {
          bodyHtml += `<p>${p}</p>`;
        });

        if (bullets.length) {
          bodyHtml += "<ul>";
          bullets.forEach(function (item) {
            bodyHtml += `<li>${item}</li>`;
          });
          bodyHtml += "</ul>";
        }

        bodyHtml += "</section>";
      });

      if (!bodyHtml) {
        const fallback =
          (t && t["doc.missing"]) ||
          "Documentation is not yet available for this language.";
        bodyHtml = `<p>${fallback}</p>`;
      }

      contentEl.innerHTML = bodyHtml;
    }

    // Mark first TOC link active
    const tocRoot = $("doc-modal-toc");
    if (tocRoot) {
      const firstLink = tocRoot.querySelector("a[data-doc-target]");
      if (firstLink) {
        firstLink.classList.add("is-active");
      }
    }
  }

  function onDocTocClick(ev) {
    const link = ev.target.closest("a[data-doc-target]");
    if (!link) return;

    ev.preventDefault();
    const targetId = link.getAttribute("data-doc-target");
    const section = document.getElementById("doc-section-" + targetId);
    if (section) {
      section.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    const tocRoot = $("doc-modal-toc");
    if (tocRoot) {
      tocRoot
        .querySelectorAll("a[data-doc-target]")
        .forEach(function (a) {
          a.classList.toggle("is-active", a === link);
        });
    }
  }

  function onDocModalKeydown(ev) {
    if (ev.key === "Escape" || ev.key === "Esc") {
      closeDocModal();
    }
  }

  function openDocModal() {
    const modal = $("doc-modal");
    if (!modal) return;

    buildDocModalContents();

    modal.classList.add("is-visible");
    document.body.classList.add("has-doc-modal-open");

    // Ensure TOC clicks and ESC work while open
    const tocEl = $("doc-modal-toc");
    if (tocEl) {
      tocEl.addEventListener("click", onDocTocClick);
    }
    document.addEventListener("keydown", onDocModalKeydown);
  }

  function closeDocModal() {
    const modal = $("doc-modal");
    if (!modal) return;

    modal.classList.remove("is-visible");
    document.body.classList.remove("has-doc-modal-open");

    const tocEl = $("doc-modal-toc");
    if (tocEl) {
      tocEl.removeEventListener("click", onDocTocClick);
    }
    document.removeEventListener("keydown", onDocModalKeydown);
  }

  function initDocModal() {
    const btn = $("btn-doc-toggle");
    const modal = $("doc-modal");
    if (!btn || !modal) return;

    const closeBtn = $("doc-modal-close");
    const backdrop = modal.querySelector(".doc-modal-backdrop");

    btn.addEventListener("click", function () {
      openDocModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeDocModal();
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        closeDocModal();
      });
    }
  }

 
  function formatDateForDisplay(isoDate, cfg) {
    if (!isoDate) return "";
    // isoDate is expected as "YYYY-MM-DD"
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;

    const [yyyy, mm, dd] = parts;
    const fmt =
      (cfg && cfg.settings && cfg.settings.dateFormat) || "iso";

    if (fmt === "us") {
      // MM/DD/YYYY
      return `${mm}/${dd}/${yyyy}`;
    } else if (fmt === "eu") {
      // DD/MM/YYYY
      return `${dd}/${mm}/${yyyy}`;
    } else if (fmt === "dot-eu") {
      // DD.MM.YYYY  (Slovenia style)
      return `${dd}.${mm}.${yyyy}`;
    } else {
      // Fallback / ISO-friendly markets (Sweden etc.)
      // YYYY-MM-DD
      return isoDate;
    }
  }



  // ---------- IBAN VALIDATION ----------
  function validateIban(ibanRaw) {
    if (!ibanRaw) return null; // nothing entered
    let iban = ibanRaw.replace(/\s+/g, "").toUpperCase();
    if (!/^[A-Z0-9]+$/.test(iban)) return false;
    if (iban.length < 15 || iban.length > 34) return false;

    // Move first 4 chars to end
    iban = iban.slice(4) + iban.slice(0, 4);

    // Replace letters with numbers (A=10,...)
    let expanded = "";
    for (let ch of iban) {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        expanded += String(code - 55);
      } else {
        expanded += ch;
      }
    }

    // Compute mod 97
    let remainder = 0;
    for (let i = 0; i < expanded.length; i++) {
      remainder = (remainder * 10 + parseInt(expanded[i], 10)) % 97;
    }
    return remainder === 1;
  }

function updateIbanStatus() {
  const el = $("seller-iban");
  const status = $("iban-status");
  if (!el || !status) return;

  const value = el.value.trim();
  const valid = validateIban(value);

  // No input or cannot validate → clear status
  if (valid === null || value === "") {
    status.textContent = "";
    status.style.color = "";
    return;
  }

  const t = getCurrentTranslations();

  if (valid) {
    // On success, we simply clear any previous error
    status.textContent = "";
    status.style.color = "";
  } else {
    // Localized error message
    const msg =
      (t && t["error.ibanInvalid"]) || "IBAN appears invalid.";
    status.textContent = msg;
    status.style.color = "red";
  }
}


  // ---------- POPULATE SELECTS ----------
  function populateCountries() {
    const sellerCountry = $("seller-country");
    const buyerCountry = $("buyer-country");
    if (!sellerCountry || !buyerCountry) return;

    sellerCountry.innerHTML = "";
    buyerCountry.innerHTML = "";

    // 1) Placeholder (localized)
    const t = getCurrentTranslations();
    const placeholderText = t["country.placeholder"] || "Select country";

    const placeholderSeller = document.createElement("option");
    placeholderSeller.value = "";
    placeholderSeller.textContent = placeholderText;
    sellerCountry.appendChild(placeholderSeller);

    const placeholderBuyer = document.createElement("option");
    placeholderBuyer.value = "";
    placeholderBuyer.textContent = placeholderText;
    buyerCountry.appendChild(placeholderBuyer);

    // 2) Pinned countries (main markets), by ISO code
    const PINNED_CODES = [
      "AT", // Austria
      "BA", // Bosnia and Herzegovina
      "CA", // Canada
      "CH", // Switzerland
      "DE", // Germany
      "ES", // Spain
      "HR", // Croatia
      "IT", // Italy
      "RS", // Serbia
      "SE", // Sweden
      "SI", // Slovenia
      "GB", // United Kingdom
      "US"  // United States
    ];

    // Build lookup by code
    const codeToCountry = {};
    COUNTRIES.forEach((c) => {
      codeToCountry[c.code] = c;
    });

    // Collect pinned countries that actually exist in COUNTRIES
    const pinnedCountries = PINNED_CODES
      .map((code) => codeToCountry[code])
      .filter(Boolean)
      .sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );

    const pinnedSet = new Set(pinnedCountries.map((c) => c.code));

    // Helper to append an option to both selects
    function appendCountryOption(country) {
      const opt1 = document.createElement("option");
      opt1.value = country.code;
      opt1.textContent = country.name;
      sellerCountry.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = country.code;
      opt2.textContent = country.name;
      buyerCountry.appendChild(opt2);
    }

    // 2a) Add pinned countries
    pinnedCountries.forEach(appendCountryOption);

    // 2b) Separator if we have any pinned countries
    if (pinnedCountries.length > 0) {
      const sep1 = document.createElement("option");
      sep1.disabled = true;
      sep1.textContent = "──────────";
      sellerCountry.appendChild(sep1);

      const sep2 = document.createElement("option");
      sep2.disabled = true;
      sep2.textContent = "──────────";
      buyerCountry.appendChild(sep2);
    }

    // 3) Add full list alphabetically, skipping pinned ones
    const allSorted = COUNTRIES.slice().sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );

    allSorted.forEach((c) => {
      if (pinnedSet.has(c.code)) return; // already added in pinned block
      appendCountryOption(c);
    });
  }


  function applyTranslations() {
    const t = getCurrentTranslations();
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const text = t[key];
      if (!text) return;

      const attr = el.getAttribute("data-i18n-attr");
      if (attr === "placeholder") {
        el.setAttribute("placeholder", text);
      } else if (attr === "value") {
        el.setAttribute("value", text);
      } else {
        el.textContent = text;
      }
    });
  }




  function populateCurrencies() {
    const currencySelect = $("currency-select");
    if (!currencySelect) return;
    currencySelect.innerHTML = "";

    const topCodes = ["USD", "EUR", "GBP", "CHF", "SEK"];
    const top = CURRENCIES.filter((c) => topCodes.includes(c.code));
    const others = CURRENCIES.filter((c) => !topCodes.includes(c.code));

    function addOption(cur) {
      const opt = document.createElement("option");
      opt.value = cur.code;
      opt.textContent = cur.label;
      currencySelect.appendChild(opt);
    }

    top.forEach(addOption);

    if (others.length) {
      const sep = document.createElement("option");
      sep.disabled = true;
      sep.textContent = "──────────";
      currencySelect.appendChild(sep);
      others.forEach(addOption);
    }
  }

  function populateLanguageSelect() {
    const sel = $("language-select");
    if (!sel) return;
    
      // SAFETY: if i18n failed to load, don't wipe the hard-coded options
  if (!LANGS || Object.keys(LANGS).length === 0) {
    return; // keep the <option> elements from HTML
  }

    sel.innerHTML = "";

    // Explicit ordering of language presets
    const orderedKeys = [
      // English group
      "en_intl",
      "en_us",
      // Separator (handled separately)
      // Non-English group (ordered by practical weight)
      "de_de",
      "es_es",
      "it_it",
      "bhs",
      "sl_si",
      "sv_se"
    ];

    const englishKeys = ["en_intl", "en_us"];

    // 1) English variants first
    englishKeys.forEach((key) => {
      const lang = LANGS[key];
      if (!lang) return;
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = lang.name || key;
      sel.appendChild(opt);
    });

    // 2) Separator
    const sep = document.createElement("option");
    sep.disabled = true;
    sep.textContent = "──────────";
    sel.appendChild(sep);

    // 3) Remaining languages in chosen order (skipping English keys)
    orderedKeys.forEach((key) => {
      if (englishKeys.includes(key)) return;
      const lang = LANGS[key];
      if (!lang) return;
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = lang.name || key;
      sel.appendChild(opt);
    });

    // Restore current selection if possible
    if (LANGS[currentLangKey]) {
      sel.value = currentLangKey;
    } else {
      sel.value = "en_intl";
      currentLangKey = "en_intl";
    }
  }


  // ---------- THEME ----------
  function initThemeToggle() {
    const btn = $("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      darkTheme = !darkTheme;
      if (darkTheme) {
        document.body.classList.add("dark-theme");
        btn.textContent = "☀️";
      } else {
        document.body.classList.remove("dark-theme");
        btn.textContent = "🌙";
      }
    });
  }

  // ---------- ITEMS ----------
  function createItemRow(initial = {}) {
    const tbody = $("items-tbody");
    if (!tbody) return;

    const tr = document.createElement("tr");

    // Description
    const tdDesc = document.createElement("td");
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.className = "item-desc-input";
    descInput.value = initial.description || "";
    tdDesc.appendChild(descInput);
    tr.appendChild(tdDesc);

    // Period
    const tdPeriod = document.createElement("td");
    tdPeriod.className = "text-center";
    const wrapPeriod = document.createElement("div");
    wrapPeriod.style.display = "flex";
    wrapPeriod.style.flexDirection = "column";
    const fromInput = document.createElement("input");
    fromInput.type = "date";
    fromInput.className = "item-period-from";
    fromInput.value = initial.periodFrom || "";
    const toInput = document.createElement("input");
    toInput.type = "date";
    toInput.className = "item-period-to";
    toInput.value = initial.periodTo || "";
    wrapPeriod.appendChild(fromInput);
    wrapPeriod.appendChild(toInput);
    tdPeriod.appendChild(wrapPeriod);
    tr.appendChild(tdPeriod);

    // Qty
    const tdQty = document.createElement("td");
    tdQty.className = "text-right";
    const qtyInput = document.createElement("input");
    qtyInput.type = "text";
    qtyInput.inputMode = "decimal";
    qtyInput.className = "item-qty-input";
    qtyInput.value = initial.quantity != null ? initial.quantity : "";
    attachNumericFilter(qtyInput);
    tdQty.appendChild(qtyInput);
    tr.appendChild(tdQty);

    // Unit
    const tdUnit = document.createElement("td");
    tdUnit.className = "text-center";
    const unitInput = document.createElement("input");
    unitInput.type = "text";
    unitInput.className = "item-unit-input";
    unitInput.value = initial.unit || "";
    tdUnit.appendChild(unitInput);
    tr.appendChild(tdUnit);

    // Unit price
    const tdPrice = document.createElement("td");
    tdPrice.className = "text-right";
    const priceInput = document.createElement("input");
    priceInput.type = "text";
    priceInput.inputMode = "decimal";
    priceInput.className = "item-unit-price-input";
    priceInput.value =
      initial.unitPrice != null ? String(initial.unitPrice) : "";
    attachNumericFilter(priceInput);
    tdPrice.appendChild(priceInput);
    tr.appendChild(tdPrice);


    // Line total (read-only)
    const tdLineTotal = document.createElement("td");
    tdLineTotal.className = "text-right";
    const lineTotalSpan = document.createElement("span");
    lineTotalSpan.className = "item-line-total";
    lineTotalSpan.textContent = "0.00";
    tdLineTotal.appendChild(lineTotalSpan);
    tr.appendChild(tdLineTotal);

    // Remove
    const tdRemove = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "item-remove-btn";
    removeBtn.textContent = "✕";
    tdRemove.appendChild(removeBtn);
    tr.appendChild(tdRemove);

    // Events
    function recalcRowAndTotals() {
      const qty = parseFloat(qtyInput.value.replace(",", ".")) || 0;
      const price = parseFloat(priceInput.value.replace(",", ".")) || 0;
const line = qty * price;
lineTotalSpan.textContent = formatDisplayNumber(line);
recalcTotals();

    }

    qtyInput.addEventListener("input", recalcRowAndTotals);
    priceInput.addEventListener("input", recalcRowAndTotals);

    // Clear default value on focus for unit price if it's 0 or empty
    priceInput.addEventListener("focus", () => {
      if (
        priceInput.value === "0" ||
        priceInput.value === "0.0" ||
        priceInput.value === "0.00"
      ) {
        priceInput.value = "";
      }
    });

    removeBtn.addEventListener("click", () => {
      tr.remove();
      recalcTotals();
    });

    tbody.appendChild(tr);
    recalcRowAndTotals();
  }

  function getItemsFromDom() {
    const rows = Array.from($("items-tbody").querySelectorAll("tr"));
    return rows.map((tr) => {
      const desc = tr.querySelector(".item-desc-input")?.value.trim() || "";
      const periodFrom =
        tr.querySelector(".item-period-from")?.value.trim() || "";
      const periodTo = tr.querySelector(".item-period-to")?.value.trim() || "";
      const qtyStr = tr.querySelector(".item-qty-input")?.value || "";
      const quantity = parseFloat(qtyStr.replace(",", ".")) || 0;
      const unit = tr.querySelector(".item-unit-input")?.value.trim() || "";
      const unitPriceStr =
        tr.querySelector(".item-unit-price-input")?.value || "";
      const unitPrice =
        parseFloat(unitPriceStr.replace(",", ".")) || 0;

      return {
        description: desc,
        periodFrom,
        periodTo,
        quantity,
        unit,
        unitPrice
      };
    });
  }

  // ---------- TOTALS ----------
function recalcTotals() {
  const items = getItemsFromDom();
  let subtotal = 0;
  items.forEach((it) => {
    subtotal += it.quantity * it.unitPrice;
  });

  const taxRateInput = $("tax-rate");
  let rate = 0;
  if (taxRateInput) {
    const raw = taxRateInput.value;
    rate = parseFloat(String(raw).replace(",", ".")) || 0;
  }

  const taxAmount = subtotal * (rate / 100);
  const total = subtotal + taxAmount;

  // store raw numeric values for QR / other logic
  lastSubtotalRaw = subtotal;
  lastTaxRaw = taxAmount;
  lastTotalRaw = total;

  // UI: localized formatting
  $("subtotal-value").textContent = formatDisplayNumber(subtotal);
  $("tax-value").textContent      = formatDisplayNumber(taxAmount);
  $("total-value").textContent    = formatDisplayNumber(total);

  // Update QR if enabled
  if ($("qr-enabled") && $("qr-enabled").checked) {
    generateOrUpdateQr();
  }
}


  // ---------- LANGUAGE / MODE ----------
  function applyLanguageSettings() {
    const cfg = getCurrentLanguageConfig();
    if (!cfg) return;

    // Tax label
    const taxLabelSpan = $("label-tax");
    if (taxLabelSpan) {
      taxLabelSpan.textContent = cfg.settings.taxLabel || "VAT";
    }

    // Reverse charge
    const reverseGroup = $("reverse-charge")
      ? $("reverse-charge").closest(".field-group")
      : null;
    if (reverseGroup) {
      if (cfg.settings.reverseChargeEnabled) {
        reverseGroup.style.display = "";
      } else {
        reverseGroup.style.display = "none";
        $("reverse-charge").checked = false;
        $("reverse-charge-text").style.display = "none";
      }
    }

    // IBAN field-group (EU only)
    const ibanGroup = $("seller-iban")
      ? $("seller-iban").closest(".field-group")
      : null;
    if (ibanGroup) {
      if (cfg.settings.showIban) {
        ibanGroup.style.display = "";
      } else {
        ibanGroup.style.display = "none";
        $("seller-iban").value = "";
        $("iban-status").textContent = "";
      }
    }

// US-specific fields
const usOnlyEls = document.querySelectorAll(".us-only");
usOnlyEls.forEach((el) => {
  if (cfg.settings.showUsBankFields) {
    // match the layout of other rows
    el.style.display = "flex";
  } else {
    el.style.display = "none";
  }
});

// If the current language is not US-mode, wipe routing so it
// doesn't get saved/printed accidentally.
if (!cfg.settings.showUsBankFields) {
  const routing = $("seller-routing");
  if (routing) routing.value = "";
}


    // Default currency if not yet selected
    const currencySelect = $("currency-select");
    if (currencySelect && !currencySelect.value) {
      const cfgCur = cfg.settings.defaultCurrency || "EUR";
      const found = Array.from(currencySelect.options).find(
        (o) => o.value === cfgCur
      );
      if (found) currencySelect.value = cfgCur;
    }
  }

  // ---------- QR ----------
  function buildSepaString(iban, bic, name, amount, currency, reference) {
    // Minimal SEPA BCD format
    // BCD\n001\n1\nSCT\n<BIC>\n<NAME>\n<IBAN>\n<EURAMOUNT>\n<REFERENCE>
    const amt = formatNumber(amount).replace(".", "");
    const amtFormatted = amt.length ? "EUR" + formatNumber(amount) : "";
    const safeName = (name || "").substring(0, 70);
    const safeRef = (reference || "").substring(0, 70);

    return [
      "BCD",
      "001",
      "1",
      "SCT",
      bic || "",
      safeName,
      iban.replace(/\s+/g, ""),
      amtFormatted,
      safeRef
    ].join("\n");
  }

  function buildGenericPaymentString(account, amount, currency, reference) {
    const parts = [];
    parts.push("PAYMENT");
    if (account) parts.push("ACC: " + account);
if (amount != null && isFinite(amount))
  parts.push("AMT: " + formatDisplayNumber(amount) + " " + (currency || ""));
    if (reference) parts.push("REF: " + reference);
    return parts.join("\n");
  }

  function generateOrUpdateQr() {
    const qrEnabled = $("qr-enabled");
    const wrapper = $("qr-wrapper");
    const qrContainer = $("qr-code");

  if (!qrEnabled || !wrapper || !qrContainer) return;

  if (!qrEnabled.checked) {
    wrapper.style.display = "none";
    qrContainer.innerHTML = "";
    qrInstance = null;     // reset instance
    lastQrData = "";       // clear cached data
    return;
  }


    // We attempt to build data:
    const cfg = getCurrentLanguageConfig();
// Use raw numeric total computed in recalcTotals()
    const totalAmount = lastTotalRaw || 0;

    const cur = $("currency-select").value || "";
    const sellerName = $("seller-name").value.trim();
    const iban = $("seller-iban").value.trim();
    const account = $("seller-account").value.trim();
    const bic = $("seller-bic").value.trim();
    const reference = $("invoice-number").value.trim();

    let qrData = "";
    if (cur === "EUR" && cfg.settings.showIban && iban && validateIban(iban)) {
      qrData = buildSepaString(iban, bic, sellerName, totalAmount, cur, reference);
    } else {
      const acc = iban || account;
      if (!acc) {
        // No account: can't generate meaningful QR
        wrapper.style.display = "none";
        qrContainer.innerHTML = "";
        lastQrData = "";
        return;
      }
      qrData = buildGenericPaymentString(acc, totalAmount, cur, reference);
    }

    // Remember last QR data for print layout
    lastQrData = qrData;

    wrapper.style.display = "flex";

    if (!qrInstance) {
      qrInstance = new QRCode(qrContainer, {
        text: qrData,
        width: 120,
        height: 120
      });
    } else {
      qrInstance.clear();
      qrInstance.makeCode(qrData);
    }

  }

  // ---------- TEMPLATES ----------
  const TEMPLATE_KEY = "invoiceTemplates_v1";

  function loadTemplatesFromStorage() {
    try {
      const raw = localStorage.getItem(TEMPLATE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) || {};
    } catch (e) {
      return {};
    }
  }

  function saveTemplatesToStorage(templates) {
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(templates));
  }

  function refreshTemplateSelect() {
    const select = $("template-select");
    if (!select) return;
    const templates = loadTemplatesFromStorage();

    select.innerHTML = "";
    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "--";
    select.appendChild(emptyOpt);

    Object.keys(templates).forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
  }

function captureState() {
  const items = getItemsFromDom();

  const state = {
    lang: currentLangKey,

  seller: {
	name: $("seller-name")?.value || "",
	address: $("seller-address")?.value || "",
	country: $("seller-country")?.value || "",
	taxId: $("seller-tax-id")?.value || "",
	reg: $("seller-reg")?.value || "",
	ref: $("seller-ref")?.value || "",
	email: $("seller-email")?.value || "",
	phone: $("seller-phone")?.value || "",
	website: $("seller-website")?.value || "",
	iban: $("seller-iban")?.value || "",
	account: $("seller-account")?.value || "",
	routing: $("seller-routing")?.value || "",
	bic: $("seller-bic")?.value || ""
	},


buyer: {
  name: $("buyer-name")?.value || "",
  address: $("buyer-address")?.value || "",
  country: $("buyer-country")?.value || "",
  taxId: $("buyer-tax-id")?.value || "",
  customerNo: $("buyer-customer")?.value || ""
},


    invoice: {
      number: $("invoice-number")?.value || "",
      date: $("invoice-date")?.value || "",
      // global performance period was removed from UI
      dueDate: $("due-date")?.value || "",
      currency: $("currency-select")?.value || ""
    },

    payment: {
      notes: $("notes")?.value || "",
      reverseCharge: !!$("reverse-charge")?.checked,
      qrEnabled: !!$("qr-enabled")?.checked,

      // duplicate key bank data here so print layout can read it
      iban: $("seller-iban")?.value || "",
      account: $("seller-account")?.value || "",
      routing: $("seller-routing")?.value || "",
      swift: $("seller-bic")?.value || "",
      reference: $("invoice-number")?.value || ""
    },

    taxRate: $("tax-rate")?.value || "",
    items
  };

  return state;
}


  function resolveCountryCode(storedCountry) {
    if (!storedCountry) return "";

    // Already looks like an ISO 2-letter code?
    const trimmed = storedCountry.trim();
    if (/^[A-Za-z]{2}$/.test(trimmed)) {
      return trimmed.toUpperCase();
    }

    const normalized = trimmed.toLowerCase();

    // Try match by code or name from COUNTRIES list
    const match = COUNTRIES.find((c) => {
      return (
        c.code.toLowerCase() === normalized ||
        c.name.toLowerCase() === normalized
      );
    });

    return match ? match.code : "";
  }


function applyState(state) {
  if (!state) return;

  // Restore language first
  if (state.lang && LANGS[state.lang]) {
    currentLangKey = state.lang;
    const langSel = $("language-select");
    if (langSel) langSel.value = currentLangKey;
    applyLanguageSettings();
    applyTranslations();
    populateCountries();
    populateCurrencies();
  }

  // ----- Seller -----
  const s = state.seller || {};
  if ($("seller-name")) $("seller-name").value = s.name || "";
  if ($("seller-address")) $("seller-address").value = s.address || "";
  if ($("seller-country"))
    $("seller-country").value = resolveCountryCode(s.country) || "";
    
    if ($("seller-tax-id")) $("seller-tax-id").value = s.taxId || "";
	if ($("seller-reg")) $("seller-reg").value = s.reg || "";
    
  if ($("seller-ref")) $("seller-ref").value = s.ref || "";
  if ($("seller-email")) $("seller-email").value = s.email || "";
  if ($("seller-phone")) $("seller-phone").value = s.phone || "";
  if ($("seller-website")) $("seller-website").value = s.website || "";
  if ($("seller-iban")) $("seller-iban").value = s.iban || "";
  if ($("seller-account")) $("seller-account").value = s.account || "";
  if ($("seller-routing")) $("seller-routing").value = s.routing || "";
  if ($("seller-bic")) $("seller-bic").value = s.bic || "";

  // ----- Buyer -----
  const b = state.buyer || {};
  if ($("buyer-name")) $("buyer-name").value = b.name || "";
  if ($("buyer-address")) $("buyer-address").value = b.address || "";
  if ($("buyer-country"))
    $("buyer-country").value = resolveCountryCode(b.country) || "";
  if ($("buyer-tax-id")) $("buyer-tax-id").value = b.taxId || "";
  if ($("buyer-customer")) $("buyer-customer").value = b.customerNo || "";

  // ----- Invoice -----
  const inv = state.invoice || {};
  if ($("invoice-number")) $("invoice-number").value = inv.number || "";
  if ($("invoice-date")) $("invoice-date").value = inv.date || "";
  if ($("due-date")) $("due-date").value = inv.dueDate || "";
  if ($("currency-select")) $("currency-select").value = inv.currency || "";

  // ----- Payment -----
  const pay = state.payment || {};
  if ($("notes")) $("notes").value = pay.notes || "";
  if ($("reverse-charge"))
    $("reverse-charge").checked = !!pay.reverseCharge;
  if ($("qr-enabled"))
    $("qr-enabled").checked = !!pay.qrEnabled;

  if ($("tax-rate")) $("tax-rate").value = state.taxRate || "";

  // ----- Items -----
  const tbody = $("items-tbody");
  if (tbody) {
    tbody.innerHTML = "";
    (state.items || []).forEach((item) => createItemRow(item));
  }

  updateIbanStatus();
  recalcTotals();
}


  function initTemplates() {
    refreshTemplateSelect();
    const saveBtn = $("btn-save-template");
    const delBtn = $("btn-delete-template");
    const select = $("template-select");

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const name = prompt("Template name:");
        if (!name) return;
        const trimmed = name.trim();
        if (!trimmed) return;

        const templates = loadTemplatesFromStorage();
        templates[trimmed] = captureState();
        saveTemplatesToStorage(templates);
        refreshTemplateSelect();
        select.value = trimmed;
      });
    }

    if (delBtn) {
      delBtn.addEventListener("click", () => {
        const selName = select.value;
        if (!selName) return;
        if (!confirm(`Delete template "${selName}"?`)) return;
        const templates = loadTemplatesFromStorage();
        delete templates[selName];
        saveTemplatesToStorage(templates);
        refreshTemplateSelect();
      });
    }

    if (select) {
      select.addEventListener("change", () => {
        const name = select.value;
        if (!name) return;
        const templates = loadTemplatesFromStorage();
        if (templates[name]) applyState(templates[name]);
      });
    }
  }

let jsonHandlersInitialized = false;
  

  // ---------- JSON EXPORT / IMPORT ----------
function initJsonExportImport() {
  if (jsonHandlersInitialized) return;
  jsonHandlersInitialized = true;

  const exportBtn = $("btn-export-json");
  const importBtn = $("btn-import-json");
  const fileInput = $("json-file-input");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const state = captureState();
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice-data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  if (importBtn && fileInput) {
    importBtn.addEventListener("click", () => {
      fileInput.value = "";
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          applyState(data);
        } catch (err) {
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    });
  }
}


  // ---------- LOGO / SIGNATURE / STAMP PREVIEWS ----------
  function initImagePreview(inputId, imgId) {
    const input = $(inputId);
    const img = $(imgId);
    if (!input || !img) return;

    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) {
        img.style.display = "none";
        img.src = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
        img.style.display = "block";
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------- VALIDATION ----------
  function validateBeforePrint() {
    const errors = [];
    const t = getCurrentTranslations();

    function required(id, labelKey, fallbackLabel) {
      const el = $(id);
      if (!el) return;
      if (!el.value.trim()) {
        const labelText =
          (t && t[labelKey]) || fallbackLabel || id;

        const template =
          (t && t["error.required"]) || "{field} is required.";

        const message = template.replace("{field}", labelText);
        errors.push(message);
      }
    }

    // Seller required fields
    required("seller-name", "seller.name", "Seller name");
    required("seller-address", "seller.address", "Seller address");
    required("seller-country", "seller.country", "Seller country");

    // Buyer required fields
    required("buyer-name", "buyer.name", "Buyer name");
    required("buyer-address", "buyer.address", "Buyer address");
    required("buyer-country", "buyer.country", "Buyer country");

    // Bank details: IBAN or local account (or US routing+account)
    const iban = $("seller-iban").value.trim();
    const account = $("seller-account").value.trim();
    const routingEl = $("seller-routing");
    const routing = routingEl ? routingEl.value.trim() : "";

    if (!iban && !account && !routing) {
      errors.push(
        (t && t["error.ibanMissing"]) ||
          "IBAN or bank account (or US routing + account) must be entered."
      );
    }

    if (iban && validateIban(iban) === false) {
      errors.push(
        (t && t["error.ibanInvalid"]) ||
          "IBAN appears invalid."
      );
    }

    // At least one non-empty line item
    const items = getItemsFromDom();
    const hasNonZero = items.some(
      (it) => it.description || (it.quantity > 0 && it.unitPrice > 0)
    );
    if (!hasNonZero) {
      errors.push(
        (t && t["error.noItems"]) ||
          "At least one non-empty line item is required."
      );
    }

    if (errors.length) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  }


  // ---------- PRINT LAYOUT ----------
  function buildPrintInvoiceDom() {
    // Snapshot current state
    const state = captureState();
    const items = state.items || [];

    let printRoot = document.getElementById("print-invoice");
    if (printRoot) {
      printRoot.remove();
    }
    printRoot = document.createElement("div");
    printRoot.id = "print-invoice";
    document.body.appendChild(printRoot);

    const cfg = getCurrentLanguageConfig();
    const t =
      typeof getCurrentTranslations === "function"
        ? getCurrentTranslations()
        : null;

    const label = (key, fallback) => (t && t[key]) || fallback;
    
      // Helper: format dates according to language settings
	const fmtDate = (d) => formatDateForDisplay(d, cfg);


    const sellerLogoSrc = $("seller-logo-preview").src || "";
    const buyerLogoSrc = $("buyer-logo-preview").src || "";
const sigImg = $("signature-preview");
const stampImg = $("stamp-preview");

const hasSignature = sigImg && sigImg.style.display !== "none";
const hasStamp     = stampImg && stampImg.style.display !== "none";

const sigSrc = hasSignature ? sigImg.src : "";
const stampSrc = hasStamp ? stampImg.src : "";


    const hasPeriod = items.some((it) => it.periodFrom || it.periodTo);
    const hasUnit = items.some((it) => it.unit);

    const subtotal = $("subtotal-value").textContent || "0.00";
    const tax = $("tax-value").textContent || "0.00";
    const total = $("total-value").textContent || "0.00";

    const cur = state.invoice.currency || "";

    const reverseText =
      (t && t["payment.reverseChargeNote"]) ||
      "Reverse charge: VAT to be accounted by the recipient according to applicable regulations.";

    const html = [];

    html.push('<div class="inv-page">');

    // ===== HEADER (Seller / Buyer) =====
    html.push('<div class="inv-header">');

    // Seller
    html.push('<div class="inv-seller inv-block">');
    if (sellerLogoSrc) {
      html.push(
        `<div class="inv-logo"><img src="${sellerLogoSrc}" alt="Seller logo"></div>`
      );
    }
    const sellerTitle = label("section.seller", "Seller");
    html.push(`<h2>${escapeHtml(sellerTitle)}</h2>`);
    if (state.seller.name) {
      html.push(`<div>${escapeHtml(state.seller.name)}</div>`);
    }
    if (state.seller.address) {
      html.push(
        `<div>${escapeHtml(state.seller.address).replace(/\n/g, "<br>")}</div>`
      );
    }
    if (state.seller.country) {
      const cName = countryCodeToName(state.seller.country) || "";
      html.push(`<div>${escapeHtml(cName)}</div>`);
    }
    if (state.seller.taxId) {
      const vatLabel = label("seller.vatId", "VAT / Tax ID");
      html.push(
        `<div>${escapeHtml(vatLabel)}: ${escapeHtml(
          state.seller.taxId
        )}</div>`
      );
    }
if (state.seller.reg) {
  const regLabel = label("seller.regId", "Company registration / HRB");
  html.push(
    `<div>${escapeHtml(regLabel)}: ${escapeHtml(state.seller.reg)}</div>`
  );
}
if (state.seller.ref) {
  const refLabel = label("seller.reference", "Seller reference number");
  html.push(
    `<div>${escapeHtml(refLabel)}: ${escapeHtml(state.seller.ref)}</div>`
  );
}

    if (state.seller.email) {
      const emailLabel = label("seller.email", "Email");
      html.push(
        `<div>${escapeHtml(emailLabel)}: ${escapeHtml(
          state.seller.email
        )}</div>`
      );
    }
    if (state.seller.phone) {
      const phoneLabel = label("seller.phone", "Phone");
      html.push(
        `<div>${escapeHtml(phoneLabel)}: ${escapeHtml(
          state.seller.phone
        )}</div>`
      );
    }
    if (state.seller.website) {
      const webLabel = label("seller.website", "Website");
      html.push(
        `<div>${escapeHtml(webLabel)}: ${escapeHtml(
          state.seller.website
        )}</div>`
      );
    }
    html.push("</div>");

    // Buyer
    html.push('<div class="inv-buyer inv-block">');
    if (buyerLogoSrc) {
      html.push(
        `<div class="inv-logo"><img src="${buyerLogoSrc}" alt="Buyer logo"></div>`
      );
    }
    const buyerTitle = label("section.buyer", "Buyer");
    html.push(`<h2>${escapeHtml(buyerTitle)}</h2>`);
    if (state.buyer.name) {
      html.push(`<div>${escapeHtml(state.buyer.name)}</div>`);
    }
    if (state.buyer.address) {
      html.push(
        `<div>${escapeHtml(state.buyer.address).replace(
          /\n/g,
          "<br>"
        )}</div>`
      );
    }
    if (state.buyer.country) {
      const cName = countryCodeToName(state.buyer.country) || "";
      html.push(`<div>${escapeHtml(cName)}</div>`);
    }
    if (state.buyer.taxId) {
      const vatLabel = label("buyer.vatId", "VAT / Tax ID");
      html.push(
        `<div>${escapeHtml(vatLabel)}: ${escapeHtml(
          state.buyer.taxId
        )}</div>`
      );
    }
if (state.buyer.customerNo) {
  const custLabel = label("buyer.customerNumber", "Customer number");
  html.push(
    `<div>${escapeHtml(custLabel)}: ${escapeHtml(
      state.buyer.customerNo
    )}</div>`
  );
}



    html.push("</div>"); // .inv-buyer

    html.push("</div>"); // .inv-header

    // ===== INVOICE META =====
    html.push('<div class="inv-meta-row">');

    const invBlockTitle = label("section.invoice", "Invoice");
    html.push('<div class="inv-meta inv-block">');
    html.push(`<h2>${escapeHtml(invBlockTitle)}</h2>`);
    if (state.invoice.number) {
      const lbl = label("invoice.number", "Invoice number");
      html.push(
        `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
          state.invoice.number
        )}</div>`
      );
    }
    if (state.invoice.date) {
      const lbl = label("invoice.date", "Invoice date");
      const printedDate = fmtDate(state.invoice.date);
      html.push(
        `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
          printedDate
        )}</div>`
      );
    }
    if (state.invoice.dueDate) {
      const lbl = label("invoice.dueDate", "Due date");
      const printedDue = fmtDate(state.invoice.dueDate);
      html.push(
        `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
          printedDue
        )}</div>`
      );
    }
    if (state.invoice.currency) {
      const lbl = label("invoice.currency", "Currency");
      html.push(
        `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
          state.invoice.currency
        )}</div>`
      );
    }
    html.push("</div>"); // inv-meta

    html.push("</div>"); // inv-meta-row

    // ===== ITEMS TABLE =====
    html.push('<div class="inv-items inv-block">');

    const descHdr = label("items.description", "Description");
    const qtyHdr = label("items.quantity", "Quantity");
    const unitHdr = label("items.unit", "Unit");
    const fromHdr = label("items.periodFrom", "From");
    const toHdr = label("items.periodTo", "To");
    const unitPriceHdr = label("items.unitPrice", "Unit price (net)");
    const lineTotalHdr = label("items.lineTotal", "Amount (net)");

    html.push('<table class="inv-items-table">');
    html.push("<thead><tr>");
    html.push(`<th>${escapeHtml(descHdr)}</th>`);
    if (hasPeriod) {
      html.push(`<th>${escapeHtml(fromHdr)}</th>`);
      html.push(`<th>${escapeHtml(toHdr)}</th>`);
    }
    html.push(`<th>${escapeHtml(qtyHdr)}</th>`);
    if (hasUnit) {
      html.push(`<th>${escapeHtml(unitHdr)}</th>`);
    }
    html.push(`<th>${escapeHtml(unitPriceHdr)}</th>`);
    html.push(`<th>${escapeHtml(lineTotalHdr)}</th>`);
    html.push("</tr></thead>");
    html.push("<tbody>");

    items.forEach((item) => {
      const qty = item.quantity || 0;
      const up = item.unitPrice || 0;
      const lineTotal = qty * up;

      html.push("<tr>");
      html.push(
        `<td>${escapeHtml(item.description || "").replace(
          /\n/g,
          "<br>"
        )}</td>`
      );
      if (hasPeriod) {
        const fromPrint = item.periodFrom ? fmtDate(item.periodFrom) : "";
        const toPrint   = item.periodTo   ? fmtDate(item.periodTo)   : "";
        html.push(`<td>${escapeHtml(fromPrint)}</td>`);
        html.push(`<td>${escapeHtml(toPrint)}</td>`);
      }

      html.push(`<td>${qty || ""}</td>`);
      if (hasUnit) {
        html.push(`<td>${escapeHtml(item.unit || "")}</td>`);
      }
    html.push(`<td>${up ? formatDisplayNumber(up) : ""}</td>`);
    html.push(`<td>${lineTotal ? formatDisplayNumber(lineTotal) : ""}</td>`);

      html.push("</tr>");
    });

    html.push("</tbody></table>");
    html.push("</div>"); // inv-items

    // ===== TOTALS =====
    html.push('<div class="inv-totals-row">');
    html.push('<div class="inv-totals inv-block">');

const subtotalLbl = label("totals.subtotal", "Subtotal (net)");
const taxLblBase  = label("totals.tax", "VAT amount");
const totalLbl    = label("totals.total", "Total (gross)");

const taxRateStr = (state.taxRate || "").toString().trim();
const taxLbl = taxRateStr
  ? `${taxLblBase} (${taxRateStr}%)`
  : taxLblBase;

html.push(
  `<div class="inv-total-row">
     <span class="inv-total-label">
       <strong>${escapeHtml(subtotalLbl)}:</strong>
     </span>
     <span class="inv-total-value">
       ${escapeHtml(subtotal)} ${escapeHtml(cur)}
     </span>
   </div>`
);

html.push(
  `<div class="inv-total-row">
     <span class="inv-total-label">
       <strong>${escapeHtml(taxLbl)}:</strong>
     </span>
     <span class="inv-total-value">
       ${escapeHtml(tax)} ${escapeHtml(cur)}
     </span>
   </div>`
);

html.push(
  `<div class="inv-total-row">
     <span class="inv-total-label">
       <strong>${escapeHtml(totalLbl)}:</strong>
     </span>
     <span class="inv-total-value">
       ${escapeHtml(total)} ${escapeHtml(cur)}
     </span>
   </div>`
);

    if (state.payment.reverseCharge) {
      html.push(
        `<div class="inv-reverse-charge">${escapeHtml(reverseText)}</div>`
      );
    }

    html.push("</div>"); // inv-totals
    html.push("</div>"); // inv-totals-row

    // ===== PAYMENT DETAILS + QR =====
    const pay = state.payment || {};
    const hasAnyPaymentField =
      pay.iban ||
      pay.account ||
      pay.swift ||
      pay.routing ||
      pay.reference ||
      pay.notes;

    if (hasAnyPaymentField) {
      html.push('<div class="inv-payment inv-block">');

      const payTitle = label("section.payment", "Payment details");
      html.push(`<h2>${escapeHtml(payTitle)}</h2>`);

      if (pay.iban) {
        const lbl = label("payment.iban", "IBAN");
        html.push(
          `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
            pay.iban
          )}</div>`
        );
      }
      if (pay.account) {
        const lbl = label("payment.account", "Bank account");
        html.push(
          `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
            pay.account
          )}</div>`
        );
      }
// only show routing number on print if the current language supports US bank fields
if (cfg && cfg.settings && cfg.settings.showUsBankFields && pay.routing) {
  const lbl = label("payment.routing", "Routing number");
  html.push(
    `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
      pay.routing
    )}</div>`
  );
}

      if (pay.swift) {
        const lbl = label("payment.swift", "SWIFT / BIC");
        html.push(
          `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
            pay.swift
          )}</div>`
        );
      }
      if (pay.reference) {
        const lbl = label("payment.reference", "Payment reference");
        html.push(
          `<div><strong>${escapeHtml(lbl)}:</strong> ${escapeHtml(
            pay.reference
          )}</div>`
        );
      }
      if (pay.notes) {
        const lbl = label("payment.notes", "Notes");
        html.push(
          `<div><strong>${escapeHtml(lbl)}:</strong><br>${escapeHtml(
            pay.notes
          ).replace(/\n/g, "<br>")}</div>`
        );
      }

      // QR (if enabled)
      if (pay.qrEnabled) {
        const qrLabel = label(
          "payment.qrLabel",
          "Payment QR (scan to prefill payment)"
        );
const qrHelp = label(
  "payment.qrHint",
  "Scan to prefill payment: IBAN/account, amount, currency and invoice number."
);


        html.push('<div class="inv-qr-wrapper">');
        html.push(
          `<div class="inv-qr-label">${escapeHtml(qrLabel)}</div>`
        );
        // Simple container div for print QR
        html.push('<div id="print-qr"></div>');
        html.push(
          `<div class="inv-qr-help">${escapeHtml(qrHelp)}</div>`
        );
        html.push("</div>");
      }

      html.push("</div>"); // inv-payment
    }

    // ===== FOOTER (SIGNATURE / STAMP) =====
if (hasSignature || hasStamp) {
  html.push('<div class="inv-footer inv-block">');

  if (hasSignature) {
    // Reuse existing, fully translated label
    const sigLabel = label("sign.author", "Author / Signature");
    html.push(
      `<div class="inv-signature-block"><div>${escapeHtml(
        sigLabel
      )}</div><img src="${sigSrc}" alt="Signature"></div>`
    );
  }

  if (hasStamp) {
    // For now, simple English label; can be localized later if you care
    const stampLabel = "Stamp";
    html.push(
      `<div class="inv-stamp-block"><div>${escapeHtml(
        stampLabel
      )}</div><img src="${stampSrc}" alt="Stamp"></div>`
    );
  }

  html.push("</div>");
}



    html.push("</div>"); // .inv-page

    // Inject HTML into DOM
    printRoot.innerHTML = html.join("");

    // Render QR into print container if enabled and we have data
    if (pay.qrEnabled && typeof QRCode !== "undefined" && lastQrData) {
      const printQrContainer = document.getElementById("print-qr");
      if (printQrContainer) {
        // Clear in case of multiple prints
        printQrContainer.innerHTML = "";
        new QRCode(printQrContainer, {
          text: lastQrData,
          width: 120,
          height: 120
        });
      }
    }
  }






  function countryCodeToName(code) {
    const c = COUNTRIES.find((c) => c.code === code);
    return c ? c.name : code;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

function resetForm() {
  // Text and textarea fields
  const textIds = [
    "seller-name", "seller-address", "seller-tax-id", "seller-reg",
    "seller-ref", "seller-email", "seller-phone", "seller-website",
    "seller-iban", "seller-account", "seller-routing", "seller-bic",
    "buyer-name", "buyer-address", "buyer-tax-id", "buyer-customer",
    "invoice-number", "invoice-date", "perf-from", "perf-to",
    "due-date", "tax-rate", "notes"
  ];

  textIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Selects
  ["seller-country", "buyer-country", "currency-select"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Checkboxes & related text
  const rcCheckbox = document.getElementById("reverse-charge");
  const rcText = document.getElementById("reverse-charge-text");
  const qrEnabled = document.getElementById("qr-enabled");

  if (rcCheckbox) rcCheckbox.checked = false;
  if (rcText) rcText.style.display = "none";
  if (qrEnabled) qrEnabled.checked = false;
  storedTaxRateBeforeReverse = null;

  // IBAN status
  const ibanStatus = document.getElementById("iban-status");
  if (ibanStatus) {
    ibanStatus.textContent = "";
    ibanStatus.style.color = "";
  }

  // Images (logos, signature, stamp)
  function clearImage(inputId, imgId) {
    const input = document.getElementById(inputId);
    const img = document.getElementById(imgId);
    if (input) input.value = "";
    if (img) {
      img.src = "";
      img.style.display = "none";
    }
  }
  clearImage("seller-logo", "seller-logo-preview");
  clearImage("buyer-logo", "buyer-logo-preview");
  clearImage("signature-file", "signature-preview");
  clearImage("stamp-file", "stamp-preview");

  // Line items → reset to one empty row
  const tbody = document.getElementById("items-tbody");
  if (tbody) {
    tbody.innerHTML = "";
    createItemRow();
  }

  // QR widget on screen
  const qrWrapper = document.getElementById("qr-wrapper");
  const qrContainer = document.getElementById("qr-code");
  if (qrWrapper && qrContainer) {
    qrWrapper.style.display = "none";
    qrContainer.innerHTML = "";
    qrInstance = null;
    lastQrData = "";
  }

  // Re-apply language-specific visibility (IBAN vs US routing, etc.)
  applyLanguageSettings();
  applyTranslations();
  populateCountries();
  populateCurrencies();

  // Recalculate totals
  recalcTotals();
}

function applyDefaultSellerCountryIfEmpty(langKey) {
  const sellerCountry = $("seller-country");
  if (!sellerCountry) return;

  if (!sellerCountry.value) {
    const defCountry = LANG_DEFAULT_COUNTRY[langKey || currentLangKey];
    if (defCountry) {
      // Only prefill country for convenience; VAT stays fully manual.
      sellerCountry.value = defCountry;
    }
  }
}



  // ---------- INIT ----------
  function init() {
    populateLanguageSelect();
    populateCountries();
    populateCurrencies();
    applyLanguageSettings();
    applyTranslations();
        // Smart prefill: default seller country based on language (if empty)
    applyAppTitleI18n();     // ← ADD THIS LINE
    applyDefaultSellerCountryIfEmpty(currentLangKey);



    // Add one empty row
    createItemRow();

    // Theme toggle
    initThemeToggle();

    // Items add
    const addItemBtn = $("btn-add-item");
    if (addItemBtn) {
      addItemBtn.addEventListener("click", () => createItemRow());
    }

// Language change
const langSel = $("language-select");
if (langSel) {
  langSel.addEventListener("change", () => {
    currentLangKey = langSel.value;

    const sellerCountry  = $("seller-country");
    const buyerCountry   = $("buyer-country");
    const currencySelect = $("currency-select");

    const prevBuyerCountry = buyerCountry ? buyerCountry.value : "";
    const prevCurrency     = currencySelect ? currencySelect.value : "";

    // Apply language settings + texts
    applyLanguageSettings();
    applyTranslations();
    updateIbanStatus();

    // Rebuild dropdowns so placeholders / localized labels update
    populateCountries();
    populateCurrencies();

    // --- Seller country follows language preset (if any) ---
    if (sellerCountry) {
      const defCountry = LANG_DEFAULT_COUNTRY[currentLangKey] || "";
      if (defCountry) {
        // For languages with a defined default, always snap to that default
        sellerCountry.value = defCountry;
      }
      // For languages without a default (en_intl, de_de, bhs),
      // do nothing: whatever was selected stays as-is.
    }

    // Buyer country: keep user choice
    if (buyerCountry && prevBuyerCountry) {
      buyerCountry.value = prevBuyerCountry;
    }

    // Currency: keep user choice
    if (currencySelect && prevCurrency) {
      currencySelect.value = prevCurrency;
    }

    recalcTotals();
    
        // If documentation modal is open, rebuild its content for the new language
    const docModal = $("doc-modal");
    if (docModal && docModal.classList.contains("is-visible")) {
      buildDocModalContents();
    }
  });
}



    // Tax rate: clear on focus if default-ish
    const taxRateInput = $("tax-rate");
    if (taxRateInput) {
      taxRateInput.addEventListener("focus", () => {
        if (
          taxRateInput.value === "0" ||
          taxRateInput.value === "0.0" ||
          taxRateInput.value === "0.00"
        ) {
          taxRateInput.value = "";
        }
      });
      taxRateInput.addEventListener("input", recalcTotals);


  // Allow only digits, comma and dot
  attachNumericFilter(taxRateInput);
    }

    // Currency change should update QR
    const currencySelect = $("currency-select");
    if (currencySelect) {
      currencySelect.addEventListener("change", recalcTotals);
    }

    // Reverse charge: zero VAT rate while active
    const rcCheckbox = $("reverse-charge");
    const rcText = $("reverse-charge-text");
    if (rcCheckbox && rcText) {
      rcCheckbox.addEventListener("change", () => {
        const taxRateInput = $("tax-rate");

        if (rcCheckbox.checked) {
          rcText.style.display = "block";

          if (taxRateInput) {
            // Remember previous rate (if any)
            const raw = (taxRateInput.value || "").replace(",", ".");
            const prev = parseFloat(raw);
            storedTaxRateBeforeReverse = isNaN(prev) ? null : prev;

            // Force VAT 0 and lock the field
            taxRateInput.value = "0";
            taxRateInput.disabled = true;
          }
        } else {
          rcText.style.display = "none";

          if (taxRateInput) {
            // Restore previous rate if we had one
            if (storedTaxRateBeforeReverse != null) {
              taxRateInput.value = String(storedTaxRateBeforeReverse);
            }
            taxRateInput.disabled = false;
          }
        }

        recalcTotals();
      });
    }


    // QR enabled
    const qrEnabled = $("qr-enabled");
    if (qrEnabled) {
      qrEnabled.addEventListener("change", () => {
        generateOrUpdateQr();
      });
    }

    // IBAN validation
    const ibanInput = $("seller-iban");
    if (ibanInput) {
      ibanInput.addEventListener("input", updateIbanStatus);
      ibanInput.addEventListener("blur", updateIbanStatus);
    }

    // Logo / signature / stamp previews
    initImagePreview("seller-logo", "seller-logo-preview");
    initImagePreview("buyer-logo", "buyer-logo-preview");
    initImagePreview("signature-file", "signature-preview");
    initImagePreview("stamp-file", "stamp-preview");

    // Templates
    initTemplates();

    // JSON export/import
    initJsonExportImport();

    // Documentation modal
    initDocModal();

    // Recalculate totals on startup
    recalcTotals();

    // Print button
    const printBtn = $("btn-print");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        if (!validateBeforePrint()) return;
        // Ensure totals and QR up to date
        recalcTotals();
        generateOrUpdateQr();
        buildPrintInvoiceDom();
        window.print();
      });
    }
    
  // Reset form button
  const resetBtn = document.getElementById("btn-reset-form");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const t = getCurrentTranslations();
      const msg =
        (t && t["confirm.reset"]) ||
        "Clear all invoice data?";
      if (confirm(msg)) {
        resetForm();
      }
    });
  }

  }

  document.addEventListener("DOMContentLoaded", init);
})();
