function toDateKey(year, month, day) {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  }
  
  function slugify(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  function calculateStreak(workouts, today = new Date()) {
    const hasToday = workouts[toDateKey(today.getFullYear(), today.getMonth(), today.getDate())]?.length > 0;

    const cursor = new Date(today);
    if (!hasToday) {
      cursor.setDate(cursor.getDate() - 1);
    }

    let streak = 0;
    while (true) {
      const key = toDateKey(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
      const logged = workouts[key]?.length > 0;
      if (!logged) break;
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  }

  function calculateBestStreak(workouts) {
    const dates = Object.keys(workouts).sort();
    let currentStreak = 0;
    let bestStreak = 0;
    let previousDate = null;
    for (const date of dates) {
      const currentDate = new Date(`${date}T00:00:00`);
      if (previousDate === null) {
        currentStreak = 1;
      } else {
        const dayBefore = new Date(currentDate);
        dayBefore.setDate(dayBefore.getDate() - 1);
        if (previousDate.toDateString() === dayBefore.toDateString()) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }

      previousDate = currentDate;
    }
    return bestStreak;
  }

  function getGoalProgress(count, target) {
    const completed = Math.max(0, Number(count) || 0);
    const goal = Math.max(1, Number(target) || 1);
    const percentage = Math.min((completed / goal) * 100, 100);
    const remaining = Math.max(goal - completed, 0);

    let message = "A strong start begins today.";
    if (percentage >= 100) {
      message = "Goal complete!";
    } else if (percentage >= 75) {
      message = `Almost there — ${remaining} more to go.`;
    } else if (percentage >= 50) {
      message = "Halfway there. Keep going.";
    } else if (percentage >= 25) {
      message = "A strong start.";
    }

    return { completed, goal, percentage, remaining, message };
  }

  if (typeof module !== "undefined") {
    module.exports = { toDateKey, slugify, calculateStreak, calculateBestStreak, getGoalProgress };
  }
