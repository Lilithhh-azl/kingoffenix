const members = [
{
name: "Lilith",
rank: "Guild Master",
avatar: "https://i.pravatar.cc/150?img=1"
},
{
name: "Sizy",
rank: "Officer",
avatar: "https://i.pravatar.cc/150?img=2"
},
{
name: "Aori",
rank: "Raid Leader",
avatar: "https://i.pravatar.cc/150?img=3"
},
{
name: "Ristek",
rank: "Elite Member",
avatar: "https://i.pravatar.cc/150?img=4"
},
{
name: "Kuro",
rank: "Member",
avatar: "https://i.pravatar.cc/150?img=5"
}
];

const memberCount =
document.getElementById("memberCount");

const memberList =
document.getElementById("memberList");

if (memberCount) {
memberCount.textContent = members.length;
}

if (memberList) {

let html = "";

members.forEach(member => {

html += `
<div class="member">

<img
src="${member.avatar}"
alt="${member.name}"
>

<h3>${member.name}</h3>

<span>${member.rank}</span>

</div>
`;

});

memberList.innerHTML = html;

}
