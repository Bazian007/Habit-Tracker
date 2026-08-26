const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ACTIVITIES = [
  { id: "gym", label: "Gym", color: "#3B82F6", category: "activity" },
  { id: "swimming", label: "Swimming", color: "#06B6D4", category: "activity" },
  { id: "run", label: "Run", color: "#22C55E", category: "activity" },
  { id: "yoga", label: "Yoga", color: "#A855F7", category: "activity" },
  { id: "cycling", label: "Cycling", color: "#F97316", category: "activity" },
  { id: "walking", label: "Walking", color: "#EAB308", category: "activity" },
  { id: "hiking", label: "Hiking", color: "#A16207", category: "activity" },
  { id: "crossfit", label: "Crossfit", color: "#EF4444", category: "activity" },
  { id: "reading", label: "Read", color: "#8B5CF6", category: "habit" },
  { id: "meditation", label: "Meditate", color: "#EC4899", category: "habit" },
  { id: "water", label: "Drink water", color: "#0EA5E9", category: "habit" },
  { id: "short-break", label: "Take a short break", color: "#F59E0B", category: "habit" },
  { id: "learn", label: "Learn something new", color: "#14B8A6", category: "habit" },
  { id: "gratitudes", label: "Write 3 gratitudes", color: "#D946EF", category: "habit" },
];

const STORAGE_KEY = "workout-tracker-v1";
const THEME_STORAGE_KEY = "habit-tracker-theme";

const now = new Date();
let viewYear = now.getFullYear();
let viewMonth = now.getMonth();
let selectedDate = null;
let selectedCategory = null;
let workouts = loadWorkouts();

function loadWorkouts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveWorkouts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function exportWorkouts() {
  const backup = JSON.stringify(workouts);
  const file = new Blob([backup], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);
  link.download = "habit-tracker-backup.json";
  link.click();

  URL.revokeObjectURL(link.href);
}

function importWorkouts(file) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const importedWorkouts = JSON.parse(reader.result);
    if (!confirm("Replace your current logs with this backup?")) {
      return;
    }
    
    workouts = importedWorkouts;
    saveWorkouts(workouts);
    renderCalendar(viewYear, viewMonth);
  });

  reader.readAsText(file);
}

function toDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function getActivity(id) {
  return ACTIVITIES.find((activity) => activity.id === id);
}

function formatDisplayDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function changeMonth(delta) {
  viewMonth += delta;

  if (viewMonth > 11) {
    viewMonth = 0;
    viewYear += 1;
  } else if (viewMonth < 0) {
    viewMonth = 11;
    viewYear -= 1;
  }

  renderCalendar(viewYear, viewMonth);
}

