let guildMembers = [];

// =========================
// CONFIG
// =========================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylZnhZRyVVgU4Jnnn_JYmYdowf1eG_1FThjI5GLtWxGgWQe3tnjOPvPK_QjSDLoxFh/exec";

// =========================
// LOAD MEMBERS
// =========================
async function loadMembers() {
  try {
    const res = await fetch(SCRIPT_URL);
    guildMembers = await res.json();

    renderMembers();
    updateStats();
  } catch (err) {
    console.log("Load error:", err);
  }
}

// =========================
// RENDER MEMBERS
// =========================
function renderMembers(filter = "") {
  const container = document.getElementById("memberList");
  if (!container) return;

  container.innerHTML = "";

  guildMembers
    .filter(m =>
      (m.nama || "").toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(m => {
      container.innerHTML += `
        <div class="member">
          <img src="${m.avatar || 'https://via.placeholder.com/80'}">
          <h3>${m.nama}</h3>
          <span>${m.ign}</span>
        </div>
      `;
    });
}

// =========================
// UPDATE STATS
// =========================
function updateStats() {
  const el = document.getElementById("memberCount");
  if (el) el.textContent = guildMembers.length;
}

// =========================
// AUTO UPDATE (REALTIME)
// =========================
function startAutoUpdate() {
  loadMembers();
  setInterval(loadMembers, 5000);
}

// =========================
// REGISTER FORM (FIXED 100%)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guildForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 🔥 STOP URL ?nama=...

    const file = form.avatar.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
      const payload = {
        nama: form.nama.value,
        hp: form.hp.value,
        ign: form.ign.value,
        avatar: reader.result.split(",")[1],
        mimeType: file?.type,
        fileName: file?.name
      };

      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(payload)
        });

        showToast("🔥 Berhasil daftar Guild!");

        form.reset();
        loadMembers(); // refresh list langsung
      } catch (err) {
        console.log(err);
        showToast("❌ Gagal daftar");
      }
    };

    reader.readAsDataURL(file);
  });

  // SEARCH
  const search = document.getElementById("memberSearch");
  if (search) {
    search.addEventListener("input", (e) => {
      renderMembers(e.target.value);
    });
  }

  // START SYSTEM
  startAutoUpdate();
});

// =========================
// MODAL
// =========================
function openModal() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}
