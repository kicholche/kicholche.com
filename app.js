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

/* ===== LIVE DATA V2 ===== */
(function(){
const demo={government_updates:[{title:"PM Kisan ২০তম কিস্তি প্রদান শুরু",created_at:"2025-04-12",tag:"নতুন"},{title:"লক্ষ্মী ভাণ্ডার প্রকল্পে টাকা বৃদ্ধি",created_at:"2025-04-10",tag:"নতুন"},{title:"অন্নপূর্ণা ভাণ্ডার — নতুন আবেদন শুরু",created_at:"2025-04-08",tag:"নতুন"},{title:"WBPSC গ্রুপ C নিয়োগ বিজ্ঞপ্তি",created_at:"2025-04-06",tag:"চলমান"},{title:"মাধ্যমিক পরীক্ষা ২০২৫ — ফলাফল প্রকাশ",created_at:"2025-04-05",tag:"জানুন"}],jobs:[{title:"WBPSC গ্রুপ C ও D",created_at:"2025-04-12",tag:"পশ্চিমবঙ্গ"},{title:"IB - বিভিন্ন পদে নিয়োগ",created_at:"2025-04-10",tag:"কেন্দ্রীয়"},{title:"TCS - বিভিন্ন পদে নিয়োগ",created_at:"2025-04-08",tag:"বেসরকারি"},{title:"ICICI Bank - Probationary Officer",created_at:"2025-04-06",tag:"বেসরকারি"}],scholarships:[{title:"পশ্চিমবঙ্গ স্কলারশিপ 2025",published_on:"2025-04-12",tag:"পশ্চিমবঙ্গ"},{title:"OBC স্কলারশিপ 2025",published_on:"2025-04-10",tag:"পশ্চিমবঙ্গ"},{title:"SC ST স্কলারশিপ 2025",published_on:"2025-04-08",tag:"পশ্চিমবঙ্গ"},{title:"NSP Scholarship 2025",published_on:"2025-04-06",tag:"কেন্দ্রীয়"}],results:[{title:"মাধ্যমিক পরীক্ষা রেজাল্ট",published_on:"2025-04-12",tag:"WB"},{title:"উচ্চমাধ্যমিক রেজাল্ট 2025",published_on:"2025-04-10",tag:"WB"},{title:"WBJEE 2025",published_on:"2025-04-08",tag:"WB"},{title:"ICSE রেজাল্ট 2025",published_on:"2025-04-06",tag:"ICSE"}],form_fill_up:[{title:"WBPSC গ্রুপ C ও D",deadline:"2025-04-12"},{title:"ICDS সুপারভাইজার",deadline:"2025-04-10"},{title:"RPF কনস্টেবল",deadline:"2025-04-08"},{title:"SSC CGL",deadline:"2025-04-05"}],schemes:[{title:"PM Kisan সম্মান নিধি"},{title:"লক্ষ্মী ভাণ্ডার প্রকল্প"},{title:"অন্নপূর্ণা ভাণ্ডার"},{title:"কন্যাশ্রী প্রকল্প"}],breaking_news:[{title:"২০২৬ সালের মাধ্যমিক পরীক্ষার রেজাল্ট প্রকাশিত"},{title:"পশ্চিমবঙ্গে নতুন নিয়োগ বিজ্ঞপ্তি প্রকাশ — আবেদন শুরু"},{title:"কৃষকবন্ধু পরিবর্ধিত তালিকা প্রকাশ"}]};
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const date=v=>v?new Date(v).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"";
async function read(t){try{if(!window.supabase)return null;const r=await window.supabase.from(t).select("*").limit(8);return r.error?null:r.data}catch(e){return null}}
function fillCard(card,items){const ul=card&&card.querySelector("ul");if(!ul)return;ul.innerHTML=items.slice(0,5).map(x=>"<li><span>"+esc(x.title)+"</span><small>"+date(x.created_at||x.published_on||x.deadline)+"</small></li>").join("")}
async function hydrate(){
 const names=["government_updates","jobs","scholarships","results","form_fill_up","schemes","breaking_news"],vals=await Promise.all(names.map(read)),d={};names.forEach((n,i)=>d[n]=vals[i]?.length?vals[i]:demo[n]);
 const cards=[...document.querySelectorAll(".left-content .content-card")];[d.government_updates,d.jobs,d.scholarships,d.results].forEach((a,i)=>fillCard(cards[i],a));
 const side=document.querySelector(".right-sidebar .content-card");fillCard(side,d.schemes);
 const panels=[...document.querySelectorAll(".hero-right .panel")];if(panels[0])panels[0].querySelectorAll(".list-item").forEach((r,i)=>{if(d.government_updates[i])r.querySelector("span").textContent=d.government_updates[i].title});
 if(panels[1])panels[1].querySelectorAll(".apply-item").forEach((r,i)=>{if(d.form_fill_up[i])r.querySelector("span").textContent=d.form_fill_up[i].title});
 const mq=document.querySelector(".breaking marquee");if(mq)mq.textContent=d.breaking_news.map(x=>x.title).join(" • ");
}
function languagePopup(){if(localStorage.getItem("kicholche_language"))return;const m=document.createElement("div");m.className="language-modal";m.innerHTML='<div class="language-box"><h2>Choose your preferred language</h2><p>আপনার পছন্দের ভাষা নির্বাচন করুন</p><button data-l="bn">বাংলা</button><button data-l="hi">हिन्दी</button><button data-l="en">English</button></div>';document.body.appendChild(m);setTimeout(()=>m.classList.add("open"),10);m.querySelectorAll("button").forEach(b=>b.onclick=()=>{localStorage.setItem("kicholche_language",b.dataset.l);m.remove()})}
document.addEventListener("DOMContentLoaded",()=>{languagePopup();setTimeout(hydrate,50)});
})();