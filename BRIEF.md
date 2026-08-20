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
  activity breakdown, recent activity, and the activity picker modal.
- `styles.css` provides the light/dark design and responsive dashboard layout.
- `app.js` provides calendar behaviour and saves data in browser `localStorage`.
- Saved data uses `workout-tracker-v1`: `{ "YYYY-MM-DD": [activityId, ...] }`.
- The theme preference uses `habit-tracker-theme`.
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
- Recent Logs list showing the five latest logged dates.

## Possible next features

- Add a weekly goal and progress indicator.
- Add notes to a logged day.
- Allow custom activities.
- Export or import saved history.
- Add a backend only if multi-device sync becomes a real goal.

## After a completed feature

1. Save with `Cmd+Option+S`.
2. Refresh Safari with `Cmd+Option+R`.
3. Check Safari's console for red errors.
4. `git add .` → `git commit -m "..."` → `git push`.
