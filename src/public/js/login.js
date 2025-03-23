const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      result.json().then((json) => {
        document.cookie = `jwtCookieToken=${json.token}; max-age=86400; path=/`;
        window.location.replace("/users");
      });
    } else {
      alert("Login inválido. Verifica tus credenciales.");
    }
  });
});
