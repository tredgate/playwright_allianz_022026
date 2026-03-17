import { expect, test } from "@playwright/test";

test.describe("Frontend with API Tests", () => {
  test("Login API Check", async ({ page }) => {
    const username = "allianz_user";
    const password = "AllianzPlaywright";
    await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
    await page.locator('[data-testid="username-input"]').fill(username);
    await page.locator('[data-testid="password-input"]').fill(password);
    const loginResponsePromise = page.waitForResponse(/\/tegb\/login/); // ? Využití Regex pro zachycení URL, která obsahuje /auth/login
    await page.locator('button[data-testid="submit-button"]').click();
    const loginResponse = await loginResponsePromise;
    // ? Odhlásit se můžeme hned nebo až po kontrole API, záleží na tom, co chceme testovat. V našem příkladu to se odhlásime ihned, protože chceme otestovat pouze login API.
    await page.locator('[data-testid="logout-button"]').click();

    const loginApiRequest = loginResponse.request();

    // ? Kontrola requestu, jeho url a metody
    const requestUrl = loginApiRequest.url();
    expect(requestUrl).toContain("/tegb/login");
    const requestMethod = loginApiRequest.method();
    expect(requestMethod).toBe("POST");

    // ? Kontrola requestu, jeho body
    const requestBody = await loginApiRequest.postDataJSON();
    expect(requestBody.username).toBe(username);
    expect(requestBody.password).toBe(password);

    // ? Kontrola response, statusu a body
    const responseStatus = loginResponse.status();
    expect(responseStatus).toBe(201);
    const responseBody = await loginResponse.json();
    expect(responseBody.access_token).toBeDefined();
    expect(typeof responseBody.access_token).toBe("string");
  });
});
