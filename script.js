// ===============================
// KING OF FENIX DATABASE
// ===============================

const guildMembers = [

{
id:1,
name:"Lilith",
rank:"Guild Master",
points:2500,
avatar:"https://i.pravatar.cc/300?img=1"
},

{
id:2,
name:"Sizy",
rank:"Officer",
points:1800,
avatar:"https://i.pravatar.cc/300?img=2"
},

{
id:3,
name:"Aori",
rank:"Raid Leader",
points:1650,
avatar:"https://i.pravatar.cc/300?img=3"
},

{
id:4,
name:"Ristek",
rank:"Elite Member",
points:1400,
avatar:"https://i.pravatar.cc/300?img=4"
},

{
id:5,
name:"Kuro",
rank:"Member",
points:1200,
avatar:"https://i.pravatar.cc/300?img=5"
},

{
id:6,
name:"Fenix",
rank:"Member",
points:1100,
avatar:"https://i.pravatar.cc/300?img=6"
}

];

// ===============================
// MEMBER RENDER
// ===============================

function renderMembers(){

const container =
document.getElementById("memberList");

if(!container) return;

container.innerHTML = "";

guildMembers.forEach(member=>{

const card = document.createElement("div");

card.className = "member";

card.innerHTML = `
<img src="${member.avatar}" alt="${member.name}">

<h3>${member.name}</h3>

<span>${member.rank}</span>

<p style="margin-top:10px;">
⭐ ${member.points} Points
</p>
`;

container.appendChild(card);

});

}

// ===============================
// STATISTICS
// ===============================

function updateStatistics(){

const memberCount =
document.getElementById("memberCount");

if(memberCount){

memberCount.textContent =
guildMembers.length;

}

}

// ===============================
// LEADERBOARD SORT
// ===============================

function getTopMembers(){

return [...guildMembers]

.sort((a,b)=>b.points-a.points)

.slice(0,3);

}

// ===============================
// RECENT ACTIVITY
// ===============================

const recentActivities = [

"🔥 Lilith completed Weekly Raid",

"🏆 Sizy reached Officer Rank",

"⚔️ Aori defeated World Boss",

"🎁 Ristek donated 5000 gold",

"🌟 Kuro completed 10 quests"

];

// ===============================
// FUTURE API PLACEHOLDER
// ===============================

// nanti akan diganti dengan
// Google Spreadsheet API

async function fetchGuildData(){

try{

console.log(
"Future Google Spreadsheet API"
);

}catch(error){

console.error(error);

}

}

// ===============================
// INITIALIZE
// ===============================

document.addEventListener(
"DOMContentLoaded",
()=>{

renderMembers();

updateStatistics();

}
);
