// tests/learning/forms/forms_actions.spec.ts
import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill and pressSequentially", async ({ page }) => {
    const nameInput = page.locator("#name");

    await nameInput.fill("START");
    await nameInput.fill("END"); // ? Fill přepíše původní text "START"
    await nameInput.pressSequentially("Kde toto bude?"); // ? Simulace klávesnice, nemaže hodnotu v poli

    // * Vymazání hodnoty z pole a vyplnění postupně s rozestupem: 500 ms
    await nameInput.clear();
    await nameInput.pressSequentially("Píšeme pomalu", {
      delay: 500,
      timeout: 10_000,
    });
  });

  test("Select", async ({ page }) => {
    const genderSelect = page.locator("#gender");
    await genderSelect.selectOption("female"); // ? Výběr prvku <option> z <select> pomocí atributu value: <option value="female">
    await genderSelect.selectOption({ label: "Male" }); // ? Výběr prvku <option> z <select> pomocí textu: <option>Male</option>
  });

  test("Check, uncheck", async ({ page }) => {
    // ? Radio button
    await page.locator("#contact-email").check();

    // ? Checkbox - zakliknutí/odkliknutí
    await page.locator("#interests-music").check();
    await page.locator("#interests-sports").check();
    await page.locator("#interests-sports").uncheck();
  });

  test("Date fill (ISO 8601)", async ({ page }) => {
    await page.locator("#date-of-birth").fill("1990-02-28");
  });

  test("File Upload", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../../../assets/upload_file.txt"); // ? Identifikace souboru pomocí cesty pro TS
    // require("../../../assets/upload_file.txt"); // ? require slouží pouze proto, aby nám pomohl připravit cestu (napovídá), path.resolve nenapovídá a je v něm složitější cestu vytvořit.
    // * Zapneme listenera (odchytávač) na událost vybrání souboru (filechooser) -> toto je asynchronní akce, NESMÍME před ni dát await (chceme aby listener poslouchal, ale nečekal)
    const fileChooserPromise = page.waitForEvent("filechooser"); // ? do const uložíme odkaz na listenara, abychom se po kliknutí na input type="file" mohli odkázat na výběr souboru
    // * Klikneme na tlačítko pro nahrání souboru (input type="file")
    await page.locator("#file-upload").click();
    // * Počkáme, než listener fileChooserPromise odchytí otevření okna pro výběr okna a uložíme výsledek (odchycené okno) do proměnné (abychom mohli následně vložit soubor)
    const fileChooser = await fileChooserPromise;
    // * Nahrajeme soubor pomocí proměnné filePath, kterou máme nachystanou z předchozích kroků
    await fileChooser.setFiles(filePath);
    // * Počkáme několik sekund, abychom v screenshotu viděli soubor vybraný
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(2000); // ! V reálu toto nepoužíváme, používáme kvůli tomu, abychom si mohli ukázat výsledek.
  });
});
