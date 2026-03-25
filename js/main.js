const dogsGrid = document.getElementById("dogs-grid");

function getDogCoverImage(dog) {
  return `${dog.imageFolder}/${dog.imagePrefix}1.jpg`;
}

function createDogCard(dog) {
  const card = document.createElement("article");
  card.className = "dog-card";

  card.innerHTML = `
    <img class="dog-card-image" src="${getDogCoverImage(dog)}" alt="${dog.name}" />
    <div class="dog-card-content">
      <div class="dog-card-title-row">
        <h3>${dog.name}</h3>
        <span class="dog-badge">${dog.gender}</span>
      </div>

      <div class="dog-meta">
        <span class="meta-pill">${dog.breed}</span>
        <span class="meta-pill">${dog.weight}</span>
      </div>

      <p class="card-summary">${dog.shortDescription}</p>

      <a class="card-link" href="dog.html?id=${dog.id}">View Full Profile</a>
    </div>
  `;

  return card;
}

function renderDogs() {
  if (!dogsGrid || !Array.isArray(dogs)) return;

  dogsGrid.innerHTML = "";

  dogs.forEach((dog) => {
    dogsGrid.appendChild(createDogCard(dog));
  });
}



renderDogs();