const tasks = [
  { id: 1, title: 'TechBridge Landing Page', description: 'Build a responsive landing page that introduces TechBridge and communicates the program clearly.', status: 'Completed', details: 'Focus on semantic HTML, responsive CSS, clear sections, navigation and a strong call to action.' },
  { id: 2, title: 'Multi-page Website', description: 'Expand the TechBridge experience into a connected set of pages with consistent navigation and styling.', status: 'Completed', details: 'Create reusable visual patterns across pages and make sure links, layout and responsive behavior work together.' },
  { id: 3, title: 'Interactive JavaScript Features', description: 'Add meaningful client-side interactions that make the website feel like a working product.', status: 'Completed', details: 'Use DOM selection, events, conditional logic and dynamic content instead of relying only on static HTML.' },
  { id: 4, title: 'Responsive Design', description: 'Make the TechBridge website usable and visually consistent on desktop, tablet and mobile screens.', status: 'In Progress', details: 'Pay attention to navigation, spacing, typography, cards, buttons and content flow at smaller breakpoints.' },
  { id: 5, title: 'Challenge Hub', description: 'Build a hub where interns can explore focused challenges and practise frontend skills.', status: 'In Progress', details: 'Organise challenges clearly, provide useful descriptions and connect the hub to the wider TechBridge website.' },
  { id: 6, title: 'Interactive Intern Dashboard', description: 'Create this dashboard for tracking internship progress, tasks, technologies and challenges.', status: 'In Progress', details: 'Generate tasks from JavaScript data, calculate progress, filter statuses, open task details and switch technology information without refreshing.' },
  { id: 7, title: 'Modern Web Technologies', description: 'Explore frontend frameworks and backend technologies used to build complete modern platforms.', status: 'Not Started', details: 'Research and explain Next.js, Vue.js, Angular and backend technologies such as Node.js, Express.js, Django, Flask, Laravel and .NET.' },
  { id: 8, title: 'Final Integration & Polish', description: 'Bring the internship work together, test the experience and prepare the project for submission.', status: 'Not Started', details: 'Check navigation, responsiveness, accessibility, JavaScript behaviour, project organisation and the overall quality of the finished platform.' }
];

const taskGrid = document.getElementById('taskGrid'), completedCount = document.getElementById('completedCount'), remainingCount = document.getElementById('remainingCount'), progressText = document.getElementById('progressText'), progressBar = document.getElementById('progressBar'), emptyState = document.getElementById('emptyState');
let currentFilter = 'All';
const statusClass = s => s === 'Completed' ? 'completed' : s === 'In Progress' ? 'progress' : 'not-started';
function renderTasks() {
  const filtered = tasks.filter(t => currentFilter === 'All' || t.status === currentFilter); taskGrid.innerHTML = ''; emptyState.hidden = filtered.length > 0;
  filtered.forEach(t => { const card = document.createElement('article'); card.className = 'task-card'; card.innerHTML = `<div class="task-top"><span class="task-number">TASK ${t.id}</span><span class="badge ${statusClass(t.status)}">${t.status}</span></div><h3>${t.title}</h3><p>${t.description}</p><div class="task-actions"><button class="button secondary view-btn" data-id="${t.id}">View Task</button>${t.status !== 'Completed' ? `<button class="button complete-btn" data-id="${t.id}">Mark as Completed</button>` : `<button class="button" disabled>Completed ✓</button>`}</div>`; taskGrid.appendChild(card) });
  updateProgress();
}
function updateProgress() { const done = tasks.filter(t => t.status === 'Completed').length; const pct = done / tasks.length * 100; completedCount.textContent = done; remainingCount.textContent = tasks.length - done; progressText.textContent = `${Number.isInteger(pct) ? pct : pct.toFixed(1)}%`; progressBar.style.width = `${pct}%` }

document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.filter').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentFilter = btn.dataset.filter; renderTasks() }));
taskGrid.addEventListener('click', e => { const id = Number(e.target.dataset.id); if (!id) return; const task = tasks.find(t => t.id === id); if (e.target.classList.contains('complete-btn')) { task.status = 'Completed'; renderTasks(); return } if (e.target.classList.contains('view-btn')) openModal(task) });

const modal = document.getElementById('taskModal'); function openModal(t) { document.getElementById('modalNumber').textContent = `TASK ${t.id} · ${t.status.toUpperCase()}`; document.getElementById('modalTitle').textContent = t.title; document.getElementById('modalDescription').textContent = t.description; document.getElementById('modalDetails').innerHTML = `<strong>What to focus on</strong><p>${t.details}</p>`; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false') }; function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true') } document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal)); document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });

const tech = { next: { title: 'Next.js', body: 'Next.js is a React framework used for building modern web applications. It adds features such as routing, server-side rendering, static generation and other production-ready tools around React, making it useful for websites and applications that need strong performance and structure.' }, vue: { title: 'Vue.js', body: 'Vue.js is a progressive JavaScript framework for building user interfaces. Developers use it to create interactive interfaces and single-page applications, and it can be adopted gradually from a small component to a larger application.' }, angular: { title: 'Angular', body: 'Angular is a full-featured framework for building web applications. It provides a structured approach to components, routing, forms, dependency injection and application architecture, and is commonly used for larger business applications.' }, backend: { title: 'Backend Development', body: 'Backend development is the part of a web platform that runs behind the interface. It can manage business logic, authentication, databases, APIs and data processing, then communicate with the frontend so users can interact with real information.' } };
function renderTech(key) { const t = tech[key]; document.getElementById('techPanel').innerHTML = `<p class="eyebrow">TECHNOLOGY EXPLORER</p><h3>${t.title}</h3><p>${t.body}</p><span class="learn">Explore how it fits into a complete web platform →</span>`; document.querySelectorAll('.tech-tab').forEach(b => b.classList.toggle('active', b.dataset.tech === key)) } document.querySelectorAll('.tech-tab').forEach(b => b.addEventListener('click', () => renderTech(b.dataset.tech)));

const menuBtn = document.getElementById('menuBtn');
const dashboardNav = document.getElementById('dashboardNav');

if (menuBtn && dashboardNav) {
  const setDashboardMenuState = (open) => {
    dashboardNav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('dashboard-nav-open', open);
  };

  menuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDashboardMenuState(!dashboardNav.classList.contains('open'));
  });

  dashboardNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setDashboardMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (
      dashboardNav.classList.contains('open') &&
      !dashboardNav.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      setDashboardMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setDashboardMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setDashboardMenuState(false);
  });
}

// Highlight the current dashboard navigation item.
const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
if (dashboardNav) {
  dashboardNav.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
}
renderTasks(); renderTech('next');
