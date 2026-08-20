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
while the visible interface calls them activities.

## Completed

- [x] Static HTML/CSS/JavaScript app structure.
- [x] Calendar grid with previous/next month navigation.
- [x] Activity picker modal, add/remove behaviour, and browser persistence.
- [x] Eight predefined activities with colour dots.
- [x] Monthly total, current streak, best streak, and streak highlighting.
- [x] Persistent Dark mode.
- [x] Habit Tracker header, subtitle, and quote.
- [x] Responsive dashboard layout.
- [x] Monthly Activity Breakdown with colour-coded count rows.
- [x] Recent Activity list showing the five most recent logged dates.

## Next options

1. Weekly goal and progress indicator.
2. Notes for a logged day.
3. Custom activities.
4. Export/import of browser data.
5. Optional backend for multi-device sync.

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
