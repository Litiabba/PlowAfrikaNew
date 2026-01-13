// ==========================================================================
// PlowAfrika – Main JS (Hamburger + Smooth Scroll + Contact Form)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Hamburger Menu Toggle ───────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');

      // Update aria-expanded for accessibility
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking on link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  // ─── Smooth Scrolling for internal # links ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const navHeight = 80; // approx navbar + buffer
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top: y, behavior: 'smooth' });

        // Close mobile menu if open
        if (hamburger && navLinks) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', false);
        }
      }
    });
  });

  // ─── Contact Form Email Routing (if you have a form) ───
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const inquiry = document.getElementById("inquiry").value;

      let recipientEmail = "";
      switch (inquiry) {
        case "farmer_support":
          recipientEmail = "support@plowafrika.com";
          break;
        case "partnership":
          recipientEmail = "partnerships@plowafrika.com";
          break;
        case "investment":
          recipientEmail = "invest@plowafrika.com";
          break;
        case "media":
          recipientEmail = "media@plowafrika.com";
          break;
        default:
          recipientEmail = "info@plowafrika.com";
      }

      const subject = "New Contact Form Inquiry";
      const body = `Name: ${name}\nEmail: ${email || "Not provided"}\nInquiry Type: ${inquiry}`;

      window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

});

 

  const slides = document.querySelectorAll('#aboutHero .slide');
  const dots = document.querySelectorAll('#aboutHero .dot');

  let currentIndex = 0;
  const interval = 5000;

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }, interval);