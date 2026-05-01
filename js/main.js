/* 
   OZISOFT — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  //  NAVBAR 
  const navbar = document.getElementById('navbar');
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Burger toggle
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burgerBtn.classList.toggle('open', isOpen);
      burgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
      }
    });
  }

  // ── SCROLL REVEAL ────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Add reveal classes to elements
  const revealTargets = document.querySelectorAll(
    '.service-card, .why__item, .testimonial, .value-card, .team-card, ' +
    '.tech-item, .process__step, .portfolio-item, .metric, .faq-item, ' +
    '.contact-info-card, .service-detail__left, .service-detail__right'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('reveal-delay-1');
    if (i % 4 === 2) el.classList.add('reveal-delay-2');
    if (i % 4 === 3) el.classList.add('reveal-delay-3');
    revealObserver.observe(el);
  });

  // ── SERVICE TABS (services.html) ─────────────
  const stabs = document.querySelectorAll('.stab');
  stabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      stabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });

    // Highlight on scroll
    const targetId = tab.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              stabs.forEach(t => t.classList.remove('active'));
              tab.classList.add('active');
            }
          });
        }, { rootMargin: '-40% 0px -55% 0px' });
        observer.observe(targetEl);
      }
    }
  });

  // PORTFOLIO FILTER 
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeUp 0.4s ease both';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // COUNTER ANIMATION
  const counters = document.querySelectorAll('.metric__val');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el, target) {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + (el.dataset.target === '98' ? '%' : '+');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + (el.dataset.target === '98' ? '%' : '+');
    }

    requestAnimationFrame(update);
  }

  // FAQ ACCORDION 
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-item__q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // CONTACT FORM 
  // const contactForm = document.getElementById('contactForm');
  // const formSuccess = document.getElementById('formSuccess');

  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const btn = contactForm.querySelector('button[type="submit"]');
  //     btn.textContent = 'Sending…';
  //     btn.disabled = true;

  //     setTimeout(() => {
  //       contactForm.style.display = 'none';
  //       if (formSuccess) {
  //         formSuccess.classList.add('show');
  //       }
  //     }, 1200);
  //   });
  // }

  // SMOOTH ANCHOR SCROLL 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
// DATE CALCULATOR
const date = new Date;
const year = date.getFullYear();
document.querySelector('.year').innerHTML = year;
const age = year - 2024;
document.getElementById('age').innerHTML = age + '+';
document.querySelector(".js-compute").innerHTML =
  `<div class="metric__val" data-target="${age}">0</div> 
 <p>Years Experience</p>
`;