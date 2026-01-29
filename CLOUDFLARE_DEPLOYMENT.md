# CodeNext Deployment & Setup Guide

This guide covers how to take your website from localhost to a live domain on **Cloudflare Pages**.

---

## 1. Contact System (Direct Email)
We have simplified the contact system. Instead of a complex form, we use a high-performance **Direct Email** button.
*   The button automatically opens the visitor's default mail client (Outlook, Gmail, Apple Mail, etc.).
*   The recipient address is already set to `support@konfidensiell.no`.
*   This is the most reliable way to ensure you receive messages without worrying about spam filters or API limits.

---

## 2. Deploy to Cloudflare Pages
Cloudflare Pages is the best place for this React site. It is fast, secure, and free.

1.  **Push to GitHub:**
    *   Create a private or public repository on GitHub.
    *   Push your `CodeNext` folder code to that repository.
2.  **Connect to Cloudflare:**
    *   Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
    *   Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
    *   Select your GitHub repository.
3.  **Build Settings:**
    *   **Framework preset:** `Vite`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
4.  **Deploy:** Click "Save and Deploy". Your site will be live at `something.pages.dev`.

---

## 3. Connect Your Domain
1.  In your Cloudflare Pages project, go to the **Custom domains** tab.
2.  Click **Set up a custom domain**.
3.  Enter your domain (e.g., `codenext.no` or your specific domain).
4.  Cloudflare will automatically configure the DNS records for you.

---

## 4. Final Checklist for Launch
- [ ] Replaced the "CodeNextLogo.png" with your final high-res logo in `public/`.
- [ ] Tested the "Open Mail Client" button on a mobile device and desktop.
- [ ] Verified that the "Check My IP" tool works on the live URL.
- [ ] Ensure SSL is active (Cloudflare does this automatically).

**Support:** If you run into issues, check the `src/App.jsx` routing or contact the Cloudflare community.