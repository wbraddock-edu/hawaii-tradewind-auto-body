// Dark mode
const html = document.documentElement;
const darkBtn = document.getElementById('darkToggle');
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
if (darkBtn) {
  darkBtn.addEventListener('click', () => {
    const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  });
}

// Hamburger
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (ham && mobileNav) {
  ham.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    ham.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up, .fade-left').forEach(el => observer.observe(el));

// Back to top
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// FAQ
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const ans = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-answer').classList.remove('open'); });
    if (!isOpen) { item.classList.add('open'); ans.classList.add('open'); }
  });
});

// Booking multi-step
let currentStep = 1;
const totalSteps = 4;
function goToStep(n) {
  document.querySelectorAll('.form-step').forEach((s, i) => s.classList.toggle('active', i + 1 === n));
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.toggle('active', i + 1 === n);
    d.classList.toggle('done', i + 1 < n);
  });
  document.querySelectorAll('.step-line').forEach((l, i) => l.classList.toggle('done', i + 1 < n));
  currentStep = n;
}
window.nextStep = function() { if (currentStep < totalSteps) goToStep(currentStep + 1); };
window.prevStep = function() { if (currentStep > 1) goToStep(currentStep - 1); };
window.submitBooking = function() { goToStep(4); };

// Service option select
document.querySelectorAll('.service-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    opt.closest('.service-options').querySelectorAll('.service-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// Admin login
const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
if (loginOverlay && loginForm) {
  const stored = sessionStorage.getItem('adminAuth');
  if (stored === 'true') loginOverlay.style.display = 'none';
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('adminPw').value;
    if (pw === 'admin123') { sessionStorage.setItem('adminAuth', 'true'); loginOverlay.style.display = 'none'; }
    else { document.getElementById('loginError').textContent = 'Incorrect password.'; }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});
