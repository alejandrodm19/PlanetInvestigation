const container = document.getElementById("missions-list");

async function fetchMissions() {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=8"
    );

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const data = await response.json();
    displayMissions(data.results);
  } catch (error) {
    console.warn("Live API failed. Using mock data instead:", error);
    // fallback
    const mock = await fetch("src/js/mock-missions.json");
    const data = await mock.json();
    displayMissions(data.results);
  }
}

function createMissionCard(mission) {
  const card = document.createElement("div");
  card.classList.add("card");

  const missionName = mission.name || "Unnamed Mission";
  const rocket = mission.rocket?.configuration?.name || "Unknown Rocket";
  const date = new Date(mission.net).toLocaleString();
  const agency = mission.launch_service_provider?.name || "Unknown Agency";
  const videoURL = mission.vidURLs?.[0] || null;
  const image = mission.image || "/src/images/placeholder-launch.jpg";

  card.innerHTML = `
    <h3>${missionName}</h3>
    <img src="${image}" alt="${missionName}" style="width:100%; border-radius:8px; margin:1rem 0;" />
    <p><strong>Rocket:</strong> ${rocket}</p>
    <p><strong>Agency:</strong> ${agency}</p>
    <p><strong>Date:</strong> ${date}</p>
    ${
      videoURL
        ? `<a href="${videoURL}" target="_blank">🔗 Watch Live</a>`
        : `<p>No livestream link available.</p>`
    }
  `;

  container.appendChild(card);
}

async function displayMissions() {
  const missions = await fetchUpcomingMissions();
  missions.forEach(createMissionCard);
}

displayMissions();
