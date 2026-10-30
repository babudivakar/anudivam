Warning: truncated output (original token count: 525)
Total output lines: 29

# AnuDivam wedding invitation

A mobile-first, single-page wedding invitation for Anusha Reddy and Divakar Reddy, built with React, Vite and Motion for React. The temple entrance, door carvings, deepam lamps, floral borders and mandap are original CSS/SVG artwork. No RSVP, backend or database is included.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. Netlify publishes the generated `dist` folder; the included `netlify.toml` provides the build command, publish folder and SPA fallback.

## Personalise the invitation

All changeable wedding details live in [`src/data/wedding.js`](src/data/wedding.js), separate from the presentation components in `src/App.jsx`.

- Replace the date, Muhurtham, family names, venue names, addresses and message placeholders.
- Add portrait paths to `photos.bride` and `photos.groom`. Put optimised portrait files in `public/images/`; portrait images are lazy-loaded.
- Set `countdownDate` to an ISO date-time w…25 tokens truncated…ionVenue.mapQuery` to the venue name/address or a Google Maps URL. The map links appear once a real query is set.
- To offer instrumental music, add a licensed audio file under `public/audio/` and set `musicTrack` to its public path. Playback starts only after a visitor presses the music control.
- Only ceremonies listed in `ceremonies` are rendered. Add an entry for Haldi, Mehendi, Sangeet or Pelli Kuthuru when the details are confirmed. Supported illustration styles are `haldi`, `mehendi`, `sangeet`, `pelli`, `wedding` and `reception`.

The WhatsApp share action uses the native share sheet when the device supports it; otherwise it copies a message with the invitation URL, or opens WhatsApp as a fallback.

## Deploy on Netlify

Connect the `babudivakar/anudivam` GitHub repository to Netlify and use the detected settings from `netlify.toml` (`npm run build`, publish `dist`). Pushes to the configured production branch will rebuild the static site. No environment variables are required.
