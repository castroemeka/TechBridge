/**
 * TechBridge Luxury Script - Handles mobile hamburger menu toggle.
 */
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Shared mobile navigation for Home, Programs, Roadmap and Internship Tasks.
  // Uses one class/state model and works with mouse, touch and keyboard input.
  if (hamburgerBtn && navMenu) {
    const setMenuState = (open) => {
      navMenu.classList.toggle('active', open);
      hamburgerBtn.setAttribute('aria-expanded', String(open));
      hamburgerBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('mobile-nav-open', open);
    };

    const toggleMenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuState(!navMenu.classList.contains('active'));
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    hamburgerBtn.addEventListener('pointerup', (event) => {
      // Prevent duplicate activation on browsers that synthesize click after touch.
      if (event.pointerType === 'touch') {
        event.preventDefault();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(event.target) &&
        !hamburgerBtn.contains(event.target)
      ) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020) setMenuState(false);
    });
  }

  // Mark the current page in the shared learning navigation.
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
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
if (btnData && btnWeb && roadmapGrid) {
  btnData.addEventListener("click", function () {
    renderTrack("data");
  });

  btnWeb.addEventListener("click", function () {
    renderTrack("web");
  });

  // Initial Page Load
  renderTrack(currentTrack);
}













// cHALLENGE HUB JS
/**
 * TechBridge – Interactive Challenge Hub (Task 5)
 * Handles challenge rendering, multi-criteria filtering, dynamic challenge
 * detail modals, mobile navigation, and accessibility states.
 */

'use strict';

/* ==========================================================================
   1. Challenge Data Repository
   ========================================================================== */
