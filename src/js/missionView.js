const container = document.getElementById("missions-list");

async function fetchUpcomingMissions() {
  const url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=8";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming missions:", error);
    return [];
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
