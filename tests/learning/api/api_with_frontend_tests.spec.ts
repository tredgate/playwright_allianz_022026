import { test, expect } from "@playwright/test";

test.describe("Frontend with API Tests", () => {
  test("Login API Check", async ({ page }) => {
    const username = "allianz_user";
    const password = "AllianzPlaywright";

    await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
    await page.locator('[data-testid="username-input"]').fill(username);
    await page.locator('[data-testid="password-input"]').fill(password);
    const loginResponsePromise = page.waitForResponse(/\/tegb\/login/); // ? Zapnutí čekání (asynchronní) na response -> bez await jede test dál -> klik na tlačítko přihlásit se
    await page.locator('[data-testid="submit-button"]').click();
    const loginResponse = await loginResponsePromise; // ? Čekání na dokončení waitForResponse (synchronizace)

    // * Kontrola Request části API callu. Zkontrolujeme URL, metodu a body
    const loginRequest = loginResponse.request();
    expect(loginRequest.url(), "Login Request has correct URL").toBe(
      "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    );
    expect(loginRequest.method(), "Login Request Method is 'POST'").toBe(
      "POST",
    );

    const loginRequestBody = await loginRequest.postDataJSON();
    expect(
      loginRequestBody.username,
      "loginRequestBody.username has correct value",
    ).toBe(username);
    expect(
      loginRequestBody.password,
      "loginRequestBody.password has correct value",
    ).toBe(password);

    // * Kontrola Response části API. Zkontrolujeme status, body
    expect(loginResponse.status(), "Login Response have 201 status").toBe(201);
    const loginResponseBody = await loginResponse.json();
    expect(
      loginResponseBody.access_token,
      "loginResponseBody.access_token is defined",
    ).toBeDefined();
  });
});
