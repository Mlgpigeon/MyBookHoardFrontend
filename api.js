const API_URL = "https://api.mybookhoard.com/api";

// --- Helpers ---
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

function showApiResponse(response) {
  let box = document.getElementById("api-response");
  if (!box) {
    box = document.createElement("pre");
    box.id = "api-response";
    document.body.appendChild(box);
  }
  box.textContent = JSON.stringify(response, null, 2);
}

// --- Auth ---
async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const json = await res.json();
  showApiResponse(json);   // 👈 aquí mostramos la respuesta de login

  if (json.success && json.data.token) {
    localStorage.setItem("token", json.data.token);
  }

  return json;
}

// --- Books ---
async function getBooks() {
  const res = await fetch(`${API_URL}/books`, {
    headers: { ...getAuthHeaders() }
  });
  const json = await res.json();
  showApiResponse(json);   // 👈 mostramos la respuesta completa
  return json.data ? json.data.books : [];
}

async function deleteBook(id) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });
  const json = await res.json().catch(() => ({ ok: res.ok }));
  showApiResponse(json);   // 👈 mostramos también el resultado del delete
  return res.ok;
}
