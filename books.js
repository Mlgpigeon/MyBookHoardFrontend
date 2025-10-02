document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("book-list");

  try {
    const books = await getBooks();

    books.forEach(book => {
      const row = document.createElement("div");
      row.textContent = book.title;

      const editBtn = createButton("Editar", () => editBook(book.id));
      const delBtn = createButton("Eliminar", async () => {
        if (confirm("¿Seguro que quieres borrar este libro?")) {
          await deleteBook(book.id);
          row.remove();
        }
      });

      row.appendChild(editBtn);
      row.appendChild(delBtn);
      container.appendChild(row);
    });

    const addBtn = createButton("+", () => showCreateForm());
    container.appendChild(addBtn);

  } catch (err) {
    container.textContent = "Error al cargar libros.";
    console.error(err);
  }
});
