const planetList = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

const container = document.getElementById("planets-list");

async function fetchPlanetImage(planetName) {
  const url = `https://images-api.nasa.gov/search?q=${planetName}&media_type=image`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const items = data.collection.items;

    
    const firstImage = items.find((item) => item.links && item.links[0].href);

    return firstImage ? firstImage.links[0].href : null;
  } catch (error) {
    console.error(`Error fetching ${planetName}:`, error);
    return null;
  }
}

async function displayPlanets() {
  for (let planet of planetList) {
    const imageUrl = await fetchPlanetImage(planet);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${planet}</h3>
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="${planet}" style="width: 100%; border-radius: 8px; margin: 1rem 0;">`
            : `<p>No image available</p>`
        }
        <p>Click to learn more soon!</p>
      `;

    container.appendChild(card);
  }
}

displayPlanets();
