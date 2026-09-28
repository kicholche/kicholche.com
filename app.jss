const C=window.KCONF||{},$=s=>document.querySelector(s);
const U={
bn:{h1:"সরকারের সব তথ্য",h2:"এক জায়গায়",sub:"চাকরি, স্কলারশিপ, রেজাল্ট, লটারি, প্রকল্প, ফর্ম ফিল-আপ এবং আরও অনেক কিছু",all:"সব দেখুন",br:"ব্রেকিং নিউজ",imp:"গুরুত্বপূর্ণ সরকারি আপডেট",ff:"চলমান ফর্ম ফিল-আপ",ap:"আবেদন করুন",dl:"শেষ তারিখ",up:"সর্বশেষ সরকারি আপডেট",jb:"সর্বশেষ সরকারি চাকরি",sc:"সর্বশেষ স্কলারশিপ",rs:"সর্বশেষ রেজাল্ট",sh:"সরকারি প্রকল্প সমূহ",ad:"গুরুত্বপূর্ণ পরামর্শ",lo:"লটারি রেজাল্ট",ai:"AI টুলস",ph:"চাকরি, স্কলারশিপ, রেজাল্ট, প্রকল্প...",lg:"লগইন",sr:"সার্চ ফলাফল",none:"কিছু পাওয়া যায়নি",c1:"সরকারি চাকরি",c2:"স্কলারশিপ",c3:"রেজাল্ট",c4:"শিক্ষা ও পরীক্ষা",c5:"সরকারি প্রকল্প",c6:"দ্রুত লিঙ্কস"},
hi:{h1:"सरकार की सारी जानकारी",h2:"एक जगह",sub:"नौकरी, स्कॉलरशिप, रिज़ल्ट, लॉटरी, योजनाएँ, फॉर्म फिल-अप और बहुत कुछ",all:"सब देखें",br:"ब्रेकिंग न्यूज़",imp:"महत्वपूर्ण सरकारी अपडेट",ff:"चालू फॉर्म फिल-अप",ap:"आवेदन करें",dl:"अंतिम तिथि",up:"ताज़ा सरकारी अपडेट",jb:"ताज़ा सरकारी नौकरी",sc:"ताज़ा स्कॉलरशिप",rs:"ताज़ा रिज़ल्ट",sh:"सरकारी योजनाएँ",ad:"ज़रूरी सलाह",lo:"लॉटरी रिज़ल्ट",ai:"AI टूल्स",ph:"नौकरी, स्कॉलरशिप, रिज़ल्ट, योजना...",lg:"लॉगिन",sr:"सर्च परिणाम",none:"कुछ नहीं मिला",c1:"सरकारी नौकरी",c2:"स्कॉलरशिप",c3:"रिज़ल्ट",c4:"शिक्षा व परीक्षा",c5:"सरकारी योजना",c6:"क्विक लिंक्स"},
en:{h1:"All government information,",h2:"in one place",sub:"Jobs, scholarships, results, lottery, schemes, form fill-up and more",all:"View all",br:"Breaking News",imp:"Important Government Updates",ff:"Ongoing Form Fill-up",ap:"Apply",dl:"Last date",up:"Latest Government Updates",jb:"Latest Government Jobs",sc:"Latest Scholarships",rs:"Latest Results",sh:"Government Schemes",ad:"Important Advice",lo:"Lottery Results",ai:"AI Tools",ph:"Jobs, scholarships, results, schemes...",lg:"Login",sr:"Search results",none:"Nothing found",c1:"Govt Jobs",c2:"Scholarships",c3:"Results",c4:"Education & Exams",c5:"Schemes",c6:"Quick Links"}};
const EM={bn:"শীঘ্রই নতুন তথ্য আসছে",hi:"जल्द ही नई जानकारी आएगी",en:"New updates coming soon"};
const P={bn:["কীভাবে সরকারি চাকরির জন্য প্রস্তুতি নেবেন?","স্কলারশিপের জন্য কোন ডকুমেন্ট লাগবে?","ফর্ম ফিল-আপে ভুল হলে কী করবেন?"],hi:["सरकारी नौकरी की तैयारी कैसे करें?","स्कॉलरशिप के लिए कौन-से दस्तावेज़ चाहिए?","फॉर्म भरने में गलती हो जाए तो क्या करें?"],en:["How to prepare for a government job?","Which documents do scholarships need?","What to do if you make a mistake in a form?"]};
const S=[["#imp","gov_updates","imp","&order=published_at.desc.nullslast",5],["#ff","form_fillups","ff","&order=end_date.asc.nullslast",5,1],["#sh","schemes","sh","&order=published_at.desc.nullslast",4],["#up","gov_updates","up","&order=published_at.desc.nullslast",5],["#jb","jobs","jb","&order=created_at.desc",5],["#sc","scholarships","sc","&order=published_on.desc",5],["#rs","results","rs","&order=published_on.desc",5],["#lo","lottery_results","lo","&order=result_date.desc",4]];
const N=[["Home","#"],["Government Updates","#up"],["Jobs","#jb"],["Scholarships","#sc"],["Results","#rs"],["Lottery Results","#lo"],["Education","#rs"],["Schemes","#sh"],["Form Fill-up","#ff"],["Quick Links","#ql"],["AI Tools","#ai"]];
let lang=localStorage.kc_lang||"bn";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const safe=u=>/^https?:\/\//.test(u||"")?u:"#";
const fd=d=>d?new Date(d).toLocaleDateString(lang+"-IN",{day:"numeric",month:"short",year:"numeric"}):"";
const norm=o=>({t:o._t||o.title||o.lottery_name||"",d:o.published_at||o.published_on||o.result_date||o.created_at,dl:o.end_date,u:o.official_url||o.apply_url||o.url,b:o.tag||""});
async function get(t,n,q=""){
try{const h={apikey:C.key},r=await fetch(`${C.url}/rest/v1/${t}?select=*${q}&limit=${n}`,{headers:h});
if(!r.ok)throw 0;const d=await r.json();
if(lang!=="bn"&&d.length){const x=await fetch(`${C.url}/rest/v1/translations?select=entity_id,translated_text&language=eq.${lang}&field_name=eq.title&entity_id=in.(${d.map(o=>o.id).join(",")})`,{headers:h});
if(x.ok){const m=Object.fromEntries((await x.json()).map(z=>[z.entity_id,z.translated_text]));d.forEach(o=>o._t=m[o.id])}}
return d}catch(e){return[]}}
function row(o,f,u){const x=norm(o),b=f?`<em>${u.ap}</em>`:(x.b?`<em>${esc(x.b)}</em>`:""),s=f?`${u.dl}: ${fd(x.dl)}`:fd(x.d);
return `<a class="row" href="${esc(safe(x.u))}" target="_blank" rel="noopener"><span>${esc(x.t)}</span><small>${s}</small>${b}</a>`}
async function draw(){
const u=U[lang];document.documentElement.lang=lang;$("#lang").value=lang;
document.querySelectorAll("[data-t]").forEach(e=>e.textContent=u[e.dataset.t]);
$("#q").placeholder=u.ph;
$("#nav").innerHTML=N.map(([t,h])=>`<a href="${h}">${t}</a>`).join("");
const ic=["💼","🎓","📄","📚","🏛️","🔗"],hr=["#jb","#sc","#rs","#up","#sh","#ql"];
$("#cats").innerHTML=ic.map((c,i)=>`<a class="cat" href="${hr[i]}">${c}<b>${u["c"+(i+1)]}</b></a>`).join("");
$("#ad").innerHTML=`<h2>${u.ad}</h2>`+P[lang].map(t=>`<div class="row"><span>${t}</span></div>`).join("");
get("breaking_news",10,"&order=priority.desc").then(b=>$("#tick").innerHTML=b.length?"<span>"+b.map(o=>"● "+esc(norm(o).t)).join("&nbsp;&nbsp;&nbsp;&nbsp;")+"</span>":"");
await Promise.all(S.map(async([id,t,k,q,n,f])=>{const d=await get(t,n,q);$(id).innerHTML=`<h2>${u[k]}</h2>`+(d.map(o=>row(o,f,u)).join("")||`<p class="em">${EM[lang]}</p>`)}))}
$("#sf").onsubmit=async e=>{
e.preventDefault();const q=$("#q").value.trim().replace(/[*,()%]/g,"");if(!q)return;
const u=U[lang],o=`&title=ilike.*${encodeURIComponent(q)}*`;
const r=(await Promise.all(["gov_updates","jobs","scholarships","results","schemes"].map(t=>get(t,5,o)))).flat();
$("#sr").hidden=false;$("#sr").innerHTML=`<h2>${u.sr}</h2>`+(r.map(x=>row(x,0,u)).join("")||u.none);$("#sr").scrollIntoView()};
function pick(l){lang=l;localStorage.kc_lang=l;$("#pop").hidden=true;draw()}
document.querySelectorAll("#pop [data-l]").forEach(b=>b.onclick=()=>pick(b.dataset.l));
$("#lang").onchange=e=>pick(e.target.value);
if(!localStorage.kc_lang)$("#pop").hidden=false;
draw();
