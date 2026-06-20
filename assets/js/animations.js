/**
 * Bail Bond Agency Website
 * Animations Controller - Controls GSAP reveals, transitions, and statistics counting.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP is loaded
  if (typeof gsap === 'undefined') {
    // GSAP fallback: Add standard scrolled reveals
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
    return;
  }

  // Registers ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero section animation entrance
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    
    tl.fromTo('.hero-tag', { opacity: 0, y: -20 }, { opacity: 1, y: 0, delay: 0.2 })
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.6')
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6')
      .fromTo('.hero-actions .btn', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, stagger: 0.15 }, '-=0.5')
      .fromTo('.hero-split-image', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1.2 }, '-=0.8');
  }

  // Counter animations
  const statsElements = document.querySelectorAll('.stat-number');
  statsElements.forEach(stat => {
    const targetVal = parseInt(stat.getAttribute('data-target'), 10);
    if (isNaN(targetVal)) return;

    gsap.fromTo(stat, 
      { textContent: '0' },
      {
        textContent: targetVal,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          // Append positive sign or formatting if specified
          const suffix = stat.getAttribute('data-suffix') || '';
          stat.textContent = stat.textContent + suffix;
        }
      }
    );
  });

  // Reveal elements on scroll using ScrollTrigger
  const scrollElements = document.querySelectorAll('.reveal-on-scroll');
  scrollElements.forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => el.classList.add('revealed')
        }
      }
    );
  });

  // Calm hover reveal effects for services cards
  const hoverCards = document.querySelectorAll('.card-classic, .blog-card');
  hoverCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -5, duration: 0.3, ease: 'power1.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power1.out' });
    });
  });
});
