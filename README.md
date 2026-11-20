# Zakeer — Developer Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. No build step or frontend framework is required.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example, from this directory run:

```sh
npx serve .
```

The site can be deployed as-is to GitHub Pages, Netlify, or Vercel.

## Make it yours

- Replace the sample name, biography, location, education, and experience in `index.html`.
- Replace the portrait URL and project concepts with your own images and work.
- Update social profile URLs, email address, project demo/repository links, and resume details. The included `assets/Zakeer-Resume.txt` is an editable sample.
- The project links currently point to example resources; use URLs for your actual demos and repositories before publishing.

## Contact form

The form performs client-side validation only. It does **not** send or store submissions. To receive messages, connect it to a backend endpoint or an email form service and update the submit handler in `js/script.js`.

## Notes

- Google Fonts are loaded remotely; the site falls back to system sans-serif fonts if they are unavailable.
- The portrait image is served by Unsplash and requires an internet connection.
- Reduced-motion preferences, keyboard navigation, and a mobile menu are supported.
