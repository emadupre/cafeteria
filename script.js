const products = document.querySelector(".products");
const productContainers = document.querySelectorAll(".product-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const orderButton = document.getElementById("orderButton");
const customerModal = document.getElementById("customerModal");

let currentIndex = 0;
const totalProducts = productContainers.length;

// Clonar el primer y el último producto para el efecto circular
const firstClone = productContainers[0].cloneNode(true);
const lastClone = productContainers[totalProducts - 1].cloneNode(true);

products.appendChild(firstClone);
products.prepend(lastClone);

// Actualizar el ancho total del contenedor
products.style.display = "flex";
products.style.width = `${(totalProducts + 2) * 200}px`;

const updateCarousel = () => {
  products.style.transform = `translateX(${-currentIndex * 200}px)`;
};

// Moverse hacia la izquierda
prev.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = totalProducts;
    products.style.transition = "none";
    updateCarousel();
    setTimeout(() => {
      currentIndex--;
      products.style.transition = "transform 0.5s ease";
      updateCarousel();
    }, 0);
  } else {
    currentIndex--;
    updateCarousel();
  }
});

// Moverse hacia la derecha
next.addEventListener("click", () => {
  if (currentIndex === totalProducts - 1) {
    currentIndex = -1;
    products.style.transition = "none";
    updateCarousel();
    setTimeout(() => {
      currentIndex++;
      products.style.transition = "transform 0.5s ease";
      updateCarousel();
    }, 0);
  } else {
    currentIndex++;
    updateCarousel();
  }
});

// Funcionalidad del modal
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

  // Guardar el nombre del cliente en localStorage
  localStorage.setItem("customerName", customerName);
  
  // Redirigir a la página de pedidos
  window.location.href = "pedidos.html";
}

// Cerrar modal si se hace clic fuera de él
window.onclick = function(event) {
  if (event.target === customerModal) {
    closeModal();
  }
}

// Inicializar el carrusel
updateCarousel();


