// Array de videojuegos
const videojuegos = [
  { nombre: "Super Mario Odyssey", precio: 50 },
  { nombre: "The Legend of Zelda", precio: 60 },
  { nombre: "Animal Crossing", precio: 55 },
  { nombre: "Minecraft", precio: 30 },
  { nombre: "Fortnite", precio: 10 }
];

// Carrito de compras
let carrito = [];

const gameListElement = document.getElementById('gameList');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

// Mostrar los videojuegos disponibles
function mostrarJuegos() {
  gameListElement.innerHTML = '';
  
  videojuegos.forEach((juego, index) => {
    const div = document.createElement('div');
    div.className = 'game';
    div.innerHTML = `
      <h3>${juego.nombre}</h3>
      <p class="price">$${juego.precio}</p>
      <button onclick="agregarAlCarrito(${index})" class="add-to-cart">Agregar al carrito</button>
    `;
    gameListElement.appendChild(div);
  });
}

// Agregar juego al carrito
function agregarAlCarrito(index) {
  const juego = videojuegos[index];
  carrito.push(juego);
  actualizarCarrito();
  
  setTimeout(() => {
    notificacion.remove();
  }, 2000);
}

// Actualizar el carrito
function actualizarCarrito() {
  cartItemsElement.innerHTML = '';
  
  if (carrito.length === 0) {
    cartItemsElement.innerHTML = '<p>No hay juegos en el carrito</p>';
    cartTotalElement.textContent = 'Total: $0';
    return;
  }
  
  carrito.forEach(juego => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${juego.nombre}</span>
      <span>$${juego.precio}</span>
    `;
    cartItemsElement.appendChild(div);
  });
  
  // Calcular total
  const total = carrito.reduce((sum, juego) => sum + juego.precio, 0);
  cartTotalElement.textContent = `Total: $${total}`;
}

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }
  
  const total = carrito.reduce((sum, juego) => sum + juego.precio, 0);
  alert(`¡Gracias por tu compra!\nTotal: $${total}`);
  carrito = [];
  actualizarCarrito();
});

// Vaciar carrito
clearCartBtn.addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});

// Iniciar la aplicación
mostrarJuegos();
actualizarCarrito();
