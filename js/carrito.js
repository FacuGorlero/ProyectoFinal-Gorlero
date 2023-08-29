let productosencarrito =(localStorage.getItem("productosencarrito"));
productosencarrito = JSON.parse(productosencarrito);


const contenedorcarritovacio = document.getElementById("carrito-vacio");
const contenedorcarritoproductos = document.getElementById("carrito-productos");
const contenedorcarritoacciones = document.getElementById("carrito-acciones");
const contenedorcarritocomprado = document.getElementById("carrito-comprado");
let botoneseliminar = document.getElementsByClassName("carrito-producto-eliminar");
const botonvaciar = document.getElementById("carrito-acciones-vaciar");
const total = document.getElementById("total");
const botoncomprar = document.getElementById("carrito-acciones-comprar");

function cargarproductoscarrito(){
    if (productosencarrito && productosencarrito.length > 0){

        contenedorcarritovacio.classList.add("disabled");
        contenedorcarritoproductos.classList.remove("disabled");
        contenedorcarritoacciones.classList.remove("disabled");
        contenedorcarritocomprado.classList.add("disabled");
    
        contenedorcarritoproductos.innerHTML = "";
    
        productosencarrito.forEach(producto =>{
        
        const div = document.createElement("div")
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                    <small>Nombre</small>
                    <h5>${producto.titulo}</h5>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                 <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                 <p>$${producto.precio}</p>
             </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                 <p>$${producto.precio * producto.cantidad}</p>
             </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"> <i class="bi bi-trash3-fill"></i></button>
    
        `
        contenedorcarritoproductos.appendChild(div);
    })
        
    }else{
        contenedorcarritovacio.classList.remove("disabled");
        contenedorcarritoproductos.classList.add("disabled");
        contenedorcarritoacciones.classList.add("disabled");
        contenedorcarritocomprado.classList.add("disabled");
    }

    actualizarbotonesliminar();
    actualizartotal()
}

cargarproductoscarrito();



function actualizarbotonesliminar(){
    botoneseliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botoneseliminar.forEach(boton => {
        boton.addEventListener("click", eliminardelcarrito);

    });
}

function eliminardelcarrito(e){
    
    
    const idboton = e.currentTarget.id;
    const index = productosencarrito.findIndex(producto => producto.id === idboton);
    productosencarrito.splice(index, 1);
    cargarproductoscarrito();

    localStorage.setItem("productosencarrito", JSON.stringify(productosencarrito));
    Toastify({
        text: "Se elimino el producto de su carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
          borderRadius:"2rem",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}


botonvaciar.addEventListener("click", vaciarcarrito);


function vaciarcarrito(){

    Swal.fire({
        title: 'Estas seguro de vaciar el carrito?',
        icon: 'warning',
        html:
          'Perderas todos tus productos ',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Vaciar carrito',
        cancelButtonText:'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            productosencarrito.length = 0;
            localStorage.setItem("productosencarrito", JSON.stringify(productosencarrito));
            cargarproductoscarrito();
        }
      })
}


function actualizartotal(){
    const totalcalculado = productosencarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalcalculado}`;
}


botoncomprar.addEventListener("click", comprarcarrito);


function comprarcarrito(){

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La compra se realizo con exito, Muchas gracias',
        showConfirmButton: false,
        timer: 2500
      })

    productosencarrito.length = 0;
    localStorage.setItem("productosencarrito", JSON.stringify(productosencarrito));
    contenedorcarritovacio.classList.add("disabled");
        contenedorcarritoproductos.classList.add("disabled");
        contenedorcarritoacciones.classList.add("disabled");
        contenedorcarritocomprado.classList.remove("disabled");
}