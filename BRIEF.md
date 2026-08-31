# How to work with me

I am a beginner building this app to learn. Keep explanations short, use plain
language, and teach one small thing at a time.

**Before starting:** read `app.js` and `styles.css`. Use my real variable names;
do not assume the code is unchanged.

## Editing permission

- By default, an AI agent must not create, edit, or delete any file.
- The agent may edit files only when I specifically ask it to and clearly give
  permission for that task.
- Permission for one task does not give permission for unrelated edits or any
  deletion.
- When I ask to type code myself, show the code and exact location; do not make
  the edit.

## Teaching rules

- Explain the point of a step before showing code, in one sentence.
- Define new programming words the first time they appear.
- Do not ask me to guess. Give the answer.
- No analogies. Use plain statements and small code examples.
- If I say I do not understand, use a smaller example instead of repeating the
  same explanation.
- Do not give quizzes unless I ask for one.

## Current app

Habit Tracker is a browser-only app. It has no server, database, or login.

- `index.html` provides the page structure: header, stats, calendar,
  activity breakdown, monthly goals, and the activity picker modal.
- `styles.css` provides the light/dark design and responsive dashboard layout.
- `app.js` provides calendar behaviour and saves data in browser `localStorage`.
- `logic.js` holds pure helper functions (`toDateKey`, `slugify`,
  `calculateStreak`, `calculateBestStreak`, `getGoalProgress`) shared by the
  browser and by automated tests; `index.html` loads it before `app.js`.
- Dev-only tooling: `npm` and Vitest run automated tests (`npm test`) against
  `logic.js`. This does not change the shipped app, which still has no server.
- Saved data uses `workout-tracker-v1`: `{ "YYYY-MM-DD": [activityId, ...] }`.
- The theme preference uses `habit-tracker-theme`.
- Monthly goals use `habit-tracker-monthly-goals` and store separate positive
  targets for activities and habits.
- A Content Security Policy (CSP) meta tag in `index.html` restricts scripts and
  other resources to this app. Inline styles remain allowed for dynamic item
  colours created by `app.js`.

## Built features

- Custom colour scheme and Habit Tracker wording.
- Eight activities: Gym, Swimming, Run, Yoga, Cycling, Walking, Hiking, and
  Crossfit; plus six habits: Read, Meditate, Drink water, Take a short break,
  Learn something new, and Write 3 gratitudes.
- Calendar navigation and activity selection/removal for each day.
- A category picker: choose Activities or Habits before choosing an item to log.
- A centred, scrollable picker modal that works on shorter screens.
- Browser storage persistence.
- Monthly activity total, current streak, and best streak.
- Current-streak rings on calendar days.
- Dark mode toggle that remains selected after refresh.
- Responsive dashboard: calendar and monthly breakdown are side by side
  on wide screens and stacked on narrow screens.
- Monthly Breakdown with coloured item rows and counts for the viewed month.
- A Monthly Goals card below the dashboard with separate activity and habit
  progress bars, editable targets, and short milestone messages.
- Custom activities and habits can be added from the logging modal.
- Manual backup controls: download logged history as a JSON file and restore it
  later after a confirmation.
- Automated tests (`npm test`) for date formatting, label-to-ID formatting,
  streak calculations, and goal milestones.

## Completed project — Installable web app (PWA)

Habit Tracker is published with GitHub Pages and can be installed as a web app
with its own icon. `manifest.webmanifest` describes the app, and
`service-worker.js` saves the HTML, CSS, JavaScript, manifest, and icons for
offline use. The current cache name is `habit-tracker-v13`; increase it when a
new app version is published.

The app remains static: it has no server, database, login, or automatic sync.
Safari browser pages and Safari Dock web apps keep separate `localStorage`
data. The manual JSON backup feature can transfer or restore a user's history.

## Possible next features

- Add a one-time celebration when a monthly goal is completed.
- Add an optional focused challenge, such as “Run 8 times.”
- Add notes to a logged day.
- Add a backend only if multi-device sync becomes a real goal.

## After a completed feature

1. Save with `Cmd+Option+S`.
2. Refresh Safari with `Cmd+Option+R`.
3. Check Safari's console for red errors.
4. `git add .` → `git commit -m "..."` → `git push`.
