const dogDetailsContainer = document.getElementById("dog-details");

function getDogIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function buildGalleryImages(dog) {
  const images = [];

  for (let i = 1; i <= dog.imageCount; i++) {
    images.push(`${dog.imageFolder}/${dog.imagePrefix}${i}.jpg`);
  }

  return images;
}

function createGallery(dog) {
  const images = buildGalleryImages(dog);

  if (!images || images.length === 0) {
    return `<p class="text-muted">No additional photos available at the moment.</p>`;
  }

  return `
    <div class="gallery-grid">
      ${images
        .map(
          (image, index) => `
            <button
              class="gallery-item"
              type="button"
              data-image="${image}"
              data-alt="${dog.name} photo ${index + 1}"
            >
              <img src="${image}" alt="${dog.name} photo ${index + 1}" />
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function createVideos(videos) {
  if (!videos || videos.length === 0) {
    return `<p class="text-muted">No videos available at the moment.</p>`;
  }

  return `
    <div class="video-grid">
      ${videos
        .map(
          (video) => `
            <video controls preload="metadata">
              <source src="${video}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          `
        )
        .join("")}
    </div>
  `;
}

function createList(items) {
  if (!items || items.length === 0) {
    return `<p class="text-muted">No additional information available.</p>`;
  }

  return `
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function openLightbox(imageSrc, imageAlt) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = imageSrc;
  lightboxImage.alt = imageAlt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("active");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.style.overflow = "";
}

