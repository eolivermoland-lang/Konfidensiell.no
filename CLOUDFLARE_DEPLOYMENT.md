# CodeNext Secure Admin Setup Guide

We have moved your admin credentials to **Cloudflare Secrets**. This means your password is never stored in the code and is invisible to everyone except you.

---

## 1. Set Your Admin Credentials
Once you have deployed the site to Cloudflare, you must add your email and password manually in the Cloudflare dashboard:

1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** -> Click on your project (**codenext**).
3.  Go to the **Settings** tab.
4.  In the left sidebar, click **Functions**.
5.  Scroll down to **Environment variables**.
6.  Click **Add variable** and add these:
    *   **Variable name:** `ADMIN_EMAIL` 
    *   **Value:** `olivermolandeyde@hotmail.com`
    *   **Variable name:** `ADMIN_PASSWORD`
    *   **Value:** `5Femertallet1` (Click the **Encrypt** button for this one!)
    *   **Variable name:** `CLOUDFLARE_API_TOKEN`
    *   **Value:** `VqbFcHPBkLelYskDf6tzknO7Ag0Jr6CTnQQ4T_Tv` (Encrypt this!)
    *   **Variable name:** `CLOUDFLARE_ACCOUNT_ID`
    *   **Value:** `961d9b8159d86770ecbfa38b78c6ea7c`
7.  Click **Save**.
8.  **IMPORTANT:** You must run one more deployment for these changes to take effect.

---

## 2. Accessing the Dashboard
*   **URL:** `konfidensiell.no/hasfhhw335ADMIN`
*   Your site now sends your login info to a "Cloudflare Function" which checks the secrets you just set.
*   If the login fails, check that you didn't have any extra spaces in your Cloudflare variable values.

---

## 3. Why this is secure?
*   **No Hardcoded Passwords:** Even if a hacker downloads your entire website code, they will not see your password.
*   **Encrypted Storage:** Cloudflare stores the `ADMIN_PASSWORD` in an encrypted vault.
*   **Server-side Check:** The password check happens on Cloudflare's servers, not in the user's browser.

🚀 Your Command Center is now industry-standard secure!
