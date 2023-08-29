let productos = [];

fetch("./js/productos.json")
.then(response => response.json())
.then(data =>{
    productos = data;
    cargarProductos(productos);
})

const contenedorProductos = document.getElementById("contenedor-productos");
const botonescategoria = document.querySelectorAll(".boton-categoria");
const tituloprincipales = document.getElementById("titulo-principal");
let botonesagregar = document.querySelectorAll(".agregar-producto");
const numerito = document.querySelector(".numero");

function cargarProductos(productoselegidos){

    contenedorProductos.innerHTML = "";

    productoselegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles bg-primary-subtle">
                        <h4 class="producto-nombre">${producto.titulo}</h4>
                        <p class="precio">$${producto.precio}</p>
                        <button class="agregar-producto" id="${producto.id}">Agregar al carrito</button>
                    </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarbotonesagregar();
}


botonescategoria.forEach(boton => {
    boton.addEventListener('click',(e) => {

        botonescategoria.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "Todos") {
        const productoscategorias = productos.find(producto => producto.categoria.id == e.currentTarget.id);
        tituloprincipales.innerText = productoscategorias.categoria.nombre;

     const productosboton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
    cargarProductos(productosboton);
}else{
    tituloprincipales.innerText = "Todos los productos";
        cargarProductos(productos)
    }

    })
})

function actualizarbotonesagregar(){
    botonesagregar = document.querySelectorAll(".agregar-producto");
    botonesagregar.forEach(boton => {
        boton.addEventListener("click", agregaralcarrito);

    });
}
let productosencarrito;

let productosencarritoLS = localStorage.getItem("productosencarrito");


if(productosencarritoLS) {

    productosencarrito = JSON.parse(productosencarritoLS)
    actualizarnumerito();
}else{
    productosencarrito = [];
}

function agregaralcarrito(e){
    Toastify({
        text: "Se agrego el producto al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius:"2rem",
        },
        onClick: function(){} // Callback after click
      }).showToast();
 const idboton = e.currentTarget.id;
 const productoagregado = productos.find(producto => producto.id === idboton);

if(productosencarrito.some(producto => producto.id === idboton)){
    const index = productosencarrito.findIndex(producto => producto.id === idboton);
    productosencarrito[index].cantidad++;
}else{
    productoagregado.cantidad = 1;
    productosencarrito.push(productoagregado);
}
 actualizarnumerito();

 localStorage.setItem("productosencarrito", JSON.stringify(productosencarrito));
}

function actualizarnumerito(){
    let nuevonumerito = productosencarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevonumerito;
}