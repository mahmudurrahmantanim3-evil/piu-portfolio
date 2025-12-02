Sorry Rain Overlay

What was added:
- A CSS & JS overlay to animate the word "sorry" falling in a rain-style effect.
- A Python script `generate_sorry_rain_demo.py` that generates `demo_sorry_rain.html` for quick preview.

How to use in your website:
- The overlay can be started via the browser console or by JS code:
  - `window.sorryRain.start({ density: 18, speed: 1600, word: 'sorry' })` to start.
  - `window.sorryRain.stop()` to manually stop.
- The overlay is non-intrusive: it uses `pointer-events: none` on the overlay so it doesn't block controls, and it's removed automatically after a while.
- The `piu` message overlay (previous) runs once on page load.

Preview via Python (optional):
1. Run the generator to create demo page:

```powershell
python generate_sorry_rain_demo.py
```

2. Open `demo_sorry_rain.html` in a browser and click `Run Rain` to preview.

Accessibility & customization:
- You can change the text, speed, and density via JS API.
- The overlay is accessible: the short 'piu' animation uses `aria-live` to announce when active; the rain is decorational.
- Adjust duration and density to control intensity (lower density for subtle effect).

If you'd like, I can:
- Add a toggle button on the page to start/stop the rain (visible or hidden with settings),
- Make the rain more Matrix-like with per-letter stacking and fades, or
- Add a dark-mode-only behaviour so it only runs at night/dark backgrounds.
