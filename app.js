/* ============================================================
   MITESH — Portfolio  |  app.js
   ============================================================ */

'use strict';

/* ── Prevent scroll restore on reload ─────────────────────── */
if (history.scrollRestoration) history.scrollRestoration = 'manual';

/* ── Year ──────────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Navbar scroll effect ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / Mobile Menu ───────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'translateY(7px) rotate(45deg)';
    s2.style.opacity   = '0';
    s3.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── Scroll Reveal (IntersectionObserver) ──────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.hidden').forEach(el => revealObs.observe(el));

/* ── Active Nav Link (Scroll Spy) ──────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const spyObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#eaeaf2';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spyObs.observe(s));

/* ── Email Copy ────────────────────────────────────────────── */
function copyEmail() {
  const email = 'kmitesh2006@gmail.com';
  navigator.clipboard.writeText(email)
    .then(() => showToast('✓ Email copied to clipboard'))
    .catch(() => showToast('✕ Could not copy — ' + email));
}

function showToast(msg) {
  const toast = document.getElementById('email-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._tid);
  toast._tid = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Certificate Carousel Scroll ──────────────────────────── */
const certList  = document.getElementById('certList');
const certLeft  = document.getElementById('certLeft');
const certRight = document.getElementById('certRight');

if (certLeft && certRight && certList) {
  certLeft.addEventListener('click',  () => certList.scrollBy({ left: -340, behavior: 'smooth' }));
  certRight.addEventListener('click', () => certList.scrollBy({ left:  340, behavior: 'smooth' }));
}

/* ── Certificate Modal ─────────────────────────────────────── */
const certModal   = document.getElementById('certModal');
const modalClose  = document.getElementById('modalClose');
const modalImg    = document.getElementById('modal-img');
const modalTitle  = document.getElementById('modal-title');
const modalIssuer = document.getElementById('modal-issuer');

function openCertModal(card) {
  // Try real file first; fall back to preview placeholder
  const realSrc    = card.dataset.src;
  const previewSrc = card.dataset.preview;

  // Check if real file likely exists by extension — always try it
  const imgToLoad = realSrc || previewSrc;

  const tempImg  = new Image();
  tempImg.onload  = () => {
    modalImg.src = imgToLoad;
    revealModal();
  };
  tempImg.onerror = () => {
    // Real cert not found locally, fall back to placeholder
    modalImg.src = previewSrc;
    revealModal();
  };
  tempImg.src = imgToLoad;

  modalTitle.textContent  = card.dataset.title  || '';
  modalIssuer.textContent = card.dataset.issuer || '';
}

function revealModal() {
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { modalImg.src = ''; }, 400);
}

// Attach click to each cert card
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click',   () => openCertModal(card));
  card.setAttribute('tabindex',    '0');
  card.setAttribute('role',        'button');
  card.setAttribute('aria-label',  'View certificate: ' + (card.dataset.title || ''));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCertModal(card); }
  });
});

modalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', e => { if (e.target === certModal) closeCertModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCertModal(); });

/* ── View More Projects ─────────────────────────────────────── */
const viewMoreBtn   = document.getElementById('viewMoreBtn');
const viewMoreText  = document.getElementById('viewMoreText');
const extraProjects = document.querySelectorAll('.extra-project');

if (viewMoreBtn) {
  viewMoreBtn.addEventListener('click', () => {
    const expanded = viewMoreBtn.classList.toggle('expanded');

    if (expanded) {
      extraProjects.forEach(p => {
        p.classList.add('is-visible');
        setTimeout(() => p.classList.add('show'), 30);
      });
      viewMoreText.textContent = 'Show Less';
    } else {
      extraProjects.forEach(p => {
        p.classList.remove('show');
        setTimeout(() => p.classList.remove('is-visible'), 500);
      });
      viewMoreText.textContent = 'View More';
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ── Project Card Subtle Tilt on Hover ─────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── Smooth anchor links ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
