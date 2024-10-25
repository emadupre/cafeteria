const products = document.querySelector(".products");
const productContainers = document.querySelectorAll(".product-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentIndex = 0; // Índice del producto actualmente visible
const totalProducts = productContainers.length;

// Clonar el primer y el último producto para el efecto circular
const firstClone = productContainers[0].cloneNode(true);
const lastClone = productContainers[totalProducts - 1].cloneNode(true);

products.appendChild(firstClone);
products.prepend(lastClone);

// Actualizar el ancho total del contenedor
products.style.display = "flex";
products.style.width = `${(totalProducts + 2) * 200}px`; // Ajusta según el ancho de tus productos

const updateCarousel = () => {
  products.style.transform = `translateX(${-currentIndex * 200}px)`; // Desplaza basado en el índice actual
};

// Moverse hacia la izquierda
prev.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = totalProducts; // Mover al último producto
    products.style.transition = "none"; // Desactivar la transición para el salto
    updateCarousel();
    setTimeout(() => {
      currentIndex--; // Volver a la posición correcta
      products.style.transition = "transform 0.5s ease"; // Activar la transición
      updateCarousel();
    }, 0);
  } else {
    currentIndex--; // Desplazarse a la izquierda
    updateCarousel();
  }
});

// Moverse hacia la derecha
next.addEventListener("click", () => {
  if (currentIndex === totalProducts - 1) {
    currentIndex = -1; // Mover al primer producto
    products.style.transition = "none"; // Desactivar la transición para el salto
    updateCarousel();
    setTimeout(() => {
      currentIndex++; // Volver a la posición correcta
      products.style.transition = "transform 0.5s ease"; // Activar la transición
      updateCarousel();
    }, 0);
  } else {
    currentIndex++; // Desplazarse a la derecha
    updateCarousel();
  }
});

// Inicializar el carrusel
updateCarousel();
