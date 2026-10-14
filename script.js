const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
const state = { balance: Number(localStorage.getItem("scn_balance") || 0), mining: localStorage.getItem("scn_mining") === "1", daily: localStorage.getItem("scn_daily") || "" };
const $ = id => document.getElementById(id);
const translations = {
tr:{network:"● AĞ ÇEVRİMİÇİ · DEMO",title:"Güneş enerjisiyle<br><em>SCN kazan.</em>",subtitle:"Sanal madenciliğini başlat, günlük ödüllerini topla.",balance:"TOPLAM SANAL BAKİYE",start:"Madenciliği Başlat",stop:"Madencilik Aktif",idle:"Henüz madencilik başlatılmadı.",active:"Madencilik demo olarak aktif.",rate:"KAZIM HIZI",duration:"OTURUM",bonuses:"Bonus Merkezi",ad:"Reklam Bonusu",adSub:"Demo · +5 SCN",daily:"Günlük Ödül",dailySub:"Günlük giriş bonusu",tasks:"Görevler",tasksSub:"Yeni görevleri keşfet",invite:"Davet Et",inviteSub:"Arkadaşlarını çağır",demoTitle:"Demo sürümü",demoText:"SCN bu prototipte gerçek kripto para değildir. Gerçek reklam, blokzincir ve para çekme özelliği bağlı değildir.",home:"Ana Sayfa",rewards:"Ödüller",wallet:"Cüzdan",profile:"Profil",claimed:"Bugünkü günlük ödülünü zaten aldın.",gotDaily:"Günlük demo ödülü: +10 SCN",adMessage:"Bu prototipte gerçek reklam bağlı değil. Demo bonusu: +5 SCN",taskMessage:"Görevler bölümü demo sürümünde. Yakında!",inviteMessage:"Arkadaş davet sistemi henüz bağlı değil."},
en:{network:"● NETWORK ONLINE · DEMO",title:"Powered by the sun,<br><em>earn SCN.</em>",subtitle:"Start virtual mining and collect daily rewards.",balance:"TOTAL VIRTUAL BALANCE",start:"Start Mining",stop:"Mining Active",idle:"Mining has not started yet.",active:"Mining is active in demo mode.",rate:"MINING RATE",duration:"SESSION",bonuses:"Bonus Center",ad:"Ad Bonus",adSub:"Demo · +5 SCN",daily:"Daily Reward",dailySub:"Daily login bonus",tasks:"Tasks",tasksSub:"Discover new tasks",invite:"Invite Friends",inviteSub:"Bring your friends",demoTitle:"Demo version",demoText:"SCN is not real cryptocurrency in this prototype. Real ads, blockchain, and withdrawals are not connected.",home:"Home",rewards:"Rewards",wallet:"Wallet",profile:"Profile",claimed:"You already claimed today's daily reward.",gotDaily:"Daily demo reward: +10 SCN",adMessage:"No real ad network is connected. Demo bonus: +5 SCN",taskMessage:"Tasks are demo-only for now. Coming soon!",inviteMessage:"The referral system is not connected yet."}
};
let lang = localStorage.getItem("scn_lang") || (navigator.language?.startsWith("tr") ? "tr" : "en");
$("language").value = lang;
function t(key){return translations[lang][key] || key}
function save(){localStorage.setItem("scn_balance",String(state.balance));$("balance").textContent=state.balance.toFixed(2)}
function renderLang(){document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;el.innerHTML=t(key)});$("mine").querySelector("span").textContent=state.mining?t("stop"):t("start");$("status").textContent=state.mining?t("active"):t("idle")}
$("language").addEventListener("change",e=>{lang=e.target.value;localStorage.setItem("scn_lang",lang);renderLang()});
$("mine").addEventListener("click",()=>{state.mining=!state.mining;localStorage.setItem("scn_mining",state.mining?"1":"0");renderLang();tg?.HapticFeedback?.impactOccurred("light")});
$("ad").addEventListener("click",()=>{state.balance+=5;save();alert(t("adMessage"))});
$("daily").addEventListener("click",()=>{const today=new Date().toISOString().slice(0,10);if(state.daily===today){alert(t("claimed"));return}state.daily=today;localStorage.setItem("scn_daily",today);state.balance+=10;save();alert(t("gotDaily"))});
$("tasks").addEventListener("click",()=>alert(t("taskMessage")));
$("invite").addEventListener("click",()=>{if(tg?.initDataUnsafe?.user?.id){const url="https://t.me/share/url?url="+encodeURIComponent(location.href)+"&text="+encodeURIComponent("Solar Coin Mining demo");tg.openTelegramLink(url)}else{alert(t("inviteMessage"))}});
$("navBonus").addEventListener("click",e=>{e.preventDefault();document.querySelector(".section").scrollIntoView({behavior:"smooth"})});
$("wallet").addEventListener("click",e=>{e.preventDefault();alert((lang==="tr"?"Sanal bakiye: ":"Virtual balance: ")+state.balance.toFixed(2)+" SCN")});
$("profile").addEventListener("click",e=>{e.preventDefault();alert(lang==="tr"?"Profil: demo kullanıcı":"Profile: demo user")});
save();renderLang();
