// Seleccionamos los elementos HTML necesarios
const addToCartButton = document.querySelector('.add-to-cart');
const colorSelect = document.getElementById('color');
const sizeSelect = document.getElementById('size');
const quantityInput = document.getElementById('quantity');

// Creamos una función para manejar el evento click del botón "Añadir al carrito"
function addToCart() {
  // Obtenemos los valores seleccionados por el usuario
  const color = colorSelect.value;
  const size = sizeSelect.value;
  const quantity = quantityInput.value;

  // Creamos un objeto con la información del producto
  const product = {
    name: 'Nombre del Producto',
    price: 99.99,
    color: color,
    size: size,
    quantity: quantity
  };

  // Agregamos el producto al carrito (en este ejemplo, lo imprimimos en la consola)
  console.log('Producto añadido al carrito:', product);
}

// Agregamos un escuchador de eventos al botón "Añadir al carrito"
addToCartButton.addEventListener('click', addToCart);
