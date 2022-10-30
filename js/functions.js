function calcularIVA(importeNeto) {
    let valorFinal = (importeNeto * (1 + (IVA / 100))).toFixed(2);
    return valorFinal;
}

function storageSave() {
    // Guardar almacenes
    if (ALMACENES.length > 0) {
        localStorage.setItem('ALMACENES', JSON.stringify(ALMACENES));
    }
}

function storageRead() {
    // Recuperar almacenes
    if (localStorage.getItem('ALMACENES')) {
        let almacenesRecuperados = JSON.parse(localStorage.getItem('ALMACENES'));
        almacenesRecuperados.forEach(almacen => {
            ALMACENES.push(almacen);
        });
    }
    else {
        // Primer inicio
        Swal.fire({
            title: '¡Bienvenido!',
            text: 'Vemos que es tu primera vez por aquí. Crea un almacén para empezar 😎',
            confirmButtonText: 'Entendido'
        });
    }
}

function crearAlmacen(sucursal) {
    if (ALMACENES.some(element => element.sucursal.toLowerCase() === sucursal.toLowerCase())) {
        alert('⛔ Ese almacen ya existe');
        return;
    }
    if (sucursal === '') {
        alert('⛔ Por favor ingrese la sucursal del almacén');
        return;
    }
    if (sucursal.length > 64) {
        alert('⛔ Ingrese una sucursal de almacén de menos de 64 caracteres');
        return;
    }

    let nuevoAlmacen = new Almacen(sucursal);
    ALMACENES.push(nuevoAlmacen);
    storageSave();
    return nuevoAlmacen;
}

function crearProducto(titulo, precio, stock, almacen) {
    let nuevoProducto = new Producto(titulo, precio, stock);

    almacen.productos.push(nuevoProducto);
    almacen.valorStock += nuevoProducto.precio * nuevoProducto.stock; 
    almacen.stockTotal += parseInt(nuevoProducto.stock);

    storageSave();
    return nuevoProducto;
}

// Devuelve el almacén que corresponda con ese nombre (sucursal)
function getAlmacen(sucursal) {
    return ALMACENES.find(almacen => almacen.sucursal.toLowerCase() === sucursal);
}