const challengesData = [
  // DATA ANALYTICS TRACK
  {
    id: 'da-1',
    title: 'Sales Performance Analysis',
    track: 'Data Analytics',
    difficulty: 'Beginner',
    description:
      'Analyze a sample sales dataset to identify revenue trends, top-performing products and monthly sales performance.',
    objective:
      'Transform raw transactional retail records into a structured performance summary that uncovers seasonal growth patterns, high-margin product categories, and underperforming regions.',
    skills: ['Excel', 'Data cleaning', 'Data analysis', 'Visualization'],
    tools: ['Microsoft Excel', 'Google Sheets'],
    steps: [
      'Inspect the raw sales dataset and clean missing values, duplicate entries, and inconsistent date formats.',
      'Calculate key commercial metrics including total revenue, average order value (AOV), and month-over-month growth.',
      'Use Pivot Tables to segment sales by product category, region, and sales representative.',
      'Create clear bar, line, and combo charts illustrating monthly sales trajectories and top 10 products.',
      'Compile key findings into a clean executive summary sheet with actionable recommendations.'
    ],
    deliverables: [
      'Cleaned spreadsheet workbook with documented formulas and Pivot Tables',
      'Visual chart dashboard summarizing monthly and product-level performance',
      '1-page executive insights summary'
    ],
    expectedOutcome: 'A sales report containing meaningful insights and visual charts.',
    estimatedTime: '3–5 days'
  },
  {
    id: 'da-2',
    title: 'Customer Segmentation',
    track: 'Data Analytics',
    difficulty: 'Intermediate',
    description:
      'Examine customer records and group customers based on purchasing behaviour, spending patterns and engagement.',
    objective:
      'Apply behavioral segmentation techniques (such as RFM: Recency, Frequency, Monetary analysis) to classify customers into distinct personas for targeted marketing campaigns.',
    skills: ['Data cleaning', 'Segmentation', 'Analytical thinking', 'Visualization'],
    tools: ['Excel', 'Python', 'Power BI'],
    steps: [
      'Audit customer demographic and order history tables to standardize customer IDs and purchase timestamps.',
      'Compute Recency, Frequency, and Monetary (RFM) scores for each active customer.',
      'Group customers into meaningful tiers (e.g., Champions, Loyal Customers, At-Risk, and Dormant).',
      'Visualize segment distributions and revenue contributions across each customer group.',
      'Draft tailored retention and upsell strategies for each identified segment.'
    ],
    deliverables: [
      'Segmented customer dataset with RFM scores and cluster labels',
      'Interactive charts comparing segment size vs. revenue contribution',
      'Customer segmentation report with retention recommendations'
    ],
    expectedOutcome:
      'A customer segmentation report with recommendations for improving customer engagement.',
    estimatedTime: '5–7 days'
  },
  {
    id: 'da-3',
    title: 'Business Intelligence Dashboard',
    track: 'Data Analytics',
    difficulty: 'Advanced',
    description:
      'Develop an interactive dashboard that helps business managers monitor important performance indicators.',
    objective:
      'Design and build an executive-grade, multi-page Business Intelligence dashboard with dynamic slicers, drill-down views, and automated KPI variance tracking.',
    skills: ['Data visualization', 'Dashboard development', 'Analytical reporting'],
    tools: ['Power BI', 'Tableau'],
    steps: [
      'Model relational tables (Sales, Targets, Customers, and Products) using a clean star-schema architecture.',
      'Write calculated fields/DAX measures for YoY growth, profit margin %, and target attainment.',
      'Design an intuitive visual hierarchy featuring KPI cards, trend lines, and geographic breakdowns.',
      'Configure interactive filters, cross-highlighting, and drill-through tooltips for department heads.',
      'Validate data accuracy across all filter combinations and publish the final dashboard view.'
    ],
    deliverables: [
      'Interactive BI dashboard file (.pbix or Tableau workbook)',
      'Data model documentation explaining KPI formulas',
      'Brief walkthrough guide for business stakeholders'
    ],
    expectedOutcome: 'A dashboard showing business KPIs, trends and performance summaries.',
    estimatedTime: '7–10 days'
  },
  {
    id: 'da-4',
    title: 'Employee Data Analysis',
    track: 'Data Analytics',
    difficulty: 'Intermediate',
    description:
      'Analyze employee records to identify workforce trends, departmental distribution and employee retention patterns.',
    objective:
      'Evaluate HR workforce metrics to pinpoint attrition drivers, tenure distributions, and departmental headcount balance to support leadership planning.',
    skills: ['Data cleaning', 'Descriptive statistics', 'Visualization'],
    tools: ['Excel', 'Power BI'],
    steps: [
      'Clean HR employee records while anonymizing sensitive personal identifiers.',
      'Calculate attrition rates, average tenure, and headcount distribution across departments and roles.',
      'Analyze correlations between attrition and variables such as tenure, compensation bands, and promotion history.',
      'Build visual charts highlighting retention trends and departmental turnover hotspots.',
      'Summarize findings into practical HR retention recommendations.'
    ],
    deliverables: [
      'Cleaned HR analytics workbook or Power BI report',
      'Departmental headcount and attrition breakdown charts',
      'Analytical HR summary report with data-backed recommendations'
    ],
    expectedOutcome: 'An analytical report with charts and recommendations.',
    estimatedTime: '4–6 days'
  },

  // WEB DEVELOPMENT TRACK
  {
    id: 'wd-1',
    title: 'Responsive Landing Page',
    track: 'Web Development',
    difficulty: 'Beginner',
    description:
      'Build a modern landing page for a fictional technology company using semantic HTML and CSS.',
    objective:
      'Translate a modern SaaS/technology brand concept into a fast, accessible, mobile-first landing page using clean semantic HTML5 landmarks and modern CSS layout techniques.',
    skills: ['HTML5', 'CSS3', 'Responsive design', 'Layout'],
    tools: ['VS Code', 'Web Browser'],
    steps: [
      'Structure the document using semantic HTML5 elements (<header>, <nav>, <main>, <section>, and <footer>).',
      'Implement a cohesive color palette, typography scale, and reusable CSS custom properties.',
      'Build a responsive hero banner, feature grid, testimonial block, and call-to-action section using Flexbox and CSS Grid.',
      'Test and refine breakpoints across mobile (375px), tablet (768px), and desktop (1280px+) viewports.',
      'Verify HTML validity, image alt attributes, and color contrast.'
    ],
    deliverables: [
      'Semantic index.html file',
      'Organized external stylesheet (style.css) with responsive media queries',
      'Screenshots or live preview across mobile, tablet, and desktop views'
    ],
    expectedOutcome: 'A fully responsive landing page that works on mobile, tablet and desktop.',
    estimatedTime: '2–3 days'
  },
  {
    id: 'wd-2',
    title: 'Personal Portfolio Website',
    track: 'Web Development',
    difficulty: 'Beginner',
    description:
      'Create a personal portfolio website showcasing your skills, projects, background and contact information.',
    objective:
      'Build a polished, recruiter-ready personal developer or analyst portfolio that highlights your technical capabilities, featured projects, and direct contact links.',
    skills: ['HTML', 'CSS', 'Basic JavaScript'],
    tools: ['VS Code', 'Web Browser'],
    steps: [
      'Plan the site architecture with About, Skills, Featured Projects, and Contact sections.',
      'Build responsive project cards with live demo links, tech stack tags, and concise descriptions.',
      'Add smooth scrolling navigation and a mobile-friendly navigation toggle using vanilla JavaScript.',
      'Ensure clean typography, balanced whitespace, and accessible keyboard focus states.',
      'Deploy or package the site so it can be easily shared with recruiters and mentors.'
    ],
    deliverables: [
      'Complete multi-section portfolio website (HTML, CSS, JS)',
      'At least 3 showcased project entries with clear descriptions',
      'Responsive mobile and desktop layouts'
    ],
    expectedOutcome: 'A professional portfolio website that can be shared with recruiters.',
    estimatedTime: '3–5 days'
  },
  {
    id: 'wd-3',
    title: 'Interactive Contact Form',
    track: 'Web Development',
    difficulty: 'Intermediate',
    description:
      'Build an interactive contact form with input validation, error messages and success feedback.',
    objective:
      'Engineer a user-friendly, accessible contact form powered by vanilla JavaScript that validates user inputs in real time and provides clear inline guidance.',
    skills: ['JavaScript', 'DOM manipulation', 'Form validation', 'Event handling'],
    tools: ['HTML', 'CSS', 'JavaScript'],
    steps: [
      'Create an accessible form layout with properly associated <label> elements and ARIA attributes.',
      'Write JavaScript validation rules for full name, email format, subject selection, and minimum message length.',
      'Display real-time, field-specific error messages and visual invalid/valid states on input and blur events.',
      'Prevent invalid form submissions and render a dynamic confirmation banner upon successful validation.',
      'Include a form reset flow so users can submit another inquiry seamlessly.'
    ],
    deliverables: [
      'Interactive form interface with custom validation styling',
      'Modular JavaScript validation and DOM feedback logic',
      'Accessible error and success state announcements'
    ],
    expectedOutcome:
      'A working contact form with client-side validation and a user-friendly interface.',
    estimatedTime: '3–4 days'
  },
  {
    id: 'wd-4',
    title: 'Interactive Product Page',
    track: 'Web Development',
    difficulty: 'Advanced',
    description:
      'Develop a product page that allows visitors to explore product details, select options and interact with page elements.',
    objective:
      'Create a dynamic e-commerce product showcase with interactive image gallery switching, variant selectors (color/size/tier), live price updates, and cart state feedback.',
    skills: ['HTML', 'CSS', 'JavaScript', 'DOM manipulation', 'Responsive design'],
    tools: ['VS Code', 'Web Browser'],
    steps: [
      'Build a responsive two-column product showcase featuring an interactive thumbnail gallery and specification tabs.',
      'Implement JavaScript state management for selecting product variants (e.g., color, storage/size, and quantity).',
      'Dynamically update displayed pricing, stock availability badges, and selected summary details.',
      'Add an interactive "Add to Cart" drawer or badge counter with quantity adjustments.',
      'Ensure smooth animations, keyboard navigation support, and mobile responsiveness.'
    ],
    deliverables: [
      'Complete interactive product page (HTML, CSS, JS)',
      'Dynamic variant selection, gallery switcher, and cart summary logic',
      'Responsive layout tested across desktop and mobile devices'
    ],
    expectedOutcome: 'A responsive product page with functional interactive elements.',
    estimatedTime: '5–7 days'
  }
];

