// ====================================
// KING OF FENIX DATABASE SYSTEM
// ====================================

let guildMembers = [];

// ====================================
// GOOGLE SHEET API
// ====================================

async function loadMembers(){

try{

const response = await fetch(
"https://script.google.com/macros/s/AKfycbztn4xjLwJCz9b0NZrE0XFvJSQo5FQiazS6nenTAlZ81mzoJjivnEG-55KJy1diFK8w/exec"
);

guildMembers = await response.json();

renderMembers();

updateStats();

}catch(error){

console.error(
"Failed to load members:",
error
);

showToast(
"Failed to load member database"
);

}

}

// ====================================
// MEMBER RENDER
// ====================================

function renderMembers(filter=""){

const container =
document.getElementById("memberList");

if(!container) return;

container.innerHTML = "";

guildMembers
.filter(member=>
(member.Nama || "")
.toLowerCase()
.includes(filter.toLowerCase())
)
.forEach(member=>{

container.innerHTML += `

<div class="member">

<img
src="${member.avatar}"
alt="${member.Nama}"
>

<h3>${member.Nama}</h3>

<span>${member.posisi}</span>

</div>

`;

});

}

// ====================================
// ACTIVITY FEED
// ====================================

const recentActivities = [

"🔥 Guild database connected",
"🏆 New members can join",
"⚔️ Weekly raid available",
"🎁 Guild donation active",
"⭐ Welcome to King Of Fenix"

];

function renderActivities(){

const feed =
document.getElementById("activityFeed");

if(!feed) return;

feed.innerHTML = "";

recentActivities.forEach(activity=>{

feed.innerHTML += `

<div class="activity-item">

${activity}

</div>

`;

});

}

// ====================================
// STATS
// ====================================

function updateStats(){

const memberCount =
document.getElementById("memberCount");

if(memberCount){

memberCount.textContent =
guildMembers.length;

}

}

// ====================================
// ADMIN LOGIN
// ====================================

function openModal(){

const modal =
document.getElementById("loginModal");

if(modal){

modal.style.display = "flex";

}

}

function closeModal(){

const modal =
document.getElementById("loginModal");

if(modal){

modal.style.display = "none";

}

}

function adminLogin(){

const password =
document.getElementById("adminPassword")
.value;

if(password === "fenix123"){

showToast(
"Login Success"
);

closeModal();

}else{

showToast(
"Wrong Password"
);

}

}

// ====================================
// TOAST
// ====================================

function showToast(message){

const toast =
document.createElement("div");

toast.className =
"toast";

toast.textContent =
message;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},2500);

}

// ====================================
// PAGE LOAD
// ====================================

document.addEventListener(
"DOMContentLoaded",
()=>{

// Load Spreadsheet Data
loadMembers();

// Activity Feed
renderActivities();

// Search Member
const search =
document.getElementById(
"memberSearch"
);

if(search){

search.addEventListener(
"input",
e=>{

renderMembers(
e.target.value
);

}
);

}

// Admin Button
const adminBtn =
document.querySelector(
".admin-btn"
);

if(adminBtn){

adminBtn.addEventListener(
"click",
openModal
);

}

}
);
