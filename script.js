const galleryImages = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

// Open lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

// Display the selected image
function showImage() {
    const img = galleryImages[currentIndex];

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = img.alt;
}

// Next image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    showImage();
});

// Close lightbox
closeBtn.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = "none";
}

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (lightbox.style.display !== "flex") return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage();
    }

    if (event.key === "ArrowLeft") {
        currentIndex =
            (currentIndex - 1 + galleryImages.length) % galleryImages.length;

        showImage();
    }
});

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-img");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter.toLowerCase();

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        galleryItems.forEach(item => {
            const image = item.querySelector("img");
            const category = image.dataset.category?.toLowerCase().trim();

            if (selectedCategory === "all" || category === selectedCategory) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});

const addPhotoBtn = document.getElementById("addPhotoBtn");
const photoInput = document.getElementById("photoInput");
const photoCategory = document.getElementById("photoCategory");
const gallery = document.querySelector(".gallery");

// Open the computer's file picker
addPhotoBtn.addEventListener("click", () => {
    photoInput.click();
});

// Add the selected photo
photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (!file) return;

    // Check that the selected file is an image
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        photoInput.value = "";
        return;
    }

    const category = photoCategory.value;
    const imageURL = URL.createObjectURL(file);

    // Create the gallery item
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-img";

    const image = document.createElement("img");
    image.src = imageURL;
    image.alt = file.name;
    image.dataset.category = category;

    // Add image to the gallery
    galleryItem.appendChild(image);
    gallery.appendChild(galleryItem);

    // If a category filter is active, show the new image //
    // only when it matches the selected category //
    const activeFilter = document.querySelector(
        ".filter-btn.active"
    );

    const selectedFilter = activeFilter?.dataset.filter || "all";

    if (selectedFilter !== "all" && selectedFilter !== category) {
        galleryItem.style.display = "none";
    }

    // Allow selecting the same file again later
    photoInput.value = "";
});
