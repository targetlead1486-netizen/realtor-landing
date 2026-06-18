// Scroll-triggered fade-in
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// Sticky CTA — hide when final CTA is visible
const stickyCta = document.getElementById('stickyCta');
const finalCta = document.querySelector('.final-cta');

if (stickyCta && finalCta) {
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        stickyCta.style.opacity = entry.isIntersecting ? '0' : '1';
        stickyCta.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
      });
    },
    { threshold: 0.1 }
  );
  ctaObserver.observe(finalCta);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      border-radius:50%;background:rgba(255,255,255,0.3);
      transform:scale(0);animation:ripple 0.5s ease-out;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      pointer-events:none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple keyframe injection
const style = document.createElement('style');
style.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0}}';
document.head.appendChild(style);
