import { Carrito } from './carrito.js';
import { fetchProductos } from './data.js';

// Variables globales
let carrito = new Carrito();
let productos = [];
let productosFiltrados = [];

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  productos = await fetchProductos();
  productosFiltrados = [...productos];
  renderProductos(productosFiltrados);
  setupEventListeners();
  actualizarContadorCarrito();
});

// Renderizar productos
function renderProductos(listaProductos) {
  const contenedor = document.getElementById('gameList');
  contenedor.innerHTML = listaProductos.map(juego => `
    <div class="game-card">
      <img src="assets/images/${juego.imagen}" alt="${juego.nombre}" loading="lazy">
      <h3>${juego.nombre}</h3>
      <p class="price">$${juego.precio.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${juego.id}">Agregar</button>
    </div>
  `).join('');
}

// Configurar event listeners
function setupEventListeners() {
  // Delegación de eventos para botones dinámicos
  document.addEventListener('click', (e) => {
    // Botón "Agregar al carrito"
    if (e.target.classList.contains('add-to-cart')) {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      if (producto) {
        carrito.agregarItem(producto);
        actualizarContadorCarrito();
        Swal.fire({
          title: '¡Añadido!',
          text: `${producto.nombre} fue agregado al carrito`,
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    
    // Botón "Finalizar compra"
    if (e.target.id === 'checkout-btn') {
      finalizarCompra();
    }
    
    // Botón "Buscar"
    if (e.target.id === 'search-button') {
      buscarJuegos();
    }
    
    // Botón "Limpiar búsqueda"
    if (e.target.id === 'clear-search') {
      document.getElementById('search-input').value = '';
      productosFiltrados = [...productos];
      renderProductos(productosFiltrados);
    }
  });

  // Buscar al presionar Enter
  document.getElementById('search-input')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      buscarJuegos();
    }
  });
}

// Función de búsqueda
function buscarJuegos() {
  const termino = document.getElementById('search-input').value.toLowerCase();
  
  if (!termino.trim()) {
    productosFiltrados = [...productos];
  } else {
    productosFiltrados = productos.filter(juego => 
      juego.nombre.toLowerCase().includes(termino) || 
      (juego.categoria && juego.categoria.toLowerCase().includes(termino))
    );
  }
  
  renderProductos(productosFiltrados);
  
  if (termino.trim() && productosFiltrados.length === 0) {
    Swal.fire({
      title: 'Sin resultados',
      text: 'No se encontraron juegos con ese nombre',
      icon: 'info'
    });
  }
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.items.length === 0) {
    Swal.fire('Carrito vacío', 'Agrega productos antes de finalizar', 'warning');
    return;
  }

  Swal.fire({
    title: '¿Finalizar compra?',
    html: `
      <div style="text-align: left;">
        <h4>Resumen:</h4>
        <ul>
          ${carrito.items.map(item => `
            <li>${item.nombre} - $${item.precio.toFixed(2)} x${item.cantidad}</li>
          `).join('')}
        </ul>
        <p><b>Total: $${carrito.calcularTotal().toFixed(2)}</b></p>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Confirmar compra',
    cancelButtonText: 'Seguir comprando',
    focusConfirm: false,
    preConfirm: () => {
      carrito.vaciar();
      actualizarContadorCarrito();
      productosFiltrados = [...productos];
      renderProductos(productosFiltrados);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('¡Compra exitosa!', 'Gracias por tu pedido', 'success');
    }
  });
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
  const totalItems = carrito.items.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('cart-count').textContent = totalItems;
}