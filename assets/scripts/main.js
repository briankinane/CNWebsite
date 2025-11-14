const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const scrollButtons = document.querySelectorAll('.scroll-button');
const mapTrack = document.querySelector('.map-track');
const mapSteps = document.querySelectorAll('.map-step');
const detailTitle = document.querySelector('.detail-title');
const detailCopy = document.querySelector('.detail-copy');
const yearTarget = document.getElementById('year');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const updateScrollButtons = () => {
  if (!mapTrack) return;
  const maxScrollLeft = mapTrack.scrollWidth - mapTrack.clientWidth - 5;
  scrollButtons.forEach((button) => {
    if (button.classList.contains('prev')) {
      button.disabled = mapTrack.scrollLeft <= 5;
    } else {
      button.disabled = mapTrack.scrollLeft >= maxScrollLeft;
    }
  });
};

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.classList.contains('next') ? 1 : -1;
    mapTrack.scrollBy({ left: direction * 260, behavior: 'smooth' });
  });
});

if (mapTrack) {
  mapTrack.addEventListener('scroll', updateScrollButtons);
  window.addEventListener('resize', updateScrollButtons);
  updateScrollButtons();
}

const setActiveStep = (step) => {
  mapSteps.forEach((mapStep) => mapStep.classList.toggle('active', mapStep === step));
  if (detailTitle && detailCopy) {
    detailTitle.textContent = step.dataset.step || step.querySelector('h3').textContent;
    detailCopy.textContent = step.querySelector('p').textContent;
  }
};

mapSteps.forEach((step, index) => {
  step.addEventListener('click', () => {
    setActiveStep(step);
  });

  if (index === 0) {
    setActiveStep(step);
  }
});

if ('IntersectionObserver' in window && mapTrack) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStep(entry.target);
        }
      });
    },
    { root: mapTrack, threshold: 0.6 }
  );

  mapSteps.forEach((step) => observer.observe(step));
}
