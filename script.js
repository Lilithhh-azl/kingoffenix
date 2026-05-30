function doPost(e) {

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");

const data = JSON.parse(e.postData.contents);

// simpan file avatar ke Drive (opsional tapi direkomendasikan)
let fileUrl = "";

if(data.avatar){

const blob = Utilities.newBlob(
Utilities.base64Decode(data.avatar),
data.mimeType,
data.fileName
);

const folder = DriveApp.getFolderById("YOUR_FOLDER_ID");
const file = folder.createFile(blob);

fileUrl = file.getUrl();
}

// simpan ke sheet
sheet.appendRow([
data.nama,
data.hp,
data.ign,
fileUrl,
new Date()
]);

return ContentService
.createTextOutput(JSON.stringify({status:"success"}))
.setMimeType(ContentService.MimeType.JSON);
}


// =====================
// AMBIL DATA MEMBER
// =====================
function doGet() {

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
const values = sheet.getDataRange().getValues();

let result = [];

for(let i=1;i<values.length;i++){

result.push({
nama: values[i][0],
hp: values[i][1],
ign: values[i][2],
avatar: values[i][3]
});

}

return ContentService
.createTextOutput(JSON.stringify(result))
.setMimeType(ContentService.MimeType.JSON);
}
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylZnhZRyVVgU4Jnnn_JYmYdowf1eG_1FThjI5GLtWxGgWQe3tnjOPvPK_QjSDLoxFh/exec";

// =========================
// REGISTER SUBMIT
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

reader.onload = async function () {

const base64 = reader.result.split(",")[1];

const payload = {
nama,
hp,
ign,
avatar: base64,
mimeType: file.type,
fileName: file.name
};

await fetch(SCRIPT_URL, {
method: "POST",
body: JSON.stringify(payload)
});

showToast("🔥 Berhasil daftar Guild!");

loadMembers(); // langsung update list
};

reader.readAsDataURL(file);

});

});
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

startAutoUpdate();

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
function startAutoUpdate(){

// ambil pertama kali
startAutoUpdate();

// update setiap 5 detik
setInterval(() => {
startAutoUpdate();
}, 5000);

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
