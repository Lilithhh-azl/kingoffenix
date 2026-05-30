const members = [

{
name:"Lilith",
rank:"Guild Master",
avatar:"https://i.pravatar.cc/150?img=1"
},

{
name:"Sizy",
rank:"Officer",
avatar:"https://i.pravatar.cc/150?img=2"
},

{
name:"Aori",
rank:"Raid Leader",
avatar:"https://i.pravatar.cc/150?img=3"
},

{
name:"Ristek",
rank:"Elite Member",
avatar:"https://i.pravatar.cc/150?img=4"
},

{
name:"Kuro",
rank:"Member",
avatar:"https://i.pravatar.cc/150?img=5"
}

];

document.getElementById("memberCount").innerText =
members.length;

const container =
document.getElementById("memberList");

members.forEach(member=>{

container.innerHTML += `

<div class="member">

<img src="${member.avatar}">

<h3>${member.name}</h3>

<span>${member.rank}</span>

</div>

`;

});