/* ==========================================================================
   2. Application Filter & Modal State
   ========================================================================== */
const state = {
  selectedTrack: 'all',
  selectedDifficulty: 'all',
  searchQuery: '',
  activeChallenge: null,
  lastFocusedElement: null
};

/* ==========================================================================
   3. DOM Element References
   ========================================================================== */
const elements = {
  // Navigation
  navToggle: document.getElementById('navToggle'),
  navMenu: document.getElementById('navMenu'),
  navLinks: document.querySelectorAll('.nav-link'),

  // Controls & Filters
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  emptyResetBtn: document.getElementById('emptyResetBtn'),
  trackFilterBtns: document.querySelectorAll('#trackFilterGroup .filter-btn'),
  difficultyFilterBtns: document.querySelectorAll('#difficultyFilterGroup .filter-btn'),
  trackOverviewBtns: document.querySelectorAll('[data-filter-track]'),
  footerTrackLinks: document.querySelectorAll('[data-footer-track]'),

  // Grid & Counters
  challengesGrid: document.getElementById('challengesGrid'),
  emptyState: document.getElementById('emptyState'),
  resultsCount: document.getElementById('resultsCount'),
  activeFiltersSummary: document.getElementById('activeFiltersSummary'),
  heroTotalCount: document.getElementById('heroTotalCount'),

  // Modal Elements
  modal: document.getElementById('challengeModal'),
  modalContainer: document.getElementById('modalContainer'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalCloseFooterBtn: document.getElementById('modalCloseFooterBtn'),
  startChallengeBtn: document.getElementById('startChallengeBtn'),
  modalBadges: document.getElementById('modalBadges'),
  modalTitle: document.getElementById('modalTitle'),
  modalTime: document.getElementById('modalTime'),
  modalToolsText: document.getElementById('modalToolsText'),
  modalDescription: document.getElementById('modalDescription'),
  modalObjective: document.getElementById('modalObjective'),
  modalSkills: document.getElementById('modalSkills'),
  modalTools: document.getElementById('modalTools'),
  modalSteps: document.getElementById('modalSteps'),
  modalDeliverables: document.getElementById('modalDeliverables'),
  modalOutcome: document.getElementById('modalOutcome'),

  // Toast
  toastNotification: document.getElementById('toastNotification'),
  toastMessage: document.getElementById('toastMessage')
};

/* ==========================================================================
   4. Helper Formatting Functions
   ========================================================================== */
function getTrackBadgeHTML(track) {
  const isAnalytics = track === 'Data Analytics';
  const badgeClass = isAnalytics ? 'badge-track-analytics' : 'badge-track-webdev';
  const iconName = isAnalytics ? 'bar-chart-2' : 'code-2';

  return `
    <span class="badge ${badgeClass}">
      <i data-lucide="${iconName}" aria-hidden="true"></i>
      <span>${track}</span>
    </span>
  `;
}

function getDifficultyBadgeHTML(difficulty) {
  const normalized = difficulty.toLowerCase();
  return `
    <span class="badge badge-diff-${normalized}">
      ${difficulty}
    </span>
  `;
}

/* ==========================================================================
   5. Filtering & Search Logic
   ========================================================================== */
function filterByTrack(challenges, track) {
  if (track === 'all') return challenges;
  return challenges.filter((challenge) => challenge.track === track);
}

function filterByDifficulty(challenges, difficulty) {
  if (difficulty === 'all') return challenges;
  return challenges.filter((challenge) => challenge.difficulty === difficulty);
}

function searchChallenges(challenges, query) {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) return challenges;

  return challenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(trimmedQuery)
  );
}

