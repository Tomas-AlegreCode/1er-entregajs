const videojuegos = [
  { nombre: "Super Mario Odyssey", precio: 50 },
  { nombre: "The Legend of Zelda: Breath of the Wild", precio: 60 },
  { nombre: "Animal Crossing: New Horizons", precio: 55 },
  { nombre: "Minecraft", precio: 30 },
  { nombre: "Fortnite", precio: 0 } // pero mas vale, suficiente con las skins
];

// Carrito de compras
let carrito = [];

function mostrarVideojuegos() {
  let mensaje = "🎮 Videojuegos disponibles:\n";
  for (let i = 0; i < videojuegos.length; i++) {
      mensaje += (i + 1) + ". " + videojuegos[i].nombre + " - $" + videojuegos[i].precio + "\n";
  }
  alert(mensaje);
}

function agregarAlCarrito() {
  let eleccion = prompt("Ingresá el número del videojuego que querés agregar al carrito:");
  let indice = parseInt(eleccion) - 1;

  if (indice >= 0 && indice < videojuegos.length) {
      carrito.push(videojuegos[indice]);
      alert("✅ " + videojuegos[indice].nombre + " ha sido agregado al carrito.");
  } else {
      alert("❌ Opción no válida. Intentá nuevamente.");
  }
}

function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
      total += carrito[i].precio;
  }
  alert("🛒 Total de la compra: $" + total);
}

// Bucle para la compra
let continuar = true;

while (continuar) {
  mostrarVideojuegos();
  agregarAlCarrito();
  continuar = confirm("¿Querés agregar otro videojuego al carrito?");
}

calcularTotal();

