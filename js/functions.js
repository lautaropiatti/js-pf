const calcularIVA = (importeNeto) => {
    let valorFinal = (importeNeto * (1 + (IVA / 100))).toFixed(2);
    return valorFinal;
}

const storageSave = () => {
    // Guardar almacenes
    if (ALMACENES.length > 0) {
        localStorage.setItem('ALMACENES', JSON.stringify(ALMACENES));
    }
}

const storageRead = () => {
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

const crearAlmacen = (sucursal) => {
    if (ALMACENES.some(almacen => almacen.slug === stringToSlug(sucursal))) {
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

const crearProducto = (titulo, precio, stock, almacen) => {
    let nuevoProducto = new Producto(titulo, precio, stock);

    almacen.productos.push(nuevoProducto);
    almacen.valorStock += parseFloat((nuevoProducto.precio * nuevoProducto.stock).toFixed(2)); 
    almacen.stockTotal += nuevoProducto.stock;

    storageSave();
    return nuevoProducto;
}

/**
 * Devuelve el almacén que corresponda con ese slug
 * 
 * @param {string} slug
 * @returns {object} Almacen
 */
const getAlmacen = (slug) => {
    return ALMACENES.find(almacen => almacen.slug === slug);
}

const borrarProducto = (slug, almacenSeleccionado) => {
    let almacen = getAlmacen(almacenSeleccionado);
    let index = almacen.productos.findIndex(producto => producto.slug === slug);
    let producto = almacen.productos[index];
    
    (index !== -1) && almacen.productos.splice(index, 1);
    almacen.valorStock -= parseFloat((producto.precio * producto.stock).toFixed(2));
    almacen.stockTotal -= producto.stock;

    storageSave();
}