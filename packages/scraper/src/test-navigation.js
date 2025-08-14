import playwright from "playwright";

(async () => {
  const browser = await playwright.chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log("Opening Udyam registration page...");
  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
    waitUntil: "domcontentloaded",
  });

  // Fill Aadhaar Number (dummy)
  await page.fill("#ctl00_ContentPlaceHolder1_txtadharno", "123456789012");

  // Fill Name (dummy)
  await page.fill("#ctl00_ContentPlaceHolder1_txtownername", "Test User");

  // Tick Declaration Checkbox
  await page.check("#ctl00_ContentPlaceHolder1_chkDecarationA");

  // Click on "Validate / Generate OTP"
  await page.click("#ctl00_ContentPlaceHolder1_btnValidateAadhaar");

  console.log("Waiting to see if Step 2 loads...");
  await page.waitForTimeout(5000);

  const step2Exists = await page.$("#divStep2"); // adjust if needed
  if (step2Exists) {
    console.log("✅ Step 2 form found!");
  } else {
    console.log("❌ Step 2 form not found. Likely needs valid OTP.");
  }

  await browser.close();
})();