// ===============================
// KING OF FENIX DATABASE
// ===============================
async function loadMembers(){

const response = await fetch(
"https://script.google.com/macros/s/AKfycbztn4xjLwJCz9b0NZrE0XFvJSQo5FQiazS6nenTAlZ81mzoJjivnEG-55KJy1diFK8w/exec"
);

const members = await response.json();

renderMembers(members);

}
function renderMembers(members){

const container =
document.getElementById("memberList");

container.innerHTML = "";

members.forEach(member=>{

container.innerHTML += `
<div class="member">
<img src="${member.Avatar}">
<h3>${member.Name}</h3>
<span>${member.Rank}</span>
</div>
`;

});

}

const recentActivities = [
"🔥 Phos completed Weekly Raid",
"🏆 Phos promoted to Officer",
"⚔️ Phos defeated World Boss",
"🎁 Phos donated 5000 Gold",
"⭐ Phos completed 10 quests"
];

function renderMembers(filter=""){

const container =
document.getElementById("memberList");

if(!container) return;

container.innerHTML = "";

guildMembers
.filter(member=>
member.name
.toLowerCase()
.includes(filter.toLowerCase())
)
.forEach(member=>{

container.innerHTML += `
<div class="member">

<img src="${member.avatar}">

<h3>${member.name}</h3>

<span>${member.rank}</span>

<p>
⭐ ${member.points} pts
</p>

</div>
`;

});

}

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

function updateStats(){

const memberCount =
document.getElementById("memberCount");

if(memberCount){

memberCount.textContent =
guildMembers.length;

}

}

function openModal(){

document.getElementById("loginModal")
.style.display="flex";

}

function closeModal(){

document.getElementById("loginModal")
.style.display="none";

}

function adminLogin(){

const password =
document.getElementById("adminPassword")
.value;

if(password==="fenix123"){

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

function showToast(message){

const toast =
document.createElement("div");

toast.className="toast";

toast.textContent=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2500);

}

document.addEventListener(
"DOMContentLoaded",
()=>{

renderMembers();

renderActivities();

updateStats();

const search =
document.getElementById("memberSearch");

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

const adminBtn =
document.querySelector(".admin-btn");

if(adminBtn){

adminBtn.addEventListener(
"click",
openModal
);

}
document.addEventListener(
"DOMContentLoaded",
()=>{
loadMembers();
}
);
}
);
