const API_URL = "https://script.google.com/macros/s/AKfycby-h-kwPP7jwLyXjb5qE22G01kv5JrE027Dt_YEaTef-ZhjgLl8CZDc_ZxwiSdGTTrZ/exec";

/* LOAD MEMBERS */
async function loadMembers() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const container = document.getElementById("members");
    container.innerHTML = "";

    data.forEach(m => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${m.avatar || 'https://via.placeholder.com/200'}">
        <h3>${m.nama}</h3>
        <p>${m.ign || '-'}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Load error:", err);
  }
}

/* FORM SUBMIT */
document.getElementById("regForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("status");
  status.innerText = "Sending...";

  const data = {
    nama: nama.value,
    hp: hp.value,
    ign: ign.value,
    avatar: avatar.value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "success") {
      status.innerText = "Success!";
      regForm.reset();
      loadMembers();
    } else {
      status.innerText = "Failed!";
    }

  } catch (err) {
    status.innerText = "Error connection";
  }
});

/* INIT */
loadMembers();
