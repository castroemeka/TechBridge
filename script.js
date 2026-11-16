/**
 * TechBridge Luxury Script - Handles mobile hamburger menu toggle.
 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile drawer automatically when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile drawer automatically when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});











// 1. VARIABLES & 2. ARRAYS OF 3. OBJECTS
const dataAnalyticsTasks = [
  {
    number: 1,
    title: "Data Cleaning Basics",
    day: 1,
    description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
    difficulty: "Beginner"
  },
  {
    number: 2,
    title: "Formulas & Pivot Tables",
    day: 4,
    description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
    difficulty: "Beginner"
  },
  {
    number: 3,
    title: "Data Visualization",
    day: 8,
    description: "Create charts and a simple dashboard that communicate useful insights from a dataset.",
    difficulty: "Beginner → Intermediate"
  },
  {
    number: 4,
    title: "Introduction to SQL",
    day: 11,
    description: "Practice basic SQL queries and use them to answer real-world questions about data.",
    difficulty: "Beginner → Intermediate"
  },
  {
    number: 5,
    title: "SQL Joins & Aggregations",
    day: 15,
    description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
    difficulty: "Intermediate"
  },
  {
    number: 6,
    title: "Lookup Functions & Data Wrangling",
    day: 19,
    description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
    difficulty: "Intermediate"
  },
  {
    number: 7,
    title: "Mini Analysis Project",
    day: 22,
    description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
    difficulty: "Intermediate"
  },
  {
    number: 8,
    title: "Capstone Project",
    day: 26,
    description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
    difficulty: "Intermediate"
  }
];

const webDevelopmentTasks = [
  {
    number: 1,
    title: "Build the TechBridge Homepage",
    day: 1,
    description: "Create the first version of the TechBridge website using HTML and CSS.",
    difficulty: "Beginner"
  },
  {
    number: 2,
    title: "Build the TechBridge Programs Experience",
    day: 4,
    description: "Create a Programs experience presenting TechBridge's available learning programs.",
    difficulty: "Beginner"
  },
  {
    number: 3,
    title: "Build the Internship Tasks Experience",
    day: 8,
    description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
    difficulty: "Beginner → Intermediate"
  },
  {
    number: 4,
    title: "Build an Interactive Internship Roadmap",
    day: 11,
    description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
    difficulty: "Beginner → Intermediate"
  },
  {
    number: 5,
    title: "Build the Intern Registration Experience",
    day: 15,
    description: "Create a professional registration and onboarding interface for TechBridge interns.",
    difficulty: "Intermediate"
  },
  {
    number: 6,
    title: "Build the Task Submission System",
    day: 19,
    description: "Create an interface through which interns can prepare and submit their task work.",
    difficulty: "Intermediate"
  },
  {
    number: 7,
    title: "Build the Intern Dashboard",
    day: 22,
    description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
    difficulty: "Intermediate"
  },
  {
    number: 8,
    title: "Build the Complete TechBridge Internship Platform",
    day: 26,
    description: "Combine the different components created during the internship into a complete TechBridge platform.",
    difficulty: "Intermediate"
  }
];

// State tracking variable
let currentTrack = "data";

// DOM Element References
const btnData = document.getElementById("btn-data");
const btnWeb = document.getElementById("btn-web");
const sidebarTrackTitle = document.getElementById("sidebar-track-title");
const sidebarTrackDesc = document.getElementById("sidebar-track-desc");
const currentViewTag = document.getElementById("current-view-tag");
const workspaceHeading = document.getElementById("workspace-heading");
const roadmapGrid = document.getElementById("roadmap-grid");

// 4. FUNCTIONS & 6. CONDITIONAL LOGIC
function getDifficultyBadgeClass(difficulty) {
  if (difficulty === "Beginner") return "diff-beginner";
  if (difficulty === "Beginner → Intermediate") return "diff-transition";
  return "diff-intermediate";
}

function renderTrack(trackKey) {
  currentTrack = trackKey;
  let activeTasks = [];

  // Conditional logic to switch active dataset and update UI metadata
  if (currentTrack === "data") {
    activeTasks = dataAnalyticsTasks;
    sidebarTrackTitle.textContent = "Data Analytics";
    sidebarTrackDesc.textContent = "Master spreadsheets, SQL, data wrangling, and end-to-end business analysis.";
    currentViewTag.textContent = "Data Analytics Track";
    workspaceHeading.textContent = "Data Analytics 30-Day Roadmap";
    btnData.classList.add("active");
    btnWeb.classList.remove("active");
  } else {
    activeTasks = webDevelopmentTasks;
    sidebarTrackTitle.textContent = "Web Development";
    sidebarTrackDesc.textContent = "Build responsive interfaces, JavaScript apps, and a full internship platform.";
    currentViewTag.textContent = "Web Development Track";
    workspaceHeading.textContent = "Web Development 30-Day Roadmap";
    btnWeb.classList.add("active");
    btnData.classList.remove("active");
  }

  // 7. DOM MANIPULATION: Clear and dynamically populate grid cards
  roadmapGrid.innerHTML = "";

  activeTasks.forEach(function (task) {
    const badgeClass = getDifficultyBadgeClass(task.difficulty);

    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
      <div>
        <div class="card-top">
          <span class="task-meta-num">Task ${task.number}</span>
          <span class="difficulty-badge ${badgeClass}">${task.difficulty}</span>
        </div>
        <h3>${task.title}</h3>
        <span class="task-day-tag">Day ${task.day}</span>
        <p>${task.description}</p>
      </div>
    `;

    roadmapGrid.appendChild(card);
  });
}

// 5. EVENT LISTENERS
btnData.addEventListener("click", function () {
  renderTrack("data");
});

btnWeb.addEventListener("click", function () {
  renderTrack("web");
});

// Initial Page Load
renderTrack(currentTrack);
