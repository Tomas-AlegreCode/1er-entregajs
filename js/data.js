const videojuegos = [
  {
    id: 1,
    nombre: "Elden Ring",
    precio: 59.99,
    categoria: "RPG",
    imagen: "../../assets/img/elden-ring.jpg",
    stock: 10
  },

 {
    id: 2,
    nombre: "Mario Odyssey",
    precio: 70.99,
    categoria: "Aventura",
    imagen: "../../assets/img/mario-odyssey.jpg",
    stock: 5
  },

 {
    id: 3,
    nombre: "FC 2025",
    precio: 30,
    categoria: "Sport",
    imagen: "../../assets/img/fc-2025.jpg",
    stock: 8
  },

 {
    id: 4,
    nombre: "Zelda Breath of the Wild",
    precio: 100,
    categoria: "Aventura",
    imagen: "../../assets/img/zelda-breath-of-the-wild.jpg",
    stock: 6
  },

 {
    id: 5,
    nombre: "Mario Kart 8 deluxe",
    precio: 50,
    categoria: "Mundo Abierto",
    imagen: "../../assets/img/mario-kart-8-deluxe.jpg",
    stock: 5
  },
  
];

export const fetchProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(videojuegos), 1000); // Simula carga asíncrona
  });
};