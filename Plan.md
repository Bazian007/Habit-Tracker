# Workout Tracker — Plan & Status

## Goal
The point of this project is to LEARN, not just to ship an app.
Claude gives instructions/code; I type and run everything myself.

## How Claude should work with me
- Never create, edit, or delete files without asking first.
- Give simple step-by-step instructions and show code as text — I type it in.
- Only touch a file directly if I explicitly hand it over and ask.

## Roadmap (condensed)
- Phase 0: Local web app (HTML/CSS/JS, no backend) — chosen
- Phase 1: Data model — resolved. `workouts` is `{ "YYYY-MM-DD": [activityId, ...] }`,
  supports multiple workouts per day.
- Phase 2: UI — calendar + tap-day modal — done
- Phase 3: MVP build
  - [x] Step 1: project setup (index.html, app.js, styles.css)
  - [x] Step 2: localStorage persistence
  - [x] Step 3: build-your-own calendar grid
  - [x] Step 4: log/edit/delete a workout
  - [x] Step 5: stats bar ("N workouts this month" + current streak)
- Phase 3.5: Post-MVP features (see `BRIEF.md`)
  - [x] Custom colour scheme (`--accent` in `styles.css`)
  - [x] Monthly stats line
  - [x] Current streak count
  - [x] Activity list expanded from 3 to 8: Gym, Swimming, Run, Yoga,
    Cycling, Walking, Hiking, Crossfit
  - [x] Streak-day highlighting on the calendar (`getStreakDates()` +
    `.day.streak` CSS ring)
- Phase 4: Polish (mobile layout, PWA, dark mode, export/import) — not started
- Phase 5: Optional backend for multi-device sync — not started

## Known small cleanups (not urgent)
- `getStreakDates()` is called once per day inside the `renderCalendar()`
  loop (~28-31 calls per render) instead of once — correct but wasteful.
- `.stats` text colour in `styles.css` is hardcoded `#04823b` instead of
  using `var(--accent)`.

## Considered, not started
- Best streak ever (track longest streak separately from current)
- Dark mode toggle (reuse the `--accent`/CSS variable approach)

## Log
- 2026-08-14: Created this file. Reviewed original plan against current
  code. Established working agreement above.
- 2026-08-15: Synced this file with actual app state — stats/streak/colour
  features were already built, activity list expanded to 8, streak-day
  calendar highlighting added. Removed the old open decision (data model
  question was already resolved in code).
