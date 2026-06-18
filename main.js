document.addEventListener("DOMContentLoaded", function () {
  /* ---------- AOS INIT ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    const closeMenu = () => {
      hamburger.classList.remove("open");
      navMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      hamburger.classList.add("open");
      navMenu.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ---------- ANIMATED STAT COUNTERS (trigger on scroll) ---------- */
  const statNumbers = document.querySelectorAll(".stat-num");

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-target"));
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1800;
    const startTime = performance.now();

    const isInt = Number.isInteger(target);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = target * eased;
      const displayVal = isInt
        ? Math.floor(current).toLocaleString("en-IN")
        : current.toFixed(0);
      el.textContent = prefix + displayVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent =
          prefix + (isInt ? target.toLocaleString("en-IN") : target) + suffix;
      }
    };
    requestAnimationFrame(tick);
  };

  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  /* ---------- TESTIMONIALS CAROUSEL ---------- */
  const track = document.getElementById("testiTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsWrap = document.getElementById("carouselDots");

  if (track && prevBtn && nextBtn && dotsWrap) {
    const slides = Array.from(track.children);
    const dots = Array.from(dotsWrap.children);
    let currentIndex = 0;
    let autoplayTimer = null;

    const goToSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
    };
    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };

    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoplay();
    });
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoplay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goToSlide(i);
        startAutoplay();
      });
    });

    // Pause on hover/focus, resume on leave
    const carousel = track.closest(".testi-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);
    }

    // Basic swipe support for touch devices
    let touchStartX = 0;
    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
      },
      { passive: true },
    );
    track.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
        }
        startAutoplay();
      },
      { passive: true },
    );

    goToSlide(0);
    startAutoplay();
  }

  /* ---------- FAQ ACCORDION ---------- */
  const faqQuestions = document.querySelectorAll(".faq-q");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answerId = btn.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);

      // Close all other open FAQs (single-open accordion behaviour)
      faqQuestions.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          const otherAnswer = document.getElementById(
            otherBtn.getAttribute("aria-controls"),
          );
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formSuccess = document.getElementById("formSuccess");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (input, errorId, message) => {
      input.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.textContent = message;
    };

    const clearError = (input, errorId) => {
      input.classList.remove("invalid");
      input.removeAttribute("aria-invalid");
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.textContent = "";
    };

    const validateField = (input, errorId) => {
      if (!input) return true;
      const value = input.value.trim();

      if (input.hasAttribute("required") && value === "") {
        showError(input, errorId, "This field is required.");
        return false;
      }
      if (input === emailInput && value !== "" && !emailPattern.test(value)) {
        showError(input, errorId, "Please enter a valid email address.");
        return false;
      }
      clearError(input, errorId);
      return true;
    };

    // Live validation on blur
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      const errorId = input.id + "-error";
      input.addEventListener("blur", () => validateField(input, errorId));
      input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) validateField(input, errorId);
      });
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, "name-error");
      const isEmailValid = validateField(emailInput, "email-error");
      const isMessageValid = validateField(messageInput, "message-error");

      const roleInput = document.getElementById("role");
      let isRoleValid = true;
      if (
        roleInput &&
        roleInput.hasAttribute("required") &&
        roleInput.value === ""
      ) {
        roleInput.classList.add("invalid");
        isRoleValid = false;
      } else if (roleInput) {
        roleInput.classList.remove("invalid");
      }

      if (isNameValid && isEmailValid && isMessageValid && isRoleValid) {
        // Simulate successful submission (no backend in this demo)
        if (formSuccess) {
          formSuccess.hidden = false;
          formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        contactForm.reset();
        setTimeout(() => {
          if (formSuccess) formSuccess.hidden = true;
        }, 6000);
      } else {
        // Focus first invalid field for accessibility
        const firstInvalid = contactForm.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /* ---------- SMOOTH SCROLL OFFSET FOR FIXED NAVBAR ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = 90;
          const top =
            targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });
});
