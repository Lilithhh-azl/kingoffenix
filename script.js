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
const isAdmin = false;

async function loadMembers() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const table = document.getElementById("membersTable");
  table.innerHTML = "";

  data.forEach(m => {
    table.innerHTML += `
      <tr>
        <td>${m.nickname}</td>

        <td>
          <img src="${m.avatar}" 
               style="width:50px;height:50px;border-radius:50%;border:2px solid orange;">
        </td>

        <td>${isAdmin ? m.nohp : "🔒 Hidden"}</td>
      </tr>
    `;
  });
}

    document.getElementById("memberCount").innerText = data.length;

}
