/* ==========================================================
   KICHOLOCHE DESKTOP V1
   Frontend Interaction
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  initStickyNavbar();
  initHeroSlider();
  initSearch();
  initNotification();
  initSmoothScroll();
  initCategoryLinks();
  initCardHover();

});

/* ==========================================================
   STICKY NAVBAR
   ========================================================== */

function initStickyNavbar() {

  const nav = document.querySelector(".main-nav");
  if (!nav) return;

  const offset = nav.offsetTop;

  window.addEventListener("scroll", () => {
    if (window.scrollY > offset) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });

}

/* ==========================================================
   HERO SLIDER
   ========================================================== */

function initHeroSlider() {

  const hero = document.querySelector(".hero-left");
  if (!hero) return;

  const slides = [
    "images/hero-train.jpg",
    "images/darjeeling.jpg",
    "images/sikkim.jpg"
  ];

  let current = 0;

  setInterval(() => {

    current++;

    if (current >= slides.length) current = 0;

    hero.style.backgroundImage =
      `url('${slides[current]}')`;

  }, 5000);

}

/* ==========================================================
   LIVE SEARCH
   ========================================================== */

function initSearch() {

  const input = document.querySelector(".search-box input");

  if (!input) return;

  const data = [
    "WBPSC",
    "PM Kisan",
    "Lakshmi Bhandar",
    "Scholarship",
    "Lottery",
    "Result",
    "ICDS",
    "SSC",
    "Kanyashree",
    "NEET"
  ];

  let suggestionBox = document.createElement("div");
  suggestionBox.className = "search-suggestions";

  document.querySelector(".search-box").appendChild(suggestionBox);

  input.addEventListener("input", () => {

    const value = input.value.trim().toLowerCase();

    suggestionBox.innerHTML = "";

    if (value.length === 0) return;

    data
      .filter(item => item.toLowerCase().includes(value))
      .slice(0, 5)
      .forEach(item => {

        const div = document.createElement("div");

        div.className = "suggestion";

        div.textContent = item;

        div.onclick = () => {

          input.value = item;
          suggestionBox.innerHTML = "";

        };

        suggestionBox.appendChild(div);

      });

  });

  document.addEventListener("click", e => {

    if (!e.target.closest(".search-box")) {

      suggestionBox.innerHTML = "";

    }

  });

}

/* ==========================================================
   NOTIFICATION
   ========================================================== */

function initNotification() {

  const bell = document.querySelector(".notify");

  if (!bell) return;

  bell.addEventListener("click", () => {

    alert("🔔 নতুন সরকারি আপডেট শীঘ্রই এখানে দেখা যাবে।");

  });

}

/* ==========================================================
   SMOOTH SCROLL
   ========================================================== */

function initSmoothScroll() {

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

      const target = document.querySelector(link.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });

}

/* ==========================================================
   CATEGORY CLICK
   ========================================================== */

function initCategoryLinks() {

  const routes = {

    "সরকারি চাকরি": "/government-jobs",
    "স্কলারশিপ": "/scholarships",
    "রেজাল্ট": "/results",
    "শিক্ষা ও পরীক্ষা": "/education",
    "সরকারি প্রকল্প": "/schemes",
    "দ্রুত লিঙ্কস": "/quick-links"

  };

  document.querySelectorAll(".cat").forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

      const title = card.querySelector("h4").innerText;

      const path = routes[title];

      if (path) {

        console.log("Future Route:", path);

        // future:
        // location.href = path;

      }

    });

  });

}

/* ==========================================================
   CARD HOVER EFFECT
   ========================================================== */

function initCardHover() {

  document.querySelectorAll(".content-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

      card.style.transform = "translateY(-4px)";
      card.style.transition = ".25s";

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = "translateY(0)";

    });

  });

}
