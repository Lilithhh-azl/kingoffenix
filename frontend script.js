
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylZnhZRyVVgU4Jnnn_JYmYdowf1eG_1FThjI5GLtWxGgWQe3tnjOPvPK_QjSDLoxFh/exec";

let guildMembers = [];

// =========================
// LOAD MEMBERS
// =========================
async function loadMembers(){

try{

const res = await fetch(SCRIPT_URL);
guildMembers = await res.json();

renderMembers();
updateStats();

}catch(err){
console.log(err);
}

}

// =========================
// RENDER
// =========================
function renderMembers(filter=""){

const container = document.getElementById("memberList");
if(!container) return;

container.innerHTML = "";

guildMembers
.filter(m => (m.nama || "").toLowerCase().includes(filter.toLowerCase()))
.forEach(m => {

container.innerHTML += `
<div class="member">
  <img src="${m.avatar || ''}">
  <h3>${m.nama}</h3>
  <span>${m.ign}</span>
</div>
`;

});

}

// =========================
// AUTO UPDATE (REAL TIME)
// =========================
function startAutoUpdate(){

loadMembers();

setInterval(() => {
loadMembers();
}, 5000);

}

// =========================
// REGISTER FORM
// =========================
document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("guildForm");

form.addEventListener("submit", (e) => {
e.preventDefault();

const file = form.avatar.files[0];
const reader = new FileReader();

reader.onload = async function(){

const payload = {
nama: form.nama.value,
hp: form.hp.value,
ign: form.ign.value,
avatar: reader.result.split(",")[1],
mimeType: file.type,
fileName: file.name
};

await fetch(SCRIPT_URL, {
method:"POST",
body: JSON.stringify(payload)
});

showToast("🔥 Berhasil daftar Guild!");

loadMembers();

};

reader.readAsDataURL(file);

});

startAutoUpdate();

});

// =========================
// SEARCH
// =========================
document.getElementById("memberSearch")?.addEventListener("input", (e)=>{
renderMembers(e.target.value);
});

// =========================
// STATS
// =========================
function updateStats(){

const el = document.getElementById("memberCount");
if(el) el.textContent = guildMembers.length;

}
