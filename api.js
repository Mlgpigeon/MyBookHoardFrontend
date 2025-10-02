// Libros (Books)

async function getBooks() {
  const res = await fetch(`${API_URL}/books`);
  const json = await res.json();
  return json.data.books; 
}


async function getBook(id) {
  const res = await fetch(`${API_URL}/books/${id}`);
  return res.json();
}

async function createBook(data) {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function updateBook(id, data) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function deleteBook(id) {
  const res = await fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
  return res.ok;
}
