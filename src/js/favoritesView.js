const form = document.getElementById("timeline-form");
const container = document.getElementById("timeline-container");

document.addEventListener("DOMContentLoaded", renderTimeline);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("event-date").value;
  const title = document.getElementById("event-title").value.trim();
  const description = document.getElementById("event-description").value.trim();
  const link = document.getElementById("event-link").value.trim();

  if (!date || !title || !description) return;

  const newEvent = {
    id: Date.now(),
    date,
    title,
    description,
    link,
  };

  const timeline = getTimeline();
  timeline.push(newEvent);
  saveTimeline(timeline);
  form.reset();
  renderTimeline();
});

function getTimeline() {
  return JSON.parse(localStorage.getItem("spaceTimeline")) || [];
}

function saveTimeline(events) {
  localStorage.setItem("spaceTimeline", JSON.stringify(events));
}


function renderTimeline() {
  container.innerHTML = "";

  const timeline = getTimeline().sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if (timeline.length === 0) {
    container.innerHTML =
      "<p>No discoveries yet. Add your first one above!</p>";
    return;
  }

  timeline.forEach((event) => {
    const card = document.createElement("div");
    card.classList.add("timeline-card");

    card.innerHTML = `
      <h4>${event.title}</h4>
      <p class="timeline-date">${new Date(event.date).toLocaleDateString()}</p>
      <p>${event.description}</p>
      ${
        event.link
          ? `<a href="${event.link}" target="_blank">More info</a>`
          : ""
      }
      <button class="delete-btn" data-id="${event.id}">🗑 Delete</button>
    `;

    container.appendChild(card);
  });

  
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const updated = getTimeline().filter((ev) => ev.id !== id);
      saveTimeline(updated);
      renderTimeline();
    });
  });
}
