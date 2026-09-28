const K=window.KICHOLOCHE_CONFIG;
const fallback={
  government:[],jobs:[],scholarships:[],results:[],forms:[],schemes:[],lottery:[],ai:[],breaking:[]
};
const icons=["fa-leaf","fa-building-columns","fa-file-lines","fa-graduation-cap","fa-award"];
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const fmt=d=>d?new Date(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"";
const safeUrl=u=>{try{const x=new URL(u,location.href);return ["http:","https:","mailto:","tel:"].includes(x.protocol)?x.href:"#"}catch{return "#"}};
async function rows(table,select="*",order=null){
  try{
    if(!window.supabase)return [];
    let q=window.supabase.from(table).select(select).limit(8);
    if(order)q=q.order(order,{ascending:false});
    const r=await q;
    return r.error?[]:(r.data||[]);
  }catch{return []}
}
function normalize(r,dateKeys=[]){
  return (r||[]).map(x=>({
    title:x.title||x.name||x.lottery_name||"—",
    date:fmt(dateKeys.map(k=>x[k]).find(Boolean)||x.created_at),
    tag:x.tag||x.status||"",
    url:x.official_link||x.apply_url||x.url||x.apply_link||x.official_url||x.pdf_url||"",
    icon:x.icon||""
  })).filter(x=>x.title!=="—");
}
function itemLink(x,inner){
  const url=safeUrl(x.url);
  return url!=="#" ? '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+inner+'</a>' : inner;
}
function listHTML(items){
  if(!items.length)return '<li class="empty-state">এখনও কোনো তথ্য প্রকাশিত হয়নি</li>';
  return items.slice(0,5).map((x,i)=>itemLink(x,'<span class="item-icon"><i class="fa-solid '+icons[i%icons.length]+'"></i></span><span>'+esc(x.title)+'</span><small>'+esc(x.date||"")+'</small>')).map(x=>"<li>"+x+"</li>").join("");
}
function compactHTML(items){
  if(!items.length)return '<div class="compact-item empty-state">এখনও কোনো তথ্য প্রকাশিত হয়নি</div>';
  return items.slice(0,5).map((x,i)=>{
    const inner='<span class="item-icon"><i class="fa-solid '+icons[i%icons.length]+'"></i></span><span>'+esc(x.title)+'</span><b class="status '+(String(x.tag).toLowerCase().includes("new")||String(x.tag).includes("নতুন")?"new":"")+'">'+esc(x.tag||"চলমান")+'</b>';
    return '<div class="compact-item">'+itemLink(x,inner)+'</div>';
  }).join("");
}
function formHTML(items){
  if(!items.length)return '<div class="compact-item empty-state">এখনও কোনো ফর্ম প্রকাশিত হয়নি</div>';
  return items.slice(0,5).map(x=>{
    const action=x.url?safeUrl(x.url):"#";
    return '<div class="compact-item"><span class="item-icon"><i class="fa-solid fa-file-circle-check"></i></span><span>'+esc(x.title)+'<small class="block">'+esc(x.date||"")+'</small></span>'+(action!=="#"?'<a class="status" href="'+esc(action)+'" target="_blank" rel="noopener noreferrer">আবেদন করুন</a>':'<span class="status">আবেদন করুন</span>')+'</div>';
  }).join("");
}
async function loadData(){
  const [g,j,s,r,f,sc,l,a,b]=await Promise.all([
    rows("government_updates","title,created_at,official_link,is_published", "created_at"),
    rows("jobs","title,created_at,apply_url,status", "created_at"),
    rows("scholarships","title,published_on,url,is_published", "published_on"),
    rows("results","title,published_on,url,is_published", "published_on"),
    rows("form_fill_up","title,deadline,apply_link,status", "deadline"),
    rows("schemes","title,created_at,official_url,status", "created_at"),
    rows("lottery_results","lottery_name,result_date,official_url,pdf_url,status", "result_date"),
    rows("ai_tools","name,description,icon,route,active,sort_order", "sort_order"),
    rows("breaking_news","title,url,active,priority,starts_at,ends_at", "priority")
  ]);
  const data={
    government:g.length?normalize(g,["created_at"]):fallback.government,
    jobs:j.length?normalize(j,["created_at"]):fallback.jobs,
    scholarships:s.length?normalize(s,["published_on","created_at"]):fallback.scholarships,
    results:r.length?normalize(r,["published_on","created_at"]):fallback.results,
    forms:f.length?normalize(f,["deadline","created_at"]):fallback.forms,
    schemes:sc.length?normalize(sc,["created_at"]):fallback.schemes,
    lottery:l.length?l.slice(0,4).map(x=>({title:x.lottery_name,date:fmt(x.result_date),url:x.official_url||x.pdf_url||""})):fallback.lottery.map(title=>({title})),
    ai:a.length?a.sort((x,y)=>(x.sort_order||0)-(y.sort_order||0)).slice(0,8):fallback.ai.map(name=>({name})),
    breaking:b.length?b.map(x=>({title:x.title,url:x.url})):fallback.breaking.map(title=>({title}))
  };
  render(data);
  return data;
}
function render(d){
  document.querySelector("#governmentList").innerHTML=listHTML(d.government);
  document.querySelector("#jobsList").innerHTML=listHTML(d.jobs);
  document.querySelector("#scholarshipList").innerHTML=listHTML(d.scholarships);
  document.querySelector("#resultList").innerHTML=listHTML(d.results);
  document.querySelector("#importantList").innerHTML=compactHTML(d.government);
  document.querySelector("#formList").innerHTML=formHTML(d.forms);
  document.querySelector("#schemeList").innerHTML=listHTML(d.schemes);
  document.querySelector("#lotteryList").innerHTML=d.lottery.map(x=>{
    const action=safeUrl(x.url);
    const card='<i class="fa-solid fa-ticket"></i><span>'+esc(x.title)+'</span>';
    return action!=="#" ? '<a class="lottery-card" href="'+esc(action)+'" target="_blank" rel="noopener noreferrer">'+card+'</a>' : '<a class="lottery-card" href="#lottery">'+card+'</a>';
  }).join("");
  document.querySelector("#aiList").innerHTML=d.ai.map((x,i)=>{
    const icon=x.icon||["fa-file-lines","fa-image","fa-pen","fa-file-pdf","fa-spell-check","fa-code"][i%6];
    const inner='<i class="fa-solid '+esc(icon)+'"></i><span>'+esc(x.name||x.title||x)+'</span>';
    return x.route?itemLink({...x,url:x.route},inner):'<a class="ai-card" href="#ai-tools">'+inner+'</a>';
  }).join("");
  document.querySelector("#breakingTicker").innerHTML=d.breaking.map(x=>itemLink(x,'<span>'+esc(x.title)+'</span>')).join("");
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
  const input=document.querySelector("#searchInput"),form=document.querySelector("#searchForm");
  const pool=[...data.government,...data.jobs,...data.scholarships,...data.results,...data.schemes,...data.forms];
  let box=document.querySelector("#searchResults");
  if(!box){box=document.createElement("div");box.id="searchResults";box.className="search-results";form.appendChild(box)}
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const q=input.value.trim().toLowerCase();
    if(!q){box.innerHTML="";box.classList.remove("open");return}
    const found=pool.filter(x=>String(x.title).toLowerCase().includes(q)).slice(0,8);
    box.innerHTML=found.length?found.map(x=>'<div class="search-result-item">'+itemLink(x,'<strong>'+esc(x.title)+'</strong><small>'+esc(x.date||x.tag||"")+'</small>')+'</div>').join(""):'<div class="search-result-empty">কোনো মিল পাওয়া যায়নি</div>';
    box.classList.add("open");
  });
  document.addEventListener("click",e=>{if(!form.contains(e.target))box.classList.remove("open")});
}
function misc(){
  document.querySelector("#newsletterForm")?.addEventListener("submit",e=>{e.preventDefault();const input=e.currentTarget.querySelector("input");if(input?.value){input.value="";alert("Newsletter form is ready; subscription storage will be connected when the newsletter table is enabled.")}});
  document.querySelector("#profileButton")?.addEventListener("click",()=>location.href="#login");
  document.querySelector("#menuButton")?.addEventListener("click",()=>document.querySelector(".main-nav")?.classList.toggle("open-mobile"));
  document.querySelector("#notificationButton")?.addEventListener("click",()=>document.querySelector("#breakingTicker")?.scrollIntoView({behavior:"smooth",block:"center"}));
}
document.addEventListener("DOMContentLoaded",async()=>{languageSetup();const data=await loadData();searchSetup(data);misc()});
