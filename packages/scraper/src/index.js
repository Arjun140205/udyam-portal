import fs from "fs";
import path from "path";
import playwright from "playwright";
import * as cheerio from "cheerio";

function saveFields(pageHtml, stepNumber, fileName) {
  const $ = cheerio.load(pageHtml);
  const fields = [];

  $("label").each((_, el) => {
    const label = $(el).text().trim();
    const forAttr = $(el).attr("for");

    if (forAttr) {
      const inputEl = $(`#${forAttr}`);
      if (inputEl.length) {
        fields.push({
          key: inputEl.attr("name") || forAttr,
          label,
          type: inputEl.attr("type") || inputEl.prop("tagName").toLowerCase(),
          value: inputEl.val() || null, // capture filled value
          required: !!inputEl.attr("required"),
          pattern: inputEl.attr("pattern") || null,
          placeholder: inputEl.attr("placeholder") || null,
          maxLength: inputEl.attr("maxlength") || null,
        });
      }
    }
  });

  const output = {
    title: `Udyam Registration - Step ${stepNumber}`,
    fields,
  };

  const filePath = path.join("data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log(`✅ Saved ${filePath}`);
}

(async () => {
  const browser = await playwright.chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log("Opening Udyam registration page...");
  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
    waitUntil: "domcontentloaded",
  });

  // STEP 1: Aadhaar form scrape
  console.log("\n--- Scraping Step 1 ---");
  saveFields(await page.content(), 1, "step1.json");

  console.log("\n--- MANUAL ACTION REQUIRED: STEP 1 ---");
  console.log("You have 60 seconds to:");
  console.log("1. Enter Aadhaar details");
  console.log("2. Tick Declaration");
  console.log("3. Click 'Validate / Generate OTP'");
  console.log("4. Enter OTP to reach Step 2\n");

  // Wait for Step 2 PAN field or timeout
  const panSelector = "#ctl00_ContentPlaceHolder1_txtPanNo";
  try {
    await Promise.race([
      page.waitForSelector(panSelector, { timeout: 60000 }),
      new Promise(resolve => setTimeout(resolve, 60000)),
    ]);
  } catch (err) {
    console.log("⚠ PAN field not detected in Step 2 within 1 minute");
  }

  // STEP 2: PAN form scrape before validation
  console.log("\n--- Scraping Step 2 (Before PAN Validation) ---");
  saveFields(await page.content(), 2, "step2_before_pan.json");

  console.log("\n--- MANUAL ACTION REQUIRED: STEP 2 PAN VALIDATION ---");
  console.log("You have 60 seconds to:");
  console.log("1. Enter PAN details");
  console.log("2. Click 'Validate PAN'");
  console.log("3. Wait for name/DOB fields to be populated\n");

  // Wait for PAN name field to have a value or timeout
  const panNameSelector = "#ctl00_ContentPlaceHolder1_txtNameAsPerPan";
  try {
    await Promise.race([
      page.waitForFunction(
        sel => document.querySelector(sel)?.value?.trim().length > 0,
        panNameSelector,
        { timeout: 60000 }
      ),
      new Promise(resolve => setTimeout(resolve, 60000)),
    ]);
  } catch (err) {
    console.log("⚠ PAN name field not populated within 1 minute");
  }

  // STEP 2: PAN form scrape after validation
  console.log("\n--- Scraping Step 2 (After PAN Validation) ---");
  saveFields(await page.content(), 2, "step2_after_pan.json");

  await browser.close();
})();