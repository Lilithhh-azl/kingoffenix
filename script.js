let guildMembers = [];

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylZnhZRyVVgU4Jnnn_JYmYdowf1eG_1FThjI5GLtWxGgWQe3tnjOPvPK_QjSDLoxFh/exec";

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
// RENDER MEMBERS
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
  <img src="${m.avatar}" />
  <h3>${m.nama}</h3>
  <span>${m.ign}</span>
</div>
`;

});

}

// =========================
// REGISTER FORM
// =========================
document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("guildForm");

form.addEventListener("submit", async (e) => {
e.preventDefault();

const nama = form.nama.value;
const hp = form.hp.value;
const ign = form.ign.value;
const file = form.avatar.files[0];

const reader = new FileReader();

reader.onload = async function(){

const base64 = reader.result.split(",")[1];

const data = {
nama,
hp,
ign,
avatar: base64,
mimeType: file.type,
fileName: file.name
};

await fetch(SCRIPT_URL, {
method:"POST",
body: JSON.stringify(data)
});

alert("🔥 Berhasil daftar guild!");

loadMembers();

};

reader.readAsDataURL(file);

});

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
if(el){
el.textContent = guildMembers.length;
}

}

// =========================
// MODAL
// =========================
function openModal(){
document.getElementById("loginModal").style.display = "flex";
}

function closeModal(){
document.getElementById("loginModal").style.display = "none";
}

// =========================
// INIT
// =========================
loadMembers();
