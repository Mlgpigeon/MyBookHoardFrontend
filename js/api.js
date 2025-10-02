const API_URL = "https://api.mybookhoard.com/api";

/**
 * Get authorization headers with JWT token
 */
function getAuthHeaders() {
  const token = localStorage.getItem("jwt");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

/**
 * Display API response in a debug box
 */
function showApiResponse(response) {
  let box = document.getElementById("api-response");
  if (!box) {
    box = document.createElement("pre");
    box.id = "api-response";
    box.style.display = "none"; // Hidden by default
    document.body.appendChild(box);
  }
  box.textContent = JSON.stringify(response, null, 2);
}

/**
 * Login user with identifier (username or email) and password
 * @param {string} identifier - Username or email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login response
 */
async function login(identifier, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password })
  });

  const json = await res.json();
  showApiResponse(json);

  if (json.success && json.data && json.data.token) {
    localStorage.setItem("jwt", json.data.token);
  }

  return json;
}

/**
 * Logout current user
 */
async function logout() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: { ...getAuthHeaders() }
  });
  
  const json = await res.json();
  localStorage.removeItem("jwt");
  showApiResponse(json);
  
  return json;
}

/**
 * Get all books for authenticated user
 * @returns {Promise<Array>} Array of books
 */
async function getBooks() {
  const res = await fetch(`${API_URL}/books`, {
    headers: { ...getAuthHeaders() }
  });
  
  const json = await res.json();
  showApiResponse(json);
  
  return json.success && json.data ? json.data.books : [];
}

/**
 * Delete a book by ID
 * @param {number} id - Book ID to delete
 * @returns {Promise<boolean>} True if successful
 */
async function deleteBook(id) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });
  
  const json = await res.json().catch(() => ({ success: res.ok }));
  showApiResponse(json);
  
  return json.success || res.ok;
}

/**
 * Update a book by ID
 * @param {number} id - Book ID to update
 * @param {Object} data - Book data to update
 * @returns {Promise<Object>} Update response
 */
async function updateBook(id, data) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders() 
    },
    body: JSON.stringify(data)
  });
  
  const json = await res.json();
  showApiResponse(json);
  
  return json;
}