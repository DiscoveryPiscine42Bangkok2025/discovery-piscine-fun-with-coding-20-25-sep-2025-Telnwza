let todos = []; //เก็บ list todo
const COOKIE_NAME = "todos";
const ONE_YEAR = 60 * 60 * 24 * 365;

function saveTodosToCookie() {
  try {
    const value = encodeURIComponent(JSON.stringify(todos));
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR}`;
  } catch (e) {
    console.error("Failed to save cookie:", e);
  }
}

function loadTodosFromCookie() {
  const pairs = document.cookie.split(";").map(s => s.trim());
  const found = pairs.find(p => p.startsWith(COOKIE_NAME + "="));
  if (!found) return [];
  try {
    const raw = found.split("=", 2)[1];
    return JSON.parse(decodeURIComponent(raw)) || [];
  } catch {
    return [];
  }
}

function render(listEl) {
  listEl.innerHTML = "";
  todos.forEach(text => {
    const item = document.createElement("div");
    item.className = "todo-item";
    item.textContent = text;
    listEl.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("ft_list");
  const newBtn = document.getElementById("newTodo");

  // โหลดจาก cookie
  todos = loadTodosFromCookie();
  render(listEl);

  newBtn.addEventListener("click", () => {
    const input = prompt("Enter a new TODO:");
    if (input === null) return;
    const text = input.trim();
    if (text === "") return;

    todos.unshift(text);
    saveTodosToCookie();
    render(listEl);
  });

  listEl.addEventListener("click", (e) => {
    const target = e.target.closest(".todo-item");
    if (!target) return;
    const idx = Array.from(listEl.children).indexOf(target);
    if (idx < 0) return;

    const ok = confirm(`Remove this TODO?\n\n${todos[idx]}`);
    if (!ok) return;

    todos.splice(idx, 1);
    saveTodosToCookie();  //เซฟ
    render(listEl);
  });
});