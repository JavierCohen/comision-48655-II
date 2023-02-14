const computadoras = [
    { id: 1, nombre: "Laptop", precio: 1000 },
    { id: 2, nombre: "Desktop", precio: 800 },
    { id: 3, nombre: "Macbook", precio: 1300 },
    { id: 4, nombre: "Chromebook", precio: 600 },
    { id: 5, nombre: "PC Gamer", precio: 1500 }
];

let computadorasSeleccionadas = [];
let precioTotal = 0;

const seleccionarComputadora = () => {
    let seleccionada = false;
    while (!seleccionada) {
        let idComputadora = parseInt(prompt("Ingresa el ID de la computadora que deseas agregar: \n ID: 1) Laptop $1000 \n ID: 2) Desktop $800 \n ID: 3) Macbook $1300 \n ID: 4) Chromebook $600 \n ID: 5) PC Gamer $1500"));
        let computadora = computadoras.find(c => c.id === idComputadora);
        if (!computadora) {
            alert("Computadora no encontrada, por favor ingresa un ID válido");
        } else {
            computadorasSeleccionadas.push(computadora);
            precioTotal += computadora.precio;
            seleccionada = true;
        }
    }
};

const eliminarComputadora = () => {
    if (computadorasSeleccionadas.length === 0) {
        alert("No hay computadoras disponibles para ser eliminadas.");
        return;
    }

    let listadoComputadoras = computadorasSeleccionadas.map((c, i) => {
        return `${i + 1}) ID: ${c.id}, Nombre: ${c.nombre}, Precio: $${c.precio}`;
    }).join("\n");
    let idComputadora = parseInt(prompt(`Selecciona el número de la computadora que deseas eliminar:\n\n${listadoComputadoras}`));
    let indice = idComputadora - 1;
    if (isNaN(idComputadora) || idComputadora <= 0 || idComputadora > computadorasSeleccionadas.length) {
        alert("Opción no válida, por favor selecciona un número del 1 al " + computadorasSeleccionadas.length);
    } else {
        let computadora = computadorasSeleccionadas[indice];
        computadorasSeleccionadas.splice(indice, 1);
        precioTotal -= computadora.precio;
        alert("Computadora eliminada exitosamente");
    }
};

const mostrarTotal = () => {
    let listadoComputadoras = "";
    if (computadorasSeleccionadas.length === 0) {
        listadoComputadoras = "No hay computadoras seleccionadas.";
    } else {
        listadoComputadoras = computadorasSeleccionadas.map((c, i) => {
            return `${i + 1}) ID: ${c.id} - Nombre: ${c.nombre} - Precio: $${c.precio}`;
        }).join("\n");
    }
    alert(`Resumen de Computadoras:\n\n${listadoComputadoras}\n\nTotal: $${precioTotal}`);
};

let continuar = true;
while (continuar) {
    let accion = parseInt(prompt("¿Qué deseas hacer?:\n1 - Agregar productos\n2 - Eliminar productos\n3 - Mostrar total\n4 - Salir"));
    switch (accion) {
        case 1:
            seleccionarComputadora();
            break;
        case 2:
            eliminarComputadora();
            break;
        case 3:
            mostrarTotal();
            break;
        case 4:
            alert("Programa Finalizado!");
            continuar = false;
            break;
        default:
            alert("Opción no válida, por favor ingresa un número entre 1 y 4");
            break;
    }
}