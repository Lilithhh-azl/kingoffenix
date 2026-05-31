const API_URL = "https://script.google.com/macros/s/AKfycbzWkSID5yaDkYnO_OZbTPqRpA1xcpwK_uv3ZWl_jBotoOWUnx5xJWyREiziseIIea8_/exec";

loadMembers();

document
.getElementById("registerForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {
        nickname: document.getElementById("nickname").value,
        class: document.getElementById("class").value,
        nohp: document.getElementById("nohp").value
    };

    try{

        await fetch(API_URL,{
            method:"POST",
            body:JSON.stringify(data)
        });

        alert("Registrasi berhasil!");

        this.reset();

        loadMembers();

    }catch(err){

        alert("Gagal registrasi");

    }

});

async function loadMembers(){

    const res = await fetch(API_URL);

    const data = await res.json();

    const table = document.getElementById("membersTable");

    table.innerHTML="";

    data.forEach(member=>{

        table.innerHTML += `
            <tr>
                <td>${member.nickname}</td>
                <td>${member.class}</td>
                <td>${member.nohp}</td>
            </tr>
        `;

    });

    document.getElementById("memberCount").innerText = data.length;

}
