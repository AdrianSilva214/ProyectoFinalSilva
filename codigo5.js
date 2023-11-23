// Obtención de elementos del DOM
const contenedorGeneral = document.getElementById("contenedor")
const carritoContenedor = document.getElementById("carrito-contenedor")
const precioTotal = document.getElementById("precio-total")
const totalCarritoElement = document.getElementById("total-carrito")
const borrarCarritoButton = document.getElementById("borrar-carrito")

const carrito = [] // Array para almacenar productos seleccionados
let totalCarrito = 0 // Variable para el costo total del carrito
let productos = [] // Inicializamos el array de productos


//------ Productos

// Función asincrónica para obtener los productos de mi archivo JSON
const pedirProductos = async () => {
  try {
    const resp = await fetch("./productos.json");//Solicita los datos
    productos = await resp.json(); // Asignar los productos obtenidos del JSON a la variable global productos
    console.log(productos)

    // Generación de cards para cada producto
    productos.forEach((producto) => {
      let contenedor=document.createElement(`div`)
      contenedor.classList.add('col-md-4')

      contenedor.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;">
      <img src="${producto.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-success">Agregar al carrito</a>
      </div>
    </div>`

    const comprarButton = contenedor.querySelector('.btn-success')
    comprarButton.addEventListener('click', (event) => {
      event.preventDefault() // Evitar redireccionamiento de la página
  
      carrito.push(producto);
      totalCarrito += producto.precio
  
    actualizarCarrito()
    });
  
    contenedorGeneral.appendChild(contenedor) // Agregar el contenedor al contenedor general
    })
  
  } catch (error) {
    console.error(`Error al obtener los productos`)
  }
}

// Llamar a la función para obtener los productos
pedirProductos();


//------ Carrito

// Función para actualizar el carrito
function actualizarCarrito() {
  carritoContenedor.innerHTML = "" // Limpiar el contenido antes de agregar los productos

  // Generación de cards para el carrito
  carrito.forEach((producto)=>{
    const productoCard = document.createElement(`div`)
    productoCard.classList.add("card", "text-center", "mb-3")

    productoCard.innerHTML = `
      <div class="card-header">${producto.nombre}</div>
      <div class="card-body">
        <p class="card-text">Precio: $${producto.precio}</p>
        <button class="btn btn-secondary btn-sm eliminar-producto" data-id="${producto.id}">Eliminar</button>
      </div>`

      carritoContenedor.appendChild(productoCard) // Agregar producto al carrito

    // Evento para eliminar un producto del carrito  
    const eliminarButton = productoCard.querySelector('.eliminar-producto');
    eliminarButton.addEventListener('click', () => {
    const id = parseInt(eliminarButton.getAttribute('data-id'))
    const indice = carrito.findIndex(item => item.id === id);

    if (indice !== -1) {
      totalCarrito -= carrito[indice].precio
      carrito.splice(indice, 1)
      actualizarCarrito() // Actualizar después de eliminar un producto
    }
  })
  })

  // Función para mostrar el precio total
  function mostrarPrecioTotal() { // Función para mostrar o no el carrito
    if (carrito.length > 0) {
        precioTotal.style.display = "block"
    } else {
        precioTotal.style.display = "none"
    }
    }

  totalCarritoElement.textContent = `Precio total: $${totalCarrito}`
  mostrarPrecioTotal() // Llamar a la función para mostrar la tarjeta del precio total
}

const comprarBtn = document.getElementById("comprar-btn")
const borrarCarritoCardBtn = document.getElementById("borrar-carrito-card")

// Función para borrar el carrito y actualizar la interfaz de usuario
function borrarCarrito() {
  carrito.length = 0 //Vaciar el carrito
  totalCarrito = 0 // Restablecer el total

  // Actualizar la interfaz de usuario
  actualizarCarrito();
  precioTotal.style.display = "none" // Ocultar tarjeta de precio total
}

Toastify({
  text: "Consulta por instrumentos nuevos al nuestro whatsapp",
  duration: 6000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", 
  position: "right", 
  stopOnFocus: true, 
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){}
}).showToast();

Toastify({
  text: "Durante todo noviembre conservamos los precios!",
  duration: 10000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", 
  position: "right", 
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #364552, #2c2d2e)",
  },
  onClick: function(){}
}).showToast();

// Configurar el evento para el botón "Comprar"
comprarBtn.addEventListener('click', () => { 
  Swal.fire({
    title: "Genial! Has realizado la compra de tus instrumentos",
    text: "Recuerda completar el formulario para que podamos comunicarnos contigo, gracias!",
    icon: "info"
  });
  
  localStorage.setItem('cantidadProductos', carrito.length)
  localStorage.setItem('costoTotal', totalCarrito)

  borrarCarrito() // Borrar el carrito al realizar la compra
});

// Configurar el evento para borrar el carrito 
borrarCarritoButton.addEventListener("click", () => {
  Swal.fire({
    title: "Has seleccionado borrar el carrito",
    text: "Estás seguro que deseas borrarlo?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Borrado!",
        text: "Has borrado el carrito",
        icon: "success"
      });
    }
  });
  // Borrar carrito al confirmar
  borrarCarrito();
});


//------ Formulario
const form = document.getElementById("formulario")

// Configurar el evento de envío del formulario
form.addEventListener("submit",(event)=>{
    event.preventDefault(); // Detener el envío del fomulario al servidor
    crearUsuario(); // Guardar el usuario en localStorage

    Swal.fire({
      title: "Listo!",
      text: "Nos comunicaremos contigo a la brevedad, muchas gracias por su compra!",
      icon: "success",
      timer: 4000
    });
});

// Función para guardar el usuario en localStorage
function crearUsuario(){

    let inputNombre=document.getElementById("nombre")
    let inputCorreo=document.getElementById("email")
    let inputMensaje=document.getElementById("mensaje")

    const user = {
        nombre:inputNombre.value,
        email:inputCorreo.value,
        mensaje:inputMensaje.value
    }

    localStorage.setItem("userData", JSON.stringify(user));
}
