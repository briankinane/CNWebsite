const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#primary-menu');
const yearEl = document.querySelector('#year');
const animatedBlocks = document.querySelectorAll('[data-animate]');

function updateHeaderState() {
  const scrolled = window.scrollY > 60;
  header?.setAttribute('data-scroll', scrolled ? 'true' : 'false');
}

function toggleNav() {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', (!expanded).toString());
  navList?.setAttribute('aria-hidden', expanded ? 'true' : 'false');
}

function handleResize() {
  if (!navList) return;
  if (window.innerWidth > 960) {
    navToggle?.setAttribute('aria-expanded', 'false');
    navList.setAttribute('aria-hidden', 'false');
  } else {
    const expanded = navToggle?.getAttribute('aria-expanded') === 'true';
    navList.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  }
}

function setYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

function initRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    animatedBlocks.forEach((block) => block.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -60px 0px' }
  );

  animatedBlocks.forEach((block) => observer.observe(block));
}

navToggle?.addEventListener('click', toggleNav);
window.addEventListener('scroll', updateHeaderState);
window.addEventListener('resize', handleResize);

updateHeaderState();
handleResize();
setYear();
initRevealObserver();
