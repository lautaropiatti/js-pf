const IVA = 21; // %
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

function mostrarEstadoStock(valorNetoStock, cantTotalStock) {
    alert('Valor total neto del stock: $ ' + valorNetoStock + '\nValor total del stock más IVA (21%): $' + calcularIVA(valorNetoStock) + '\nCantidad total de productos en stock: ' + cantTotalStock);
}

function ingresarProductos() {
    let stockTotal = 0;
    let valorStockTotal = 0;

    for (let i = 1; i <= cantidadIteraciones; i++) {
        let stock = parseInt(prompt('Ingrese el stock del artículo N° ' + i));
        stockTotal += stock;

        let precio = parseFloat(prompt('Ingrese el precio del artículo N° ' + i));
        valorStockTotal += precio * stock;
    }

    mostrarEstadoStock(valorStockTotal, stockTotal);
}

setearIteraciones();

ingresarProductos();