function openModal(dateKey) {
  selectedDate = dateKey;
  selectedCategory = null;
  const modal = document.getElementById("modal");

  document.getElementById("modal-date").textContent = formatDisplayDate(dateKey);
  renderActivityOptions();

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function renderActivityOptions() {
  const options = document.getElementById("activity-options");
  const prompt = document.getElementById("category-prompt");
  const clearBtn = document.getElementById("clear-workout");
  const loggedActivities = workouts[selectedDate] || [];

  document.querySelectorAll(".category-tab").forEach((button) => {
    const isSelected = button.dataset.category === selectedCategory;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  if (!selectedCategory) {
    prompt.textContent = "Choose Activities or Habits to see the list.";
    options.innerHTML = "";
  } else {
    const categoryName = selectedCategory === "activity" ? "activities" : "habits";
    prompt.textContent = `Choose the ${categoryName} you completed.`;
    options.innerHTML = ACTIVITIES
      .filter((activity) => activity.category === selectedCategory)
      .map((activity) => `
    <button
      type="button"
      class="activity-btn${loggedActivities.includes(activity.id) ? " selected" : ""}"
      data-activity="${activity.id}"
      style="--activity-color: ${activity.color}"
    >
      <span class="activity-swatch"></span>
      ${activity.label}
    </button>
  `).join("");

    options.querySelectorAll(".activity-btn").forEach((btn) => {
      btn.addEventListener("click", () => toggleActivity(btn.dataset.activity));
    });
  }

  if (loggedActivities.length > 0) {
    clearBtn.classList.remove("hidden");
  } else {
    clearBtn.classList.add("hidden");
  }
}


function closeModal() {
  selectedDate = null;
  selectedCategory = null;
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}
function toggleActivity(activityId) {
  const current = workouts[selectedDate] || [];
  const index = current.indexOf(activityId);

  if (index === -1) {
    current.push(activityId);
  } else {
    current.splice(index, 1);
  }

  if (current.length === 0) {
    delete workouts[selectedDate];
  } else {
    workouts[selectedDate] = current;
  }

  saveWorkouts(workouts);
  renderActivityOptions();
  renderCalendar(viewYear, viewMonth);
}

function clearWorkout() {
  delete workouts[selectedDate];
  saveWorkouts(workouts);
  closeModal();
  renderCalendar(viewYear, viewMonth);
}

function calculateStreak() {
  const today = new Date();
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
function calculateBestStreak() {
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
function getStreakDates() {
  const today = new Date();
  const hasToday = workouts[toDateKey(today.getFullYear(), today.getMonth(), today.getDate())]?.length > 0;

  const cursor = new Date(today);
  if (!hasToday) {
    cursor.setDate(cursor.getDate() - 1);
  }

  const dates = [];
  while (true) {
    const key = toDateKey(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
    const logged = workouts[key]?.length > 0;
    if (!logged) break;
    dates.push(key);
    cursor.setDate(cursor.getDate() - 1);
  }

  return dates;
}

function updateStats(year, month) {
  let count = 0;

  for (const dateKey in workouts) {
    const [wYear, wMonth] = dateKey.split("-").map(Number);
    if (wYear === year && wMonth === month + 1) {
      count += workouts[dateKey].length;
    }
  }

  let text = count === 0
    ? "No activities yet. Tap a day to log one."
    : `${count} activities this month`;

  const today = new Date();
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const loggedToday = workouts[todayKey] && workouts[todayKey].length > 0;

  if (!loggedToday) {
    text += " Let's go! Log today's activities! 💪";
  }

  const streak = calculateStreak();
  const bestStreak = calculateBestStreak();
  if (streak > 0) {
    text += ` 🔥 ${streak}-day streak`;
  }
  if (bestStreak > 0) {
    text += ` · Best: ${bestStreak} days`;
  }
  document.getElementById("stats").textContent = text;
}

function updateActivityBreakdown(year, month) {
  const counts = {};

  for (const dateKey in workouts) {
    const [workoutYear, workoutMonth] = dateKey.split("-").map(Number);
    if (workoutYear === year && workoutMonth === month + 1) {
      for (const activityId of workouts[dateKey]) {
        counts[activityId] = (counts[activityId] || 0) + 1;
      }
    }
  }

  const loggedActivities = ACTIVITIES.filter((activity) => counts[activity.id]);
  const container = document.getElementById("activity-breakdown");

  if (loggedActivities.length === 0) {
    container.textContent = "Nothing logged this month.";
    return;
  }

  container.innerHTML = loggedActivities.map((activity) => `
    <div class="activity-summary">
      <span class="activity-summary-swatch" style="background: ${activity.color}"></span>
      <span>${activity.label}</span>
      <strong class="activity-summary-count">${counts[activity.id]}</strong>
    </div>
  `).join("");
}

function updateRecentActivity() {
  const container = document.getElementById("recent-activity");
  const recentDates = Object.keys(workouts)
    .filter((dateKey) => workouts[dateKey]?.length > 0)
    .sort((firstDate, secondDate) => secondDate.localeCompare(firstDate))
    .slice(0, 5);

  if (recentDates.length === 0) {
    container.textContent = "Nothing logged yet.";
    return;
  }

  container.innerHTML = recentDates.map((dateKey) => {
    const labels = workouts[dateKey]
      .map(getActivity)
      .filter(Boolean)
      .map((activity) => activity.label)
      .join(", ");

    return `
      <div class="recent-activity-item">
        <time class="recent-activity-date" datetime="${dateKey}">${formatDisplayDate(dateKey)}</time>
        <span class="recent-activity-labels">${labels}</span>
      </div>
    `;
  }).join("");
}

function renderCalendar(year, month) {
  console.log(year, month);
  const container = document.getElementById("calendar");
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
    updateStats(year, month);
    updateActivityBreakdown(year, month);
    updateRecentActivity();
  let html = `
    <div class="calendar-header">
      <button type="button" class="nav-btn" id="prev-month" aria-label="Previous month">‹</button>
      <h2>${MONTH_NAMES[month]} ${year}</h2>
      <button type="button" class="nav-btn" id="next-month" aria-label="Next month">›</button>
    </div>
    <div class="calendar-grid">
  `;

  for (const day of WEEKDAYS) {
    html += `<div class="weekday">${day}</div>`;
  }

  for (let i = 0; i < startOffset; i++) {
    html += `<div class="day-spacer"></div>`;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(year, month, day);
    const loggedActivities = workouts[dateKey] || [];
    const isStreakDay = getStreakDates().includes(dateKey);
    console.log(dateKey, loggedActivities);
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const dots = loggedActivities
      .map((id) => getActivity(id))
      .filter(Boolean)
      .map((activity) => `<span class="workout-dot" style="background: ${activity.color}"></span>`)
      .join("");

    html += `
      <button
        type="button"
        class="day${isToday ? " today" : ""}${loggedActivities.length ? " has-workout" : ""}${isStreakDay ? " streak" : ""}"
        data-date="${dateKey}"
        aria-label="${day}${loggedActivities.length ? `, ${loggedActivities.length} items logged` : ""}"
      >
        <span class="day-number">${day}</span>
        <span class="workout-dots">${dots}</span>
      </button>
    `;
  }


  html += `</div>`;
  container.innerHTML = html;

  document.getElementById("prev-month").addEventListener("click", () => changeMonth(-1));
  document.getElementById("next-month").addEventListener("click", () => changeMonth(1));

  container.querySelectorAll(".day").forEach((dayBtn) => {
    dayBtn.addEventListener("click", () => openModal(dayBtn.dataset.date));
  });
}

document.getElementById("modal-backdrop").addEventListener("click", closeModal);
document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("clear-workout").addEventListener("click", clearWorkout);
document.querySelectorAll(".category-tab").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    renderActivityOptions();
  });
});

if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
  document.body.classList.add("dark");
  document.getElementById("theme-toggle").textContent = "Light mode";
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");

  if (isDark) {
    document.getElementById("theme-toggle").textContent = "Light mode";
  } else {
    document.getElementById("theme-toggle").textContent = "Dark mode";
  }
});

document.getElementById("export-data").addEventListener("click", exportWorkouts);
document.getElementById("import-data").addEventListener("click", () => {
  document.getElementById("import-file").click();
});

document.getElementById("import-file").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    importWorkouts(file);
  }
});

renderCalendar(viewYear, viewMonth);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
