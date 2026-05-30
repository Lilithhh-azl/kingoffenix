// ===============================
// KING OF FENIX DATABASE
// ===============================

const guildMembers = [
{
name:"Lilith",
rank:"Guild Master",
points:2500,
avatar:"https://i.pravatar.cc/300?img=1"
},
{
name:"Sizy",
rank:"Officer",
points:1800,
avatar:"https://i.pravatar.cc/300?img=2"
},
{
name:"Aori",
rank:"Raid Leader",
points:1650,
avatar:"https://i.pravatar.cc/300?img=3"
},
{
name:"Ristek",
rank:"Elite Member",
points:1400,
avatar:"https://i.pravatar.cc/300?img=4"
},
{
name:"Kuro",
rank:"Member",
points:1200,
avatar:"https://i.pravatar.cc/300?img=5"
}
];

const recentActivities = [
"🔥 Lilith completed Weekly Raid",
"🏆 Sizy promoted to Officer",
"⚔️ Aori defeated World Boss",
"🎁 Ristek donated 5000 Gold",
"⭐ Kuro completed 10 quests"
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

}
);
