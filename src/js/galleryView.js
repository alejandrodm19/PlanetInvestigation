const galleryContainer = document.getElementById("gallery");


const imageLimit = 12;


const NASA_SEARCH_URL =
  "https://images-api.nasa.gov/search?q=space&media_type=image";

async function fetchGalleryImages() {
  try {
    const response = await fetch(NASA_SEARCH_URL);
    const data = await response.json();
    const items = data.collection.items.slice(0, imageLimit);

    return items.map((item) => ({
      title: item.data[0].title,
      imageUrl: item.links?.[0]?.href || null,
    }));
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

function createGalleryItem({ title, imageUrl }) {
  const div = document.createElement("div");
  div.classList.add("gallery-item");

  div.innerHTML = `
    <img src="${imageUrl}" alt="${title}" />
    <p>${title}</p>
  `;
    
  const isFavorite = (imageUrl) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((item) => item.imageUrl === imageUrl);
  };

  function createGalleryItem({ title, imageUrl }) {
    const div = document.createElement("div");
    div.classList.add("gallery-item");

    const heart = document.createElement("button");
    heart.textContent = isFavorite(imageUrl) ? "💖" : "🤍";
    heart.style.fontSize = "1.5rem";
    heart.style.border = "none";
    heart.style.background = "transparent";
    heart.style.cursor = "pointer";

    heart.addEventListener("click", () => {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (isFavorite(imageUrl)) {
        favorites = favorites.filter((item) => item.imageUrl !== imageUrl);
        heart.textContent = "🤍";
      } else {
        favorites.push({ title, imageUrl });
        heart.textContent = "💖";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    div.innerHTML = `
      <img src="${imageUrl}" alt="${title}" />
      <p>${title}</p>
    `;
    div.appendChild(heart);

    galleryContainer.appendChild(div);
  }

  galleryContainer.appendChild(div);
}

async function displayGallery() {
  const images = await fetchGalleryImages();
  images.forEach(createGalleryItem);
}

displayGallery();
