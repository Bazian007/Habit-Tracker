import { test, expect } from "vitest";
import { toDateKey, slugify, calculateStreak, calculateBestStreak, getGoalProgress } from "./logic.js";

test("toDateKey pads single digits with a zero", () => {
  expect(toDateKey(2026, 0, 5)).toBe("2026-01-05");
});

test("toDateKey keeps double digits as they are", () => {
  expect(toDateKey(2026, 11, 25)).toBe("2026-12-25");
});

test("slugify lowercases and replaces spaces with dashes", () => {
  expect(slugify("Morning Run")).toBe("morning-run");
});

test("slugify trims extra spaces", () => {
  expect(slugify("  Yoga  ")).toBe("yoga");
});

test("calculateStreak returns 0 when nothing is logged", () => {
  const today = new Date(2026, 7, 20); // August 20, 2026 (month is 0-based)
  expect(calculateStreak({}, today)).toBe(0);
});

test("calculateStreak counts consecutive days ending today", () => {
  const today = new Date(2026, 7, 20);
  const workouts = {
    "2026-08-18": ["gym"],
    "2026-08-19": ["gym"],
    "2026-08-20": ["gym"],
  };
  expect(calculateStreak(workouts, today)).toBe(3);
});

test("calculateStreak counts from yesterday when today isn't logged yet", () => {
  const today = new Date(2026, 7, 20);
  const workouts = {
    "2026-08-18": ["gym"],
    "2026-08-19": ["gym"],
  };
  expect(calculateStreak(workouts, today)).toBe(2);
});

test("calculateStreak stops at the first gap", () => {
  const today = new Date(2026, 7, 20);
  const workouts = {
    "2026-08-20": ["gym"],
    "2026-08-18": ["gym"], // the 19th is missing
  };
  expect(calculateStreak(workouts, today)).toBe(1);
});

test("calculateBestStreak returns 0 when nothing is logged", () => {
  expect(calculateBestStreak({})).toBe(0);
});

test("calculateBestStreak finds the longest run even if it's in the past", () => {
  const workouts = {
    "2026-08-01": ["gym"],
    "2026-08-02": ["gym"],
    "2026-08-03": ["gym"],
    "2026-08-10": ["gym"], // separate, shorter run — shouldn't count
  };
  expect(calculateBestStreak(workouts)).toBe(3);
});

test("getGoalProgress gives the halfway milestone", () => {
  expect(getGoalProgress(10, 20)).toMatchObject({
    percentage: 50,
    remaining: 10,
    message: "Halfway there. Keep going.",
  });
});

test("getGoalProgress caps progress and celebrates a completed goal", () => {
  expect(getGoalProgress(25, 20)).toMatchObject({
    percentage: 100,
    remaining: 0,
    message: "Goal complete!",
  });
});
