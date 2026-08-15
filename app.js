const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ACTIVITIES = [
  { id: "gym", label: "Gym", color: "#3B82F6" },
  { id: "swimming", label: "Swimming", color: "#06B6D4" },
  { id: "run", label: "Run", color: "#22C55E" },
  { id: "yoga", label: "Yoga", color: "#A855F7" },
  { id: "cycling", label: "Cycling", color: "#F97316" },
  { id: "walking", label: "Walking", color: "#EAB308" },
  { id: "hiking", label: "Hiking", color: "#A16207" },
  { id: "crossfit", label: "Crossfit", color: "#EF4444" },
];

const STORAGE_KEY = "workout-tracker-v1";

const now = new Date();
let viewYear = now.getFullYear();
let viewMonth = now.getMonth();
let selectedDate = null;
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
  const modal = document.getElementById("modal");
  const clearBtn = document.getElementById("clear-workout");
  const loggedActivities = workouts[dateKey] || [];

  document.getElementById("modal-date").textContent = formatDisplayDate(dateKey);

  const options = document.getElementById("activity-options");
  options.innerHTML = ACTIVITIES.map((activity) => `
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

  if (loggedActivities.length > 0) {
    clearBtn.classList.remove("hidden");
  } else {
    clearBtn.classList.add("hidden");
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}


function closeModal() {
  selectedDate = null;
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
  openModal(selectedDate);
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
    ? "No workouts yet — tap a day to log one."
    : `${count} workouts this month`;

  const today = new Date();
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const loggedToday = workouts[todayKey] && workouts[todayKey].length > 0;

  if (!loggedToday) {
    text += " Let's go — log today's workout! 💪";
  }

  const streak = calculateStreak();
  if (streak > 0) {
    text += ` 🔥 ${streak}-day streak`;
  }

  document.getElementById("stats").textContent = text;
}


function renderCalendar(year, month) {
  console.log(year, month);
  const container = document.getElementById("calendar");
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
    updateStats(year, month);

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
        aria-label="${day}${loggedActivities.length ? `, ${loggedActivities.length} activities logged` : ""}"
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

renderCalendar(viewYear, viewMonth);