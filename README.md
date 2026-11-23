# Dana Wu — Editorial Portfolio Website

This is the **publish-ready, editable website prototype** based on the approved Home, About Me, My Work, and Contact page mockups. It includes the champagne-and-blush pearlescent background, orchids, serif editorial typography, an interactive 3D Polaroid carousel and mobile navigation. **The runway opening intro is removed from this edition**: visitors arrive directly on the homepage.

## 1. Open the website

1. Unzip the downloaded file. **Keep all the files together.**
2. Open **`index.html`** in a browser (Chrome, Edge or Safari).
3. Your homepage opens immediately—there is no runway intro, skip screen or replay button.
4. Use the top navigation or the rotating Polaroids to explore the pages. The carousel rotates every five seconds and pauses while you interact with it.

You can use and preview this site locally without hosting it. Google Fonts will load when you have an internet connection; serif fallback fonts appear if you're offline.

## 2. Edit your writing without coding

1. On the page you want to change, click **✎ EDIT TEXT** at the bottom-right.
2. Click the outlined editable words and type your own content.
3. Your draft saves locally in your browser.
4. Click **↓ SAVE PAGE FILE** to download that page's updated HTML. Replace the original `about.html`, `work.html`, or `contact.html` file with the downloaded one before publishing. **Changes saved only in your browser do not automatically publish to the website.**

For more advanced changes, open the `.html` or `styles.css` files in a text editor such as VS Code. Comments in the code mark the relevant sections.

## 3. Add pictures and projects

- **About Me:** Click **ADD YOUR PHOTO** in the Polaroid. After selecting a photograph, click **SAVE PAGE FILE** to save the photo into a new `about.html` file that you can publish. Alternatively, put your image at `assets/about-photo.jpg`.
- **Home carousel:** The three Polaroid photo spaces are intentionally blank, as requested. To fill them later, change the `.orbit-photo` background in `styles.css` or use CSS image backgrounds on each card.
- **Work:** The Photography, Advertising Creative, Writing and Digital Story cards open dedicated sections for your projects. Each section includes three editable project titles/descriptions and optional image slots. To fill an image slot, place a JPG under `assets/` with the name `photography-1.jpg`, `advertising-creative-2.jpg`, `writing-3.jpg`, etc. The final number corresponds to the project slot.
- The **Inspiration(s)** link leads to an editable inspiration page within the Work section.

## 4. Connect your email and LinkedIn

Open **`site-config.js`** and fill in:

```js
contactEmail: "you@example.com",
linkedInUrl: "https://www.linkedin.com/in/your-profile/",
```

The Contact form uses `mailto:`: after a visitor completes the form, clicking **SEND MESSAGE** opens their email application with a prefilled email. The visitor must press Send in their email app. **The website does not send or store contact messages on its own**; you'd need a hosted form service or backend for that.

Without your contact details, the links display informative placeholder messages rather than pretending a message was sent.

## 5. Runway intro is disabled for this publishable version

The opening animation, storyboard frames and skip/replay controls have been removed. You can restore them later from the original website ZIP when you are ready to add a finished runway video. The background artwork and homepage Polaroid carousel remain unchanged.

## 6. Publish on GitHub Pages

1. Create a GitHub repository for the portfolio.
2. Upload the **contents of this unzipped folder** into the repository root (not an extra nested folder).
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Visit the GitHub Pages URL listed in the Pages settings once deployment is available.
5. Later, you can connect a custom domain through GitHub Pages and your domain provider.

All four pages link to each other using relative paths, so they work on GitHub Pages as well as locally.

## What's included

`index.html` — Home, 3D rotating Polaroids, no opening intro  
`about.html` — About Me, editable introduction, photo slot, interests  
`work.html` — Four work categories, project placeholders, Inspiration(s)  
`contact.html` — Editorial Contact page, email form and LinkedIn  
`styles.css` — Design, colors, layout, transitions, responsive styles  
`script.js` — Navigation, carousel animation, editing controls and form behavior  
`site-config.js` — Contact and LinkedIn configuration  
`assets/` — Local background and organza artwork

This is a **ready-to-preview and editable static website prototype**, not a live published URL. Your final project media and contact information can be integrated as you create them. The removed intro can be restored from the previous version if you decide to use it later.

## Readability update — November 2026

The original Vogue-inspired serif font is preserved, but headings, navigation, descriptions, labels and form controls use stronger weights and clearer spacing across all four pages. The runway intro remains removed and the carousel/background art are unchanged.

**To update your existing GitHub Pages site:** Upload the revised `styles.css` and all four revised `.html` files to the root of the existing `danaawu.github.io` repository. Confirm the overwrite/commit if prompted. You do not need to re-upload `assets`, `script.js` or `site-config.js` because they have not changed. Refresh your published website with Ctrl+Shift+R to see the new typography.
