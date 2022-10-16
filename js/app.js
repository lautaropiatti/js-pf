const almacen = crearAlmacen(prompt('Ingrese el nombre para el nuevo almacén a agregar productos'));

let cantidadIteraciones = 0;

function setearIteraciones() {
    do {
        cantidadIteraciones = parseInt(prompt('Indique la cantidad de artículos que desea ingresar.\nMáximo 10 por vez.'));
        if (cantidadIteraciones >= 1 && cantidadIteraciones <= 10) {
                if (!confirm('¿Está seguro que desea ingresar ' + cantidadIteraciones + ' artículos?' )) {
                    cantidadIteraciones = 0;
                }
        }
    } while (!(cantidadIteraciones >= 1 && cantidadIteraciones <= 10));
}

setearIteraciones();

function ingresarProductos() {
    for (let i = 1; i <= cantidadIteraciones; i++) {
        let titulo = prompt('Ingrese el título del artículo N° ' + i);
        let precio = parseFloat(prompt('Ingrese el precio del artículo N° ' + i));
        let stock = parseInt(prompt('Ingrese el stock del artículo N° ' + i));

        crearProducto(titulo, precio, stock, almacen);
    }
}

ingresarProductos();

mostrarEstadoStock(almacen);