function getFilteredChallenges() {
  let filtered = [...challengesData];
  filtered = filterByTrack(filtered, state.selectedTrack);
  filtered = filterByDifficulty(filtered, state.selectedDifficulty);
  filtered = searchChallenges(filtered, state.searchQuery);
  return filtered;
}

/* ==========================================================================
   6. Rendering & UI Updates
   ========================================================================== */
function updateChallengeCount(filteredCount, totalCount) {
  elements.resultsCount.innerHTML = `
    Showing <strong>${filteredCount}</strong> of <strong>${totalCount}</strong> challenges
  `;

  if (elements.heroTotalCount) {
    elements.heroTotalCount.textContent = totalCount;
  }

  // Render active filter summary chips
  const activeChips = [];
  if (state.selectedTrack !== 'all') {
    activeChips.push(`Track: ${state.selectedTrack}`);
  }
  if (state.selectedDifficulty !== 'all') {
    activeChips.push(`Level: ${state.selectedDifficulty}`);
  }
  if (state.searchQuery.trim() !== '') {
    activeChips.push(`Search: "${state.searchQuery.trim()}"`);
  }

  elements.activeFiltersSummary.innerHTML = activeChips
    .map((chip) => `<span class="active-chip">${escapeHTML(chip)}</span>`)
    .join('');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderChallengeCards(challenges) {
  const totalCount = challengesData.length;
  updateChallengeCount(challenges.length, totalCount);

  if (challenges.length === 0) {
    elements.challengesGrid.innerHTML = '';
    elements.challengesGrid.classList.add('hidden');
    elements.emptyState.classList.remove('hidden');
    refreshIcons();
    return;
  }

  elements.emptyState.classList.add('hidden');
  elements.challengesGrid.classList.remove('hidden');

  elements.challengesGrid.innerHTML = challenges
    .map(
      (challenge, index) => `
      <article class="challenge-card" style="animation-delay: ${index * 45}ms">
        <div class="card-top">
          <div class="card-badges">
            ${getTrackBadgeHTML(challenge.track)}
            ${getDifficultyBadgeHTML(challenge.difficulty)}
          </div>
          <h3 class="challenge-title">${escapeHTML(challenge.title)}</h3>
          <p class="challenge-desc">${escapeHTML(challenge.description)}</p>
          <p class="challenge-outcome">
            <strong>Expected Outcome:</strong> ${escapeHTML(challenge.expectedOutcome)}
          </p>
        </div>
        <div class="card-bottom">
          <div class="challenge-meta">
            <i data-lucide="clock" aria-hidden="true"></i>
            <span>Estimated: <strong>${escapeHTML(challenge.estimatedTime)}</strong></span>
          </div>
          <button
            type="button"
            class="btn btn-view-challenge"
            data-challenge-id="${challenge.id}"
            aria-label="View details for ${escapeHTML(challenge.title)}"
          >
            <span>View Challenge</span>
            <i data-lucide="arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </article>
    `
    )
    .join('');

  refreshIcons();
}

function applyAllFilters() {
  const filteredChallenges = getFilteredChallenges();
  renderChallengeCards(filteredChallenges);
}

function syncFilterButtonsUI() {
  elements.trackFilterBtns.forEach((btn) => {
    const isSelected = btn.dataset.track === state.selectedTrack;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', String(isSelected));
  });

  elements.difficultyFilterBtns.forEach((btn) => {
    const isSelected = btn.dataset.difficulty === state.selectedDifficulty;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', String(isSelected));
  });

  elements.searchInput.value = state.searchQuery;
  elements.clearSearchBtn.classList.toggle('hidden', state.searchQuery.trim() === '');
}

function resetFilters() {
  state.selectedTrack = 'all';
  state.selectedDifficulty = 'all';
  state.searchQuery = '';
  syncFilterButtonsUI();
  applyAllFilters();
}

/* ==========================================================================
   7. Modal Management (Open, Populate, Close, Keyboard & Scroll Lock)
   ========================================================================== */
function openChallengeModal(challengeId) {
  const challenge = challengesData.find((item) => item.id === challengeId);
  if (!challenge) return;

  state.activeChallenge = challenge;
  state.lastFocusedElement = document.activeElement;

  // Populate Header Badges & Title
  elements.modalBadges.innerHTML = `
    ${getTrackBadgeHTML(challenge.track)}
    ${getDifficultyBadgeHTML(challenge.difficulty)}
  `;
  elements.modalTitle.textContent = challenge.title;
  elements.modalTime.textContent = challenge.estimatedTime;
  elements.modalToolsText.textContent = challenge.tools.join(', ');

  // Populate Body Sections
  elements.modalDescription.textContent = challenge.description;
  elements.modalObjective.textContent = challenge.objective;
  elements.modalOutcome.textContent = challenge.expectedOutcome;

  // Populate Skills & Tools Tags
  elements.modalSkills.innerHTML = challenge.skills
    .map((skill) => `<span class="tag-item">${escapeHTML(skill)}</span>`)
    .join('');

  elements.modalTools.innerHTML = challenge.tools
    .map((tool) => `<span class="tag-item">${escapeHTML(tool)}</span>`)
    .join('');

  // Populate Steps & Deliverables Lists
  elements.modalSteps.innerHTML = challenge.steps
    .map((step) => `<li>${escapeHTML(step)}</li>`)
    .join('');

  elements.modalDeliverables.innerHTML = challenge.deliverables
    .map((item) => `<li>${escapeHTML(item)}</li>`)
    .join('');

  // Display Modal & Lock Background Scroll
  elements.modal.classList.remove('hidden');
  elements.modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Reset scroll inside modal body to top
  const modalBody = elements.modal.querySelector('.modal-body');
  if (modalBody) modalBody.scrollTop = 0;

  refreshIcons();
  elements.modalCloseBtn.focus();
}

function closeChallengeModal() {
  if (elements.modal.classList.contains('hidden')) return;

  elements.modal.classList.add('hidden');
  elements.modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  state.activeChallenge = null;

  if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
    state.lastFocusedElement.focus();
  }
}

