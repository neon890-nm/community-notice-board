fetch("notices.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("notices");

    data.notices.reverse().forEach(notice => {
      const div = document.createElement("div");
      div.className = "notice";
      div.innerHTML = `
        <h3>${notice.title}</h3>
        <p>${notice.message}</p>
        <small>${notice.date}</small>
      `;
      container.appendChild(div);
    });
  });
