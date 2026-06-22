# Sunever Fashion Website

A responsive bilingual corporate website for Sunever Fashion.

## Preview

Open `index.html` directly in a browser, or run any static file server in this directory.

## Replace Content

- Logo: replace the `.logo-placeholder` elements in `index.html` with an `<img>`.
- Hero, product and office photos: replace each `.image-placeholder` element with an `<img>` while keeping its surrounding class name where applicable.
- Contact details: search for `contact@suneverfashion.com`, `wa.me`, `SuneverFashion`, and the social links in `index.html`.
- Inquiry form: the current form is a front-end demonstration. Connect it to an email service, CRM, or server endpoint before publishing.
- Live chat: the included UI runs in demo mode and syncs across tabs. To connect a real-time service, set `window.SUNEVER_CHAT_ENDPOINT` to your secure WebSocket (`wss://`) URL before `script.js` loads. The service should accept and return JSON messages shaped like `{ id, sender, text, timestamp }`.
- Languages: add or edit text in the `translations` object in `script.js`.
