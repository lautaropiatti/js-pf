function calcularIVA(importeNeto) {
    let valorFinal = importeNeto * (1 + (IVA / 100)).toFixed(2);
    return valorFinal;
}

function crearAlmacen(sucursal) {
    if (ALMACENES.some(element => element.sucursal.toLowerCase() === sucursal.toLowerCase())) {
        alert('⛔ Ese almacen ya existe');
    }
    else {
        let nuevoAlmacen = new Almacen(sucursal);
        ALMACENES.push(nuevoAlmacen);
        return nuevoAlmacen;
    }
}

function crearProducto(titulo, precio, stock, almacen) {
    let nuevoProducto = new Producto(titulo, precio, stock);
    almacen.productos.push(nuevoProducto);
    almacen.valorStock += nuevoProducto.precio * nuevoProducto.stock; 
    almacen.stockTotal += nuevoProducto.stock;
}

function mostrarEstadoStock(almacen) {
    let msg = 
    `Valor total neto del stock: $ ${almacen.valorStock}\n
    Valor total del stock más IVA (21%): ${almacen.valorFinalStock()}\n
    Cantidad total de productos en stock: ${almacen.stockTotal}`;

    alert(msg);
}
