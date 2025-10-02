function createButton(text, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.onclick = onClick;
  return btn;
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