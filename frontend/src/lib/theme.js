export function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function initTheme() {
  const stored = localStorage.getItem("theme");
  const theme = stored || "dark"; //default dark
  setTheme(theme);
}
