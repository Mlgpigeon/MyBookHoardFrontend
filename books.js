document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const loginContainer = document.getElementById("login-container");
  const appContainer = document.getElementById("app");

  // Si ya hay token guardado → saltamos login
  if (localStorage.getItem("token")) {
    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    loadBooks();
  }

  // Evento de login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const result = await login(email, password);

      // Mostrar SIEMPRE respuesta cruda
      showApiResponse(result);

      if (result.success && result.data.token) {
        loginError.textContent = "";
        loginContainer.style.display = "none";
        appContainer.style.display = "block";
        loadBooks();
      } else {
        loginError.textContent = result.error || "Credenciales inválidas";
      }
    } catch (err) {
      console.error("Error login:", err);
      loginError.textContent = "Error de conexión con el servidor";
      showApiResponse({ error: err.message });
    }
  });
});


// Función para cargar libros
async function loadBooks() {
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  try {
    const books = await getBooks();

    // Mostrar la lista “bonita”
    if (!books || books.length === 0) {
      container.textContent = "No hay libros en la base de datos.";
    } else {
      books.forEach(book => {
        const row = document.createElement("div");
        row.classList.add("book-item");

        // Texto principal (ej: título)
        const title = document.createElement("span");
        title.textContent = book.title || `Libro sin título (ID: ${book.id})`;

        const editBtn = createButton("Editar", () => editBook(book));
        const delBtn = createButton("Eliminar", async () => {
          if (confirm("¿Seguro que quieres borrar este libro?")) {
            const res = await deleteBook(book.id);
            console.log("DELETE response:", res);
            row.remove();
            showApiResponse(res);
          }
        });

        row.appendChild(title);
        row.appendChild(editBtn);
        row.appendChild(delBtn);
        container.appendChild(row);
      });
    }

    // Mostrar respuesta cruda de la API debajo
    showApiResponse(books);

  } catch (err) {
    container.textContent = "Error al cargar libros.";
    showApiResponse({ error: err.message });
    console.error("Error loadBooks:", err);
  }
}
