window.KICHOLOCHE_CONFIG={
  SITE_NAME:"Kicholche",
  SITE_TAGLINE:"সরকারের সব তথ্য, এক জায়গায়",
  LANGUAGE_KEY:"kicholche_language",
  SUPPORTED_LANGUAGES:["bn","hi","en"],
  BASE_PATH:location.hostname.endsWith("github.io")?"/kicholche.com":"",
  SUPABASE_URL:"https://pwjybkbwxvpdlwhwosqs.supabase.co",
  SUPABASE_ANON_KEY:"sb_publishable_KcTjG65BQZRr1PlPkUzHew_G7RquhdB"
};
let supabase=null;
if(window.supabase&&KICHOLOCHE_CONFIG.SUPABASE_URL){
  supabase=window.supabase.createClient(KICHOLOCHE_CONFIG.SUPABASE_URL,KICHOLOCHE_CONFIG.SUPABASE_ANON_KEY);
}