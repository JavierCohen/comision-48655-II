// Creo variable para mantener visible el carrito
let carritoVisible = false;

// Esperar carga de todos los elementos de la pagina para seguir con el script
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}

function ready() {
    // Agrego funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");

    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener("click", eliminarItemCarrito);
    }

    // Agrego funcionalidad al boton sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for (let i = 0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener("click", sumarCantidad);
    }

    // Agrego funcionalidad al boton restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for (let i = 0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad);
    }

    // Agrego funcionalidad a los botones Agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener("click", AgregarAlCarritoClicked);
    }

    // Agrego funcionalidad al boton pagar
    document.getElementsByClassName("btn-pagar")[0].addEventListener("click", pagarClicked);
}

// Elimino el item del carrito
function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    // Actualizo el total del carrito una vez eliminado un producto determinado
    actualizarTotalCarrito();

    // Controlo si hay elementos en el carrito una vez que haya eliminado
    // En caso de no haber nada oculto el carrito
    ocultarCarrito();
}

// Funcion actualizar total del carrito
function actualizarTotalCarrito() {
    // Selecciono el contenedor carrito
    let carritoContenedor = document.getElementsByClassName("carrito")[0];
    let carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
    let total = 0;

    // Recorro cada elemento del carrito para actualizar su total
    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
        console.log(precioElemento);
        // Saco el simbolo de dolar y el punto 
        let precio = parseFloat(precioElemento.innerText.replace("u$s", "").replace(".", ""));
        console.log(precio);
        let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
        let cantidad = cantidadItem.value;
        console.log(cantidad);
        total += (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("carrito-precio-total")[0].innerText = "u$s" + total.toLocaleString("es") + ",00";
}

function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName("carrito-item")[0]; // modificacion elimine [0]
    if (carritoItems.childElementCount == 0){
        let carrito = document.getElementsByClassName("carrito")[0];
        carrito.style.marginRight = "-100%";
        carrito.style.opacity = "0";
        carritoVisible = false;

        // Agrando el contenedor de los elementos
        let items = document.getElementsByClassName("contenedor-items")[0];
        items.style.width = "100%";
    }
}

// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
    // Actualizo el total del carrito
    actualizarTotalCarrito();
}

// le resto en uno a la cantidad del elemento seleccionado
function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    // Controlo que no sea menor que 1
    if (cantidadActual >= 1){
        selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
        // Actualizo el total del carrito
        actualizarTotalCarrito();
    }
}

function AgregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    let precio = item.getElementsByClassName("precio-item")[0].innerText;
    let imagenSrc = item.getElementsByClassName("img-item")[0].src;

    // Agrego el elemento al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    // Hago visible el carrito cuando agrego el primer producto
    mostrarCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    // Creo un elemento de tipo div que represente el item en el carrito
    let carritoItem = document.createElement('div');
    carritoItem.classList.add('carrito-item');

    // Creo un template para el item del carrito
    let carritoItemTemplate = `
        <div class="carrito-item-img">
            <img src="${imagenSrc}" alt="">
        </div>
        <div class="carrito-item-detalle">
            <h3 class="carrito-item-titulo">${titulo}</h3>
            <p class="carrito-item-precio">${precio}</p>
            <div class="selector-cantidad">
                <button class="restar-cantidad">-</button>
                <input type="number" class="carrito-item-cantidad" value="1">
                <button class="sumar-cantidad">+</button>
            </div>
            <button class="btn-eliminar">Eliminar</button>
        </div>
    `;
    carritoItem.innerHTML = carritoItemTemplate;

    // Agrego el elemento al carrito
    let carritoContenedor = document.getElementsByClassName("carrito")[0];
    carritoContenedor.appendChild(carritoItem);

    // Agrego funcionalidad al boton eliminar
    let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener("click", eliminarItemCarrito);
    }

    // Agrego funcionalidad al boton sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for (let i = 0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener("click", sumarCantidad);
    }

    // Agrego funcionalidad al boton restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for (let i = 0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad);
    }

    // Hago visible el carrito
    mostrarCarrito();

    // Actualizo el total del carrito
    actualizarTotalCarrito();
}

function pagarClicked(event){
    alert("Gracias por su compra");
    // Elimino todos los elementos del carrito
    let carritoItems = document.getElementsByClassName("carrito-items")[0];
    while (carritoItems.hasChildNodes){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    // Agrego funcionalidad que oculta el carrito
    ocultarCarrito();
}

function mostrarCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";

    let items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "60%";
}