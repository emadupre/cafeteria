const products = document.querySelector(".products");
const productContainers = document.querySelectorAll(".product-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const orderButton = document.getElementById("orderButton");
const customerModal = document.getElementById("customerModal");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;
const totalProducts = productContainers.length;

// Crear puntos de navegación
for (let i = 0; i < totalProducts; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    const slideWidth = productContainers[0].offsetWidth;
    products.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

prev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    updateCarousel();
});

next.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalProducts;
    updateCarousel();
});

orderButton.addEventListener("click", () => {
    customerModal.style.display = "flex";
});

function closeModal() {
    customerModal.style.display = "none";
    document.getElementById("customerName").value = "";
}

function confirmOrder() {
    const customerName = document.getElementById("customerName").value.trim();
    if (customerName === "") {
        alert("Por favor, ingresa tu nombre");
        return;
    }

    localStorage.setItem("customerName", customerName);
    window.location.href = "pedidos.html";
}

window.onclick = function(event) {
    if (event.target === customerModal) {
        closeModal();
    }
}

// Inicializar el carrusel
updateCarousel();

// Añadir soporte para deslizar en dispositivos táctiles
let touchStartX = 0;
let touchEndX = 0;

products.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

products.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        // Deslizar a la izquierda
        next.click();
    } else if (touchEndX - touchStartX > 50) {
        // Deslizar a la derecha
        prev.click();
    }
}

// Ajustar el carrusel cuando cambia el tamaño de la ventana
window.addEventListener('resize', updateCarousel);