const K=window.KICHOLOCHE_CONFIG;
const fallback={
  government:[
    ["PM Kisan ২০তম কিস্তি প্রদান শুরু","12 Apr, 2025","নতুন"],
    ["লক্ষ্মী ভাণ্ডার প্রকল্পে টাকা বৃদ্ধি","10 Apr, 2025","নতুন"],
    ["অন্নপূর্ণা ভাণ্ডার — নতুন আবেদন শুরু","08 Apr, 2025","নতুন"],
    ["WBPSC Group C ও D নিয়োগ বিজ্ঞপ্তি","06 Apr, 2025","চলমান"],
    ["মাধ্যমিক পরীক্ষা ২০২৫ — ফলাফল প্রকাশ","05 Apr, 2025","জানুন"]
  ],
  jobs:[
    ["WBPSC Group C ও D","12 Apr, 2025","পশ্চিমবঙ্গ"],
    ["IB — বিভিন্ন পদে নিয়োগ","10 Apr, 2025","কেন্দ্রীয়"],
    ["TCS — বিভিন্ন পদে নিয়োগ","08 Apr, 2025","বেসরকারি"],
    ["ICICI Bank — Probationary Officer","06 Apr, 2025","বেসরকারি"],
    ["RPF Constable","03 Apr, 2025","রেলওয়ে"]
  ],
  scholarships:[
    ["পশ্চিমবঙ্গ স্কলারশিপ 2025","12 Apr, 2025","পশ্চিমবঙ্গ"],
    ["OBC Scholarship 2025","10 Apr, 2025","পশ্চিমবঙ্গ"],
    ["SC ST Scholarship 2025","08 Apr, 2025","পশ্চিমবঙ্গ"],
    ["NSP Scholarship 2025","06 Apr, 2025","কেন্দ্রীয়"],
    ["Post Matric Scholarship","03 Apr, 2025","পশ্চিমবঙ্গ"]
  ],
  results:[
    ["মাধ্যমিক পরীক্ষা রেজাল্ট","12 Apr, 2025","WB"],
    ["উচ্চমাধ্যমিক রেজাল্ট 2025","10 Apr, 2025","WB"],
    ["WBJEE 2025","08 Apr, 2025","WB"],
    ["ICSE রেজাল্ট 2025","06 Apr, 2025","ICSE"],
    ["NEET 2025","03 Apr, 2025","কেন্দ্রীয়"]
  ],
  forms:[
    ["WBPSC Group C ও D","12 Apr, 2025"],
    ["ICDS সুপারভাইজার","10 Apr, 2025"],
    ["RPF কনস্টেবল","08 Apr, 2025"],
    ["SSC CGL","05 Apr, 2025"],
    ["পশ্চিমবঙ্গ স্কলারশিপ","01 Apr, 2025"]
  ],
  schemes:[["PM Kisan সম্মান নিধি","12 Apr, 2025"],["লক্ষ্মী ভাণ্ডার প্রকল্প","10 Apr, 2025"],["অন্নপূর্ণা ভাণ্ডার","08 Apr, 2025"],["কন্যাশ্রী প্রকল্প","06 Apr, 2025"]],
  lottery:["West Bengal Lottery Result","Nagaland State Lottery Result","Sikkim State Lottery Result","Dear Lottery Result"],
  ai:["Resume Builder","Image Generator","Content Writer","PDF Tools","Grammar Helper","Code Assistant","Resume Formatter","Prompt Builder"],
  breaking:["২০২৬ সালের মাধ্যমিক পরীক্ষার রেজাল্ট প্রকাশিত","পশ্চিমবঙ্গে নতুন নিয়োগ বিজ্ঞপ্তি প্রকাশ — আবেদন শুরু","কৃষকবন্ধু পরিবর্ধিত তালিকা প্রকাশ"]
};
const icons=["fa-leaf","fa-building-columns","fa-file-lines","fa-graduation-cap","fa-award"];
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const fmt=d=>d?new Date(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"";
async function rows(table,select="*"){
  try{
    if(!window.supabase)return [];
    const q=window.supabase.from(table).select(select).limit(8);
    const r=await q;
    return r.error?[]:(r.data||[]);
  }catch{return []}
}
function normal(r,dateKeys=[]){
  return (r||[]).map(x=>[x.title||x.name||x.lottery_name||"—",fmt(dateKeys.map(k=>x[k]).find(Boolean)||x.created_at),x.tag||x.status||""]).filter(x=>x[0]!=="—");
}
function listHTML(items,withIcon=true){
  return items.slice(0,5).map((x,i)=>'<li><span class="item-icon"><i class="fa-solid '+icons[i%icons.length]+'"></i></span><span>'+esc(x[0])+'</span><small>'+esc(x[1]||"")+'</small></li>').join("");
}
function compactHTML(items){
  return items.slice(0,5).map((x,i)=>'<div class="compact-item"><span class="item-icon"><i class="fa-solid '+icons[i%icons.length]+'"></i></span><span>'+esc(x[0])+'</span><b class="status '+(String(x[2]).toLowerCase().includes("new")||String(x[2]).includes("নতুন")?"new":"")+'">'+esc(x[2]||"চলমান")+'</b></div>').join("");
}
function formHTML(items){return items.slice(0,5).map(x=>'<div class="compact-item"><span class="item-icon"><i class="fa-solid fa-file-circle-check"></i></span><span>'+esc(x[0])+'<small class="block">'+esc(x[1]||"")+'</small></span><button class="status">আবেদন করুন</button></div>').join("")}
async function loadData(){
  const [g,j,s,r,f,sc,l,a,b]=await Promise.all([
    rows("government_updates","title,created_at,is_published"),
    rows("jobs","title,created_at,status"),
    rows("scholarships","title,published_on,is_published"),
    rows("results","title,published_on,is_published"),
    rows("form_fill_up","title,deadline,status"),
    rows("schemes","title,created_at,status"),
    rows("lottery_results","lottery_name,result_date,status"),
    rows("ai_tools","name,description,icon,active,sort_order"),
    rows("breaking_news","title,active,priority,starts_at,ends_at")
  ]);
  const data={
    government:g.length?normal(g,["created_at"]):fallback.government,
    jobs:j.length?normal(j,["created_at"]):fallback.jobs,
    scholarships:s.length?normal(s,["published_on","created_at"]):fallback.scholarships,
    results:r.length?normal(r,["published_on","created_at"]):fallback.results,
    forms:f.length?normal(f,["deadline","created_at"]):fallback.forms,
    schemes:sc.length?normal(sc,["created_at"]):fallback.schemes,
    lottery:l.length?l.slice(0,4).map(x=>x.lottery_name):fallback.lottery,
    ai:a.length?a.sort((x,y)=>(x.sort_order||0)-(y.sort_order||0)).slice(0,8):fallback.ai,
    breaking:b.length?b.sort((x,y)=>(x.priority||0)-(y.priority||0)).map(x=>x.title):fallback.breaking
  };
  render(data); return data;
}
function render(d){
  document.querySelector("#governmentList").innerHTML=listHTML(d.government);
  document.querySelector("#jobsList").innerHTML=listHTML(d.jobs);
  document.querySelector("#scholarshipList").innerHTML=listHTML(d.scholarships);
  document.querySelector("#resultList").innerHTML=listHTML(d.results);
  document.querySelector("#importantList").innerHTML=compactHTML(d.government);
  document.querySelector("#formList").innerHTML=formHTML(d.forms);
  document.querySelector("#schemeList").innerHTML=listHTML(d.schemes);
  document.querySelector("#lotteryList").innerHTML=d.lottery.map(x=>'<a class="lottery-card" href="#lottery"><i class="fa-solid fa-ticket"></i><span>'+esc(x)+'</span></a>').join("");
  document.querySelector("#aiList").innerHTML=d.ai.map((x,i)=>'<a class="ai-card" href="#ai-tools"><i class="fa-solid '+esc(x.icon||["fa-file-lines","fa-image","fa-pen","fa-file-pdf","fa-spell-check","fa-code"][i%6])+'"></i><span>'+esc(x.name||x)+'</span></a>').join("");
  document.querySelector("#breakingTicker").innerHTML=d.breaking.map(x=>'<span>'+esc(x)+'</span>').join("");
}
const ui={
  bn:{breaking:"ব্রেকিং নিউজ",heroTitle:"সরকারের সব তথ্য<br><em>এক জায়গায়</em>",heroSub:"চাকরি, স্কলারশিপ, রেজাল্ট, লটারি, প্রকল্প, ফর্ম ফিল-আপ এবং আরও অনেক কিছু...",seeAll:"সব দেখুন",importantUpdates:"গুরুত্বপূর্ণ সরকারি আপডেট",runningForms:"চলমান ফর্ম ফিল-আপ"},
  hi:{breaking:"ब्रेकिंग न्यूज़",heroTitle:"सरकार की सभी जानकारी<br><em>एक ही जगह</em>",heroSub:"नौकरी, स्कॉलरशिप, रिजल्ट, लॉटरी, योजनाएं, फॉर्म और बहुत कुछ...",seeAll:"सब देखें",importantUpdates:"महत्वपूर्ण सरकारी अपडेट",runningForms:"चल रहे फॉर्म फिल-अप"},
  en:{breaking:"Breaking News",heroTitle:"All Government Information<br><em>in One Place</em>",heroSub:"Jobs, scholarships, results, lottery, schemes, forms and much more...",seeAll:"View All",importantUpdates:"Important Government Updates",runningForms:"Running Form Fill-up"}
};
function setLanguage(lang){
  const t=ui[lang]||ui.bn;
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[k])el.innerHTML=t[k]});
  localStorage.setItem(K.LANGUAGE_KEY,lang);
}
function languageSetup(){
  const modal=document.querySelector("#languageModal"),saved=localStorage.getItem(K.LANGUAGE_KEY);
  if(!saved)modal.classList.add("open");
  document.querySelectorAll("[data-language]").forEach(btn=>btn.addEventListener("click",()=>{setLanguage(btn.dataset.language);modal.classList.remove("open")}));
  if(saved)setLanguage(saved);
}
function searchSetup(data){
  const input=document.querySelector("#searchInput");
  document.querySelector("#searchForm").addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim().toLowerCase();if(!q)return;const all=[...data.government,...data.jobs,...data.scholarships,...data.results,...data.schemes];const found=all.filter(x=>x[0].toLowerCase().includes(q));document.querySelector("#searchForm").classList.toggle("search-found",found.length>0);const target=document.querySelector(found.length?"#government-updates":"#government-updates");target.scrollIntoView({behavior:"smooth",block:"start"});input.placeholder=found.length?found.map(x=>x[0]).slice(0,2).join(" • "):"কোনো মিল পাওয়া যায়নি — আবার চেষ্টা করুন"});
}
function misc(){
  document.querySelector("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();e.currentTarget.querySelector("input").value="";alert("ধন্যবাদ। Newsletter subscription UI is ready.")});
  document.querySelector("#profileButton").onclick=()=>location.href="#login";
  document.querySelector("#menuButton").onclick=()=>document.querySelector(".main-nav").classList.toggle("open-mobile");
  document.querySelector("#notificationButton").onclick=()=>document.querySelector("#breaking-news")?.scrollIntoView({behavior:"smooth"});
}
document.addEventListener("DOMContentLoaded",async()=>{languageSetup();const data=await loadData();searchSetup(data);misc()});