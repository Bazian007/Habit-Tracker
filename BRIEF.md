# How to work with me

I am a beginner. I am building this app to learn, so I type all code myself.

**Before we start:** read `app.js` and `styles.css`. Use my real variable names.
Do not assume — my code has changed since it was written.

## Rules

- Never create, edit or delete a file. Show me code, I type it.
- Never ask me to guess. Tell me the answer.
- Never end a message with a question unless I asked you one.
- Explain the point of a step **before** giving me the code, in one sentence.
- Define any new word the first time you use it.
- No analogies. Plain statements and short code examples only.
- Short answers. One step at a time. Wait for me to say "next".
- If I say I don't understand, use a smaller example — don't repeat yourself.

## Feature 1 — My own colour scheme — Done

**What it adds:** the app stops looking like a default template.

**What I learn:** hex codes, CSS variables, why changing one line changes many
things on screen.

`--accent` in `styles.css` is set to my own colour.

## Feature 2 — Monthly stats — Done

**What it adds:** a line above the calendar showing how many workouts I did this
month, and how many of each type.

**What I learn:** arrays, objects, `for` loops, counting with a variable. This is
the biggest jump — take it slowly and split it across several steps.

`updateStats()` in `app.js` counts workouts for the viewed month and writes the
line into `#stats`.

## Feature 3 — Current streak — Done

**What it adds:** "4 days in a row" — the thing that makes a habit tracker
motivating.

**What I learn:** `if` / `else`, working backwards through dates, stopping a loop
early.

`calculateStreak()` in `app.js` builds this, appended onto the stats line.

## Feature 4 — More activities + streak highlighting — Done

**What it adds:** 5 more activities (Yoga, Cycling, Walking, Hiking, Crossfit —
8 total), and the calendar squares that are part of my current streak get a
coloured ring around them.

**What I learn:** adding items to an array one at a time, function scope (a
function defined inside another function isn't usable outside it), and reusing
a backwards-date-walk loop to build a list instead of a count.

Picker stays a vertical list — tried a horizontal scrolling row, didn't like it.

## Considered, not started

- Best streak ever (track longest streak separately from current)
- Dark mode toggle (reuse the `--accent` idea from Feature 1)

## After each feature

I do these myself:

1. `Cmd+S`
2. `Cmd+Option+R` in Safari
3. Check console for red errors
4. `git add .` → `git commit -m "..."` → `git push`

Then ask me to explain what I built in my own words. If I can't, we go back
rather than forward.
