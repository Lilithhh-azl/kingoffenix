const API_URL = "https://script.google.com/macros/s/AKfycbzwCtpNGGFj6aSOfExDHtvt7tl9YwuW_7vuCVRw6lYc7ret8gSRRBsExLx75zAixE7I/exec";

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
        <img src="${m.avatar || 'https://via.placeholder.com/150'}">
        <h3>${m.nama}</h3>
        <p>${m.ign || '-'}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
  }
}

/* FORM SUBMIT */
document.getElementById("regForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("status");
  status.innerText = "Mengirim...";

  const data = {
    nama: document.getElementById("nama").value,
    hp: document.getElementById("hp").value,
    ign: document.getElementById("ign").value,
    avatar: document.getElementById("avatar").value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "success") {
      status.innerText = "Berhasil daftar!";
      document.getElementById("regForm").reset();
      loadMembers();
    } else {
      status.innerText = "Gagal daftar";
    }

  } catch (err) {
    status.innerText = "Error koneksi";
  }
});

loadMembers();
