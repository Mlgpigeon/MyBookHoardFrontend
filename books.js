document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("book-list");
  const books = await getBooks();

  books.forEach(book => {
    const row = document.createElement("div");
    row.textContent = book.title;

    const editBtn = createButton("Editar", () => editBook(book));
    const delBtn = createButton("Eliminar", async () => {
      await deleteBook(book.id);
      row.remove();
    });

    row.appendChild(editBtn);
    row.appendChild(delBtn);
    container.appendChild(row);
  });

  const addBtn = createButton("+", () => createBookForm());
  container.appendChild(addBtn);
});
