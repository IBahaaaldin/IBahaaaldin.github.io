// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or respect OS preference
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  }
});

// Language Selector Functionality
const languageBtn = document.getElementById("language-btn");
const languageOptions = document.getElementById("language-options");
const languageText = languageBtn.querySelector("span");

languageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  languageOptions.classList.toggle("show");
});

// Close language dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!languageBtn.contains(e.target) && !languageOptions.contains(e.target)) {
    languageOptions.classList.remove("show");
  }
});

const languageOptionsList = document.querySelectorAll(".language-option");
let currentLanguage = localStorage.getItem("language") || "en";

// Set initial language
updateLanguage(currentLanguage);

languageOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedLang = option.getAttribute("data-lang");
    currentLanguage = selectedLang;
    localStorage.setItem("language", selectedLang);
    updateLanguage(selectedLang);
    languageOptions.classList.remove("show");
    languageText.textContent = selectedLang.toUpperCase();
  });
});

function updateLanguage(lang) {
  document.querySelectorAll("[data-en], [data-ar]").forEach((element) => {
    if (element.hasAttribute(`data-${lang}`)) {
      element.textContent = element.getAttribute(`data-${lang}`);
    }
  });

  // Update HTML direction for RTL languages
  if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }

  languageText.textContent = lang.toUpperCase();
}

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// 3D effect for cards on mousemove
const floatingCards = document.querySelectorAll(".floating-card");

floatingCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  card.addEventListener("mouseenter", () => {
    card.style.transition = "none";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.5s ease";
    card.style.transform = `rotateZ(${card.style.getPropertyValue(
      "--rotate"
    )})`;
  });
});

// Add intersection observer for animation
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(aboutSection);
});

// Add intersection observer for animation
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  projectCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(50px)";
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
      index * 0.1
    }s`;

    observer.observe(card);
  });
});

// Add intersection observer for animation
document.addEventListener("DOMContentLoaded", function () {
  const skillCards = document.querySelectorAll(".skill-card");
  const techItems = document.querySelectorAll(".tech-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  // Animate skill cards
  skillCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
      index * 0.1
    }s`;

    observer.observe(card);
  });

  // Animate tech items
  techItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(20px)";
    item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
      index * 0.05 + 0.3
    }s`;

    observer.observe(item);
  });
});

// Sticky download card functionality
document.addEventListener("DOMContentLoaded", function () {
  const downloadCard = document.getElementById("downloadCard");
  const downloadColumn = document.querySelector(".download-column");
  const resumeSection = document.querySelector(".resume-section");

  if (downloadCard && downloadColumn && resumeSection) {
    const cardHeight = downloadCard.offsetHeight;
    const columnHeight = downloadColumn.offsetHeight;
    const sectionHeight = resumeSection.offsetHeight;

    // Calculate when to switch from sticky to absolute positioning
    const switchPoint = sectionHeight - cardHeight - 40; // 40px padding from bottom

    function updateCardPosition() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = resumeSection.offsetTop;
      const sectionBottom = sectionTop + sectionHeight;
      const currentPosition = scrollTop - sectionTop;

      if (currentPosition > switchPoint) {
        downloadCard.classList.add("sticky-bottom");
      } else {
        downloadCard.classList.remove("sticky-bottom");
      }
    }

    // Initial update
    updateCardPosition();

    // Update on scroll
    window.addEventListener("scroll", updateCardPosition);
    window.addEventListener("resize", updateCardPosition);
  }

  // Animation for timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateX(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  timelineItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = "translateX(30px)";
    item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
      index * 0.1
    }s`;

    observer.observe(item);
  });
});

// GitHub Activity Animation
document.addEventListener("DOMContentLoaded", function () {
  // Animate stats counting
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Start counting animation when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate stats
          animateValue(document.getElementById("repos-count"), 0, 24, 2000);
          animateValue(document.getElementById("stars-count"), 0, 47, 2000);
          animateValue(document.getElementById("commits-count"), 0, 327, 2000);
          animateValue(document.getElementById("followers-count"), 0, 18, 2000);

          // Animate activity items
          const activityItems = document.querySelectorAll(".activity-item");
          activityItems.forEach((item, index) => {
            item.style.opacity = 0;
            item.style.transform = "translateX(-20px)";
            item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
              index * 0.2
            }s`;

            setTimeout(() => {
              item.style.opacity = 1;
              item.style.transform = "translateX(0)";
            }, 100 + index * 200);
          });

          // Animate repo cards
          const repoCards = document.querySelectorAll(".repo-card");
          repoCards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = "translateY(20px)";
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
              index * 0.2 + 0.5
            }s`;

            setTimeout(() => {
              card.style.opacity = 1;
              card.style.transform = "translateY(0)";
            }, 500 + index * 200);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(document.querySelector(".github-section"));
});

// Set current year for copyright
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Initialize footer animations
document.addEventListener("DOMContentLoaded", function () {
  const footerElements = document.querySelectorAll(
    ".footer-links li, .footer-contact .contact-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  footerElements.forEach((element, index) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = `opacity 0.5s ease, transform 0.5s ease ${
      index * 0.1
    }s`;

    observer.observe(element);
  });
});
