# Habit Tracker — Plan & Status

## Goal

Learn front-end coding by building a useful Habit Tracker. The app runs locally
in a browser and currently has no backend.

## Working agreement

- The default is teaching mode: short explanations and one small step at a time.
- An AI agent must not edit or delete files unless the user explicitly asks and
  grants permission for the specific task.
- A granted permission is limited to that requested task; it does not permit
  unrelated changes.

## Current data model

`workouts` is stored in browser `localStorage` as:

```js
{
  "2026-08-20": ["gym", "walking"]
}
```

Each date can have multiple activity IDs. The internal name remains `workouts`,
while the visible interface calls them activities or habits.

## Security

`index.html` has a Content Security Policy (CSP) meta tag. It restricts scripts
and resources to this app; inline styles are allowed because item colours are
created dynamically in `app.js`.

## Completed

- [x] Static HTML/CSS/JavaScript app structure.
- [x] Calendar grid with previous/next month navigation.
- [x] Activity picker modal, add/remove behaviour, and browser persistence.
- [x] Eight predefined activities and six predefined habits with colour dots.
- [x] Activities/Habits category picker in the logging modal.
- [x] Centred, scrollable logging modal.
- [x] Monthly total, current streak, best streak, and streak highlighting.
- [x] Persistent Dark mode.
- [x] Habit Tracker header, subtitle, and quote.
- [x] Responsive dashboard layout.
- [x] Monthly Breakdown with colour-coded count rows.
- [x] Recent Logs list showing the five most recent logged dates.

## Completed — Installable web app (PWA)

### Purpose

Turn Habit Tracker into an installable website that can appear as an app on a
phone or computer. This remains a static project: no server, database, or paid
subscription is required.

### Step-by-step plan

- [x] **Step 1: Publish the current site with GitHub Pages**
   - Confirm whether the repository can be public on GitHub Free.
   - Configure GitHub Pages to publish the existing `main` branch from the
     project root.
   - Open the resulting HTTPS website and check that the tracker works.

- [x] **Step 2: Add PWA identity files**
   - Create two app-icon image files: 192×192 and 512×512 pixels.
   - Create `manifest.webmanifest` with the app name, icons, colours,
     `start_url`, and standalone display mode.
   - Link the manifest from `index.html`.

- [x] **Step 3: Test installation**
   - Push the manifest and icons to GitHub Pages.
   - Install Habit Tracker from a supported browser.
   - Confirm that it opens from an icon in its own app-like window.

- [x] **Step 4: Add offline support**
   - Create a `service-worker.js` file that caches the app's HTML, CSS,
     JavaScript, manifest, and icons.
   - Register that service worker from `app.js`.
   - Keep the Content Security Policy restricted to same-origin files.

- [x] **Step 5: Test and maintain**
   - Test the installed app while offline and after an update is pushed.
   - Confirm that `localStorage` still saves logs in each browser or web-app
     context.
   - Commit and push after each completed step.

### Important limitation

Publishing and installing the app does **not** sync data between devices.
Each browser keeps its own `localStorage` data until a future backend is added.

## Completed — Backup export/import

### Purpose

Allow users to manually back up or move their logged history without a server.

- [x] **Export:** Download the current logs as `habit-tracker-backup.json`.
- [x] **Import:** Choose that JSON file, confirm the replacement, then restore
  the logs and calendar.
- [x] **Test:** Confirmed that exporting downloads the file and importing it
  completes without an error.

### Limitation

Backup and restore are manual. They do not automatically sync data between the
Safari browser version and the Safari Dock web app.

## Next options

1. Weekly goal and progress indicator.
2. Notes for a logged day.
3. Custom activities.
4. Optional backend for multi-device sync.

## Known small cleanups

- `getStreakDates()` is recalculated for every calendar day during rendering.
  It works, but could be calculated once per render.
- `console.log()` calls in `renderCalendar()` are useful for learning/debugging
  but can be removed later.

## Log

- 2026-08-14: Project plan created.
- 2026-08-15: Original calendar, activities, stats, and streak work documented.
- 2026-08-19: Best streak and persistent Dark mode completed.
- 2026-08-20: Activity Breakdown, responsive dashboard, Recent Activity, Habit
  Tracker wording, and the working agreement were documented.
- 2026-08-20: Added a CSP meta tag, Activities/Habits category picker, six
  starter habits, and a centred logging modal.
- 2026-08-21: Chose an installable web app (PWA) as the next learning project;
  documented publishing, installation, offline support, and testing stages.
- 2026-08-20: Marked the PWA project as in progress with a 5-step checklist;
  mirrored the plan into `BRIEF.md`.
- 2026-08-26: Completed the PWA: GitHub Pages, manifest and icons,
  installation, offline caching, and cache-version updates.
- 2026-08-26: Added and tested manual JSON export/import for saved history.