function setupGalleryClicks() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSrc = item.dataset.image;
      const imageAlt = item.dataset.alt || "Dog photo";
      openLightbox(imageSrc, imageAlt);
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxImage = document.getElementById("lightbox-image");

  if (lightbox) {
    lightbox.addEventListener("click", closeLightbox);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", (event) => {
      event.stopPropagation();
      closeLightbox();
    });
  }

  if (lightboxImage) {
    lightboxImage.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

function renderDogProfile() {
  if (!dogDetailsContainer || !Array.isArray(dogs)) return;

  const dogId = getDogIdFromUrl();

  if (!dogId) {
    dogDetailsContainer.innerHTML = `
      <section class="not-found-box">
        <h1>Dog profile not found</h1>
        <p>No dog ID was provided in the URL.</p>
      </section>
    `;
    return;
  }

  const dog = dogs.find((item) => item.id === dogId);

  if (!dog) {
    dogDetailsContainer.innerHTML = `
      <section class="not-found-box">
        <h1>Dog profile not found</h1>
        <p>This dog may have been removed or the link may be incorrect.</p>
      </section>
    `;
    return;
  }

  const coverImage = `${dog.imageFolder}/${dog.imagePrefix}1.jpg`;

  document.title = `${dog.name} | Dog Profile`;

  dogDetailsContainer.innerHTML = `
    <section class="dog-profile-layout">
      <img class="dog-main-image" src="${coverImage}" alt="${dog.name}" />

      <div class="dog-info-panel">
        <p class="eyebrow section-eyebrow">Adoption Candidate</p>
        <h1>${dog.name}</h1>

        <div class="info-grid">
          <div class="info-box">
            <span class="info-label">Breed / Type</span>
            <span class="info-value">${dog.breed}</span>
          </div>

          <div class="info-box">
            <span class="info-label">Gender</span>
            <span class="info-value">${dog.gender}</span>
          </div>

          <div class="info-box">
            <span class="info-label">Date of Birth</span>
            <span class="info-value">${dog.birthDate}</span>
          </div>

          <div class="info-box">
            <span class="info-label">Weight</span>
            <span class="info-value">${dog.weight}</span>
          </div>

          <div class="info-box">
            <span class="info-label">Height</span>
            <span class="info-value">${dog.height}</span>
          </div>

          <div class="info-box">
            <span class="info-label">Color / Features</span>
            <span class="info-value">${dog.color}</span>
          </div>
        </div>

        <div class="text-block">
          <h2>${dog.introTitle}</h2>
          <p>${dog.introText}</p>
        </div>
      </div>
    </section>

    <section class="detail-section">
      <h2>Health Information</h2>
      <div class="detail-grid">
        <div class="detail-card"><h3>Microchip Number</h3><p>${dog.microchip}</p></div>
        <div class="detail-card"><h3>Rabies Vaccination</h3><p>${dog.rabiesVaccination}</p></div>
        <div class="detail-card"><h3>Core Vaccinations</h3><p>${dog.coreVaccinations}</p></div>
        <div class="detail-card"><h3>Parasite Treatment</h3><p>${dog.parasiteTreatment}</p></div>
        <div class="detail-card"><h3>Neutered / Spayed</h3><p>${dog.neuteredSpayed}</p></div>
        <div class="detail-card"><h3>General Health Condition</h3><p>${dog.healthCondition}</p></div>
        <div class="detail-card"><h3>Known Medical Issues</h3><p>${dog.medicalIssues}</p></div>
        <div class="detail-card"><h3>Current Treatments</h3><p>${dog.currentTreatments}</p></div>
      </div>
    </section>

    <section class="detail-section">
      <h2>Behavior Assessment</h2>
      <div class="detail-grid">
        <div class="detail-card"><h3>With Strangers</h3><p>${dog.strangers}</p></div>
        <div class="detail-card"><h3>With Children</h3><p>${dog.children}</p></div>
        <div class="detail-card"><h3>Men / Women Differences</h3><p>${dog.menWomenDifferences}</p></div>
        <div class="detail-card"><h3>With Dogs</h3><p>${dog.dogsCompatibility}</p></div>
        <div class="detail-card"><h3>With Cats</h3><p>${dog.catsCompatibility}</p></div>
        <div class="detail-card"><h3>Energy Level</h3><p>${dog.energyLevel}</p></div>
        <div class="detail-card"><h3>Personality</h3><p>${dog.personality}</p></div>
        <div class="detail-card"><h3>Suitable for Indoor Living</h3><p>${dog.indoorLiving}</p></div>
        <div class="detail-card"><h3>Separation Anxiety</h3><p>${dog.separationAnxiety}</p></div>
        <div class="detail-card"><h3>Barking Level</h3><p>${dog.barkingLevel}</p></div>
        <div class="detail-card"><h3>Escape Tendency</h3><p>${dog.escapeTendency}</p></div>
        <div class="detail-card"><h3>Aggression</h3><p>${dog.aggression}</p></div>
      </div>
    </section>

    <section class="detail-section">
      <h2>Background</h2>
      <div class="detail-grid">
        <div class="detail-card"><h3>Time in Care</h3><p>${dog.timeInCare}</p></div>
        <div class="detail-card"><h3>Previous Owner</h3><p>${dog.previousOwner}</p></div>
      </div>

      <div class="text-block">
        <h2>Story</h2>
        <p>${dog.story}</p>
      </div>
    </section>

    <section class="detail-section">
      <h2>Adoption Notes</h2>
      <div class="detail-grid">
        <div class="detail-card"><h3>Suitable Home Type</h3><p>${dog.suitableHome}</p></div>
        <div class="detail-card"><h3>Experience Required</h3><p>${dog.experienceRequired}</p></div>
        <div class="detail-card"><h3>Special Requirements</h3><p>${dog.specialRequirements}</p></div>
        <div class="detail-card"><h3>Additional Notes</h3><p>${dog.additionalNotes}</p></div>
      </div>
    </section>

    <section class="detail-section">
      <h2>Personality Highlights</h2>
      ${createList(dog.personalityHighlights)}
    </section>

    <section class="detail-section">
      <h2>Ideal Home</h2>
      ${createList(dog.idealHomeHighlights)}
    </section>

    <section class="detail-section">
      <h2>Health Summary</h2>
      ${createList(dog.healthHighlights)}
    </section>

    <section class="detail-section">
      <h2>Why Adopt ${dog.name}?</h2>
      <p>${dog.whyAdopt}</p>
    </section>

    <section class="media-section">
      <h2>Photo Gallery</h2>
      ${createGallery(dog)}
    </section>

    <section class="media-section">
      <h2>Videos</h2>
      ${createVideos(dog.videos)}
    </section>

    <div id="lightbox" class="lightbox">
      <button id="lightbox-close" class="lightbox-close" type="button">×</button>
      <img id="lightbox-image" class="lightbox-image" src="" alt="" />
    </div>
  `;

  setupGalleryClicks();
}

renderDogProfile();