// Array de videojuegos
const videojuegos = [
  { nombre: "Super Mario Odyssey", precio: 50 },
  { nombre: "The Legend of Zelda", precio: 60 },
  { nombre: "Animal Crossing", precio: 55 },
  { nombre: "Minecraft", precio: 30 },
  { nombre: "Fortnite", precio: 10 }
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const gameListElement = document.getElementById('gameList');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const mensajeCompra = document.getElementById('mensajeCompra') || document.createElement('div');

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

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'éxito') {
  const notificacion = document.createElement('div');
  notificacion.textContent = mensaje;
  notificacion.style.position = 'fixed';
  notificacion.style.top = '20px';
  notificacion.style.right = '20px';
  notificacion.style.padding = '12px';
  notificacion.style.background = tipo === 'éxito' ? '#4CAF50' : '#f44336';
  notificacion.style.color = 'white';
  notificacion.style.borderRadius = '5px';
  notificacion.style.zIndex = '1000';
  document.body.appendChild(notificacion);
  
  setTimeout(() => notificacion.remove(), 2000);
}

// Agregar juego al carrito
function agregarAlCarrito(index) {
  const juego = videojuegos[index];
  carrito.push(juego);
  actualizarCarrito();
  guardarCarrito();
  mostrarNotificacion(`✅ ${juego.nombre} agregado al carrito`);
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

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarNotificacion('🛒 El carrito está vacío', 'error');
    return;
  }

  const total = carrito.reduce((sum, juego) => sum + juego.precio, 0);
  mostrarNotificacion(`🎉 Compra exitosa! Total: $${total}`);
  
  carrito = [];
  actualizarCarrito();
  guardarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  guardarCarrito();
  mostrarNotificacion('Carrito vaciado');
}

// Event listeners
checkoutBtn.addEventListener('click', finalizarCompra);
clearCartBtn.addEventListener('click', vaciarCarrito);

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('mensajeCompra')) {
    const msgDiv = document.createElement('div');
    msgDiv.id = 'mensajeCompra';
    document.querySelector('.cart-container').appendChild(msgDiv);
  }
  mostrarJuegos();
  actualizarCarrito();
});