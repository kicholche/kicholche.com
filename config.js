/* ==========================================================
   KICHOLOCHE CONFIG
   GitHub Pages + Supabase Free
   ========================================================== */

window.KICHOLOCHE_CONFIG = {

  /* ---------- Site ---------- */

  SITE_NAME: "Kicholche",

  SITE_TAGLINE: "সরকারের সব তথ্য, এক জায়গায়",

  DEFAULT_LANGUAGE: "bn",

  SUPPORTED_LANGUAGES: ["bn", "hi", "en"],

  /* ---------- GitHub ---------- */

  BASE_PATH:
    location.hostname.includes("github.io")
      ? "/kicholche.com"
      : "",

  /* ---------- Supabase ---------- */

  SUPABASE_URL: "YOUR_SUPABASE_PROJECT_URL",

  SUPABASE_ANON_KEY: "YOUR_SUPABASE_ANON_KEY",

  /* ---------- Features ---------- */

  FEATURES: {

    SEARCH: true,

    NOTIFICATIONS: true,

    MULTILINGUAL: true,

    LOTTERY: true,

    AI_TOOLS: true,

    SAVED_POSTS: true,

    ANALYTICS: true

  },

  /* ---------- Future ---------- */

  CUSTOM_DOMAIN: "",

  API_BASE: ""

};

/* ==========================================================
   Initialize Supabase
   ========================================================== */

let supabase = null;

function initializeSupabase() {

  const cfg = window.KICHOLOCHE_CONFIG;

  if (
    typeof window.supabase !== "undefined" &&
    cfg.SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL"
  ) {

    supabase = window.supabase.createClient(
      cfg.SUPABASE_URL,
      cfg.SUPABASE_ANON_KEY
    );

    console.log("Supabase Connected");

  } else {

    console.log("Supabase Placeholder Mode");

  }

}

initializeSupabase();

/* ==========================================================
   Helpers
   ========================================================== */

function getBasePath() {

  return window.KICHOLOCHE_CONFIG.BASE_PATH;

}

function buildUrl(path) {

  return `${getBasePath()}${path}`;

}