/* ==========================================================================
   8. Mobile Navigation & Toast Feedback
   ========================================================================== */
function toggleMobileMenu() {
  const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
  const nextState = !isExpanded;
  elements.navToggle.setAttribute('aria-expanded', String(nextState));
  elements.navMenu.classList.toggle('open', nextState);
}

function closeMobileMenu() {
  elements.navToggle.setAttribute('aria-expanded', 'false');
  elements.navMenu.classList.remove('open');
}

let toastTimeout;
function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toastNotification.classList.remove('hidden');
  refreshIcons();

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toastNotification.classList.add('hidden');
  }, 3500);
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   9. Event Listeners Registration
   ========================================================================== */
function initEventListeners() {
  // Mobile Hamburger Menu
  elements.navToggle.addEventListener('click', toggleMobileMenu);

  elements.navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Track Filter Buttons
  elements.trackFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedTrack = btn.dataset.track;
      syncFilterButtonsUI();
      applyAllFilters();
    });
  });

  // Difficulty Filter Buttons
  elements.difficultyFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedDifficulty = btn.dataset.difficulty;
      syncFilterButtonsUI();
      applyAllFilters();
    });
  });

  // Track Overview Cards & Footer Quick-Filter Links
  elements.trackOverviewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedTrack = btn.dataset.filterTrack;
      syncFilterButtonsUI();
      applyAllFilters();
      document.getElementById('challenge-hub').scrollIntoView({ behavior: 'smooth' });
    });
  });

  elements.footerTrackLinks.forEach((link) => {
    link.addEventListener('click', () => {
      state.selectedTrack = link.dataset.footerTrack;
      syncFilterButtonsUI();
      applyAllFilters();
    });
  });

  // Real-time Search Input
  elements.searchInput.addEventListener('input', (event) => {
    state.searchQuery = event.target.value;
    elements.clearSearchBtn.classList.toggle('hidden', state.searchQuery.trim() === '');
    applyAllFilters();
  });

  // Clear Search Button
  elements.clearSearchBtn.addEventListener('click', () => {
    state.searchQuery = '';
    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.add('hidden');
    elements.searchInput.focus();
    applyAllFilters();
  });

  // Reset Filters Buttons (Control Bar & Empty State)
  elements.resetFiltersBtn.addEventListener('click', resetFilters);
  elements.emptyResetBtn.addEventListener('click', resetFilters);

  // Event Delegation for "View Challenge" Buttons inside Grid
  elements.challengesGrid.addEventListener('click', (event) => {
    const viewBtn = event.target.closest('.btn-view-challenge');
    if (viewBtn) {
      const challengeId = viewBtn.dataset.challengeId;
      openChallengeModal(challengeId);
    }
  });

  // Modal Close Controls
  elements.modalCloseBtn.addEventListener('click', closeChallengeModal);
  elements.modalCloseFooterBtn.addEventListener('click', closeChallengeModal);

  // Close Modal when clicking outside modal container (on backdrop)
  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) {
      closeChallengeModal();
    }
  });

  // Start Challenge Action inside Modal
  elements.startChallengeBtn.addEventListener('click', () => {
    if (!state.activeChallenge) return;
    const title = state.activeChallenge.title;
    closeChallengeModal();
    showToast(`Started "${title}"! Good luck building your project.`);
  });

  // Global Escape Key Handler (Closes Modal or Mobile Menu)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!elements.modal.classList.contains('hidden')) {
        closeChallengeModal();
      } else if (elements.navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });
}

