const API_URL = "/verify_database.php"; // tu backend

async function getBooks() {
  const res = await fetch(`${API_URL}?route=books`);
  return res.json();
}

async function deleteBook(id) {
  return fetch(`${API_URL}?route=books/${id}`, { method: "DELETE" });
}
