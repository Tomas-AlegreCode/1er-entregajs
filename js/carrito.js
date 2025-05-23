export class Carrito {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('carrito')) || [];
  }

  agregarItem(producto) {
    const itemExistente = this.items.find(item => item.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }
    this.guardar();
  }

  calcularTotal() {
    return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  vaciar() {
    this.items = [];
    this.guardar();
  }

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
    this.actualizarContador();
  }

  actualizarContador() {
    const totalItems = this.items.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').textContent = totalItems;
  }
}