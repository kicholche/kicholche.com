const C=window.KCONF||{},$=s=>document.querySelector(s);
const U={
bn:{h1:"সরকারের সব তথ্য",h2:"এক জায়গায়",sub:"চাকরি, স্কলারশিপ, রেজাল্ট, লটারি, প্রকল্প, ফর্ম ফিল-আপ এবং আরও অনেক কিছু",all:"সব দেখুন",br:"ব্রেকিং নিউজ",imp:"গুরুত্বপূর্ণ সরকারি আপডেট",ff:"চলমান ফর্ম ফিল-আপ",ap:"আবেদন করুন",dl:"শেষ তারিখ",up:"সর্বশেষ সরকারি আপডেট",jb:"সর্বশেষ সরকারি চাকরি",sc:"সর্বশেষ স্কলারশিপ",rs:"সর্বশেষ রেজাল্ট",sh:"সরকারি প্রকল্প সমূহ",ad:"গুরুত্বপূর্ণ পরামর্শ",lo:"লটারি রেজাল্ট",ai:"AI টুলস",ph:"চাকরি, স্কলারশিপ, রেজাল্ট, প্রকল্প...",lg:"লগইন",sr:"সার্চ ফলাফল",none:"কিছু পাওয়া যায়নি",c1:"সরকারি চাকরি",c2:"স্কলারশিপ",c3:"রেজাল্ট",c4:"শিক্ষা ও পরীক্ষা",c5:"সরকারি প্রকল্প",c6:"দ্রুত লিঙ্কস"},
hi:{h1:"सरकार की सारी जानकारी",h2:"एक जगह",sub:"नौकरी, स्कॉलरशिप, रिज़ल्ट, लॉटरी, योजनाएँ, फॉर्म फिल-अप और बहुत कुछ",all:"सब देखें",br:"ब्रेकिंग न्यूज़",imp:"महत्वपूर्ण सरकारी अपडेट",ff:"चालू फॉर्म फिल-अप",ap:"आवेदन करें",dl:"अंतिम तिथि",up:"ताज़ा सरकारी अपडेट",jb:"ताज़ा सरकारी नौकरी",sc:"ताज़ा स्कॉलरशिप",rs:"ताज़ा रिज़ल्ट",sh:"सरकारी योजनाएँ",ad:"ज़रूरी सलाह",lo:"लॉटरी रिज़ल्ट",ai:"AI टूल्स",ph:"नौकरी, स्कॉलरशिप, रिज़ल्ट, योजना...",lg:"लॉगिन",sr:"सर्च परिणाम",none:"कुछ नहीं मिला",c1:"सरकारी नौकरी",c2:"स्कॉलरशिप",c3:"रिज़ल्ट",c4:"शिक्षा व परीक्षा",c5:"सरकारी योजना",c6:"क्विक लिंक्स"},
en:{h1:"All government information,",h2:"in one place",sub:"Jobs, scholarships, results, lottery, schemes, form fill-up and more",all:"View all",br:"Breaking News",imp:"Important Government Updates",ff:"Ongoing Form Fill-up",ap:"Apply",dl:"Last date",up:"Latest Government Updates",jb:"Latest Government Jobs",sc:"Latest Scholarships",rs:"Latest Results",sh:"Government Schemes",ad:"Important Advice",lo:"Lottery Results",ai:"AI Tools",ph:"Jobs, scholarships, results, schemes...",lg:"Login",sr:"Search results",none:"Nothing found",c1:"Govt Jobs",c2:"Scholarships",c3:"Results",c4:"Education & Exams",c5:"Schemes",c6:"Quick Links"}};
const m=(...a)=>a.map((t,i)=>({title_bn:t,date:"2026-04-1"+(2-i%3),deadline:"2026-04-2"+i,badge:i?"":"নতুন"}));
const D={government_updates:m("PM Kisan কিস্তি প্রদান শুরু","লক্ষ্মীর ভান্ডার প্রকল্পের ঘোষণা","WBPSC গ্রুপ C নিয়োগ বিজ্ঞপ্তি"),jobs:m("WBPSC গ্রুপ C ও D","ICDS সুপারভাইজার","RPF কনস্টেবল"),scholarships:m("পশ্চিমবঙ্গ স্কলারশিপ","NSP Scholarship","OBC স্কলারশিপ"),results:m("মাধ্যমিক রেজাল্ট","উচ্চমাধ্যমিক রেজাল্ট","NEET ফলাফল"),schemes:m("PM Kisan সম্মান নিধি","লক্ষ্মীর ভান্ডার","অন্নপূর্ণা ভান্ডার"),form_fill_up:m("WBPSC গ্রুপ C ও D","SSC CGL","ICDS সুপারভাইজার"),advice:m("কীভাবে সরকারি চাকরির প্রস্তুতি নেবেন?","স্কলারশিপে কোন ডকুমেন্ট লাগবে?"),lottery_results:m("West Bengal Lottery","Nagaland State Lottery","Sikkim State Lottery","Dear Lottery"),breaking_news:m("মাধ্যমিক পরীক্ষার রেজাল্ট প্রকাশিত","নতুন নিয়োগ বিজ্ঞপ্তি প্রকাশ")};
const S=[["#imp","government_updates","imp","&order=pinned.desc,date.desc",5],["#ff","form_fill_up","ff","&order=deadline.asc",5,1],["#sh","schemes","sh","&order=date.desc",4],["#ad","advice","ad","&order=date.desc",4],["#up","government_updates","up","&order=date.desc",5],["#jb","jobs","jb","&order=date.desc",5],["#sc","scholarships","sc","&order=date.desc",5],["#rs","results","rs","&order=date.desc",5],["#lo","lottery_results","lo","&order=date.desc",4]];
const N=[["Home","#"],["Government Updates","#up"],["Jobs","#jb"],["Scholarships","#sc"],["Results","#rs"],["Lottery Results","#lo"],["Education","#rs"],["Schemes","#sh"],["Form Fill-up","#ff"],["Quick Links","#ql"],["AI Tools","#ai"]];
let lang=localStorage.kc_lang||"bn";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const safe=u=>/^https?:\/\//.test(u||"")?u:"#";
const T=o=>o["title_"+lang]||o.title_bn||o.title_en||"";
const fd=d=>d?new Date(d).toLocaleDateString(lang+"-IN",{day:"numeric",month:"short",year:"numeric"}):"";
async function get(t,n,q=""){
if(!C.url)return D[t]||[];
try{const r=await fetch(`${C.url}/rest/v1/${t}?select=*&published=eq.true${q}&limit=${n}`,{headers:{apikey:C.key}});if(!r.ok)throw 0;return await r.json()}catch(e){return D[t]||[]}}
function row(o,f,u){
const b=f?`<em>${u.ap}</em>`:(o.badge?`<em>${esc(o.badge)}</em>`:"");
const s=f?`${u.dl}: ${fd(o.deadline)}`:fd(o.date);
return `<a class="row" href="${esc(safe(o.link))}" target="_blank" rel="noopener"><span>${esc(T(o))}</span><small>${s}</small>${b}</a>`}
async function draw(){
const u=U[lang];document.documentElement.lang=lang;$("#lang").value=lang;
document.querySelectorAll("[data-t]").forEach(e=>e.textContent=u[e.dataset.t]);
$("#q").placeholder=u.ph;
$("#nav").innerHTML=N.map(([t,h])=>`<a href="${h}">${t}</a>`).join("");
const ic=["💼","🎓","📄","📚","🏛️","🔗"],hr=["#jb","#sc","#rs","#up","#sh","#ql"];
$("#cats").innerHTML=ic.map((c,i)=>`<a class="cat" href="${hr[i]}">${c}<b>${u["c"+(i+1)]}</b></a>`).join("");
get("breaking_news",10,"&order=pinned.desc,date.desc").then(b=>$("#tick").innerHTML="<span>"+b.map(o=>"● "+esc(T(o))).join("&nbsp;&nbsp;&nbsp;&nbsp;")+"</span>");
await Promise.all(S.map(async([id,t,k,q,n,f])=>{const d=await get(t,n,q);$(id).innerHTML=`<h2>${u[k]}</h2>`+d.map(o=>row(o,f,u)).join("")}))}
$("#sf").onsubmit=async e=>{
e.preventDefault();const q=$("#q").value.trim().replace(/[*,()]/g,"");if(!q)return;
const u=U[lang],k=encodeURIComponent(q),o=`&or=(title_bn.ilike.*${k}*,title_hi.ilike.*${k}*,title_en.ilike.*${k}*,keywords.ilike.*${k}*)`;
const r=(await Promise.all(["government_updates","jobs","scholarships","results","schemes"].map(t=>get(t,5,o)))).flat().filter(x=>[x.title_bn,x.title_hi,x.title_en,x.keywords].join(" ").toLowerCase().includes(q.toLowerCase()));
$("#sr").hidden=false;$("#sr").innerHTML=`<h2>${u.sr}</h2>`+(r.map(x=>row(x,0,u)).join("")||u.none);$("#sr").scrollIntoView()};
function pick(l){lang=l;localStorage.kc_lang=l;$("#pop").hidden=true;draw()}
document.querySelectorAll("#pop [data-l]").forEach(b=>b.onclick=()=>pick(b.dataset.l));
$("#lang").onchange=e=>pick(e.target.value);
if(!localStorage.kc_lang)$("#pop").hidden=false;
draw();
