// ---------- Botón "Reservar una mesa" ----------
document.getElementById('btnReservar').addEventListener('click', function() {
  document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
});

// ---------- Datos del menú por categoría ----------
const menuData = {
  cafe: [
    { name: 'Espresso', price: '$1.500', img: 'imagenes/espresso.jpg' },
    { name: 'Latte', price: '$2.000', img: 'imagenes/latte.jpg' },
    { name: 'Cappuccino', price: '$2.200', img: 'imagenes/cappuccino.jpg' },
    { name: 'Mocha', price: '$2.300', img: 'imagenes/mocha.jpg' },
    { name: 'Café Cortado', price: '$1.700', img: 'imagenes/cortado.jpg' }
  ],
  medialunas: [
    { name: 'Medialuna de manteca', price: '$900', img: 'imagenes/medialuna-manteca.jpg' },
    { name: 'Medialuna rellena de jamón y queso', price: '$1.400', img: 'imagenes/medialuna-jyq.jpg' },
    { name: 'Medialuna integral', price: '$1.000', img: 'imagenes/medialuna-integral.jpg' }
  ],
  sanguches: [
    { name: 'Sánguche de jamón y queso', price: '$2.500', img: 'imagenes/sanguche-jyq.jpg' },
    { name: 'Sánguche de milanesa', price: '$3.200', img: 'imagenes/sanguche-milanesa.jpg' },
    { name: 'Sánguche vegetariano', price: '$2.800', img: 'imagenes/sanguche-vegetariano.jpg' },
    { name: 'Tostado clásico', price: '$2.000', img: 'imagenes/tostado.jpg' }
  ]
};

const categorias = document.getElementById('categorias');
const carruselContainer = document.getElementById('carruselContainer');
const carrusel = document.getElementById('carrusel');
const btnVolver = document.getElementById('btnVolver');
const flechaIzq = document.getElementById('flechaIzq');
const flechaDer = document.getElementById('flechaDer');

const ITEMS_POR_PAGINA = 2;
let categoriaActual = null;
let indiceActual = 0;

document.querySelectorAll('.cat-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    categoriaActual = btn.getAttribute('data-cat');
    indiceActual = 0;
    renderizarPagina();

    categorias.style.display = 'none';
    carruselContainer.style.display = 'block';
  });
});

function renderizarPagina() {
  carrusel.innerHTML = '';

  const productos = menuData[categoriaActual];
  const pagina = productos.slice(indiceActual, indiceActual + ITEMS_POR_PAGINA);

  pagina.forEach(function(producto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${producto.img}" alt="${producto.name}" onerror="this.src='https://via.placeholder.com/200x140?text=Sin+imagen'">
      <h3>${producto.name}</h3>
      <p>${producto.price}</p>
    `;
    carrusel.appendChild(card);
  });

  flechaIzq.disabled = indiceActual === 0;
  flechaDer.disabled = indiceActual + ITEMS_POR_PAGINA >= productos.length;
}

btnVolver.addEventListener('click', function() {
  carruselContainer.style.display = 'none';
  categorias.style.display = 'flex';
});

flechaDer.addEventListener('click', function() {
  const productos = menuData[categoriaActual];
  if (indiceActual + ITEMS_POR_PAGINA < productos.length) {
    indiceActual += ITEMS_POR_PAGINA;
    renderizarPagina();
  }
});

flechaIzq.addEventListener('click', function() {
  if (indiceActual - ITEMS_POR_PAGINA >= 0) {
    indiceActual -= ITEMS_POR_PAGINA;
    renderizarPagina();
  }
});

// ---------- Formulario de contacto ----------
document.getElementById('formContacto').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const nombre = document.getElementById('nombre').value;
  const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
  const data = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      mensajeConfirmacion.textContent = `¡Gracias ${nombre}! Te contactaremos pronto.`;
      form.reset();
    } else {
      mensajeConfirmacion.textContent = 'Hubo un error, intenta de nuevo.';
    }
  })
  .catch(() => {
    mensajeConfirmacion.textContent = 'Hubo un error, intenta de nuevo.';
  });
});