/* ==========================================================================
   10. Initialize Application
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Challenge Hub only: keep the shared script safe on every other page.
  if (!elements.challengesGrid || !elements.navToggle || !elements.modal) return;
  initEventListeners();
  applyAllFilters();
  refreshIcons();
});
























const tasks = [
 {id:1,title:'TechBridge Landing Page',description:'Build a responsive landing page that introduces TechBridge and communicates the program clearly.',status:'Completed',details:'Focus on semantic HTML, responsive CSS, clear sections, navigation and a strong call to action.'},
 {id:2,title:'Multi-page Website',description:'Expand the TechBridge experience into a connected set of pages with consistent navigation and styling.',status:'Completed',details:'Create reusable visual patterns across pages and make sure links, layout and responsive behavior work together.'},
 {id:3,title:'Interactive JavaScript Features',description:'Add meaningful client-side interactions that make the website feel like a working product.',status:'Completed',details:'Use DOM selection, events, conditional logic and dynamic content instead of relying only on static HTML.'},
 {id:4,title:'Responsive Design',description:'Make the TechBridge website usable and visually consistent on desktop, tablet and mobile screens.',status:'In Progress',details:'Pay attention to navigation, spacing, typography, cards, buttons and content flow at smaller breakpoints.'},
 {id:5,title:'Challenge Hub',description:'Build a hub where interns can explore focused challenges and practise frontend skills.',status:'In Progress',details:'Organise challenges clearly, provide useful descriptions and connect the hub to the wider TechBridge website.'},
 {id:6,title:'Interactive Intern Dashboard',description:'Create this dashboard for tracking internship progress, tasks, technologies and challenges.',status:'In Progress',details:'Generate tasks from JavaScript data, calculate progress, filter statuses, open task details and switch technology information without refreshing.'},
 {id:7,title:'Modern Web Technologies',description:'Explore frontend frameworks and backend technologies used to build complete modern platforms.',status:'Not Started',details:'Research and explain Next.js, Vue.js, Angular and backend technologies such as Node.js, Express.js, Django, Flask, Laravel and .NET.'},
 {id:8,title:'Final Integration & Polish',description:'Bring the internship work together, test the experience and prepare the project for submission.',status:'Not Started',details:'Check navigation, responsiveness, accessibility, JavaScript behaviour, project organisation and the overall quality of the finished platform.'}
];

const taskGrid=document.getElementById('taskGrid'), completedCount=document.getElementById('completedCount'), remainingCount=document.getElementById('remainingCount'), progressText=document.getElementById('progressText'), progressBar=document.getElementById('progressBar'), emptyState=document.getElementById('emptyState');
let currentFilter='All';
const statusClass=s=>s==='Completed'?'completed':s==='In Progress'?'progress':'not-started';
function renderTasks(){
 const filtered=tasks.filter(t=>currentFilter==='All'||t.status===currentFilter); taskGrid.innerHTML=''; emptyState.hidden=filtered.length>0;
 filtered.forEach(t=>{const card=document.createElement('article');card.className='task-card';card.innerHTML=`<div class="task-top"><span class="task-number">TASK ${t.id}</span><span class="badge ${statusClass(t.status)}">${t.status}</span></div><h3>${t.title}</h3><p>${t.description}</p><div class="task-actions"><button class="button secondary view-btn" data-id="${t.id}">View Task</button>${t.status!=='Completed'?`<button class="button complete-btn" data-id="${t.id}">Mark as Completed</button>`:`<button class="button" disabled>Completed ✓</button>`}</div>`;taskGrid.appendChild(card)});
 updateProgress();
}
function updateProgress(){const done=tasks.filter(t=>t.status==='Completed').length;const pct=done/tasks.length*100;completedCount.textContent=done;remainingCount.textContent=tasks.length-done;progressText.textContent=`${Number.isInteger(pct)?pct:pct.toFixed(1)}%`;progressBar.style.width=`${pct}%`}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;renderTasks()}));
taskGrid.addEventListener('click',e=>{const id=Number(e.target.dataset.id);if(!id)return;const task=tasks.find(t=>t.id===id);if(e.target.classList.contains('complete-btn')){task.status='Completed';renderTasks();return}if(e.target.classList.contains('view-btn'))openModal(task)});

const modal=document.getElementById('taskModal');function openModal(t){document.getElementById('modalNumber').textContent=`TASK ${t.id} · ${t.status.toUpperCase()}`;document.getElementById('modalTitle').textContent=t.title;document.getElementById('modalDescription').textContent=t.description;document.getElementById('modalDetails').innerHTML=`<strong>What to focus on</strong><p>${t.details}</p>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false')};function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const tech={next:{title:'Next.js',body:'Next.js is a React framework used for building modern web applications. It adds features such as routing, server-side rendering, static generation and other production-ready tools around React, making it useful for websites and applications that need strong performance and structure.'},vue:{title:'Vue.js',body:'Vue.js is a progressive JavaScript framework for building user interfaces. Developers use it to create interactive interfaces and single-page applications, and it can be adopted gradually from a small component to a larger application.'},angular:{title:'Angular',body:'Angular is a full-featured framework for building web applications. It provides a structured approach to components, routing, forms, dependency injection and application architecture, and is commonly used for larger business applications.'},backend:{title:'Backend Development',body:'Backend development is the part of a web platform that runs behind the interface. It can manage business logic, authentication, databases, APIs and data processing, then communicate with the frontend so users can interact with real information.'}};
function renderTech(key){const t=tech[key];document.getElementById('techPanel').innerHTML=`<p class="eyebrow">TECHNOLOGY EXPLORER</p><h3>${t.title}</h3><p>${t.body}</p><span class="learn">Explore how it fits into a complete web platform →</span>`;document.querySelectorAll('.tech-tab').forEach(b=>b.classList.toggle('active',b.dataset.tech===key))}document.querySelectorAll('.tech-tab').forEach(b=>b.addEventListener('click',()=>renderTech(b.dataset.tech)));

const menuBtn=document.getElementById('menuBtn');menuBtn.addEventListener('click',()=>{const nav=document.querySelector('.nav');const open=nav.style.display==='flex';nav.style.display=open?'none':'flex';if(!open){nav.style.position='absolute';nav.style.top='78px';nav.style.left='0';nav.style.right='0';nav.style.padding='20px';nav.style.background='var(--bg)';nav.style.flexDirection='column';nav.style.borderBottom='1px solid var(--line)'}});
renderTasks();renderTech('next');
